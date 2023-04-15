import { Auth, DataStore} from 'aws-amplify';
import * as React from "react";
import {Report} from '../models';

import {Flex, Divider, Text, SearchField, SelectField, SliderField, Button, ToggleButton, MapView, Grid} from "@aws-amplify/ui-react";

import {ReportCollection, loadReports } from './ReportCollection';
import { Marker, Popup } from 'react-map-gl';
import { ReportCard } from './ReportCard';
import { Pests, User } from '../models';






export default function ReportViewCollectionCustom(props) {


  const {reports, setFilterFunction, setDisplayCount, reloadReports} = loadReports(20);
  const [users, setUsers] = React.useState([]);
  const [mapState, setMapState] = React.useState(false);
  const [screenIsVertical, setScreenIsVertical] = React.useState(true);

  const [maxMiles, setMaxMiles] = React.useState(10);
  const [selectedUser, setSelectedUser] = React.useState("All");
  const [selectedPest, setSelectedPest] = React.useState("All");
  const [selectedAddress, setSelectedAddress] = React.useState("");


  const [sliderMax, setSliderMax] = React.useState(maxMiles * 2);
  const [userLocation, setUserLocation] = React.useState(null);
  const [isModerator, setIsModerator] = React.useState(false);

  
  function handleReportDelete(item){
    if(window.confirm("Are you sure you want to delete?")){
      DataStore.delete(Report, (report) => report.id.eq(item.id)).then(
        r => {
          reloadReports();
        }
      )
    }

  }

  function MarkerWithPopup({ latitude, longitude, content}) {
    const [showPopup, setShowPopup] = React.useState(false);
    
  
    const handleMarkerClick = ({ originalEvent }) => {
      originalEvent.stopPropagation();
      setShowPopup(true);
    };

  
    return (
      <>
        <Marker
          latitude={latitude}
          longitude={longitude}
          onClick={handleMarkerClick}
        />
        {showPopup && (
          <Popup
            latitude={latitude}
            longitude={longitude}
            offset={{ bottom: [0, -40] }}
            onClose={() => setShowPopup(false)}
          >
            {content}
          </Popup>
        )}
      </>
    );
  }
  
  function MarkerData(data) {
    let userMarker = null;
    if(userLocation !== null){
      userMarker = <Marker
        color="red"
        longitude={userLocation.coords.longitude}
        latitude={userLocation.coords.latitude}
        
        />;
    }
  
    return [...data.map((item) => {
            return <MarkerWithPopup 
              longitude={item.longitude}
              latitude={item.latitude}
              content={isModerator ? 
                <Flex
                direction="column">
                  <ReportCard report={item}></ReportCard>
                  <Button onClick={() => handleReportDelete(item)} color="white" backgroundColor="red.60">DELETE</Button> 
                </Flex>
                :
                <ReportCard report={item}></ReportCard>}/>
    }), userMarker];
  }

  
  function coordinateBoundingBox(latitude, radius, unit="mi") {
  
    let circumference;
    if(unit === "mi"){
      circumference = 24901;
    } else if(unit === "km"){
      circumference = 40075;
    }
    
    const dY = 360 * radius / circumference;
    const dX = dY * Math.cos((Math.PI / 180) * latitude);
  
    return {longDiff: dX, latDiff: dY}; 
  }


  React.useEffect(() => {

    if(window.innerHeight > window.innerWidth){
      setScreenIsVertical(true);
    } else setScreenIsVertical(false);

    DataStore.query(User).then(r => {
      setUsers(r);
    });   
    
    Auth.currentAuthenticatedUser().then( user => {
      if(user.signInUserSession.accessToken.payload["cognito:groups"].find(element => element === "moderator") !== undefined){
        setIsModerator(true);
      } else setIsModerator(false);
    });

    navigator.geolocation.getCurrentPosition(
      (loc) => {
        setUserLocation(loc); 
        console.log("Got location:",loc)}, // Success
      (err) => {alert("Failed to get location. Error: " + err.message)}); // Failure
  }, []);

  

  React.useEffect(() => {
    if(userLocation !== null){
      const {longDiff, latDiff} = coordinateBoundingBox(userLocation.coords.latitude, maxMiles, "mi");
      
      function filterFunction(item) {
        console.log("User location", userLocation);
        console.log("longdiff " + longDiff + " lat diff" + latDiff)
        console.log("selectedUser", selectedUser);
        console.log("selectedPest", selectedPest);
        console.log("selectedAddress", selectedAddress);
        console.log("item", item);
        console.log("selectedUser === All", selectedUser === "All");
            console.log("selectedPest === All", selectedPest === "All");
            console.log("selectedAddress === All", selectedAddress === "");
            console.log("item.id === selectedUser", item.id === selectedUser);
            console.log("item.pestSubmitted === selectedPest", item.pestSubmitted === selectedPest);
            console.log("Location check", item.longitude > (userLocation.coords.longitude - longDiff) && item.longitude < (userLocation.coords.longitude + longDiff) &&
            item.latitude > (userLocation.coords.latitude - latDiff) && item.latitude < (userLocation.coords.latitude + latDiff)
            )
        if(
          (selectedUser === "All" || item.id === selectedUser) &&
          item.longitude > (userLocation.coords.longitude - longDiff) && item.longitude < (userLocation.coords.longitude + longDiff) &&
          item.latitude > (userLocation.coords.latitude - latDiff) && item.latitude < (userLocation.coords.latitude + latDiff) &&
          (selectedPest === "All" || item.pestSubmitted === selectedPest) &&
          (selectedAddress === "" || (item.location.address.number +  item.location.address.street + item.location.address.neighborhood + item.location.address.municipality + item.location.address.region + item.location.address.country + item.location.address.postalCode).includes(selectedAddress))
          ){
            return true;
          }
            return false;
      }
      setFilterFunction(() => {return(filterFunction)});
    }
  }, [setFilterFunction, userLocation, maxMiles, selectedPest, selectedUser, selectedAddress])

  let count = 20;

  function toggleMap(){
    if(mapState){
      setMapState(false);
      return;
    }
    else{
      setMapState(true);
      return;
    }
  }

  function incDisplayCount(){
    count += 10;
    setDisplayCount(count);
  }
 

  return (
    <Flex
    direction="column"
    alignItems="stretch"
    minWidth="100%"
    minHeight="100%"
    maxWidth="100%"
    maxHeight="100%"
    overflow="hidden">

      <Flex
      height="100%"
      direction={screenIsVertical ? "column" : "row"}
      overflow="hidden"
      gap="0">

      <Flex
      width={screenIsVertical ? "100%" : "350px"}
      height={screenIsVertical ? "fit-content" : "100%"}
      direction="column"
      alignItems="center" 
      padding="16px">

          
        <ToggleButton height="fit-content" width="fit-content" onClick={() => {toggleMap()}}>View Map</ToggleButton>
          <Divider width="100%"/>
          
          <Grid
            templateColumns="1fr 1fr"
            alignItems="center"
          >
            
            <Text column="1" row="1">Address</Text>
            <SearchField column="2" row="1" hasSearchButton={false} onClear={() => setSelectedAddress("")} onSubmit={(val) => setSelectedAddress(val)}/>
          
            <Text column="1" row="2" >Radius</Text>
            <SliderField
            column="2" row="2"
            //onClick={() => {if(sliderMax === maxMiles) setSliderMax(sliderMax * 2)}}
            onChange={(value) => setMaxMiles(value)}
            max={500}
            ></SliderField>
          
            <Text column="1" row="3" >Pest</Text>
            <SelectField
            column="2" row="3"
            onChange={(e) => setSelectedPest(e.target.value)}>
              <option key={0} value={"All"}>All Pests</option>
              <option key={1} value={Pests.UNKNOWN}>Unknown</option>
              <option key={2} value={Pests.GRAPE_BERRY_MOTH}>Grape Berry Moth</option>
              <option key={3} value={Pests.SPOTTED_LANTERN_FLY}>Spotted Lantern Fly</option>
            </SelectField>

            <SelectField
            column="2"
            row="4"
            onChange={(e) => setSelectedUser(e.target.value)} 
            
            children={
              [...users.map((user, index) => <option key={index+1} value={user.id}>  {user.userName}</option>),
                <option value="All" children="All Users"/>]
              }
            value={selectedUser} name="User">

            </SelectField>

          </Grid>
          
        <Flex
        flex="1"
        direction="column"
        justifyContent="flex-end">
          <Button  onClick={() => {incDisplayCount()}}>Load More</Button>
        </Flex>
      </Flex>

    {mapState ? 
        <Flex 
          flex="1 1 0%"
          fontFamily="sans-serif"
          >
            <MapView
            initialViewState={ userLocation !== null ? {
              latitude: userLocation.coords.latitude,
              longitude: userLocation.coords.longitude,
              zoom: 10,
              pitch: 70
            } : {}}>
            {MarkerData(reports)}
            </MapView>
        </Flex>
        
           :
        <Flex minHeight="0" flex="1 1 0%">
          <ReportCollection reports={reports}/>
        </Flex>
      }
      </Flex>
        
      
    
    </Flex>
  );
}

