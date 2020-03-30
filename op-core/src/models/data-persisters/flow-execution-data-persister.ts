import { IDataPersister } from "../../interfaces";
import { FlowExecution } from "../flow-execution";

export class FlowExecutionDataPersister implements IDataPersister<FlowExecution> {
    public async Save(input: FlowExecution): Promise<void> {
    }
}