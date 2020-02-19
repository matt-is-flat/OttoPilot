import { IConverter } from "../../interfaces";
import { GetTextParameters, IStageParameters } from "@common/models/parameters";
import { Selector } from "@common/types";
import { injectable } from "inversify";

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