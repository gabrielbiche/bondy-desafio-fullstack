import { APIGatewayEvent, Context as LambdaContext } from 'aws-lambda'
import { UserResponse } from '@graphql/types/userTypes'

export interface IGraphQLContext {
  headers: APIGatewayEvent['headers']
  functionName: string
  event: APIGatewayEvent
  context: LambdaContext
  user?: UserResponse
}
