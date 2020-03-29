import { IGenericRepository } from '../../interfaces';
import { FlowStage } from '../../models';

export default interface IFlowStageRepository extends IGenericRepository<FlowStage, string> { }