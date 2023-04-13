/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import { Storage, DataStore} from 'aws-amplify';
import * as React from "react";

import { Collection, Card, Image, Flex, Badge, View, Divider, Text, SearchField, SelectField, SliderField, Heading, Button, ToggleButton, ScrollView, MapView, LocationSearch} from "@aws-amplify/ui-react";

import { Textfit } from 'react-textfit';
import {ReportCollection, loadReports } from './ReportCollection';


import { Marker, Popup } from 'react-map-gl';
import { ReportCard } from './ReportCard';
import { Pests } from '../models';
import { attribute } from '@aws-amplify/datastore';






export default function ReportViewCollectionCustom(props) {


  const {reports, setFilterFunction, setSortFunction, setDisplayCount} = loadReports(20);
  const [mapState, setMapState] = React.useState(false);

  const [maxMiles, setMaxMiles] = React.useState(10);
  const [selectedUser, setSelectedUser] = React.useState("All");
  const [selectedPest, setSelectedPest] = React.useState("All");
  const [selectedAddress, setSelectedAddress] = React.useState("");


  const [sliderMax, setSliderMax] = React.useState(maxMiles * 2);
  const [userLocation, setUserLocation] = React.useState(null);

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
    if(userLocation != null){
      userMarker = <Marker
        color="red"
        longitude={userLocation.coords.longitude}
        latitude={userLocation.coords.latitude}
        
        />;
    }
  
    return [...data.map((item) => {
            return <MarkerWithPopup 
              longitude={item.location.coordinates.longitude}
              latitude={item.location.coordinates.latitude}
              content={<ReportCard report={item}></ReportCard>}/>
    }), userMarker];
  }
  
  function coordinateBoundingBox(latitude, radius, unit="mi") {
  
    let circumference;
    if(unit == "mi"){
      circumference = 24901;
    } else if(unit == "km"){
      circumference = 40075;
    }
    
    const dY = 360 * radius / circumference;
    const dX = dY * Math.cos((Math.PI / 180) * latitude);
  
    return {longDiff: dX, latDiff: dY}; 
  }


  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (loc) => {
        setUserLocation(loc); 
        console.log("Got location:",loc)}, // Success
      () => {console.log("Failed to get position")}); // Failure
  }, []);

  

  React.useEffect(() => {
    if(userLocation != null){
      const {longDiff, latDiff} = coordinateBoundingBox(userLocation.coords.latitude, maxMiles, "mi");
      function filterFunction(item) {
        console.log("Selected:", selectedAddress)
        console.log("Address: ", item.location.address.number +  item.location.address.street + item.location.address.neighborhood + item.location.address.municipality + item.location.address.region + item.location.address.country + item.location.address.postalCode)
        if(
          (selectedUser == "All" || item.user == selectedUser) &&
          item.location.coordinates.longitude > (userLocation.coords.longitude - longDiff) && item.location.coordinates.longitude < (userLocation.coords.longitude + longDiff) &&
          item.location.coordinates.latitude > (userLocation.coords.latitude - latDiff) && item.location.coordinates.latitude < (userLocation.coords.latitude + latDiff) &&
          (selectedPest == "All" || item.pestSubmitted == selectedPest) &&
          (selectedAddress == "" || (item.location.address.number +  item.location.address.street + item.location.address.neighborhood + item.location.address.municipality + item.location.address.region + item.location.address.country + item.location.address.postalCode).includes(selectedAddress))
          ){
            return true;
          }
            return false;
      }
      setFilterFunction(() => {return(filterFunction)});
    }
  }, [userLocation, maxMiles, selectedPest, selectedUser, selectedAddress])




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
      direction="row"
      overflow="hidden"
      gap="0">

      <Flex
      width="350px"
      minHeight="0"
      direction="column"
      alignItems="center" 
      padding="16px">

          
        <ToggleButton height="fit-content" width="fit-content" onClick={() => {toggleMap()}}>View Map</ToggleButton>
          <Divider width="100%"/>
          
          <Flex
          
          alignItems="center"
          width="100%">
            <Text>Address</Text>
            <SearchField hasSearchButton={false} onClear={() => setSelectedAddress("")} onSubmit={(val) => setSelectedAddress(val)}/>
          </Flex>
          <Flex
          alignItems="center"
          width="100%">
            <Text>Radius</Text>
          <SliderField
          onClick={() => {if(sliderMax == maxMiles) setSliderMax(sliderMax * 2)}}
          onChange={(value) => setMaxMiles(value)}
          max={sliderMax}
          ></SliderField>
          </Flex>
          <SelectField
          onChange={(e) => setSelectedPest(e.target.value)}>
            <option value={"All"}>All Pests</option>
            <option value={Pests.UNKNOWN}>Unknown</option>
            <option value={Pests.GRAPE_BERRY_MOTH}>Grape Berry Moth</option>
            <option value={Pests.SPOTTED_LANTERN_FLY}>Spotted Lantern Fly</option>
          </SelectField>

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
          minWidth="0"
          maxWidth="70%"
          fontFamily="sans-serif"
          >
            <MapView
            initialViewState={{
              latitude: userLocation.coords.latitude,
              longitude: userLocation.coords.longitude,
              zoom: 10,
              pitch: 70
            }}>
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