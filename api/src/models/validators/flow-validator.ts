import { IValidator, IFactory } from '../../interfaces';
import { ValidationResult } from '../validation-result';
import { Flow } from '@common/models/flow';
import { injectable, inject } from 'inversify';
import { Registrations } from '../../constants';

@injectable()
export class FlowValidator implements IValidator<any> {
  private _stageValidatorFactory: IFactory<string, IValidator<any>>;

  constructor(
    @inject(Registrations.IStageValidatorFactory) stageValidatorFactory: IFactory<string, IValidator<any>>
    ) {
    this._stageValidatorFactory = stageValidatorFactory;
  }

  Validate(input: any): ValidationResult {
    let result: ValidationResult = { isValid: true, validationErrors: [] };
    let flow = input as Flow;

    if (!flow.metadata || !flow.stages) {
      result.isValid = false;
      result.validationErrors.push('Flow must have metadata and stages objects')
    }

    if (!flow.metadata?.name || flow.metadata?.name.trim().length === 0) {
      result.isValid = false;
      result.validationErrors.push('Flow must have a name');
    }

    flow.stages?.forEach(stage => {
      let stageValidator = this._stageValidatorFactory.Create(stage.stageCode);
      let stageValidationResult = stageValidator.Validate(stage);

      if (!stageValidationResult.isValid) {
        result.isValid = false;
        result.validationErrors = result.validationErrors.concat(stageValidationResult.validationErrors);
      }
    })

    return result;
  }
}