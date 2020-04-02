import { IStageParameters, IStageResults } from "../interfaces";

export default interface FlowStage {
    flowId: string;
    order: number;
    stageId: string;
    stageCode: string;
    stageParameters: IStageParameters;
    resultCode: string;
    resultParameters: IStageResults;
}