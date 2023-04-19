import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection, AsyncItem } from "@aws-amplify/datastore";

export enum Pests {
  UNKNOWN = "UNKNOWN",
  GRAPE_BERRY_MOTH = "GRAPE_BERRY_MOTH",
  SPOTTED_LANTERN_FLY = "SPOTTED_LANTERN_FLY"
}

type EagerLocation = {
  readonly address?: Address | null;
  readonly coordinates?: GPSLocation | null;
}

type LazyLocation = {
  readonly address?: Address | null;
  readonly coordinates?: GPSLocation | null;
}

export declare type Location = LazyLoading extends LazyLoadingDisabled ? EagerLocation : LazyLocation

export declare const Location: (new (init: ModelInit<Location>) => Location)

type EagerAddress = {
  readonly number?: string | null;
  readonly street?: string | null;
  readonly neighborhood?: string | null;
  readonly municipality?: string | null;
  readonly region?: string | null;
  readonly country?: string | null;
  readonly postalCode?: string | null;
}

type LazyAddress = {
  readonly number?: string | null;
  readonly street?: string | null;
  readonly neighborhood?: string | null;
  readonly municipality?: string | null;
  readonly region?: string | null;
  readonly country?: string | null;
  readonly postalCode?: string | null;
}

export declare type Address = LazyLoading extends LazyLoadingDisabled ? EagerAddress : LazyAddress

export declare const Address: (new (init: ModelInit<Address>) => Address)

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

type EagerUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userName: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userName: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}

type EagerReply = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Reply, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly authorID: string;
  readonly title: string;
  readonly body: string;
  readonly postID: string;
  readonly reports?: (ReplyReport | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyReply = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Reply, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly authorID: string;
  readonly title: string;
  readonly body: string;
  readonly postID: string;
  readonly reports: AsyncCollection<ReplyReport>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Reply = LazyLoading extends LazyLoadingDisabled ? EagerReply : LazyReply

export declare const Reply: (new (init: ModelInit<Reply>) => Reply) & {
  copyOf(source: Reply, mutator: (draft: MutableModel<Reply>) => MutableModel<Reply> | void): Reply;
}

type EagerReport = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Report, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly authorID: string;
  readonly pestActual: Pests | keyof typeof Pests;
  readonly pestSubmitted?: Pests | keyof typeof Pests | null;
  readonly pestIdentified?: Pests | keyof typeof Pests | null;
  readonly image?: string | null;
  readonly posts?: (PostReport | null)[] | null;
  readonly replys?: (ReplyReport | null)[] | null;
  readonly longitude?: number | null;
  readonly latitude?: number | null;
  readonly address_number?: string | null;
  readonly address_street?: string | null;
  readonly address_neighborhood?: string | null;
  readonly address_municipality?: string | null;
  readonly address_region?: string | null;
  readonly address_country?: string | null;
  readonly address_postalCode?: string | null;
  readonly location_accuracy?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyReport = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Report, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly authorID: string;
  readonly pestActual: Pests | keyof typeof Pests;
  readonly pestSubmitted?: Pests | keyof typeof Pests | null;
  readonly pestIdentified?: Pests | keyof typeof Pests | null;
  readonly image?: string | null;
  readonly posts: AsyncCollection<PostReport>;
  readonly replys: AsyncCollection<ReplyReport>;
  readonly longitude?: number | null;
  readonly latitude?: number | null;
  readonly address_number?: string | null;
  readonly address_street?: string | null;
  readonly address_neighborhood?: string | null;
  readonly address_municipality?: string | null;
  readonly address_region?: string | null;
  readonly address_country?: string | null;
  readonly address_postalCode?: string | null;
  readonly location_accuracy?: number | null;
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
  readonly authorID: string;
  readonly title: string;
  readonly body: string;
  readonly replies?: (Reply | null)[] | null;
  readonly reports?: (PostReport | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyPost = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Post, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly authorID: string;
  readonly title: string;
  readonly body: string;
  readonly replies: AsyncCollection<Reply>;
  readonly reports: AsyncCollection<PostReport>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Post = LazyLoading extends LazyLoadingDisabled ? EagerPost : LazyPost

export declare const Post: (new (init: ModelInit<Post>) => Post) & {
  copyOf(source: Post, mutator: (draft: MutableModel<Post>) => MutableModel<Post> | void): Post;
}

type EagerReplyReport = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ReplyReport, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly replyId?: string | null;
  readonly reportId?: string | null;
  readonly reply: Reply;
  readonly report: Report;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyReplyReport = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ReplyReport, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly replyId?: string | null;
  readonly reportId?: string | null;
  readonly reply: AsyncItem<Reply>;
  readonly report: AsyncItem<Report>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type ReplyReport = LazyLoading extends LazyLoadingDisabled ? EagerReplyReport : LazyReplyReport

export declare const ReplyReport: (new (init: ModelInit<ReplyReport>) => ReplyReport) & {
  copyOf(source: ReplyReport, mutator: (draft: MutableModel<ReplyReport>) => MutableModel<ReplyReport> | void): ReplyReport;
}

type EagerPostReport = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<PostReport, 'id'>;
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

type LazyPostReport = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<PostReport, 'id'>;
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

export declare type PostReport = LazyLoading extends LazyLoadingDisabled ? EagerPostReport : LazyPostReport

export declare const PostReport: (new (init: ModelInit<PostReport>) => PostReport) & {
  copyOf(source: PostReport, mutator: (draft: MutableModel<PostReport>) => MutableModel<PostReport> | void): PostReport;
}