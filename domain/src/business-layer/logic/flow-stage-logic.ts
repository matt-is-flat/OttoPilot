import { IFlowStageLogic } from '../../interfaces/logic';
import { IFlowStageRepository } from '../../interfaces/repository';
import { FlowStage, FlowStageId } from '../../business-objects';
import { FlowStageFilters } from '../../business-objects/search-filters';

export default class FlowStageLogic implements IFlowStageLogic {
    private readonly flowStageRepository: IFlowStageRepository;

    constructor(flowStageRepository: IFlowStageRepository) {
        this.flowStageRepository = flowStageRepository;
    }

    Save(data: FlowStage): Promise<void> {
        if (data.flowId && data.flowId?.length > 0) {
            return this.flowStageRepository.Update(data);
        }

        return this.flowStageRepository.Insert(data);
    }

    Delete(id: FlowStageId): Promise<void> {
        return this.flowStageRepository.Delete(id);
    }
    
    GetById(id: FlowStageId): Promise<FlowStage> {
        return this.flowStageRepository.GetById(id);
    }

    Get(filters: FlowStageFilters): Promise<FlowStage[]> {
        return this.flowStageRepository.Get(filters);
    }
}