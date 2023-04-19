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
import { isModifier } from 'typescript';


export function loadReports(initialCount=20){

  const [reports, setReports] = React.useState([]);
  const [sortFunction, setSortFunction] = React.useState(() => (s) => {s.createdAt(SortDirection.DESCENDING)});
  const [filterFunction, setFilterFunction] = React.useState(() => (item) => {return(true)});
  const [displayCount, setDisplayCount] = React.useState(initialCount);
  const [update, setUpdate] = React.useState(true);


  function reloadReports(){
    setUpdate(!update);
  }

  React.useEffect(() => {
    
    let newReports = [];

      DataStore.query(Report,
        Predicates.ALL, {
        sort: sortFunction}
      ).then((datastoreReports) => {

        let promises = [];
        let count = 0;
        //console.log("datastorerepots",datastoreReports)
        for (const item of datastoreReports){

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

  }, [filterFunction, sortFunction, displayCount, update]);

  return {reports, setFilterFunction, setSortFunction, setDisplayCount, reloadReports};
}






export function ReportCollection({reports, onDelete, isModerator}) { 

  
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
            padding="2%"
          >
          {reports.map((item) => {return (
            <Flex
            key={item.id}
            position="relative"
            gap="2px"
            direction="column">
              <ReportCard key={item.id} report={item}/>
              {isModerator ? 
              <Button 
              position="absolute"
              top="5px"
              left="5px"
              width="fit-content" 
              onClick={() => onDelete(item)} 
              color="white"
              fontSize="10px"
              padding="3px"
              backgroundColor="red.60">
                DELETE
              </Button> : null}
            </Flex>
          )})}
          </Flex> 
          :
          <Text>Loading</Text>
        } 
      </ScrollView>
    );
}