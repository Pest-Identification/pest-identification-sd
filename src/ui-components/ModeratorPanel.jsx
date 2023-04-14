/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import { Storage, DataStore} from 'aws-amplify';
import * as React from "react";

import { Collection, Card, Image, Flex, Badge, View, Divider, Text, SearchField, SelectField, SliderField, Heading, Button, ToggleButton, ScrollView, MapView, LocationSearch, Grid} from "@aws-amplify/ui-react";

import { Textfit } from 'react-textfit';
import {ReportCollection, loadReports } from './ReportCollection';


import { Marker, Popup } from 'react-map-gl';
import { ReportCard } from './ReportCard';
import { Pests } from '../models';
import { attribute } from '@aws-amplify/datastore';






export default function ModeratorPanel(props) {

 

  return (
    <Flex
    direction="column"
    alignItems="stretch"
    minWidth="100%"
    minHeight="100%"
    maxWidth="100%"
    maxHeight="100%"
    overflow="hidden">

    <Flex
    direction="row">
        <Button>Reports</Button>
        <Button>Discussion</Button>
        <Button>Reports</Button>
    </Flex>

    </Flex>
  );
}
