import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { Container } from 'inversify';
import 'reflect-metadata';

import { IocConfiguration as DomainIoc } from '@domain/ioc-configuration';
import { IocConfiguration as DbIoc } from '@database/ioc-configuration';

export const GetFlowsHandler: APIGatewayProxyHandler = async (event, _) => {
  let domainContainer = new DomainIoc().RegisterIoc();
  let dbContainer = new DbIoc().RegisterContainer();
  let container = Container.merge(domainContainer, dbContainer);

  return {
    statusCode: 200,
    body: JSON.stringify("Hello")
  }
}