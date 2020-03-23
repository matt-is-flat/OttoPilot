import { IStageParameters, IResultParameters } from '../interfaces';

export class FlowStage {
  flowId: string;
  stageId: string;
  order: number;
  stageCode: string;
  stageParametes: IStageParameters;
  resultCode: string;
  resultParameters: IResultParameters
}