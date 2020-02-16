import ValidationResult from "./models/validation-result";

export interface IValidator<T> {
  Validate(input: T): ValidationResult;
}

export interface IFactory<T> {
  Create(id: string): T;
}

export interface IConverter<TIn, TOut> {
  Convert(input: TIn): TOut
}