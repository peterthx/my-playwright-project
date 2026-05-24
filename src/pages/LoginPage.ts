import { type Locator, type Page } from "@playwright/test";
import { PageBase } from "./PageBase";

export class LoginPage extends PageBase {
  
  constructor(page: Page) {
    super(page);
  }

  private get txtUsername(): Locator {
    return this.page.locator("#username")
  }

  private get txtPassword(): Locator {
    return this.page.locator("#password")
  }
  private get submitButton(): Locator {
    return this.page.locator('button[type="submit"]');
  }

  get msgFlash(): Locator {
    return this.page.locator("#flash-messages")
  }

  get content(): Locator {
    return this.page.locator("#content")
  }

  get hdrLogin(): Locator {
    return this.page.locator("h2")
  }

  public async navigate(): Promise<void> {
    await super.navigate("/login");
  }

  public async login(username: string, password: string): Promise<void> {
    await this.txtUsername.fill(username);
    await this.txtPassword.fill(password);
    await this.submitButton.click();
  }
}
