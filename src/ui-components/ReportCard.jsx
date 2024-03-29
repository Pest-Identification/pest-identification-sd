import * as React from "react";
import { Card, Image, Flex, Badge, Divider, Text} from "@aws-amplify/ui-react";
import { Pests } from "../models";

function getDate(report){
    const d = new Date(report.createdAt);
    return (d.toLocaleDateString() + " " + d.toLocaleTimeString("en",{timeStyle: "short"}));
  }

  function getUser(report){
    if(report.user === undefined){
      return "Unknown";
    } else return report.user;
  }

  function getAddress(report){
    let spacing = ", "
    if(report.address_municipality === ""){
      if (report.address_region === "") 
      {
        spacing = '\u2028';
      }
      else spacing = "";
    }
    return report.address_municipality + spacing + report.address_region;
  }

  function getActualPest(report){
    return  report.pestActual === Pests.SPOTTED_LANTERN_FLY ? 'Spotted Lantern Fly'  :
            report.pestActual === Pests.GRAPE_BERRY_MOTH ? 'Grape Berry Moth' :
            'Unknown'
}

export function ReportCard({report}){



    return (
    <Card
    key={report.id}
    borderRadius="medium"
    variation="outlined"
    width="250px"
    height="fit-content"
    maxWidth="250px"
    maxHeight="150px"
    padding="5px"
    >
      <Flex
        direction="row"
        alignItems="stretch"
        gap="10px"
        height="100%"
        width="100%"
      >
        <Flex
        direction="row"
        height="100%"
        width="25%"
        alignItems="center"
        alignSelf="center"
        justifyContent="center"
        gap="1%"
        >
            <Image
              src={report.url}
              width="100%"
              maxHeight="100%"
            />
        </Flex>
          
          
        <Flex
          direction="column"
          justifyContent="flex-start"
          alignItems="stretch"
          gap="5px"
          width="75%"
          height="100%"
        >
            
        <Badge
          padding="4px"
          height="fit-content"
          width="fit-content"
          alignItems="center"
          alignSelf="flex-end"
          backgroundColor={
            report.pestActual === Pests.SPOTTED_LANTERN_FLY ? 'green.10' 
            : report.pestActual === Pests.GRAPE_BERRY_MOTH ? 'blue.40'
            : 'grey'}
        >
          {getActualPest(report)}
        </Badge>
            
          <Divider/>
          
          <Text
          fontSize="14px"
          maxWidth="100%"
          textAlign="left"
          overflow="hidden"
          whiteSpace="nowrap"
          style={{"textOverflow": "ellipsis"}}>
            By {getUser(report)}<br/>
            {getAddress(report)}<br/>
            {getDate(report)}<br/>
          </Text>
            
          
        </Flex> 
      </Flex>
    </Card>
    );
}


/*
<Card
    key={report.id}
    borderRadius="medium"
    variation="outlined"
    maxWidth="300px"
    maxHeight="150px"
    width="100%"
    style={{aspectRatio: "2 / 1"}}
    padding="1%"
    >
*/