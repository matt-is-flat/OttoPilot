import { IConverter } from "../../interfaces";
import { GetTextParameters } from "../../../../common/models/parameters";
import { Selector } from "../../../../common/types";

export class RequestToGetTextParametersConverter implements IConverter<any, GetTextParameters> {
  Convert(input: any): GetTextParameters {
    let result: GetTextParameters = {
      selectorType: input.selectorType as Selector,
      selectorValue: input.selectorValue
    }

    return result;
  }
}