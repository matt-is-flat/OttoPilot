import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';

import Stage from '../../../common/models/stage';
import IocConfiguration from '../ioc-configuration';
import { CreateStage, UpdateStage } from '../controllers/stages-controller';
import { IValidator, IFactory } from '../interfaces';
import { Registrations } from '../constants';
import { InvalidModelResponse } from '../utils/handler-helper';

let container = new IocConfiguration().ConfigureIoc();
let validatorFactory: IFactory<IValidator<any>> = container.get<IFactory<IValidator<any>>>(Registrations.IValidatorFactory);

export const SaveStageHandler: APIGatewayProxyHandler = async (event, _) => {
  let body = JSON.parse(event.body);
  let parametersValidator = validatorFactory.Create(body.opcode);
  let parametersValidationResult = parametersValidator.Validate(body.parameters)

  if (!parametersValidationResult.isValid) {
    return InvalidModelResponse(parametersValidationResult);
  }

  if (body.resultCode && body.resultCode.length > 0) {
    let resultsValidator = validatorFactory.Create(body.resultCode);
    let resultsValidationResult = resultsValidator.Validate(body.resultsParameters);

    if (!resultsValidationResult.isValid) {
      return InvalidModelResponse(resultsValidationResult);
    }
  }

  // if (!stage.id || stage.id.trim().length === 0) {
  //   await CreateStage(stage);
  // } else {
  //   await UpdateStage(stage);
  // }

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Stage saved successfully'
    })
  };
}