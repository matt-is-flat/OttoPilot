import { IStageParameters, IStageResults } from "../interfaces";

export default class FlowStage {
    flowId: string;
    stageId: string;
    order: number;
    stageCode: string;
    stageParametes: IStageParameters;
    resultCode: string;
    resultParameters: IStageResults;
}