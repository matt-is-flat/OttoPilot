import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';

import { GetStages, GetStage } from '../controllers/stages-controller';

export const GetStagesHandler: APIGatewayProxyHandler = async (event, _) => {
  let id = (event.queryStringParameters || {}).id;
  let result;

  if (id && id.trim().length > 0) {
    result = await GetStage(id)
  } else {
    result = await GetStages()
  }

  return {
    statusCode: 200,
    body: JSON.stringify(result)
  }
}