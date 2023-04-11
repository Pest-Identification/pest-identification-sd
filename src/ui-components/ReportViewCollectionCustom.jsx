/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import { Storage, DataStore} from 'aws-amplify';
import * as React from "react";

import { Collection, Card, Image, Flex, Badge, View, Divider, Text, Heading, Button, ToggleButton, ScrollView, SearchField, MapView} from "@aws-amplify/ui-react";

import { Textfit } from 'react-textfit';
import {ReportCollection, loadReports } from './ReportCollection';


import { Marker, Popup } from 'react-map-gl';
import { ReportCard } from './ReportCard';



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
  return data.map((item) => {
            return <MarkerWithPopup 
              longitude={item.location.coordinates.longitude}
              latitude={item.location.coordinates.latitude}
              content={<ReportCard report={item}></ReportCard>}/>
  });
}


export default function ReportViewCollectionCustom(props) {


  const reportContext = loadReports(5);
  const [mapState, setMapState] = React.useState(false);

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
    reportContext.setDisplayCount(count);
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
          <ReportCollection context={reportContext} onLoadMore={incDisplayCount}/>

          </Flex>

          <Flex 
            flex="1 1 0%"
            minWidth="0"
            maxWidth="70%"
            fontFamily="sans-serif"
            >
            <MapView
            children={MarkerData(reportContext.reports)}/>
          </Flex>
        </Flex>
        
           :
        <Flex minHeight="0" flex="1 1 0%">
          <ReportCollection context={reportContext} onLoadMore={incDisplayCount}/>
        </Flex>
      }
    
    </Flex>
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