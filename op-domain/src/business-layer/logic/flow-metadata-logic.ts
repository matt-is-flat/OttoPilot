import { IFlowMetadataLogic } from '../../interfaces/logic';
import { IFlowMetadataRepository } from '../../interfaces/repository';
import { FlowMetadata } from '../../business-objects';
import { FlowMetadataFilters } from '../../business-objects/search-filters';
import { injectable, inject } from 'inversify';
import { TYPES as T } from '../../constants';

@injectable()
export default class FlowMetadataLogic implements IFlowMetadataLogic {
    private readonly flowMetadataRepository: IFlowMetadataRepository;
    
    constructor(
        @inject(T.IFlowMetadataRepository) flowMetadataRepository: IFlowMetadataRepository
    ) {
        this.flowMetadataRepository = flowMetadataRepository;
    }

    async Save(data: FlowMetadata): Promise<void> {
        let existingRecord = await this.GetById(data.flowId);

        if (existingRecord) {
            return await this.flowMetadataRepository.Update(data);
        }

        return await this.flowMetadataRepository.Insert(data);
    }

    async Delete(id: string): Promise<void> {
        return await this.flowMetadataRepository.Delete(id);
    }
    
    async GetById(id: string): Promise<FlowMetadata> {
        return await this.flowMetadataRepository.GetById(id);
    }
    
    async Get(filters?: FlowMetadataFilters): Promise<FlowMetadata[]> {
        if (filters) {
            return await this.flowMetadataRepository.Get(filters);
        }

        return await this.flowMetadataRepository.Get({});
    }
}