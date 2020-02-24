import { IValidator } from '../../interfaces';
import { ValidationResult } from '../validation-result';
import { injectable } from 'inversify';
import { ValidationErrors } from '../../constants';
import { Selector } from '../../../../common/types';

@injectable()
export class LoadPageParametersValidator implements IValidator<any> {
  Validate(input: any): ValidationResult {
    let result: ValidationResult = { isValid: true, validationErrors: [] };

    if (!input.pageUrl || typeof(input.pageUrl) !== 'string') {
      result.isValid = false;
      result.validationErrors.push(ValidationErrors.LoadPage.PageUrl);
    }

    return result;
  }
}

@injectable()
export class GetTextParametersValidator implements IValidator<any> {
  Validate(input: any): ValidationResult {
    let result: ValidationResult = { isValid: true, validationErrors: [] };

    if (!input.selectorType || typeof(input.selectorType) !== 'string' || !(input.selectorType in Selector)) {
      result.isValid = false;
      result.validationErrors.push(ValidationErrors.GetText.BadSelectorType);
    }

    if (!input.selectorValue || typeof(input.selectorValue) !== 'string') {
      result.isValid = false;
      result.validationErrors.push(ValidationErrors.GetText.BadSelectorValue);
    }

    return result;
  }
}

@injectable()
export class PrintVariableParametersValidator implements IValidator<any> {
  Validate(input: any): ValidationResult {
    let result: ValidationResult = { isValid: true, validationErrors: [] };

    if (!input.variableName || typeof(input.variableName) !== 'string') {
      result.isValid = false;
      result.validationErrors.push(ValidationErrors.Common.BadVariableName);
    }

    return result;
  }
}