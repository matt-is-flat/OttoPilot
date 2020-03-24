import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';

import { GetFlows, GetFlow } from '../../controllers/flows-controller';
import { Flow } from '@common/models/flow';

export const GetFlowsHandler: APIGatewayProxyHandler = async (event, _) => {
  let id = (event.pathParameters || {}).id
  let result: Flow | Flow[];

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