import { Browser, ElementHandle } from 'puppeteer-core';
import { injectable, inject } from 'inversify';

import { IProcessor, IDataStorage } from "../../interfaces";
import Instruction from "../instruction";
import { Registrations, SelectorTypes } from '../../constants';
import BrowserHelper from '../../utils/browser-helper';

@injectable()
export default class ClickElementProcessor implements IProcessor {
  private _browser: Browser;

  constructor(
      @inject(Registrations.Browser) browser: Browser
    ) {
    this._browser = browser
  }

  async Execute(instruction: Instruction): Promise<void> {
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
      element.type(instruction.parameters.value)
    }
  }
}