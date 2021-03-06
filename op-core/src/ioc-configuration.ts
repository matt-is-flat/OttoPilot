import { Container } from 'inversify';
import "reflect-metadata";

import Config from './config.json';
import { Registrations } from './constants';
import { Opcodes } from '../../common/constants';
import { IMainProcessor, IInstructionRetriever, IProcessor, IProcessorFactory, IDataStorage } from './interfaces';
import ProcessorFactory from './models/processor-factory';
import InstructionRetriever from './models/instruction-retriever';
import LocalDataStorage from './models/data-storage/local-data-storage';
import MockInstructionRetriever from './mock/mock-instruction-retriever';

import MainProcessor from './models/main-processor';
import LoadPageProcessor from './models/processors/load-page-processor';
import GetElementTextProcessor from './models/processors/get-element-text-processor';
import PrintVariableProcessor from './models/processors/print-variable-processor';
import ClickElementProcessor from './models/processors/click-element-processor';
import TypeKeysProcessor from './models/processors/type-keys-processor';

export default class IocConfiguration {
  ConfigureIoc() : Container {
    var container = new Container();

    this.RegisterInstructionRetrievers(container);
    this.RegisterFactories(container)
    this.RegisterProcessors(container);
    this.RegisterDataPersisters(container);

    return container;
  }

  private RegisterInstructionRetrievers(container: Container) : void {
    if (Config.ENV === "DEV") {
      container.bind<IInstructionRetriever>(Registrations.IInstructionRetriever).to(MockInstructionRetriever)
    } else {
      container.bind<IInstructionRetriever>(Registrations.IInstructionRetriever).to(InstructionRetriever)
    }
  }

  private RegisterFactories(container: Container) : void {
    let factoryFactory = (opcode: string) => container.getNamed<IProcessor>(Registrations.IProcessor, opcode)
    let processorFactory : IProcessorFactory = new ProcessorFactory(factoryFactory)
    container.bind<IProcessorFactory>(Registrations.IProcessorFactory).toConstantValue(processorFactory)
  }

  private RegisterProcessors(container: Container) : void {
    container.bind<IMainProcessor>(Registrations.IMainProcessor).to(MainProcessor)
    container.bind<IProcessor>(Registrations.IProcessor).to(LoadPageProcessor).whenTargetNamed(Opcodes.loadPage)
    container.bind<IProcessor>(Registrations.IProcessor).to(GetElementTextProcessor).whenTargetNamed(Opcodes.getText)
    container.bind<IProcessor>(Registrations.IProcessor).to(PrintVariableProcessor).whenTargetNamed(Opcodes.printVariable)
    container.bind<IProcessor>(Registrations.IProcessor).to(ClickElementProcessor).whenTargetNamed(Opcodes.clickElement)
    container.bind<IProcessor>(Registrations.IProcessor).to(TypeKeysProcessor).whenTargetNamed(Opcodes.typeKeys)
  }

  private RegisterDataPersisters(container: Container) : void {
    container.bind<IDataStorage<any>>(Registrations.IDataStorage).toConstantValue(new LocalDataStorage())
  }
}