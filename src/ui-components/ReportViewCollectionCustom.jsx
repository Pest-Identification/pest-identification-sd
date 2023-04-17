import { Auth, DataStore} from 'aws-amplify';
import * as React from "react";
import {Report} from '../models';

import {View, Flex, Divider, Text, SearchField, SelectField, SliderField, Button, ToggleButton, MapView, Grid} from "@aws-amplify/ui-react";

import {ReportCollection, loadReports } from './ReportCollection';
import { Marker, Popup } from 'react-map-gl';
import { ReportCard } from './ReportCard';
import { Pests, User } from '../models';






export default function ReportViewCollectionCustom(props) {


  const {reports, setFilterFunction, setDisplayCount, reloadReports} = loadReports(20);
  const [users, setUsers] = React.useState([]);
  const [mapState, setMapState] = React.useState(false);
  const [screenIsVertical, setScreenIsVertical] = React.useState(true);

  const [showFilterMenu, setShowFilterMenu] = React.useState(false);
  const [maxMiles, setMaxMiles] = React.useState(10);
  const [selectedUser, setSelectedUser] = React.useState("All");
  const [selectedPest, setSelectedPest] = React.useState("All");
  const [selectedAddress, setSelectedAddress] = React.useState("");


  const [sliderMax, setSliderMax] = React.useState(maxMiles * 2);
  const [userLocation, setUserLocation] = React.useState(null);
  const [isModerator, setIsModerator] = React.useState(false);


  const mapViewRef = React.useRef();

  
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
          (selectedAddress === "" || (item.address_number +  item.address_street + item.address_neighborhood + item.address_municipality + item.address_region + item.address_country + item.address_postalCode).includes(selectedAddress))
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
      setShowFilterMenu(false)
      setMapState(true);
      return;
    }
  }

  function incDisplayCount(){
    count += 10;
    setDisplayCount(count);
  }

  const loadMoreButton = 
  <Button 
  height="fit-content"
  width="fit-content" 
  backgroundColor="lightgreen"
  onClick={() => {incDisplayCount()}}>Load More</Button>;

  const showFiltersButton = 
  <Button
  height="fit-content"
  width="fit-content"
  backgroundColor="lightgreen"
  onClick={() => {setShowFilterMenu(!showFilterMenu)}}> 
    Filters 
  </Button>;

  const showMenuButton = 
  <Button 
  height="fit-content" 
  width="fit-content" 
  backgroundColor="lightgreen"
  onClick={() => {toggleMap()}}>
      Map
  </Button>;

  const filterMenu = 
  <Flex
  backgroundColor="lightgrey"
  border="thin solid black"
  width={screenIsVertical ? "100%" : "fit-content"}
  minWidth="fit-content"
  maxHeight={showFilterMenu ? "100%" : "0px"}
  overflow="hidden"
  display={showFilterMenu ? "flex" : "none"}
  height={screenIsVertical ? "fit-content" : "100%"}
  direction="column"
  alignItems="center" 
  padding="16px">

      <Grid
        gap="5px"
        templateColumns="auto auto"
        alignItems="center"
      >
        
        <Text column="1" row="1">Address</Text>
        <SearchField column="2" row="1" hasSearchButton={false} onClear={() => setSelectedAddress("")} onSubmit={(val) => setSelectedAddress(val)}/>
      
        <Text column="1" row="2" >Radius <br/> (mi) </Text>
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

        <Text column="1" row="4" >User</Text>
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
   
  </Flex>;

  const mapOverlay =
  <Flex
    direction="column"
    style={{pointerEvents: "none", position: "relative", zIndex: 100}}
    width="100%"
    height="100%"
    alignItems="stretch">
      <Flex
      style={{pointerEvents: "auto"}}
      justifyContent="center"
      padding="10px">
        {showMenuButton}
        {showFiltersButton}
        {loadMoreButton}
      </Flex>
      {showFilterMenu ? 
      <Flex
      justifyContent="center"
      height="100%"
      width="100%"
      position="absolute"
      top="25%">
        {filterMenu}
      </Flex>
      : null}
  </Flex>
 

  return (
    <Flex
    direction="column"
    alignItems="stretch"
    minWidth="100%"
    minHeight="100%"
    maxWidth="100%"
    maxHeight="100%"
    overflow="hidden">


    {mapState ? 
        <Flex 
        gap="1px"
        maxHeight="100%"
        height="fit-content"
        direction="column"
        flex="1 1 0%">
          <MapView
          ref={mapViewRef}
          attributionControl={false}
          style={{maxHeight: "100%", maxWidth: "100%"}}
          initialViewState={ userLocation !== null ? {
            latitude: userLocation.coords.latitude,
            longitude: userLocation.coords.longitude,
            zoom: 10,
            pitch: 70
          } : {}}>
            {screenIsVertical ? mapOverlay : null}

          {MarkerData(reports)}
          </MapView>
        </Flex>
        
          :
        <Flex 
          padding="10px"
          alignItems="center"
          direction="column" 
          minHeight="0" 
          flex="1 1 0%">
            <Flex
              direction="row"
              >
                {showMenuButton}
                {screenIsVertical ? showFiltersButton : null}
            </Flex>
          
          {filterMenu}
          <ReportCollection reports={reports}/>
          {loadMoreButton}
        </Flex>
      }
        
      
    
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