import { IGenericRepository } from '../../interfaces/repository';
import { FlowStage, FlowStageId } from '../../business-objects';

export default interface IFlowStageRepository extends IGenericRepository<FlowStage, FlowStageId> { }