/*


          <SelectField
            size="small"
            onChange={(e) => setSelectedFilter(e.target.value)}
            value={selectedFilter}
          >
            <option value="Keyword">Keyword</option>
            <option value="Range">Range</option>
            <option value="Date">Date</option>
            <option value="Pest">Pest</option>
          </SelectField>

          

<Flex 
            id="map"
            flex="1 1 0%"
            minWidth="0"
            maxWidth="70%"
            fontFamily="sans-serif"
            >
            Map
          </Flex>
          
<Flex
    direction="column"
    alignItems="stretch"
    width="100%"
    height="100%"
    maxHeight="100%">
      <Flex
      justifyContent="center"
      flex="0 1 auto">
        <ToggleButton height="fit-content" width="fit-content" onClick={() => {toggleMap()}}>View Map</ToggleButton>
      </Flex>
        
      {mapState ? 
        <Flex
        flex="1 1"
        direction="row"
        maxHeight="100px"
        gap="0"
        >
          <Flex
          flex="1 1"
          maxHeight="300px"
          maxWidth="300px"
          overflow="hidden">
            {collection}
          </Flex>

        </Flex>
           :
        <Flex flex="1 1">{collection}</Flex>
      }
    
    </Flex>
    


        
          
          

        {mapState ? 
        <Flex
        direction="row"
        justifyContent="center"
        width="100%"
        height="100%"
        >
          <Flex
          width="30vw"
          maxWidth="30%">
            {collection}
          </Flex>
          <Flex 
            id="map"
            flex="1 1 100%"
          >
            Map
          </Flex>
          </Flex>
           :
        collection}
        */