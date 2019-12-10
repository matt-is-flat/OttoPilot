import { Browser, ElementHandle } from 'puppeteer-core';
import { injectable, inject } from 'inversify';

import { IProcessor, IDataStorage } from "../../interfaces";
import Instruction from "../instruction";
import { Registrations, SelectorTypes } from '../../constants';
import BrowserHelper from '../../utils/browser-helper';

@injectable()
export default class GetElementTextProcessor implements IProcessor {
  private _browser: Browser;
  private _dataStorage: IDataStorage<string>;

  constructor(
      @inject(Registrations.Browser) browser: Browser,
      @inject(Registrations.IDataStorage) dataStorage: IDataStorage<string>
    ) {
    this._browser = browser
    this._dataStorage = dataStorage
  }

  async Execute(instruction: Instruction): Promise<void> {
    let text: string
    let element: ElementHandle<Element> | null = null

    let page = await BrowserHelper.GetCurrentPage(this._browser)

    switch(instruction.parameters.selectorType) {
      case SelectorTypes.xpath:
        element = (await page.$x(instruction.parameters.selector))[0]
        break
      case SelectorTypes.id:
      case SelectorTypes.class:
        element = (await page.$(instruction.parameters.selector))
    }

    if (element) {
      text = await (await element.getProperty('textContent')).jsonValue() as string
    } else {
      text = ''
    }

    if (instruction.resultStore && instruction.resultStore.variableName) {
      this._dataStorage.Store(instruction.resultStore.variableName, text)
    }
  }
}