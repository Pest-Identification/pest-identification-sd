/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import { Storage, DataStore} from 'aws-amplify';
import * as React from "react";
import { Pests, Report, User } from "../models";
import { SortDirection } from "@aws-amplify/datastore";
import {
  getOverrideProps,
  useDataStoreBinding,
} from "@aws-amplify/ui-react/internal";
import ReportView from "./ReportView";
import { Collection, Card, Image, Flex, Badge, View, Divider, Text, Heading} from "@aws-amplify/ui-react";
export default function ReportViewCollectionCustom(props) {

  const itemsPagination = { sort: (s) => s.createdAt(SortDirection.ASCENDING) };
  const [items, setItems] = React.useState(undefined);
  const [urls, setUrls] = React.useState({});
  const [users, setUsers] = React.useState({});
  const [imageFailed, setImageFailed] = React.useState();
  
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
      spacing = "";
    }
    return item.location.address.municipality + spacing + item.location.address.region;
  }
  return (
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
  );
}

/*

<span>Reported by {getUser(item.id)}</span>
                <span>{getLocation(item)}</span>
                <span>{getDate(item)}</span>
<ReportView
          image={urls[item.id]}
          date={getDate(item)}
          species={item.pestActual}
          user={getUser(item.id)}
          location={getLocation(item)}
          key={item.id}
        ></ReportView>
        */