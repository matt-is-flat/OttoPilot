import { ValidationResult } from "./models/validation-result";

export interface IValidator<T> {
  Validate(input: T): ValidationResult;
}

export interface IConverter<TIn, TOut> {
  Convert(input: TIn): TOut
}

export interface IFactory<TIn, TOut> {
  Create(input: TIn): TOut;
}