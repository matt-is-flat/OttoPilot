import { IValidator } from '../../interfaces';
import { ValidationResult } from '../validation-result';
import { injectable } from 'inversify';

@injectable()
export class FlowValidator implements IValidator<any> {
  Validate(input: any): ValidationResult {
    let result: ValidationResult = { isValid: true, validationErrors: [] };

    return result;
  }
}