import { IGenericRepository } from '../../interfaces/repository';
import { FlowMetadata } from '../../business-objects';
import { FlowMetadataFilters } from '../../business-objects/search-filters';

export default interface IFlowMetadataRepository extends IGenericRepository<FlowMetadata, string, FlowMetadataFilters> { }