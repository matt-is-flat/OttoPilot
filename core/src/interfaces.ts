import Instruction from "./models/instruction";

export interface IMainProcessor {
  Execute() : Promise<boolean>;
}

export interface IInstructionRetriever {
  GetNextInstruction() : Instruction
}

export interface IProcessor {
  Execute(instruction: Instruction) : Promise<void>;
}

export interface IProcessorFactory {
  Create(opcode: string) : IProcessor;
}

export interface IDataPersister<T> {
  Persist(data: T) : void;
}