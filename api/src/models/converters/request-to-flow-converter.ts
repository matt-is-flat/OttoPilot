import { IConverter } from '../../interfaces';
import { Flow } from '@common/models/flow';
import { injectable } from 'inversify';

@injectable()
export class RequestToFlowConverter implements IConverter<any, Flow> {
  Convert(input: any): Flow {
    let result: Flow = {
      id: input.id,
      name: input.name,
      stages: input.stages
    };

    return result;
  }
}