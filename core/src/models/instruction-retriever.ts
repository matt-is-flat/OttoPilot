import Instruction from './instruction';
import { IInstructionRetriever } from '../interfaces';
import { injectable } from 'inversify';

@injectable()
export default class InstructionRetriever implements IInstructionRetriever {
  GetNextInstruction() : Instruction {
    var result = new Instruction();

    // Fetch next instruction from DB

    return result;
  }
}