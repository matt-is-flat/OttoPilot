import { IFlowHandler } from '../interfaces';
import { APIGatewayProxyHandler } from 'aws-lambda';
import { IocConfiguration as DomainIoc } from '@domain/ioc-configuration';
import { IocConfiguration as DbIoc } from '@database/ioc-configuration';
import { Container } from 'inversify';
import { TYPES as T } from '../constants';
import { RequestHelper, ResponseHelper } from 'helpers';

let domainContainer = new DomainIoc().RegisterIoc();
let dbContainer = new DbIoc().RegisterIoc();
let iocContainer = Container.merge(domainContainer, dbContainer);

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
    let flowHandler = iocContainer.get<IFlowHandler>(T.IFlowHandler);
    let id = event.pathParameters?.id.trim();
    
    if (id && id?.length > 0) {
        return await flowHandler.GetFlow(id);
    }

    return await flowHandler.GetFlows({});
}