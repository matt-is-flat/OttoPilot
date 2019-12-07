import puppeteer from 'puppeteer-core';
import Config from './config.json';

export default class MainProcessor {
  private _browser: puppeteer.Browser;

  constructor(browser: puppeteer.Browser) {
    this._browser = browser;
  }

  /**
   * Creates a puppeteer client which attempts to connect to
   * the chrome instance. Retries a specified number of times
   * at a specified interval until either it connects or returns
   * null.
   */
  static async TryInitialise(): Promise<MainProcessor|null> {
    let retries = 0;
    let browser: puppeteer.Browser;

    while (retries < Config.MAX_RETRIES) {
      try {
        browser = await puppeteer.connect({ browserWSEndpoint: Config.BROWSERLESS_URL })
        return new MainProcessor(browser);
      } catch (connErr) {
        console.log(`Error connecting to browser, trying again in ${Config.RETRY_DELAY}ms...`)
      }

      await new Promise(r => setTimeout(r, Config.RETRY_DELAY))
    }

    return null
  }

  Execute(): boolean {
    return false;
  }
}