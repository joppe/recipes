import { CodegenConfig } from '@graphql-codegen/cli';

/**
 * Use an extra secret in the header to allow scanning for schema
 *
 * https://github.com/nhost/nhost/blob/main/examples/codegen-react-apollo/codegen.ts
 */

const config: CodegenConfig = {
  schema: 'http://localhost:4000/graphql',
  documents: ['./frontend/**/*.ts'],
  generates: {
    './frontend/gql/': {
      preset: 'client',
      presetConfig: {
        gqlTagName: 'gql',
      },
    },
  },
  hooks: { afterAllFileWrite: ['prettier --write'] },
};

export default config;
