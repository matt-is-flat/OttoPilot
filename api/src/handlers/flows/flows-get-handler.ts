import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';

export const GetFlowsHandler: APIGatewayProxyHandler = async (event, _) => {
  return {
    statusCode: 200,
    body: JSON.stringify("Hello")
  }
}