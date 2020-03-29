import { IGenericRepository } from '../../interfaces/repository';
import { FlowMetadata } from '../../business-objects';

export default interface IFlowMetadataRepository extends IGenericRepository<FlowMetadata, string> {}