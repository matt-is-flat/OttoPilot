import { IGenericRepository } from '../../interfaces';
import { FlowMetadata } from '../../models';

export default interface IFlowMetadataRepository extends IGenericRepository<FlowMetadata, string> {}