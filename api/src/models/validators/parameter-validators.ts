import { IValidator } from '../../interfaces';
import ValidationResult from '../validation-result';

export class GetTextParametersValidator implements IValidator<any> {
  Validate(input: any): ValidationResult {
    let result: ValidationResult = {
      isValid: true,
      validationErrors: []
    };

    return result;
  }
}