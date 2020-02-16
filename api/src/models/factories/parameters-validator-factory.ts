import { IFactory, IValidator } from '../../interfaces';

export default class ParametersValidatorFactory implements IFactory<IValidator<any>> {
  private _factoryFactory: (id: string) => IValidator<any>;

  constructor(factoryFactory: (id: string) => IValidator<any>) {
    this._factoryFactory = factoryFactory;
  }

  Create(id: string): IValidator<any> {
    return this._factoryFactory(id);
  }
}