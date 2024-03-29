import { gql } from '../../../gql';

export const createUploadUrlMutation = gql(/* GraphQL */ `
  mutation createUploadUrl($filename: String!, $contentType: String!) {
    createUploadUrl(filename: $filename, contentType: $contentType) {
      url
      filename
    }
  }
`);
