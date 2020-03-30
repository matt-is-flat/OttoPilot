import { IGenericRepository } from '../../interfaces/repository';
import { FlowStage, FlowStageId } from '../../business-objects';
import { FlowStageFilters } from '../../business-objects/search-filters';

export default interface IFlowStageRepository extends IGenericRepository<FlowStage, FlowStageId, FlowStageFilters> { }