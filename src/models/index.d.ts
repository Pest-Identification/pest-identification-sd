import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection, AsyncItem } from "@aws-amplify/datastore";



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

type EagerReport = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Report, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly user: User;
  readonly time?: string | null;
  readonly location?: GPSLocation | null;
  readonly pestActual: string;
  readonly pestSubmitted?: string | null;
  readonly pestIdentified?: string | null;
  readonly image?: string | null;
  readonly posts?: (ReportPost | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyReport = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Report, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly user: User;
  readonly time?: string | null;
  readonly location?: GPSLocation | null;
  readonly pestActual: string;
  readonly pestSubmitted?: string | null;
  readonly pestIdentified?: string | null;
  readonly image?: string | null;
  readonly posts: AsyncCollection<ReportPost>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Report = LazyLoading extends LazyLoadingDisabled ? EagerReport : LazyReport

export declare const Report: (new (init: ModelInit<Report>) => Report) & {
  copyOf(source: Report, mutator: (draft: MutableModel<Report>) => MutableModel<Report> | void): Report;
}

type EagerPost = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Post, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly author: User;
  readonly title: string;
  readonly body: string;
  readonly refReport?: (string | null)[] | null;
  readonly replies?: (Reply | null)[] | null;
  readonly reports?: (ReportPost | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyPost = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Post, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly author: User;
  readonly title: string;
  readonly body: string;
  readonly refReport?: (string | null)[] | null;
  readonly replies?: (Reply | null)[] | null;
  readonly reports: AsyncCollection<ReportPost>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Post = LazyLoading extends LazyLoadingDisabled ? EagerPost : LazyPost

export declare const Post: (new (init: ModelInit<Post>) => Post) & {
  copyOf(source: Post, mutator: (draft: MutableModel<Post>) => MutableModel<Post> | void): Post;
}

type EagerReportPost = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ReportPost, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly reportId?: string | null;
  readonly postId?: string | null;
  readonly report: Report;
  readonly post: Post;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyReportPost = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ReportPost, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly reportId?: string | null;
  readonly postId?: string | null;
  readonly report: AsyncItem<Report>;
  readonly post: AsyncItem<Post>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type ReportPost = LazyLoading extends LazyLoadingDisabled ? EagerReportPost : LazyReportPost

export declare const ReportPost: (new (init: ModelInit<ReportPost>) => ReportPost) & {
  copyOf(source: ReportPost, mutator: (draft: MutableModel<ReportPost>) => MutableModel<ReportPost> | void): ReportPost;
}