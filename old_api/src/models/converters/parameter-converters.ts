import { IConverter } from "../../interfaces";
import { GetTextParameters, IStageParameters, LoadPageParameters, PrintVariableParameters } from "@common/models/parameters";
import { Selector } from "@common/types";
import { injectable } from "inversify";
import { PageLoadTimeout } from '../../constants';
import { IStageResults } from "@common/models/results";

@injectable()
export class RequestToLoadPageParametersConverter implements IConverter<any, IStageParameters> {
  Convert(input: any): LoadPageParameters {
    let result: LoadPageParameters = {
      pageUrl: input.pageUrl,
      timeout: input.timeout || PageLoadTimeout
    };

    return result;
  }
}

@injectable()
export class RequestToGetTextParametersConverter implements IConverter<any, IStageParameters> {
  Convert(input: any): GetTextParameters {
    let result: GetTextParameters = {
      selectorType: input.selectorType as Selector,
      selectorValue: input.selectorValue
    }

    return result;
  }
}

@injectable()
export class RequestToPrintVariableParametersConverter implements IConverter<any, IStageResults> {
  Convert(input: any): PrintVariableParameters {
    let result: PrintVariableParameters = {
      variableName: input.variableName
    };

    return result;
  }
}