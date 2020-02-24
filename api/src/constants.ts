export const PageLoadTimeout = 10;
export const FlowRegistration = "Flow";

export const ExceptionMessages = {
  ExistingStageNotFound: "Stage with the provided ID could not be found",
  ExistingFlowNotFound: "Flow with the provided ID could not be found"
};

export const ValidationErrors = {
  LoadPage: {
    PageUrl: "pageUrl must be provided and must be a string"
  },
  GetText: {
    BadSelectorType: "selectorType must be provided and must be a string one of 'Id', 'Class' or 'Xpath'",
    BadSelectorValue: "selectorValue must be provided and must be a string"
  },
  Common: {
    BadVariableName: "variableName must be provided and be a string"
  }
};

export const Registrations = {
  IValidatorFactory: "IFactory<IValidator>",
  IValidator: "IValidator",
  IRequestToStageParametersConverter: "IConverter<any, IStageParameters>",
  IRequestToStageResultsConverter: "IConverter<any, IStageResults>",
  IRequestToFlowConverter: "IConverter<any, Flow>"
};