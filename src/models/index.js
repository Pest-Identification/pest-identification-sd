// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { DiscussionBoard, Map, GBMReportData, SLFReportData, Reply, GPSLocation, Report, User, Post } = initSchema(schema);

export {
  DiscussionBoard,
  Map,
  GBMReportData,
  SLFReportData,
  Reply,
  GPSLocation,
  Report,
  User,
  Post
};