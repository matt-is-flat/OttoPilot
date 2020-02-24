import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';

import { Flow } from '@common/models/flow';
import { IocConfiguration } from '../ioc-configuration';
import { IConverter, IValidator } from '../interfaces';
import { CreateFlow, UpdateFlow } from '../controllers/flows-controller';
import { Registrations, FlowRegistration } from '../constants';
import { InvalidModelResponse } from '../utils/handler-helper';

const container = new IocConfiguration().ConfigureIoc();

/**
 * Handler for saving a flow (new or existing)
 * @param {APIGatewayProxyEvent} event The serverless HTTP event
 */
export const SaveFlowHandler: APIGatewayProxyHandler = async (event, _) => {
  let body = JSON.parse(event.body);

  let flowValidator: IValidator<any> = container.getNamed<IValidator<any>>(Registrations.IValidator, FlowRegistration);
  let validationResult = flowValidator.Validate(body);

  if (!validationResult.isValid) {
    return InvalidModelResponse(validationResult);
  }

  let requestToFlowConverter: IConverter<any, Flow> = container.get<IConverter<any, Flow>>(Registrations.IRequestToFlowConverter);
  let flow = requestToFlowConverter.Convert(body);

  if (!flow.id || flow.id.trim().length === 0) {
    await CreateFlow(flow);
  } else {
    await UpdateFlow(flow);
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Flow saved successfully'
    })
  };
}