import { IConverter } from '../../interfaces';
import { SaveLocallyResultParameters, IStageResults } from '@common/models/results';
import { injectable } from 'inversify';

@injectable()
export class RequestToStoreLocallyResultParametersConverter implements IConverter<any, IStageResults> {
  public Convert(input: any): SaveLocallyResultParameters {
    let result: SaveLocallyResultParameters = {
      variableName: input.variableName
    };

    return result;
  }
}