import { Container } from 'inversify';
import "reflect-metadata";

import { IValidator } from './interfaces';
import { Registrations } from './constants';
import { Opcodes } from '../../common/constants';
import ParametersValidatorFactory from './models/factories/parameters-validator-factory';
import { GetTextParametersValidator } from './models/validators/parameter-validators';

export default class IocConfiguration {
  ConfigureIoc() : Container {
    let container = new Container();

    this.RegisterValidators(container);
    this.RegisterFactories(container);

    return container;
  }

  private RegisterValidators(container: Container): void {
    container.bind(Registrations.IValidator).to(GetTextParametersValidator).whenTargetNamed(Opcodes.getText);
  }

  private RegisterFactories(container: Container): void {
    let factoryFactory = (id: string) => container.getNamed<IValidator<any>>(Registrations.IValidatorFactory, id)
    let parametersValidatorFactoy = new ParametersValidatorFactory(factoryFactory);
    container.bind(Registrations.IValidatorFactory).toConstantValue(parametersValidatorFactoy);
  }
}