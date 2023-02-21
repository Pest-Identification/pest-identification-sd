import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncItem } from "@aws-amplify/datastore";



type EagerReply = {
  readonly author: string;
  readonly body: string;
}

type LazyReply = {
  readonly author: string;
  readonly body: string;
}

export declare type Reply = LazyLoading extends LazyLoadingDisabled ? EagerReply : LazyReply

export declare const Reply: (new (init: ModelInit<Reply>) => Reply)

type EagerGPSLocation = {
  readonly longitude: number;
  readonly latitude: number;
}

type LazyGPSLocation = {
  readonly longitude: number;
  readonly latitude: number;
}

export declare type GPSLocation = LazyLoading extends LazyLoadingDisabled ? EagerGPSLocation : LazyGPSLocation

export declare const GPSLocation: (new (init: ModelInit<GPSLocation>) => GPSLocation)

type EagerReport = {
  readonly user: User;
  readonly time?: string | null;
  readonly location?: GPSLocation | null;
  readonly pestActual: string;
  readonly pestSubmitted?: string | null;
  readonly pestIdentified?: string | null;
  readonly image?: string | null;
}

type LazyReport = {
  readonly user: User;
  readonly time?: string | null;
  readonly location?: GPSLocation | null;
  readonly pestActual: string;
  readonly pestSubmitted?: string | null;
  readonly pestIdentified?: string | null;
  readonly image?: string | null;
}

export declare type Report = LazyLoading extends LazyLoadingDisabled ? EagerReport : LazyReport

export declare const Report: (new (init: ModelInit<Report>) => Report)

type EagerUser = {
  readonly name: string;
  readonly creationDate?: string | null;
}

type LazyUser = {
  readonly name: string;
  readonly creationDate?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User>) => User)

type EagerPost = {
  readonly author: User;
  readonly title: string;
  readonly body: string;
  readonly refReport?: Report | null;
  readonly replies?: (Reply | null)[] | null;
}

type LazyPost = {
  readonly author: User;
  readonly title: string;
  readonly body: string;
  readonly refReport?: Report | null;
  readonly replies?: (Reply | null)[] | null;
}

export declare type Post = LazyLoading extends LazyLoadingDisabled ? EagerPost : LazyPost

export declare const Post: (new (init: ModelInit<Post>) => Post)

type EagerDiscussionBoard = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<DiscussionBoard, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly posts?: Post | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyDiscussionBoard = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<DiscussionBoard, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly posts?: Post | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type DiscussionBoard = LazyLoading extends LazyLoadingDisabled ? EagerDiscussionBoard : LazyDiscussionBoard

export declare const DiscussionBoard: (new (init: ModelInit<DiscussionBoard>) => DiscussionBoard) & {
  copyOf(source: DiscussionBoard, mutator: (draft: MutableModel<DiscussionBoard>) => MutableModel<DiscussionBoard> | void): DiscussionBoard;
}

type EagerMap = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Map, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly location?: string | null;
  readonly time?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyMap = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Map, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly location?: string | null;
  readonly time?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Map = LazyLoading extends LazyLoadingDisabled ? EagerMap : LazyMap

export declare const Map: (new (init: ModelInit<Map>) => Map) & {
  copyOf(source: Map, mutator: (draft: MutableModel<Map>) => MutableModel<Map> | void): Map;
}

type EagerGBMReportData = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<GBMReportData, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly location?: string | null;
  readonly time?: string | null;
  readonly image?: string | null;
  readonly Map?: Map | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly gBMReportDataMapId?: string | null;
}

type LazyGBMReportData = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<GBMReportData, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly location?: string | null;
  readonly time?: string | null;
  readonly image?: string | null;
  readonly Map: AsyncItem<Map | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly gBMReportDataMapId?: string | null;
}

export declare type GBMReportData = LazyLoading extends LazyLoadingDisabled ? EagerGBMReportData : LazyGBMReportData

export declare const GBMReportData: (new (init: ModelInit<GBMReportData>) => GBMReportData) & {
  copyOf(source: GBMReportData, mutator: (draft: MutableModel<GBMReportData>) => MutableModel<GBMReportData> | void): GBMReportData;
}

type EagerSLFReportData = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<SLFReportData, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly location?: string | null;
  readonly time?: string | null;
  readonly image?: string | null;
  readonly Map?: Map | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly sLFReportDataMapId?: string | null;
}

type LazySLFReportData = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<SLFReportData, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly location?: string | null;
  readonly time?: string | null;
  readonly image?: string | null;
  readonly Map: AsyncItem<Map | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly sLFReportDataMapId?: string | null;
}

export declare type SLFReportData = LazyLoading extends LazyLoadingDisabled ? EagerSLFReportData : LazySLFReportData

export declare const SLFReportData: (new (init: ModelInit<SLFReportData>) => SLFReportData) & {
  copyOf(source: SLFReportData, mutator: (draft: MutableModel<SLFReportData>) => MutableModel<SLFReportData> | void): SLFReportData;
}