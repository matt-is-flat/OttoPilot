import { IFlowStageLogic } from '../../interfaces/logic';
import { IFlowStageRepository } from '../../interfaces/repository';
import { FlowStage } from '../../business-objects';

export default class FlowStageLogic implements IFlowStageLogic {
    private readonly flowStageRepository: IFlowStageRepository;

    constructor(flowStageRepository: IFlowStageRepository) {
        this.flowStageRepository = flowStageRepository;
    }

    async Save(data: FlowStage): Promise<void> {
        if (data.flowId && data.flowId?.length > 0) {
            return await this.flowStageRepository.Update(data);
        }

        return await this.flowStageRepository.Insert(data);
    }

    async Delete(id: string): Promise<void> {
        return await this.flowStageRepository.Delete(id);
    }
    
    async GetById(id: string): Promise<FlowStage> {
        return await this.flowStageRepository.GetById(id);
    }

    async Get(filters: FlowStage): Promise<FlowStage[]> {
        return await this.flowStageRepository.Get(filters);
    }
}