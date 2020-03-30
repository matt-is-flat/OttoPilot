import { IStageParameters, IStageResults } from "../interfaces";

export default interface FlowStage {
    flowId: string;
    order: number;
    stageId: string;
    stageCode: string;
    stageParametes: IStageParameters;
    resultCode: string;
    resultParameters: IStageResults;
}