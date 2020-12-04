/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types */
import {
    GraphQLResolveInfo,
    GraphQLScalarType,
    GraphQLScalarTypeConfig,
} from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
    [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
    { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
    { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = {
    [X in Exclude<keyof T, K>]?: T[X];
} &
    { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    /** The `Upload` scalar type represents a file upload. */
    Upload: any;
};

export type Query = {
    __typename?: 'Query';
    images?: Maybe<Array<Maybe<Image>>>;
    ingredients?: Maybe<Array<Maybe<Ingredient>>>;
};

export type Image = {
    __typename?: 'Image';
    _id: Scalars['ID'];
    name: Scalars['String'];
    fileName: Scalars['String'];
    contentType: Scalars['String'];
};

export type Ingredient = {
    __typename?: 'Ingredient';
    _id: Scalars['ID'];
    name: Scalars['String'];
    image?: Maybe<Scalars['String']>;
    description?: Maybe<Scalars['String']>;
};

export type Mutation = {
    __typename?: 'Mutation';
    uploadUrl: SignedUrl;
};

export type MutationUploadUrlArgs = {
    fileName: Scalars['String'];
    contentType: Scalars['String'];
};

export type SignedUrl = {
    __typename?: 'SignedUrl';
    url: Scalars['String'];
    fileName: Scalars['String'];
    contentType: Scalars['String'];
};

export enum CacheControlScope {
    Public = 'PUBLIC',
    Private = 'PRIVATE',
}

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
    fragment: string;
    resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
    selectionSet: string;
    resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> =
    | LegacyStitchingResolver<TResult, TParent, TContext, TArgs>
    | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
    | ResolverFn<TResult, TParent, TContext, TArgs>
    | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo,
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo,
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
    TResult,
    TKey extends string,
    TParent,
    TContext,
    TArgs
> {
    subscribe: SubscriptionSubscribeFn<
        { [key in TKey]: TResult },
        TParent,
        TContext,
        TArgs
    >;
    resolve?: SubscriptionResolveFn<
        TResult,
        { [key in TKey]: TResult },
        TContext,
        TArgs
    >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
    subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
    resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
    TResult,
    TKey extends string,
    TParent,
    TContext,
    TArgs
> =
    | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
    | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
    TResult,
    TKey extends string,
    TParent = {},
    TContext = {},
    TArgs = {}
> =
    | ((
          ...args: any[]
      ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
    | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
    parent: TParent,
    context: TContext,
    info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
    obj: T,
    context: TContext,
    info: GraphQLResolveInfo,
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
    TResult = {},
    TParent = {},
    TContext = {},
    TArgs = {}
> = (
    next: NextResolverFn<TResult>,
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
    Query: ResolverTypeWrapper<{}>;
    Image: ResolverTypeWrapper<Image>;
    ID: ResolverTypeWrapper<Scalars['ID']>;
    String: ResolverTypeWrapper<Scalars['String']>;
    Ingredient: ResolverTypeWrapper<Ingredient>;
    Mutation: ResolverTypeWrapper<{}>;
    SignedUrl: ResolverTypeWrapper<SignedUrl>;
    CacheControlScope: CacheControlScope;
    Upload: ResolverTypeWrapper<Scalars['Upload']>;
    Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
    Query: {};
    Image: Image;
    ID: Scalars['ID'];
    String: Scalars['String'];
    Ingredient: Ingredient;
    Mutation: {};
    SignedUrl: SignedUrl;
    Upload: Scalars['Upload'];
    Boolean: Scalars['Boolean'];
};

export type QueryResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = {
    images?: Resolver<
        Maybe<Array<Maybe<ResolversTypes['Image']>>>,
        ParentType,
        ContextType
    >;
    ingredients?: Resolver<
        Maybe<Array<Maybe<ResolversTypes['Ingredient']>>>,
        ParentType,
        ContextType
    >;
};

export type ImageResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes['Image'] = ResolversParentTypes['Image']
> = {
    _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    fileName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    contentType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IngredientResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes['Ingredient'] = ResolversParentTypes['Ingredient']
> = {
    _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    description?: Resolver<
        Maybe<ResolversTypes['String']>,
        ParentType,
        ContextType
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = {
    uploadUrl?: Resolver<
        ResolversTypes['SignedUrl'],
        ParentType,
        ContextType,
        RequireFields<MutationUploadUrlArgs, 'fileName' | 'contentType'>
    >;
};

export type SignedUrlResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes['SignedUrl'] = ResolversParentTypes['SignedUrl']
> = {
    url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    fileName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    contentType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface UploadScalarConfig
    extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
    name: 'Upload';
}

export type Resolvers<ContextType = any> = {
    Query?: QueryResolvers<ContextType>;
    Image?: ImageResolvers<ContextType>;
    Ingredient?: IngredientResolvers<ContextType>;
    Mutation?: MutationResolvers<ContextType>;
    SignedUrl?: SignedUrlResolvers<ContextType>;
    Upload?: GraphQLScalarType;
};

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
