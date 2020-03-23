import { FlowMetadata } from './flow-metadata';
import { FlowStage } from "./flow-stage";

export class Flow {
  id: string;
  metadata: FlowMetadata;
  stages: FlowStage[];
}