import { type Locator, type Page } from "@playwright/test";

export class PageBase {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  public async navigate(path: string): Promise<void> {
    await this.page.goto(path);
  }

  public async getTitle(): Promise<string> {
    return await this.page.title();
  }

  public async getUrl(): Promise<string> {
    return this.page.url();
  }

  protected async waitForElement(locator: Locator): Promise<void> {
    await locator.waitFor();
  }
}
