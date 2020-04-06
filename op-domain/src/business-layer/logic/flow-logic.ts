import { IFlowLogic, IFlowMetadataLogic, IFlowStageLogic } from '../../interfaces/logic';
import { Flow, FlowStage, FlowStageId } from '../../business-objects';
import { FlowStageFilters } from '../../business-objects/search-filters';
import { TYPES as T } from '../../constants';
import { injectable, inject } from 'inversify';

@injectable()
export default class FlowLogic implements IFlowLogic {
    private readonly flowMetadataLogic: IFlowMetadataLogic;
    private readonly flowStageLogic: IFlowStageLogic;

    constructor(
        @inject(T.IFlowMetadataLogic) flowMetadataLogic: IFlowMetadataLogic,
        @inject(T.IFlowStageLogic) flowStageLogic: IFlowStageLogic
    ) {
        this.flowMetadataLogic = flowMetadataLogic;
        this.flowStageLogic = flowStageLogic;
    }

    async Save(data: Flow): Promise<void> {
        await this.flowMetadataLogic.Save(data.metadata);
        data.stages.forEach(async (stage) => await this.flowStageLogic.Save(stage));
    }

    async Delete(id: string): Promise<void> {
        this.flowMetadataLogic.Delete(id);

        let flowStages = await this.GetStagesByFlowId(id);

        flowStages.forEach(async (stage) => {
            let stageId: FlowStageId = {
                flowId: id,
                order: stage.order
            };

            await this.flowStageLogic.Delete(stageId);
        });
    }

    async GetById(id: string): Promise<Flow> {
        let result: Flow = {
            id: id,
            metadata: await this.flowMetadataLogic.GetById(id),
            stages: await this.GetStagesByFlowId(id)
        }

        return result;
    }

    async Get(filters?: FlowStageFilters): Promise<Flow[]> {
        let allFlowStages = await this.flowStageLogic.Get();
        let allMetadata = await this.flowMetadataLogic.Get();

        let result = new Array<Flow>();

        for (let metadata of allMetadata) {
            let flowStages = allFlowStages.filter(fs => fs.flowId === metadata.flowId);

            result.push({
                id: metadata.flowId,
                metadata: metadata,
                stages: flowStages
            });
        }

        return result;
    }

    private async GetStagesByFlowId(flowId: string): Promise<FlowStage[]> {
        let stageFilters: FlowStageFilters = {
            flowId: flowId
        };

        return await this.flowStageLogic.Get(stageFilters);
    }
}