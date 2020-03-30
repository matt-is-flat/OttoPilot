import { IProcessorFactory, IProcessor } from '../interfaces';

export default class ProcessorFactory implements IProcessorFactory {
  private _factoryFactory : (opcode: string) => IProcessor

  constructor(factoryFactory: (opcode: string) => IProcessor) {
    this._factoryFactory = factoryFactory;
  }

  Create(opcode: string): IProcessor {
    return this._factoryFactory(opcode);
  }
}