import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Represents a date time object */
  DateTime: any;
};

export type Attributes = {
  __typename?: 'Attributes';
  description: Maybe<Scalars['String']>;
  hardiness: Maybe<Scalars['String']>;
  shape: Maybe<Scalars['String']>;
  taste: Maybe<Scalars['String']>;
};

export type AvoCreateInput = {
  description: InputMaybe<Scalars['String']>;
  hardiness: InputMaybe<Scalars['String']>;
  image: Scalars['String'];
  name: Scalars['String'];
  price: Scalars['Float'];
  shape: InputMaybe<Scalars['String']>;
  sku: Scalars['String'];
  taste: InputMaybe<Scalars['String']>;
};

export type AvoWhereInput = {
  name: InputMaybe<StringFilterInput>;
  price: InputMaybe<Scalars['Float']>;
};

export type Avocado = BaseModel & {
  __typename?: 'Avocado';
  attributes: Attributes;
  createdAt: Scalars['DateTime'];
  deletedAt: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  image: Scalars['String'];
  name: Scalars['String'];
  price: Scalars['Float'];
  sku: Scalars['String'];
  updatedAt: Maybe<Scalars['DateTime']>;
};

export type BaseModel = {
  createdAt: Scalars['DateTime'];
  deletedAt: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  updatedAt: Maybe<Scalars['DateTime']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createAvo: Avocado;
};


export type MutationCreateAvoArgs = {
  data: AvoCreateInput;
};

export type Query = {
  __typename?: 'Query';
  avo: Maybe<Avocado>;
  avos: Array<Maybe<Avocado>>;
};


export type QueryAvoArgs = {
  id: Scalars['ID'];
};


export type QueryAvosArgs = {
  skip: InputMaybe<Scalars['Int']>;
  take: InputMaybe<Scalars['Int']>;
  where: InputMaybe<AvoWhereInput>;
};

export type StringFilterInput = {
  contains: InputMaybe<Scalars['String']>;
  endsWith: InputMaybe<Scalars['String']>;
  equals: InputMaybe<Scalars['String']>;
  gt: InputMaybe<Scalars['String']>;
  gte: InputMaybe<Scalars['String']>;
  in: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  lt: InputMaybe<Scalars['String']>;
  lte: InputMaybe<Scalars['String']>;
  not: InputMaybe<Scalars['String']>;
  notIn: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  startsWith: InputMaybe<Scalars['String']>;
};

export type AvocadoFragment = { __typename?: 'Avocado', id: string, image: string, name: string, createdAt: any, sku: string, price: number, attributes: { __typename?: 'Attributes', description: string | null, taste: string | null, shape: string | null, hardiness: string | null } };

export type GetAllAvocadosQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllAvocadosQuery = { __typename?: 'Query', avos: Array<{ __typename?: 'Avocado', id: string, image: string, name: string, createdAt: any, sku: string, price: number, attributes: { __typename?: 'Attributes', description: string | null, taste: string | null, shape: string | null, hardiness: string | null } } | null> };

export type GetAvocadoQueryVariables = Exact<{
  avoId: Scalars['ID'];
}>;


export type GetAvocadoQuery = { __typename?: 'Query', avo: { __typename?: 'Avocado', id: string, image: string, name: string, createdAt: any, sku: string, price: number, attributes: { __typename?: 'Attributes', description: string | null, taste: string | null, shape: string | null, hardiness: string | null } } | null };

export type AddAvocadoMutationVariables = Exact<{
  data: AvoCreateInput;
}>;


export type AddAvocadoMutation = { __typename?: 'Mutation', createAvo: { __typename?: 'Avocado', id: string, image: string, name: string, createdAt: any, sku: string, price: number, attributes: { __typename?: 'Attributes', description: string | null, taste: string | null, shape: string | null, hardiness: string | null } } };

export const AvocadoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Avocado"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Avocado"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"sku"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"taste"}},{"kind":"Field","name":{"kind":"Name","value":"shape"}},{"kind":"Field","name":{"kind":"Name","value":"hardiness"}}]}}]}}]} as unknown as DocumentNode<AvocadoFragment, unknown>;
export const GetAllAvocadosDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllAvocados"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Avocado"}}]}}]}},...AvocadoFragmentDoc.definitions]} as unknown as DocumentNode<GetAllAvocadosQuery, GetAllAvocadosQueryVariables>;
export const GetAvocadoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAvocado"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"avoId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avo"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"avoId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Avocado"}}]}}]}},...AvocadoFragmentDoc.definitions]} as unknown as DocumentNode<GetAvocadoQuery, GetAvocadoQueryVariables>;
export const AddAvocadoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddAvocado"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AvoCreateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createAvo"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Avocado"}}]}}]}},...AvocadoFragmentDoc.definitions]} as unknown as DocumentNode<AddAvocadoMutation, AddAvocadoMutationVariables>;