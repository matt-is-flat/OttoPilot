import { IConverter } from '../../interfaces';
import { Flow, FlowMetadata, FlowStage } from '../../business-objects';
import { TYPES as T } from '../../constants';
import { inject, injectable } from 'inversify';

@injectable()
export default class RequestToFlowConverter implements IConverter<any, Flow> {
    private flowMetadataConverter: IConverter<any, FlowMetadata>;
    private flowStageConverter: IConverter<any, FlowStage>;

    constructor(
        @inject(T["IConverter<any, FlowMetadata>"]) flowMetadataConverter: IConverter<any, FlowMetadata>,
        @inject(T["IConverter<any, FlowStage>"]) flowStageConverter: IConverter<any, FlowStage>
    ) {
        this.flowMetadataConverter = flowMetadataConverter;
        this.flowStageConverter = flowStageConverter;
    }

    Convert(input: any): Flow {
        let flowId = input.id;
        let metadata = this.flowMetadataConverter.Convert(input);
        let stages = new Array<FlowStage>();

        for (let stage of input.stages) {
            stages.push(this.flowStageConverter.Convert(stage));
        }

        return {
            id: flowId,
            metadata: metadata,
            stages: stages
        };
    }
}