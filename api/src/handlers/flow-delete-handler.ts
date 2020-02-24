import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';

import { DeleteFlow } from '../controllers/flows-controller';

export const DeleteFlowHandler: APIGatewayProxyHandler = async (event, _) => {
  let id = (event.queryStringParameters || {}).id;

  try {
    await DeleteFlow(id);
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