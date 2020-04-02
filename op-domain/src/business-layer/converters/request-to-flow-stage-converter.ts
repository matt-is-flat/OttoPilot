import { IConverter } from '../../interfaces';
import { FlowStage } from '../../business-objects';
import { injectable } from 'inversify';

@injectable()
export default class RequestToFlowStageConverter implements IConverter<any, FlowStage> {
    Convert(input: any): FlowStage {
        return {
            flowId: input.flowId,
            order: input.order,
            stageId: input.stageId,
            stageCode: input.stageCode,
            stageParameters: input.stageParametes,
            resultCode: input.resultCode,
            resultParameters: input.resultParameters
        };
    }
}