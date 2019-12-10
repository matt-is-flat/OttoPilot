import { Browser, Page } from "puppeteer";
import { ExceptionMessages } from "../constants";

export default class BrowserHelper {
  static async GetCurrentPage(browser: Browser) : Promise<Page> {
    var allPages = await browser.pages()

    if (allPages.length !== 2) {
      throw new Error(ExceptionMessages.InvalidNumberOfPages)
    }

    return allPages[1]
  }
}