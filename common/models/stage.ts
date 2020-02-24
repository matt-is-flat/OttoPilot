import { IStageParameters } from "./parameters";
import { IStageResults } from "./results";

export class Stage {
  id: string;
  opcode: string;
  resultCode: string;
  parameters: IStageParameters;
  resultStore: IStageResults;
  createdAt?: Date;
  updatedAt?: Date;
}