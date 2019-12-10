import Instruction from '../models/instruction';
import { IInstructionRetriever } from '../interfaces';
import { injectable } from 'inversify';
import MockInstructions from './instructions';

@injectable()
export default class MockInstructionRetriever implements IInstructionRetriever {
  private _currentInstruction : number

  constructor() {
    this._currentInstruction = 0;
  }

  GetNextInstruction() : Instruction {
    var result = MockInstructions[this._currentInstruction]
    this._currentInstruction++
    return result
  }
}