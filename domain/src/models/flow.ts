import { FlowMetadata, FlowStage } from '../models';

export default class Flow {
    id: string;
    metadata: FlowMetadata;
    stages: FlowStage[];
}