import Instruction from "./models/instruction";
import { FlowExecution } from "../../common/models/flow-execution";

export interface IMainProcessor {
  Execute(): Promise<boolean>;
}

export interface IInstructionRetriever {
  GetNextInstruction(): Instruction
}

export interface IProcessor {
  Execute(instruction: Instruction): Promise<void>;
}

export interface IProcessorFactory {
  Create(opcode: string): IProcessor;
}

export interface IDataStorage<T> {
  Store(key: string, data: T): void;
  Retrieve(key: string) : T;
}

export interface IDataPersister<T> {
  Save(input: T): Promise<void>;
}