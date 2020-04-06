import { IFlowHandler } from '../interfaces';
import { APIGatewayProxyHandler } from 'aws-lambda';
import { IocConfiguration as ApiIoc } from 'ioc-configuration';
import { IocConfiguration as DomainIoc } from '@domain/ioc-configuration';
import { IocConfiguration as DbIoc } from '@database/ioc-configuration';
import { Container } from 'inversify';
import { TYPES as T } from '../constants';
import { RequestHelper, ResponseHelper } from 'helpers';

let apiContainer = new ApiIoc().RegisterIoc();
let domainContainer = new DomainIoc().RegisterIoc();
let dbContainer = new DbIoc().RegisterIoc();
let iocContainer = Container.merge(domainContainer, dbContainer);
iocContainer = Container.merge(iocContainer, apiContainer);

export const SaveFlowHandler: APIGatewayProxyHandler = async (event, _) => {
    let body: any;

    try {
        body = RequestHelper.ExtractBody(event.body);
    } catch (err) {
        return ResponseHelper.InvalidModel().WithMessage(err).AsJson();
    }

    let flowHandler = iocContainer.get<IFlowHandler>(T.IFlowHandler);
    return await flowHandler.SaveFlow(body);
}

export const GetFlowsHandler: APIGatewayProxyHandler = async (event, _) => {
    console.log(1)
    let flowHandler = iocContainer.get<IFlowHandler>(T.IFlowHandler);
    console.log(2)
    let id = event.pathParameters?.id.trim();
    
    if (id && id?.length > 0) {
        return await flowHandler.GetFlow(id);
    }

    return await flowHandler.GetFlows({});
}

export { default as FlowHandler } from './flow-handler';