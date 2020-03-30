import { injectable, inject } from 'inversify';

import { IProcessor, IDataStorage } from "../../interfaces";
import Instruction from "../instruction";
import { Registrations } from '../../constants';

@injectable()
export default class PrintVariableProcessor implements IProcessor {
  private _dataStorage: IDataStorage<string>;

  constructor(
      @inject(Registrations.IDataStorage) dataStorage: IDataStorage<string>
    ) {
    this._dataStorage = dataStorage
  }

  async Execute(instruction: Instruction): Promise<void> {
    console.log(this._dataStorage.Retrieve(instruction.parameters.variableName))
  }
}