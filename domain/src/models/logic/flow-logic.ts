import { IFlowLogic, IFlowMetadataLogic, IFlowStageLogic } from '../../interfaces';
import { Flow, FlowMetadata, FlowStage } from '../../models';

export default class FlowLogic implements IFlowLogic {
    private readonly flowMetadataLogic: IFlowMetadataLogic;
    private readonly flowStageLogic: IFlowStageLogic;

    constructor(flowMetadataLogic: IFlowMetadataLogic, flowStageLogic: IFlowStageLogic) {
        this.flowMetadataLogic = flowMetadataLogic;
        this.flowStageLogic = flowStageLogic;
    }

    async Save(data: Flow): Promise<void> {
        await this.flowMetadataLogic.Save(data.metadata);

        for (let stage of data.stages) {
            await this.flowStageLogic.Save(stage);
        }
    }

    async Delete(id: string): Promise<void> {
        await this.DeleteFlowMetadata(id);
        await this.DeleteFlowStages(id);
    }

    GetById(id: string): Promise<Flow> {
        throw new Error("Method not implemented.");
    }

    Get(filters: Flow): Promise<Flow[]> {
        throw new Error("Method not implemented.");
    }

    private async DeleteFlowMetadata(flowId: string): Promise<void> {
        let metadataFilters = new FlowMetadata();
        metadataFilters.flowId = flowId;

        let metadata = await this.flowMetadataLogic.Get(metadataFilters);
        
        if (metadata.length !== 1) {
            throw new Error("Invalid number of metadata returned for flow");
        }

        await this.flowMetadataLogic.Delete(metadata[0].id);
    }

    private async DeleteFlowStages(flowId: string): Promise<void> {
        let stageFilters = new FlowStage();
        stageFilters.flowId = flowId;

        let stages = await this.flowStageLogic.Get(stageFilters);

        for (let stage of stages) {
            await this.flowStageLogic.Delete(stage.id);
        }
    }
}