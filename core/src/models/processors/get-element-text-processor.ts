import { Browser, ElementHandle } from 'puppeteer-core';
import { injectable, inject } from 'inversify';

import { IProcessor, IDataPersister } from "../../interfaces";
import Instruction from "../instruction";
import { Registrations, SelectorTypes } from '../../constants';
import BrowserHelper from '../../utils/browser-helper';

@injectable()
export default class GetElementTextProcessor implements IProcessor {
  private _browser: Browser;
  private _dataPersister: IDataPersister<string>;

  constructor(
      @inject(Registrations.Browser) browser: Browser,
      @inject(Registrations.IDataPersister) dataPersister: IDataPersister<string>
    ) {
    this._browser = browser
    this._dataPersister = dataPersister
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

    this._dataPersister.Persist(text)
  }
}