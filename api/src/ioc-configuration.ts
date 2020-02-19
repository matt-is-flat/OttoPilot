import { Container } from 'inversify';
import "reflect-metadata";

import { Registrations } from './constants';
import { Opcodes, ResultCodes } from '../../common/constants';
import { GetTextParametersValidator } from './models/validators/parameter-validators';
import { RequestToGetTextParametersConverter } from './models/converters/parameter-converters';
import { SaveLocallyResultParametersValidator } from './models/validators/result-parameter-validators';
import { RequestToStoreLocallyResultParametersConverter } from './models/converters/result-parameter-converters';

export default class IocConfiguration {
  ConfigureIoc(): Container {
    let container = new Container();

    this.RegisterValidators(container);
    this.RegisterConverters(container);

    return container;
  }

  private RegisterValidators(container: Container): void {
    container.bind(Registrations.IValidator).to(GetTextParametersValidator).whenTargetNamed(Opcodes.getText);
    
    container.bind(Registrations.IValidator).to(SaveLocallyResultParametersValidator).whenTargetNamed(ResultCodes.saveLocal);
  }

  private RegisterConverters(container: Container): void {
    container.bind(Registrations.IRequestToStageParametersConverter).to(RequestToGetTextParametersConverter).whenTargetNamed(Opcodes.getText);
  
    container.bind(Registrations.IRequestToStageResultsConverter).to(RequestToStoreLocallyResultParametersConverter).whenTargetNamed(ResultCodes.saveLocal);
  }
}