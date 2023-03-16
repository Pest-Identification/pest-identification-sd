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
    
    for (const [index, item] of itemsDataStore.entries()){
      if(!Object.keys(urls).includes(item.id)){
        Storage.get(item.image).then((result) => {
          const newUrls = Object.assign({}, urls); // Deep copy is necessary to trigger re-render
          newUrls[item.id] = result;
          setUrls(newUrls);
          console.log("Set url for id: " + item.id + " url: " + result);
        });
      }
    }
  }, [itemsProp, itemsDataStore]);

  function convertDate(AWSDateTime){
    const d = new Date(AWSDateTime);
    return (d.toLocaleDateString() + "\n" + d.toLocaleTimeString("en",{timeStyle: "short"}));
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
          date={convertDate(item.createdAt)}
          key={item.id}
          {...(overrideItems && overrideItems({ item, index }))}
        ></ReportView>
      )}
    </Collection>
  );
}