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







export default function ReportCollection(props) {

  const itemsPagination = { sort: (s) => s.createdAt(SortDirection.ASCENDING) };
  const [items, setItems] = React.useState(undefined);
  const [urls, setUrls] = React.useState({});
  const [users, setUsers] = React.useState({});
  const [imageFailed, setImageFailed] = React.useState();
  const [itemsDisplayed, setItemsDisplayed] = React.useState(10);
  
  let imgRequests = {};
  let userRequests = {};

  const itemsDataStore = useDataStoreBinding({
    type: "collection",
    model: Report,
    pagination: itemsPagination,
  }).items;


  const handleImageError = (index) => {
    const newImageFailed = [...imageFailed];
    newImageFailed[index] = true;
    setImageFailed(newImageFailed);
  };

  React.useEffect(() => {
    
    setItems(itemsDataStore);
    setImageFailed(Array(itemsDataStore.length).fill(false));
    
    for (const item of itemsDataStore.values()){

      // If url has not been requested yet:
      if(!Object.keys(imgRequests).includes(item.id)){
        imgRequests[item.id] = Storage.get(item.image);
        userRequests[item.id] = DataStore.query(User, item.authorID);
      }

    }

    // Wait until all imgPromises are resolved.
    Promise.allSettled(Object.values(imgRequests)).then((results) => {
      let newUrls = Object.assign({},urls); // Must be a deep copy to trigger re-render

      // Enumerate ids (to match with promise using index)
      for(let [index, id] of Object.keys(imgRequests).entries()){
        newUrls[id] = results[index].value;
      }
      
      setUrls(newUrls);
    });

    // Wait until all userRequests are resolved.
    Promise.allSettled(Object.values(userRequests)).then((results) => {
      let newUsers = Object.assign({},users); // Must be a deep copy to trigger re-render

      // Enumerate ids (to match with promise using index)
      for(let [index, id] of Object.keys(userRequests).entries()){
        newUsers[id] = results[index].value.userName;
      }
      
      setUsers(newUsers);
    });

  }, [itemsDataStore]);

  function getDate(item){
    const d = new Date(item.createdAt);
    return (d.toLocaleDateString() + " " + d.toLocaleTimeString("en",{timeStyle: "short"}));
  }

  function getUser(id){
    if(users[id] == undefined){
      return "Unknown";
    } else return users[id];
  }

  function getLocation(item){
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
                  minSize="0">
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
                    minSize="0">
                        Reported by {getUser(item.id)} <br/>
                        {getLocation(item)}<br/>
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