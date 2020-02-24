import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';

import { GetFlows, GetFlow } from '../controllers/flows-controller';

export const GetFlowsHandler: APIGatewayProxyHandler = async (event, _) => {
  let id = (event.queryStringParameters || {}).id;
  let result;

  if (id && id.trim().length > 0) {
    result = await GetFlow(id)
  } else {
    result = await GetFlows()
  }

  return {
    statusCode: 200,
    body: JSON.stringify(result)
  }
}