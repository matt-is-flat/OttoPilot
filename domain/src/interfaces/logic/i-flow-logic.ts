import { IBaseLogic } from '../../interfaces/logic';
import { Flow } from '../../business-objects';
import { FlowFilters } from '../../business-objects/search-filters';

export default interface IFlowLogic extends IBaseLogic<Flow, string, FlowFilters> { }