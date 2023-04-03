import { Report } from "../models";
import { Storage, DataStore} from 'aws-amplify';

export declare type ReportData = Report &  {
    url: String;
    user: String;
    imageFailed: Boolean;
    //imgRequest: ReturnType<typeof Storage.get>;
    //usrRequest: ReturnType<typeof DataStore.query>;

}