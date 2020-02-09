import { IDataStorage } from "../../interfaces";
import { injectable } from "inversify";

@injectable()
export default class DynaoDbDataStorage implements IDataStorage<any> {
  private _localStage: any;

  constructor() {
    this._localStage = {}
  }

  Store(key: string, data: any) : void {
    this._localStage[key] = data
  }

  Retrieve(key: string): any {
    return this._localStage[key]
  }
}