import { type Locator, type Page } from "@playwright/test";
import { PageBase } from "./PageBase";

export class SecurePage extends PageBase {

  constructor(page: Page) {
    super(page);
  }

  public get content(): Locator {
    return this.page.locator("#content");
  }

  public get btnLogout(): Locator {
    return this.page.locator('a[href="/logout"]');
  }

  public get hdrSecure(): Locator {
    return this.page.locator('h2')
  }

  public async logout(): Promise<void> {
    if (await this.btnLogout.isVisible()) {
      await this.btnLogout.click();
    }
  }
}
