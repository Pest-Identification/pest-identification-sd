/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import { Storage } from 'aws-amplify';
import * as React from "react";
import { Report } from "../models";
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
  let loadingUrls
  
  let imageRequests = {"ids": [], "promises": []};

  const itemsDataStore = useDataStoreBinding({
    type: "collection",
    model: Report,
    pagination: itemsPagination,
  }).items;

  let i = 0;

  React.useEffect(() => {
    if (itemsProp !== undefined) {
      setItems(itemsProp);
    }
    else setItems(itemsDataStore);
    
    for (const [index, item] of itemsDataStore.entries()){

      // If url has not been requested yet:
      if(!Object.keys(imageRequests["ids"]).includes(item.id)){
        imageRequests["ids"][index] = item.id;
        imageRequests["promises"][index] = Storage.get(item.image);
      }

    }

    // Wait until all promises are resolved.
    Promise.all(imageRequests["promises"]).then((results) => {
      let newUrls = Object.assign({},urls); // Must be a deep copy to trigger re-render

      // Enumerate ids (to match with promise using index)
      for(let [index, id] of imageRequests["ids"].entries()){
        newUrls[id] = results[index];
      }

      setUrls(newUrls);
    });
  }, [itemsProp, itemsDataStore]);

  function getDate(item){
    const d = new Date(item.createdAt);
    return (d.toLocaleDateString() + " " + d.toLocaleTimeString("en",{timeStyle: "short"}));
  }

  function getUser(item){
    return "by " + item.authorID;
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
          user={getUser(item)}
          location={getLocation(item)}
          key={item.id}
          {...(overrideItems && overrideItems({ item, index }))}
        ></ReportView>
      )}
    </Collection>
  );
}