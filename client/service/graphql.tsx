import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
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
  description?: Maybe<Scalars['String']>;
  hardiness?: Maybe<Scalars['String']>;
  shape?: Maybe<Scalars['String']>;
  taste?: Maybe<Scalars['String']>;
};

export type AvoCreateInput = {
  description?: InputMaybe<Scalars['String']>;
  hardiness?: InputMaybe<Scalars['String']>;
  image: Scalars['String'];
  name: Scalars['String'];
  price: Scalars['Float'];
  shape?: InputMaybe<Scalars['String']>;
  sku: Scalars['String'];
  taste?: InputMaybe<Scalars['String']>;
};

export type AvoWhereInput = {
  name?: InputMaybe<StringFilterInput>;
  price?: InputMaybe<Scalars['Float']>;
};

export type Avocado = BaseModel & {
  __typename?: 'Avocado';
  attributes: Attributes;
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  image: Scalars['String'];
  name: Scalars['String'];
  price: Scalars['Float'];
  sku: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type BaseModel = {
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  updatedAt?: Maybe<Scalars['DateTime']>;
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
  avo?: Maybe<Avocado>;
  avos: Array<Maybe<Avocado>>;
};


export type QueryAvoArgs = {
  id: Scalars['ID'];
};


export type QueryAvosArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<AvoWhereInput>;
};

export type StringFilterInput = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<Scalars['String']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type AvocadoFragment = { __typename?: 'Avocado', id: string, image: string, name: string, createdAt: any, sku: string, price: number, attributes: { __typename?: 'Attributes', description?: string | null | undefined, taste?: string | null | undefined, shape?: string | null | undefined, hardiness?: string | null | undefined } };

export type GetAllAvocadosQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllAvocadosQuery = { __typename?: 'Query', avos: Array<{ __typename?: 'Avocado', id: string, image: string, name: string, createdAt: any, sku: string, price: number, attributes: { __typename?: 'Attributes', description?: string | null | undefined, taste?: string | null | undefined, shape?: string | null | undefined, hardiness?: string | null | undefined } } | null | undefined> };

export type GetAvocadoQueryVariables = Exact<{
  avoId: Scalars['ID'];
}>;


export type GetAvocadoQuery = { __typename?: 'Query', avo?: { __typename?: 'Avocado', id: string, image: string, name: string, createdAt: any, sku: string, price: number, attributes: { __typename?: 'Attributes', description?: string | null | undefined, taste?: string | null | undefined, shape?: string | null | undefined, hardiness?: string | null | undefined } } | null | undefined };

export const AvocadoFragmentDoc = gql`
    fragment Avocado on Avocado {
  id
  image
  name
  createdAt
  sku
  price
  attributes {
    description
    taste
    shape
    hardiness
  }
}
    `;
export const GetAllAvocadosDocument = gql`
    query GetAllAvocados {
  avos {
    ...Avocado
  }
}
    ${AvocadoFragmentDoc}`;

/**
 * __useGetAllAvocadosQuery__
 *
 * To run a query within a React component, call `useGetAllAvocadosQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllAvocadosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllAvocadosQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllAvocadosQuery(baseOptions?: Apollo.QueryHookOptions<GetAllAvocadosQuery, GetAllAvocadosQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllAvocadosQuery, GetAllAvocadosQueryVariables>(GetAllAvocadosDocument, options);
      }
export function useGetAllAvocadosLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllAvocadosQuery, GetAllAvocadosQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllAvocadosQuery, GetAllAvocadosQueryVariables>(GetAllAvocadosDocument, options);
        }
export type GetAllAvocadosQueryHookResult = ReturnType<typeof useGetAllAvocadosQuery>;
export type GetAllAvocadosLazyQueryHookResult = ReturnType<typeof useGetAllAvocadosLazyQuery>;
export type GetAllAvocadosQueryResult = Apollo.QueryResult<GetAllAvocadosQuery, GetAllAvocadosQueryVariables>;
export const GetAvocadoDocument = gql`
    query GetAvocado($avoId: ID!) {
  avo(id: $avoId) {
    ...Avocado
  }
}
    ${AvocadoFragmentDoc}`;

/**
 * __useGetAvocadoQuery__
 *
 * To run a query within a React component, call `useGetAvocadoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAvocadoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAvocadoQuery({
 *   variables: {
 *      avoId: // value for 'avoId'
 *   },
 * });
 */
export function useGetAvocadoQuery(baseOptions: Apollo.QueryHookOptions<GetAvocadoQuery, GetAvocadoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAvocadoQuery, GetAvocadoQueryVariables>(GetAvocadoDocument, options);
      }
export function useGetAvocadoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAvocadoQuery, GetAvocadoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAvocadoQuery, GetAvocadoQueryVariables>(GetAvocadoDocument, options);
        }
export type GetAvocadoQueryHookResult = ReturnType<typeof useGetAvocadoQuery>;
export type GetAvocadoLazyQueryHookResult = ReturnType<typeof useGetAvocadoLazyQuery>;
export type GetAvocadoQueryResult = Apollo.QueryResult<GetAvocadoQuery, GetAvocadoQueryVariables>;