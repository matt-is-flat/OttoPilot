import { FlowMetadata, FlowStage } from './';

export default interface Flow {
    id: string;
    metadata: FlowMetadata;
    stages: FlowStage[];
}