import { IFlowStageLogic } from '../../interfaces/logic';
import { IFlowStageRepository } from '../../interfaces/repository';
import { FlowStage, FlowStageId } from '../../business-objects';
import { FlowStageFilters } from '../../business-objects/search-filters';
import { TYPES as T } from '../../constants';
import { injectable, inject } from 'inversify';

@injectable()
export default class FlowStageLogic implements IFlowStageLogic {
    private readonly flowStageRepository: IFlowStageRepository;

    constructor (
        @inject(T.IFlowStageRepository) flowStageRepository: IFlowStageRepository
    ) {
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

    Get(filters?: FlowStageFilters): Promise<FlowStage[]> {
        if (filters) {
            return this.flowStageRepository.Get(filters);
        }

        return this.flowStageRepository.Get({});
    }
}