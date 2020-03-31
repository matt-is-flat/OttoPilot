import { JsonResponse } from '../business-objects';
import { FlowFilters } from '@domain/business-objects/search-filters';

export default interface IFlowHandler {
    SaveFlow(body: any): Promise<JsonResponse>;
    GetFlow(id: string): Promise<JsonResponse>;
    GetFlows(filters: FlowFilters): Promise<JsonResponse>
}