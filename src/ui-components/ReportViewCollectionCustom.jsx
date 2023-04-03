/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import { Storage, DataStore} from 'aws-amplify';
import * as React from "react";
<<<<<<< HEAD
import { Pests, Report, User } from "../models";
import { SortDirection } from "@aws-amplify/datastore";
import {
  getOverrideProps,
  useDataStoreBinding,
} from "@aws-amplify/ui-react/internal";
import ReportView from "./ReportView";
import { Collection, Card, Image, Flex, Badge, View, Divider, Text, Heading, Button} from "@aws-amplify/ui-react";
import { createMap } from "maplibre-gl-js-amplify";
import "maplibre-gl/dist/maplibre-gl.css";


export default function ReportViewCollectionCustom(props) {

  const itemsPagination = { sort: (s) => s.createdAt(SortDirection.ASCENDING) };
  const [items, setItems] = React.useState(undefined);
  const [urls, setUrls] = React.useState({});
  const [users, setUsers] = React.useState({});
  const [imageFailed, setImageFailed] = React.useState();
  const [mapState, setMapState] = React.useState("disabled");
  
  let imgRequests = {};
  let userRequests = {};
=======

import { Collection, Card, Image, Flex, Badge, View, Divider, Text, Heading, Button, ToggleButton, ScrollView, SearchField, MapView} from "@aws-amplify/ui-react";
>>>>>>> temp

import { Textfit } from 'react-textfit';
import {ReportCollection, loadReports, getUser, getAddress, getDate} from './ReportCollection';


import { Marker, Popup } from 'react-map-gl';



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
  console.log("MarkerData got", data)
  return data.items.map((item) => {
            return <MarkerWithPopup 
              longitude={item.location.coordinates.longitude}
              latitude={item.location.coordinates.latitude}
              content={
                <Flex
                height="100px"
                width="100px">
                  <Flex
                  height="100%"
                  width="25%">
                    <Image width="100%" maxHeight="100%" src={data.getUrl(item)}/>
                  </Flex>
                  <Flex direction="column">
                    <Heading> Test1</Heading>
                    <Text> Test2 </Text>
                  </Flex>
                </Flex>}/>
            });
}


export default function ReportViewCollectionCustom(props) {

  const data = loadReports();
  
  const [mapState, setMapState] = React.useState(false);



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

<<<<<<< HEAD
  
  let map;
  async function initializeMap() {
    map = await createMap({
        container: "map", // An HTML Element or HTML element ID to render the map in https://maplibre.org/maplibre-gl-js-docs/api/map/
        center: [-123.1187, 49.2819], // [Longitude, Latitude]
        zoom: 11,
    })
  }

  React.useEffect(() => {
    return () => {
      if(map != undefined) map.stop();
    }
  }, [])

  function toggleMapState(){
    if(mapState == "disabled") {
      setMapState("enabled");
      if(map == undefined) initializeMap();
      return;
    }
    else if(mapState == "enabled" || mapState == "fullscreen"){
      setMapState("disabled");
      return;
    }
    return;
  }
  /*<Collection
        type="list"
        isSearchable="true"
        isPaginated={true}
        searchPlaceholder="Search..."
        direction="row"
        wrap="wrap"
        justifyContent="stretch"
        items={items || []}
      >*/

  return (
    <div>
      <Button onClick = {() => toggleMapState()}>
      Toggle Map
      </Button>
      {
      mapState === "disabled" ? <div> Disabled map </div>
      : mapState === "enabled" ? <div id="map"> Enabled Map</div> : <div> Unknown </div>
      }
      <Collection
        items={items}
        type="list"
        direction="row"
        gap="20px"
        wrap="wrap"
        justifyContent="center"
        isPaginated={true}
      >
        {(item, index) => (
          <Card
          key={index}
          borderRadius="medium"
          variation="outlined"
          >
            <Flex
              width="20rem"
              height="10rem"
              direction="row"
              alignItems="stretch"
              gap="relative.small"
            >
              <Flex
              height="100%"
              width="25%"
              alignItems="center"
              justifyContent="center"
              >
                {
                  imageFailed[index] ? (
                    <View
                    width="100%"
                    />
                  ) : (
                    
                    <Image
                      src={urls[item.id]}
                      width="100%"
                      maxHeight="100%"
                      onError={() => handleImageError(index)}
                    />
                  )
                }
              </Flex>
                
                
              <Flex
                direction="column"
                justifyContent="flex-start"
                alignItems="stretch"
                flex="1"
              >
                
                <Flex
                direction="row"
                justifyContent="flex-end"
                >
                  <Badge
                    backgroundColor={
                      item.pestActual === Pests.SPOTTED_LANTERN_FLY ? 'green.10' 
                      : item.pestActual === Pests.GRAPE_BERRY_MOTH ? 'blue.40'
                      : 'grey'}
                  >
                    {item.pestActual === Pests.SPOTTED_LANTERN_FLY ? 'Spotted Lantern Fly' 
                      : item.pestActual === Pests.GRAPE_BERRY_MOTH ? 'Grape Berry Moth'
                      : 'Unknown'}
                  </Badge>
                </Flex>
                  
                <Divider/>
                
                <Flex
                  direction="column"
                  justifyContent="space-evenly"
                  alignItems="flex-start"
                  flex="1"
                  overflow="clip"
                  gap="0"
                >

                  <Text
                    as="span"
                    minHeight="33%"
                    padding="0px 0px 0px 0px">
                    Reported by {getUser(item.id)}
                  </Text>

                  
                  <Text
                    as="span"
                    minHeight="33%"
                    padding="0px 0px 0px 0px">
                    {getLocation(item)}
                  </Text>

                  <Text
                    as="span"
                    minHeight="33%"
                    padding="0px 0px 0px 0px">
                    {getDate(item)}
                  </Text>

                  
                </Flex>
              </Flex> 
            </Flex>
          </Card>
          
        )}
      </Collection>
    </div>
=======
 

  return (
    <Flex
    direction="column"
    alignItems="stretch"
    minWidth="100%"
    minHeight="100%"
    maxWidth="100%"
    maxHeight="100%">
      <Flex
      gap="1px"
      justifyContent="center"
      flex="0 1 auto">
        <ToggleButton height="fit-content" width="fit-content" onClick={() => {toggleMap()}}>View Map</ToggleButton>
      </Flex>
        
      {mapState ? 
        <Flex
        flex="1 1 0%"
        minHeight="0"
        width="100%"
        gap="0">
          <Flex
          flex="1 1 0%"
          gap="0"
          minHeight="0"
          minWidth="50px"
          maxWidth="30%"
          >
          <ReportCollection data={data}/>

          </Flex>

          <Flex 
            flex="1 1 0%"
            minWidth="0"
            maxWidth="70%"
            fontFamily="sans-serif"
            >
            <MapView
            children={MarkerData(data)}/>
          </Flex>
        </Flex>
        
           :
        <Flex minHeight="0" flex="1 1 0%"><ReportCollection data={data}/></Flex>
      }
    
    </Flex>
>>>>>>> temp
  );
}

/*

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