import { IFlowLogic, IFlowMetadataLogic, IFlowStageLogic } from '../../interfaces/logic';
import { Flow, FlowStage, FlowStageId } from '../../business-objects';
import { FlowStageFilters } from '../../business-objects/search-filters';

export default class FlowLogic implements IFlowLogic {
    private readonly flowMetadataLogic: IFlowMetadataLogic;
    private readonly flowStageLogic: IFlowStageLogic;

    constructor(flowMetadataLogic: IFlowMetadataLogic, flowStageLogic: IFlowStageLogic) {
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
        throw new Error("Method not implemented.");
    }

    private async GetStagesByFlowId(flowId: string): Promise<FlowStage[]> {
        let stageFilters: FlowStageFilters = {
            flowId: flowId
        };

        return await this.flowStageLogic.Get(stageFilters);
    }
}