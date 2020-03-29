import { IBaseLogic } from '../../interfaces/logic';
import { FlowStage, FlowStageId } from '../../business-objects';

export default interface IFlowStageLogic extends IBaseLogic<FlowStage, FlowStageId> { }