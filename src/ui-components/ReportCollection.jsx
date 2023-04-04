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
  const [filterFunction, setFilterFunction] = React.useState(Predicates.ALL);
  const [displayCount, setDisplayCount] = React.useState(initialCount);


  React.useEffect(() => {
    DataStore.query(Report,
      filterFunction, {
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

  return {reports, setFilterFunction, setSortFunction, setDisplayCount};
}





export function ReportCollection({reports, onLoadMore}) {

  const [selectedFilter, setSelectedFilter] = React.useState("Range");

  const [maxMiles, setMaxMiles] = React.useState(10);
  const [sliderMax, setSliderMax] = React.useState(maxMiles * 2);
  let canChangeSlider = false;


  const [filters, setFilters] = React.useState([]);
  
  function addFilter(){

  }

  function removeFilter(){

  }

  let cards = reports.map((item) => {
    return <ReportCard key={item.id} report={item}/>
  });

  const rangeFilter = 
    <Flex
    
    justifyContent="center">
      <SliderField
      onClick={() => {if(sliderMax == maxMiles) setSliderMax(sliderMax * 2)}}
      onChange={(value) => setMaxMiles(value)}
      max={sliderMax}
      ></SliderField>
    </Flex>;

  const keywordFilter = <SearchField maxWidth="400px"/>;
  
    return( 
    <Flex
    flex="1"
    minHeight="0"
    direction="column"
    alignItems="center">
      <Flex
      direction="row">
        <SelectField
          width="40px"
          size="small"
          onChange={(e) => setSelectedFilter(e.target.value)}
          value={selectedFilter}
        >
          <option value="Keyword">Keyword</option>
          <option value="Range">Range</option>
          <option value="Date">Date</option>
          <option value="Pest">Pest</option>
        </SelectField>
        <Button variation="tiny">Add Filter</Button>
      </Flex>
        {selectedFilter === "Range" ? rangeFilter : keywordFilter}
      
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
          {cards}
          </Flex> 
          :
           <Text>Loading</Text>
        } 
      </ScrollView>
      <Button onClick={() => {onLoadMore()}}>Load More</Button>
    </Flex>
    );
}