/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import { Storage, DataStore} from 'aws-amplify';
import * as React from "react";
import { Collection, Card, Image, Flex, Badge, View, Divider, Text, Heading, Button, ToggleButton, ScrollView, SearchField} from "@aws-amplify/ui-react";

import { Pests, Report, User } from "../models";
import { SortDirection } from "@aws-amplify/datastore";
import { useDataStoreBinding } from "@aws-amplify/ui-react/internal";

import { Textfit } from 'react-textfit';

export function loadReports(){

  const itemsPagination = { sort: (s) => s.createdAt(SortDirection.ASCENDING) };
  const [items, setItems] = React.useState(undefined);
  const [urls, setUrls] = React.useState({});
  const [users, setUsers] = React.useState({});
  const [imageFailed, setImageFailed] = React.useState();
  const [itemsDisplayed, setItemsDisplayed] = React.useState(10);
  
  let imgRequests = {};
  let userRequests = {};


  const datastoreResult = useDataStoreBinding({
    type: "collection",
    model: Report,
    pagination: itemsPagination,
  });


  const handleImageError = (index) => {
    const newImageFailed = [...imageFailed];
    newImageFailed[index] = true;
    setImageFailed(newImageFailed);
  };

  React.useEffect(() => {
    console.log("This is", datastoreResult)

    if(datastoreResult.isLoading == false){

      let reports = [];
      
      console.log("Creating reports...")

      for (const item of datastoreResult.items.values()){


        let newReport = {
          url: "",
          user: "",
          imageFailed: false
        };

        Storage.get(item.image).then(r => newReport.url = r.value);
        DataStore.query(User, item.authorID).then(r => newReport.user = r.value.userName);
        
        reports.push(newReport);
      }

      console.log("Reports:", reports);

    }
  }, [datastoreResult]);

  function getDate(item){
    const d = new Date(item.createdAt);
    return (d.toLocaleDateString() + " " + d.toLocaleTimeString("en",{timeStyle: "short"}));
  }

  function getUser(item){
    if(users[item.id] == undefined){
      return "Unknown";
    } else return users[item.id];
  }

  function getAddress(item){
    let spacing = ", "
    if(item.location.address.municipality == ""){
      if (item.location.address.region == "") 
      {
        spacing = '\u2028';
      }
      else spacing = "";
    }
    return item.location.address.municipality + spacing + item.location.address.region;
  }

  function getUrl(item){
    return urls[item.id];
  }


  return {
    items,
    urls, 
    users,
    imageFailed,
    itemsDisplayed,
    handleImageError,
    getUser,
    getDate,
    getAddress,
    getUrl,
    setItemsDisplayed
  };

}




export function ReportCollection(props) {

  const {
    items,
    urls, 
    users,
    imageFailed,
    itemsDisplayed,
    handleImageError,
    getUser,
    getDate,
    getAddress,
    getUrl,
    setItemsDisplayed} = props.data;

  

    return( 
    <Flex
    flex="1"
    minHeight="0"
    direction="column"
    alignItems="center">
      <SearchField maxWidth="400px"/>
      <ScrollView>
        { items != undefined ?
          <Collection
            items={items.slice(0,itemsDisplayed)}
            type="list"
            direction="row"
            gap="10%"
            wrap="wrap"
            justifyContent="center"
            alignItems="flex-start"
            itemsPerPage="50"
            backgroundColor="blue.10"
            padding="2%"
          >
          {(item, index) => (
            <Card
            key={index}
            borderRadius="medium"
            variation="outlined"
            maxWidth="300px"
            maxHeight="150px"
            width="100%"
            style={{aspectRatio: "2 / 1"}}
            padding="1%"
            >
              <Flex
                direction="row"
                alignItems="stretch"
                gap="2%"
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
                  {
                    imageFailed[index] ? (
                      <View
                      width="100%"
                      />
                    ) : (
                      
                      <Image
                        src={getUrl(item)}
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
                  gap="5%"
                  width="75%"
                  height="100%"
                  padding="3%"
                >
                    
                <Badge
                  padding="1%"
                  height="fit-content"
                  width="fit-content"
                  alignItems="center"
                  alignSelf="flex-end"
                  backgroundColor={
                    item.pestActual === Pests.SPOTTED_LANTERN_FLY ? 'green.10' 
                    : item.pestActual === Pests.GRAPE_BERRY_MOTH ? 'blue.40'
                    : 'grey'}
                >
                  <Textfit
                  mode="single"
                  min={0}>
                  {item.pestActual === Pests.SPOTTED_LANTERN_FLY ? 'Spotted Lantern Fly' 
                    : item.pestActual === Pests.GRAPE_BERRY_MOTH ? 'Grape Berry Moth'
                    : 'Unknown'}
                  </Textfit>
                </Badge>
                    
                  <Divider/>
                  
                  <Flex
                  direction="column"
                  flex="1"
                  maxWidth="100%"
                  textAlign="left">
                    <Textfit
                    mode="single"
                    min={0}>
                        Reported by {getUser(item.id)} <br/>
                        {getAddress(item)}<br/>
                        {getDate(item)}<br/>
                    </Textfit>
                  </Flex>
                    
                  
                </Flex> 
              </Flex>
            </Card>
            
          )}
          </Collection> 
          :
           <Text>Loading</Text>
        } 
      </ScrollView>
      <Button onClick={() => {setItemsDisplayed(itemsDisplayed + 10)}}>Load More</Button>
    </Flex>
    );
}