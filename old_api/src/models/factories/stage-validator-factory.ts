import { IFactory, IValidator } from '../../interfaces';
import { injectable } from 'inversify';

@injectable()
export class StageValidatorFactory implements IFactory<string, IValidator<any>> {
  private _stageValidatorResolver: (string) => IValidator<any>;

  constructor(stageValidatorResolver: (string) => IValidator<any>) {
    this._stageValidatorResolver = stageValidatorResolver;
  }

  Create(input: string): IValidator<any> {
    return this._stageValidatorResolver(input);
  }
}