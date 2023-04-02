/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import { Storage, DataStore} from 'aws-amplify';
import * as React from "react";

import { Collection, Card, Image, Flex, Badge, View, Divider, Text, Heading, Button, ToggleButton, ScrollView, SearchField} from "@aws-amplify/ui-react";

import { createMap } from "maplibre-gl-js-amplify";
import "maplibre-gl/dist/maplibre-gl.css";

import { Textfit } from 'react-textfit';
import ReportCollection from './ReportCollection';







export default function ReportViewCollectionCustom(props) {

  
  const [mapState, setMapState] = React.useState(false);

  
  let map;


  React.useEffect(() => {

    return () => {
      console.log("Removing map");
      if(map != undefined) map.remove();
      };
  }, []);

  React.useEffect(() => {
    if(mapState && map == undefined){
      createMap({
        container: "map", // An HTML Element or HTML element ID to render the map in https://maplibre.org/maplibre-gl-js-docs/api/map/
        center: [-123.1187, 49.2819], // [Longitude, Latitude]
        zoom: 11,
      }).then((r) => {map = r});
    }
  }, [mapState]);


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
          <ReportCollection/>

          </Flex>

          <Flex 
            id="map"
            flex="1 1 0%"
            minWidth="0"
            maxWidth="70%"
            >
            Map
          </Flex>
        </Flex>
        
           :
        <Flex minHeight="0" flex="1 1 0%"><ReportCollection/></Flex>
      }
    
    </Flex>
  );
}

/*
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