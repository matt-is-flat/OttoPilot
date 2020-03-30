import { IFlowMetadataRepository } from '@domain/interfaces/repository';
import { FlowMetadata } from '@domain/business-objects';
import { FlowMetadataFilters } from '@domain/business-objects/search-filters';

export default class FlowMetadataRepository implements IFlowMetadataRepository {
    Insert(data: FlowMetadata): Promise<void> {
        throw new Error("Method not implemented.");
    }

    Update(data: FlowMetadata): Promise<void> {
        throw new Error("Method not implemented.");
    }

    Delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    GetById(id: string): Promise<FlowMetadata> {
        throw new Error("Method not implemented.");
    }
    
    Get(filters: FlowMetadataFilters): Promise<FlowMetadata[]> {
        throw new Error("Method not implemented.");
    }
}