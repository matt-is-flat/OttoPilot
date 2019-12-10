import { Container } from 'inversify';
import "reflect-metadata";

import Config from './config.json';
import { Registrations, Opcodes } from './constants';
import { IMainProcessor, IInstructionRetriever, IProcessor, IProcessorFactory, IDataPersister } from './interfaces';
import MainProcessor from './main-processor';
import InstructionRetriever from './models/instruction-retriever';
import MockInstructionRetriever from './mock/mock-instruction-retriever';
import LoadPageProcessor from './models/processors/load-page-processor';
import ProcessorFactory from './models/processor-factory';
import GetElementTextProcessor from './models/processors/get-element-text-processor';
import ConsoleLogger from './models/data-persisters/console-logger';

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
  }

  private RegisterDataPersisters(container: Container) : void {
    container.bind<IDataPersister<string>>(Registrations.IDataPersister).to(ConsoleLogger)
  }
}