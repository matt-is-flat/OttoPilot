import { IFlowMetadataRepository } from "../../interfaces";
import { FlowMetadata } from '../../models/flow-metadata';

export class FlowMetadataRepository implements IFlowMetadataRepository {
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
    Get(filters: FlowMetadata): Promise<FlowMetadata[]> {
        throw new Error("Method not implemented.");
    }
    
}