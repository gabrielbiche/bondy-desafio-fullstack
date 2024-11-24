import { ApolloServer } from '@apollo/server'
import { ApolloServerPluginInlineTraceDisabled } from '@apollo/server/plugin/disabled'
import {
  handlers,
  startServerAndCreateLambdaHandler,
} from '@as-integrations/aws-lambda'
import { buildSubgraphSchema } from '@apollo/subgraph'
import { buildContext } from '@graphql/context'

import { userTypeDefs } from '@models/User/schema'
import { userResolvers } from '@models/User/resolvers'

import { loginTypeDefs } from '@models/Auth/schema'
import { authResolvers } from '@models/Auth/resolvers'

const typeDefs = [userTypeDefs, loginTypeDefs]

const resolvers = {
  Query: {
    ...userResolvers.Query,
  },
  Mutation: {
    ...authResolvers.Mutation,
  },
}

const { NODE_ENV } = process.env

const schema = buildSubgraphSchema({ typeDefs, resolvers })

const requestHandler = handlers.createAPIGatewayProxyEventRequestHandler()

const apolloServer = new ApolloServer({
  schema,
  plugins: [ApolloServerPluginInlineTraceDisabled()],
  includeStacktraceInErrorResponses: NODE_ENV === 'local',
  status400ForVariableCoercionErrors: true,
  introspection: NODE_ENV !== 'production',
})

export default startServerAndCreateLambdaHandler(apolloServer, requestHandler, {
  context: buildContext,
})
