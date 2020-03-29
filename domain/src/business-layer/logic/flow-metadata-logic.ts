import { IFlowMetadataLogic } from '../../interfaces/logic';
import { IFlowMetadataRepository } from '../../interfaces/repository';
import { FlowMetadata } from '../../business-objects';

export default class FlowMetadataLogic implements IFlowMetadataLogic {
    private readonly flowMetadataRepository: IFlowMetadataRepository;
    
    constructor(flowMetadataRepository: IFlowMetadataRepository) {
        this.flowMetadataRepository = flowMetadataRepository;
    }

    async Save(data: FlowMetadata): Promise<void> {
        if (data.flowId && data.flowId?.length > 0) {
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
    
    async Get(filters: FlowMetadata): Promise<FlowMetadata[]> {
        return await this.flowMetadataRepository.Get(filters);
    }
}