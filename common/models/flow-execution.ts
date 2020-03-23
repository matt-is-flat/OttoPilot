import { StageExecution } from './stage-execution';
import { FlowVariable } from './flow-variable';

export class FlowExecution {
    flowExecutionId: string;
    flowId: string;
    completed: boolean;
    startedAt: number;
    completedAt: number;
    stageExecutions: StageExecution[];
    variables: FlowVariable[];
}