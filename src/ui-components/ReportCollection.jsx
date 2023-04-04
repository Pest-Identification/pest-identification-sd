/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import { Storage, DataStore} from 'aws-amplify';
import * as React from "react";
import { Collection, Flex, Text, Button, ScrollView, SearchField} from "@aws-amplify/ui-react";

import { Report, User } from "../models";
import { Predicates, SortDirection } from "@aws-amplify/datastore";

import { ReportCard } from './ReportCard';

export function loadReports(initialCount=20){

  const [reports, setReports] = React.useState([]);
  const [sortFunction, setSortFunction] = React.useState(() => (s) => {s.createdAt(SortDirection.DESCENDING)});
  const [displayCount, setDisplayCount] = React.useState(initialCount);


  React.useEffect(() => {
    DataStore.query(Report, Predicates.ALL, {
      sort: sortFunction,
      page: 0,
      limit: displayCount
    }).then((datastoreReports) => {

      let promises = [];
      let newReports = [];

      for (const [index, item] of datastoreReports.entries()){
        newReports.push({...item, url: "", user: ""});
        promises.push(Storage.get(item.image).then(r => {return {value: r, index: index, field: "url"}}), 
                      DataStore.query(User, item.authorID).then(r => {return {value: r.userName, index: index, field: "user"}}));
      }

      Promise.allSettled(promises).then((results) => {
        for(let r of results){
          newReports[r.value.index][r.value.field] = r.value.value;
        }
      }).then(() => {
        setReports(newReports);
      });

    });
  }, [sortFunction, displayCount]);

  return {reports, setSortFunction, setDisplayCount};
}





export function ReportCollection({reports, onLoadMore}) {

  
    return( 
    <Flex
    flex="1"
    minHeight="0"
    direction="column"
    alignItems="center">
      <SearchField maxWidth="400px"/>
      <ScrollView>
        { reports != undefined ?
          <Collection
            items={reports}
            type="list"
            direction="row"
            gap="10%"
            wrap="wrap"
            justifyContent="center"
            alignItems="flex-start"
            backgroundColor="blue.10"
            padding="2%"
          >
          {(item, index) => (
            <ReportCard key={item.id} report={item}/>
          )}
          </Collection> 
          :
           <Text>Loading</Text>
        } 
      </ScrollView>
      <Button onClick={() => {onLoadMore()}}>Load More</Button>
    </Flex>
    );
}