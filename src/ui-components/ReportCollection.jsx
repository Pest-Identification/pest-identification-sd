/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import { Storage, DataStore} from 'aws-amplify';
import * as React from "react";
import { Collection, Flex, Text, Button, ScrollView, SearchField, SelectField, SliderField} from "@aws-amplify/ui-react";

import { Report, User } from "../models";
import { Predicates, SortDirection } from "@aws-amplify/datastore";

import { ReportCard } from './ReportCard';


export function loadReports(initialCount=20){

  const [reports, setReports] = React.useState([]);
  const [sortFunction, setSortFunction] = React.useState(() => (s) => {s.createdAt(SortDirection.DESCENDING)});
  const [filterFunction, setFilterFunction] = React.useState(() => (item) => {return(true)});
  const [displayCount, setDisplayCount] = React.useState(initialCount);


  React.useEffect(() => {
    
    let newReports = [];

      DataStore.query(Report,
        Predicates.ALL, {
        sort: sortFunction}
      ).then((datastoreReports) => {

        let promises = [];
        let count = 0;

        for (const item of datastoreReports.values()){
          if(filterFunction(item)){
            const index = count;
            newReports.push({...item, url: "", user: ""});
            promises.push(Storage.get(item.image).then(r => {return {value: r, index: index, field: "url"}}), 
                          DataStore.query(User, item.authorID).then(r => {return {value: r.userName, index: index, field: "user"}}));
            count++;
          }

        }
        return Promise.allSettled(promises).then((results) => {
          for(let r of results){
            newReports[r.value.index][r.value.field] = r.value.value;
          }
        })

      }).then(() => {
        setReports(newReports);
      });

  }, [filterFunction, sortFunction, displayCount]);

  return {reports, setFilterFunction, setSortFunction, setDisplayCount};
}






export function ReportCollection({reports}) { 
  
    return( 
      <ScrollView
      flex="1">
        { reports != undefined ?
          <Flex
            direction="row"
            gap="10px"
            wrap="wrap"
            justifyContent="center"
            alignItems="flex-start"
            backgroundColor="blue.10"
            padding="2%"
          >
          {reports.map((item) => {return <ReportCard key={item.id} report={item}/>})}
          </Flex> 
          :
          <Text>Loading</Text>
        } 
      </ScrollView>
    );
}