import { IFlowStageRepository } from "@domain/interfaces/repository";
import { FlowStage, FlowStageId } from '@domain/business-objects';
import { FlowStageFilters } from '@domain/business-objects/search-filters';
import { TableNames } from "@domain/constants";
import { DdbClient } from '../utils/ddb-client';

export default class FlowStageRepository implements IFlowStageRepository {
    Insert(data: FlowStage): Promise<void> {
        throw new Error("Method not implemented.");
    }

    Update(data: FlowStage): Promise<void> {
        throw new Error("Method not implemented.");
    }

    Delete(id: FlowStageId): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async GetById(id: FlowStageId): Promise<FlowStage> {
        const params = {
            TableName: TableNames.flowStages ?? '',
            Key: {
                flowId: id.flowId,
                order: id.order
            }
        };

        let result = await DdbClient().get(params).promise();
        return result.Item as FlowStage;
    }

    async Get(filters: FlowStageFilters): Promise<FlowStage[]> {
        const params = {
            TableName: TableNames.flowStages ?? ''
        };

        let result = await DdbClient().scan(params).promise();

        if (!result.Items) {
            throw new Error("Could not get FlowStages");
        }

        return result.Items.map(item => item as FlowStage);
    }
}