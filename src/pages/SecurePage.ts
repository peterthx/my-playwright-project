import { type Locator, type Page } from "@playwright/test";
import { PageBase } from "./PageBase";

export class SecurePage extends PageBase {
  public readonly content: Locator;
  public readonly hdrSecure: Locator;
  private readonly btnLogout: Locator;

  constructor(page: Page) {
    super(page);
    this.content = page.locator("#content");
    this.btnLogout = page.locator('a[href="/logout"]');
    this.hdrSecure = page.locator("h2");
  }

  public async logout(): Promise<void> {
    if (await this.btnLogout.isVisible()) {
      await this.btnLogout.click();
    }
  }
}
