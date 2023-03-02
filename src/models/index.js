// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Report, Post, ReportPost, User, GPSLocation, Reply } = initSchema(schema);

export {
  Report,
  Post,
  ReportPost,
  User,
  GPSLocation,
  Reply
};