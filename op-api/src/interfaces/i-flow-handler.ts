import { JsonResponse } from '../business-objects';
import { FlowFilters } from '@domain/business-objects/search-filters';
import { Flow } from '@domain/business-objects';

/**
 * Handlers for flow-related endpoints
 */
export default interface IFlowHandler {
    /**
     * Saves (creates if does not already exist, or updates
     * otherwise) a flow.
     * @param {Flow} body The body for the flow to save
     */
    SaveFlow(body: any): Promise<JsonResponse>;
    
    /**
     * Gets a single Flow by it's unique ID.
     * @param {string} id The flow's ID
     */
    GetFlow(id: string): Promise<JsonResponse>;

    /**
     * Gets a list of flows filtered according to
     * provided optional conditions.
     * @param {FlowFilters} filters Any conditions to filter the flows by
     */
    GetFlows(filters: FlowFilters): Promise<JsonResponse>
}