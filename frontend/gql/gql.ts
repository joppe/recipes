/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  '\n  query me {\n    me {\n      id\n      name\n      email\n    }\n  }\n':
    types.MeDocument,
  '\n  mutation createUnit($input: CreateUnitInput!) {\n    createUnit(input: $input) {\n      unit {\n        name\n        abbreviation\n      }\n      errors {\n        message\n      }\n    }\n  }\n':
    types.CreateUnitDocument,
  '\n  mutation deleteUnit($id: ID!) {\n    deleteUnit(id: $id) {\n      unit {\n        name\n        abbreviation\n      }\n      errors {\n        message\n      }\n    }\n  }\n':
    types.DeleteUnitDocument,
  '\n  query units {\n    units {\n      id\n      name\n      abbreviation\n    }\n  }\n':
    types.UnitsDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query me {\n    me {\n      id\n      name\n      email\n    }\n  }\n',
): (typeof documents)['\n  query me {\n    me {\n      id\n      name\n      email\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation createUnit($input: CreateUnitInput!) {\n    createUnit(input: $input) {\n      unit {\n        name\n        abbreviation\n      }\n      errors {\n        message\n      }\n    }\n  }\n',
): (typeof documents)['\n  mutation createUnit($input: CreateUnitInput!) {\n    createUnit(input: $input) {\n      unit {\n        name\n        abbreviation\n      }\n      errors {\n        message\n      }\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation deleteUnit($id: ID!) {\n    deleteUnit(id: $id) {\n      unit {\n        name\n        abbreviation\n      }\n      errors {\n        message\n      }\n    }\n  }\n',
): (typeof documents)['\n  mutation deleteUnit($id: ID!) {\n    deleteUnit(id: $id) {\n      unit {\n        name\n        abbreviation\n      }\n      errors {\n        message\n      }\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query units {\n    units {\n      id\n      name\n      abbreviation\n    }\n  }\n',
): (typeof documents)['\n  query units {\n    units {\n      id\n      name\n      abbreviation\n    }\n  }\n'];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
