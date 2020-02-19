import { APIGatewayProxyHandler, APIGatewayProxyEvent } from 'aws-lambda';
import 'source-map-support/register';

import Stage from '@common/models/stage';
import IocConfiguration from '../ioc-configuration';
import { CreateStage, UpdateStage } from '../controllers/stages-controller';
import { IStageParameters } from '@common/models/parameters';
import { IStageResults } from '@common/models/results';
import { IValidator, IConverter } from '../interfaces';
import { Registrations } from '../constants';
import { InvalidModelResponse } from '../utils/handler-helper';
import { Opcodes } from '../../../common/constants';

const container = new IocConfiguration().ConfigureIoc();

/**
 * Handler for saving a stage (new or existing)
 * @param {APIGatewayProxyEvent} event The serverless HTTP event
 */
export const SaveStageHandler: APIGatewayProxyHandler = async (event, _) => {
  let body = JSON.parse(event.body);
  let stageParameters: IStageParameters = {};
  let stageResults: IStageResults = {};
  
  //#region Parameter validation and conversion
  let parametersValidator = container.getNamed<IValidator<any>>(Registrations.IValidator, body.opcode);
  let parametersValidationResult = parametersValidator.Validate(body.parameters);
  
  if (!parametersValidationResult.isValid) {
    return InvalidModelResponse(parametersValidationResult);
  }
  
  let requestToStageParametersConverter = container.getNamed<IConverter<any, IStageParameters>>(Registrations.IRequestToStageParametersConverter, Opcodes.getText);
  stageParameters = requestToStageParametersConverter.Convert(body.parameters);
  //#endregion

  //#region Result parameter validation and conversion
  if (body.resultCode && body.resultCode.length > 0) {
    let resultsValidator = container.getNamed<IValidator<any>>(Registrations.IValidator, body.resultCode);
    let resultsValidationResult = resultsValidator.Validate(body.resultParameters);

    if (!resultsValidationResult.isValid) {
      return InvalidModelResponse(resultsValidationResult);
    }

    let requestToResultsConverter = container.getNamed<IConverter<any, IStageResults>>(Registrations.IRequestToStageResultsConverter, body.resultCode);
    stageResults = requestToResultsConverter.Convert(body.resultParameters);
  }
  //#endregion

  let stage: Stage = {
    id: body.id,
    opcode: body.opcode,
    resultCode: body.resultCode,
    parameters: stageParameters,
    resultStore: stageResults,
  };

  if (!stage.id || stage.id.trim().length === 0) {
    await CreateStage(stage);
  } else {
    await UpdateStage(stage);
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Stage saved successfully'
    })
  };
}