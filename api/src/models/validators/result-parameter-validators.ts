import { IValidator } from '../../interfaces';
import { ValidationResult } from '../validation-result';
import { injectable } from 'inversify';
import { ValidationErrors } from '../../constants';

@injectable()
export class SaveLocallyResultParametersValidator implements IValidator<any> {
  Validate(input: any): ValidationResult {
    console.log("Validating result")
    let result: ValidationResult = { isValid: true, validationErrors: [] };

    if (!input.variableName || typeof(input.variableName) !== 'string') {
      result.isValid = false;
      result.validationErrors.push(ValidationErrors.SaveLocally.BadVariableName);
    }

    return result;
  }
}