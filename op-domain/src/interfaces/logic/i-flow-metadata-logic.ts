import { IBaseLogic } from '../../interfaces/logic';
import { FlowMetadata } from '../../business-objects';
import { FlowMetadataFilters } from '../../business-objects/search-filters';

export default interface IFlowMetadataLogic extends IBaseLogic<FlowMetadata, string, FlowMetadataFilters> { }