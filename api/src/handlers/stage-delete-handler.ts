import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';

import { DeleteStage } from '../controllers/stages-controller';

export const DeleteStagesHandler: APIGatewayProxyHandler = async (event, _) => {
  let id = (event.queryStringParameters || {}).id;

  try {
    await DeleteStage(id);
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify("Failed to delete")
    };
  }
  
  return {
    statusCode: 200,
    body: JSON.stringify(`Successfully deleted stage with id ${id}`)
  };
}