import { ValidationResult } from '../business-objects';

export default interface IValidator<T> {
    Validate(input: T): ValidationResult;
}