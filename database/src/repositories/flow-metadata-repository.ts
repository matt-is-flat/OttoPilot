import { IFlowMetadataRepository } from '@domain/interfaces/repository';
import { FlowMetadata } from '@domain/business-objects';
import { FlowMetadataFilters } from '@domain/business-objects/search-filters';
import { DdbClient } from '../utils/ddb-client';
import { TableNames } from '@domain/constants';

export default class FlowMetadataRepository implements IFlowMetadataRepository {
    async Insert(data: FlowMetadata): Promise<void> {
        const timestamp = new Date().getTime();
        data.createdAt = timestamp;
        data.updatedAt = timestamp;

        const params = {
            TableName: TableNames.flowMetadata ?? '',
            Item: data
        };

        await DdbClient().put(params).promise();
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
    
    async Get(filters: FlowMetadataFilters): Promise<FlowMetadata[]> {
        const params = {
            TableName: TableNames.flowMetadata ?? ''
        };

        let result = await DdbClient().scan(params).promise();

        if (!result.Items) {
            throw new Error("Could not get FlowMetadata");
        }

        return result.Items.map(item => item as FlowMetadata);
    }
}