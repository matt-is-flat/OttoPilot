import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';

import Stage from '../common/models/stage';
import { CreateStage, UpdateStage, GetStages, GetStage } from './controllers/stages-controller';

export const SaveStageHandler: APIGatewayProxyHandler = async (event, _) => {
  let stage = JSON.parse(event.body).stage as Stage;

  if (!stage.id || stage.id.trim().length === 0) {
    await CreateStage(stage)
  } else {
    await UpdateStage(stage)
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Created a thing'
    })
  };
}

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