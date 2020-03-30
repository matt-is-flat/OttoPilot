import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { Container } from 'inversify';
import { TYPES as T } from '@domain/constants';
import 'reflect-metadata';

import { IocConfiguration as DomainIoc } from '@domain/ioc-configuration';
import { IocConfiguration as DbIoc } from '@database/ioc-configuration';
import { IFlowMetadataLogic } from '@domain/interfaces/logic';
import { ResponseHelper } from '../../helpers';

let domainContainer = new DomainIoc().RegisterIoc();
let dbContainer = new DbIoc().RegisterContainer();
let container = Container.merge(domainContainer, dbContainer);

export const GetFlowsHandler: APIGatewayProxyHandler = async (event, _) => {
  let flowMetadataLogic = container.get<IFlowMetadataLogic>(T.IFlowMetadataLogic);
  let flowMetadata = await flowMetadataLogic.Get();

  return ResponseHelper.Success().WithList(flowMetadata).AsJson();
}