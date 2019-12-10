import { IDataPersister } from "../../interfaces";
import { injectable } from "inversify";

@injectable()
export default class ConsoleLogger implements IDataPersister<string> {
  Persist(data: string) : void {
    console.log(data)
  }
}