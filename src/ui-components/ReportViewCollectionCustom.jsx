/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import { Storage, DataStore} from 'aws-amplify';
import * as React from "react";
import { Report, User } from "../models";
import { SortDirection } from "@aws-amplify/datastore";
import {
  getOverrideProps,
  useDataStoreBinding,
} from "@aws-amplify/ui-react/internal";
import ReportView from "./ReportView";
import { Collection } from "@aws-amplify/ui-react";
export default function ReportViewCollectionCustom(props) {
  const { items: itemsProp, overrideItems, overrides, ...rest } = props;
  const itemsPagination = { sort: (s) => s.createdAt(SortDirection.ASCENDING) };
  const [items, setItems] = React.useState(undefined);
  const [urls, setUrls] = React.useState({});
  const [users, setUsers] = React.useState({});
  
  let imgRequests = {};
  let userRequests = {};

  const itemsDataStore = useDataStoreBinding({
    type: "collection",
    model: Report,
    pagination: itemsPagination,
  }).items;


  React.useEffect(() => {
    if (itemsProp !== undefined) {
      setItems(itemsProp);
    }
    else setItems(itemsDataStore);
    
    for (const item of itemsDataStore.values()){

      // If url has not been requested yet:
      if(!Object.keys(requests.keys()).includes(item.id)){
        imgRequests[item.id] = Storage.get(item.image);
        userRequests[item.id] = DataStore.query(User, item.authorID);
      }

    }

    // Wait until all imgPromises are resolved.
    Promise.allSettled(imgRequests.values()).then((results) => {
      let newUrls = Object.assign({},urls); // Must be a deep copy to trigger re-render

      // Enumerate ids (to match with promise using index)
      for(let [index, id] of requests["ids"].entries()){
        newUrls[id] = results[index];
      }
      
      setUrls(newUrls);
    });

    // Wait until all userRequests are resolved.
    Promise.allSettled(userRequests.values()).then((results) => {
      let newUsers = Object.assign({},users); // Must be a deep copy to trigger re-render

      // Enumerate ids (to match with promise using index)
      for(let [index, id] of requests["ids"].entries()){
        newUsers[id] = results[index];
      }
      
      setUsers(newUsers);
    });

  }, [itemsProp, itemsDataStore]);

  function getDate(item){
    const d = new Date(item.createdAt);
    return (d.toLocaleDateString() + " " + d.toLocaleTimeString("en",{timeStyle: "short"}));
  }

  function getUser(id){
    return "by " + users[id];
  }

  function getLocation(item){
    return "Longitude: " + item.location.longitude + " Latitude: " + item.location.longitude;
  }
  return (
    <Collection
      type="list"
      isSearchable="true"
      isPaginated={true}
      searchPlaceholder="Search..."
      direction="column"
      justifyContent="stretch"
      items={items || []}
      {...getOverrideProps(overrides, "ReportViewCollection")}
      {...rest}
    >
      {(item, index) => (
        <ReportView
          image={urls[item.id]}
          date={getDate(item)}
          species={item.pestActual}
          user={getUser(item.id)}
          location={getLocation(item)}
          key={item.id}
          {...(overrideItems && overrideItems({ item, index }))}
        ></ReportView>
      )}
    </Collection>
  );
}