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

function coordinateBoundingBox(latitude, radius, unit="mi") {

  let circumference;
  if(unit == "mi"){
    circumference = 24901;
  } else if(unit == "km"){
    circumference = 40075;
  }
  
  const dY = 360 * radius / circumference;
  const dX = dY * Math.cos((Math.PI / 180) * latitude);

  return {longDiff: dX, latDiff: dY}; 
}


export function loadReports(initialCount=20){

  const [reports, setReports] = React.useState([]);
  const [sortFunction, setSortFunction] = React.useState(() => (s) => {s.createdAt(SortDirection.DESCENDING)});
  const [filterFunction, setFilterFunction] = React.useState((Predicates.ALL));
  const [displayCount, setDisplayCount] = React.useState(initialCount);

  

  React.useEffect(() => {
    
    let newReports = [];

    


      DataStore.query(Report,
        filterFunction, {
        sort: sortFunction,
        page: 0,
        limit: displayCount}
      ).then((datastoreReports) => {

        let promises = [];

        for (const [index, item] of datastoreReports.entries()){
          newReports.push({...item, url: "", user: ""});
          promises.push(Storage.get(item.image).then(r => {return {value: r, index: index, field: "url"}}), 
                        DataStore.query(User, item.authorID).then(r => {return {value: r.userName, index: index, field: "user"}}));
        }

        return Promise.allSettled(promises).then((results) => {
          for(let r of results){
            newReports[r.value.index][r.value.field] = r.value.value;
          }
        })

      }).then(() => {
        setReports(newReports);
      });

  }, [sortFunction, displayCount]);

  return {reports, setFilterFunction, setSortFunction, setDisplayCount};
}






export function ReportCollection({context, onLoadMore}) {

  const {reports, setFilterFunction, setDisplayCount} = context;

  const [selectedFilter, setSelectedFilter] = React.useState("Range");

  const [maxMiles, setMaxMiles] = React.useState(10);
  const [sliderMax, setSliderMax] = React.useState(maxMiles * 2);
  let canChangeSlider = false;


  const [filters, setFilters] = React.useState([]);
  
  function addFilter(){

  }

  function removeFilter(){

  }
  React.useEffect(() => {
    let predicates = [];
    for(let f of filters){
      if(f.attr == "Range"){
          let curLoc;
          navigator.geolocation.getCurrentPosition(
            (loc) => {console.log("got positions"); curLoc = loc}, // Success
            () => {console.log("Failed to get position")} // Failure
          )
        
          const {longDiff, latDiff} = coordinateBoundingBox(curLoc.coords.latitude, f.value, "mi");
          console.log(longDiff,latDiff);
          predicates.push(
            c.location.coordinates.longitude.between(curLoc.coords.longitude - longDiff, curLoc.coords.longitude - longDiff),
            c.location.coordinates.latitude.between(curLoc.coords.latitude - latDiff, curLoc.coords.latitude - latDiff),
          );
      }
    }
    //setFilterFunction((c) => c.and(predicates));
  }, filters)



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
          {reports.map((item) => {return <ReportCard key={item.id} report={item}/>})}
          </Flex> 
          :
           <Text>Loading</Text>
        } 
      </ScrollView>
      <Button onClick={() => {onLoadMore()}}>Load More</Button>
    </Flex>
    );
}