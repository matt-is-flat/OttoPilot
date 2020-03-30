import { Container } from 'inversify';
import "reflect-metadata";

import { Registrations, FlowRegistration } from './constants';
import { Opcodes, ResultCodes } from '../../common/constants';
import { FlowValidator } from './models/validators/flow-validator';
import { GetTextParametersValidator, LoadPageParametersValidator, PrintVariableParametersValidator } from './models/validators/parameter-validators';
import { RequestToGetTextParametersConverter, RequestToLoadPageParametersConverter, RequestToPrintVariableParametersConverter } from './models/converters/parameter-converters';
import { SaveLocallyResultParametersValidator } from './models/validators/result-parameter-validators';
import { RequestToStoreLocallyResultParametersConverter } from './models/converters/result-parameter-converters';
import { RequestToFlowConverter } from './models/converters/request-to-flow-converter';
import { IValidator } from 'interfaces';
import { StageValidatorFactory } from './models/factories/stage-validator-factory';

export class IocConfiguration {
  ConfigureIoc(): Container {
    let container = new Container();

    this.RegisterValidators(container);
    this.RegisterConverters(container);
    this.RegisterFactories(container);

    return container;
  }

  private RegisterValidators(container: Container): void {
    container.bind(Registrations.IValidator).to(FlowValidator).whenTargetNamed(FlowRegistration);
    container.bind(Registrations.IValidator).to(LoadPageParametersValidator).whenTargetNamed(Opcodes.loadPage);
    container.bind(Registrations.IValidator).to(GetTextParametersValidator).whenTargetNamed(Opcodes.getText);
    container.bind(Registrations.IValidator).to(PrintVariableParametersValidator).whenTargetNamed(Opcodes.printVariable);

    container.bind(Registrations.IValidator).to(SaveLocallyResultParametersValidator).whenTargetNamed(ResultCodes.saveLocal);
  }

  private RegisterConverters(container: Container): void {
    container.bind(Registrations.IRequestToFlowConverter).to(RequestToFlowConverter)
    container.bind(Registrations.IRequestToStageParametersConverter).to(RequestToGetTextParametersConverter).whenTargetNamed(Opcodes.getText);
    container.bind(Registrations.IRequestToStageParametersConverter).to(RequestToLoadPageParametersConverter).whenTargetNamed(Opcodes.loadPage);
    container.bind(Registrations.IRequestToStageParametersConverter).to(RequestToPrintVariableParametersConverter).whenTargetNamed(Opcodes.printVariable);

    container.bind(Registrations.IRequestToStageResultsConverter).to(RequestToStoreLocallyResultParametersConverter).whenTargetNamed(ResultCodes.saveLocal);
  }

  private RegisterFactories(container: Container): void {
    let stageValidatorResolver = (stageCode: string) => { return container.getNamed<IValidator<any>>(Registrations.IStageValidator, stageCode) }
    let stageValidatorFactory = new StageValidatorFactory(stageValidatorResolver);
    container.bind(Registrations.IStageValidatorFactory).toConstantValue(stageValidatorFactory);
  }
}