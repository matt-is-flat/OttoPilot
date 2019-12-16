import puppeteer, { Browser } from 'puppeteer-core';
import { injectable, inject } from 'inversify';

import Config from '../config.json';
import IocConfiguration from '../ioc-configuration';
import { IMainProcessor, IInstructionRetriever, IProcessorFactory } from '../interfaces';
import { Registrations } from '../constants';

@injectable()
export default class MainProcessor implements IMainProcessor {
  private _instructionRetriever: IInstructionRetriever;
  private _processorFactory: IProcessorFactory;

  constructor(
      @inject(Registrations.IInstructionRetriever) instructionRetriever: IInstructionRetriever,
      @inject(Registrations.IProcessorFactory) processorFactory: IProcessorFactory
    ) {
    this._instructionRetriever = instructionRetriever
    this._processorFactory = processorFactory
  }

  /**
   * Creates a puppeteer client which attempts to connect to
   * the chrome instance. Retries a specified number of times
   * at a specified interval until either it connects or returns
   * null.
   */
  static async TryInitialise() : Promise<IMainProcessor|null> {
    let retries = 0
    let browser: Browser

    while (retries < Config.MAX_RETRIES) {
      try {
        browser = await puppeteer.connect({
          browserWSEndpoint: Config.BROWSERLESS_URL
        })
 
        let container = new IocConfiguration().ConfigureIoc()
        container.bind<Browser>(Registrations.Browser).toConstantValue(browser)
        
        return container.get<IMainProcessor>(Registrations.IMainProcessor)
      } catch (connErr) {
        console.log(`Error connecting to browser, trying again in ${Config.RETRY_DELAY}ms...`)
      }

      await new Promise(r => setTimeout(r, Config.RETRY_DELAY))
    }

    return null
  }

  /**
   * Main execution loop: Fetches instructions, creates
   * a processor based on the instruction type, then
   * processes the instruction.
   */
  async Execute() : Promise<boolean> {
    let nextInstruction = this._instructionRetriever.GetNextInstruction()

    if (!nextInstruction) {
      return false
    }

    let processor = this._processorFactory.Create(nextInstruction.opcode)
    await processor.Execute(nextInstruction)
    
    return true
  }
}