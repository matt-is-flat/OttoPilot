import { IBaseLogic } from '../../interfaces/logic';
import { FlowStage, FlowStageId } from '../../business-objects';
import { FlowStageFilters } from '../../business-objects/search-filters';

export default interface IFlowStageLogic extends IBaseLogic<FlowStage, FlowStageId, FlowStageFilters> { }