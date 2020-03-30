import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { Container } from 'inversify';
import { IocConfiguration as DomainIoc } from '@domain/ioc-configuration';
import { IFlowMetadataLogic } from '@domain/interfaces/logic';

import { Flow } from '@common/models/flow';

export const GetFlowsHandler: APIGatewayProxyHandler = async (event, _) => {
  let id = (event.pathParameters || {}).id
  let result: Flow | Flow[];

  let container = new Container();
  new DomainIoc().RegisterIoc(container);

  let flowMetadataLogic = container.get<IFlowMetadataLogic>("");

  return {
    statusCode: 200,
    body: JSON.stringify(result)
  }
}