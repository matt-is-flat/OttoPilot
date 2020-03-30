import { Browser } from 'puppeteer-core';
import { injectable, inject } from 'inversify';

import { IProcessor } from "../../interfaces";
import Instruction from "../instruction";
import { Registrations } from '../../constants';

@injectable()
export default class LoadPageProcessor implements IProcessor {
  private _browser: Browser;

  constructor(
    @inject(Registrations.Browser) browser: Browser
    ) {
    this._browser = browser;
  }

  async Execute(instruction: Instruction): Promise<void> {
    let page = await this._browser.newPage()
    await page.goto(instruction.parameters.url)
  }
}