import { GraphQLList, GraphQLObjectType } from 'graphql';

import { ErrorResultType } from '../error/ErrorResultType';
import { InstructionType } from './InstructionType';

export const InstructionResultType: GraphQLObjectType = new GraphQLObjectType({
  name: 'InstructionResult',
  description: 'The result of a instruction mutation',
  fields: () => ({
    instruction: {
      type: InstructionType,
      description: 'The instruction where the mutation was applied on.',
    },
    errors: {
      type: new GraphQLList(ErrorResultType),
      description: 'The error messages.',
    },
  }),
});
