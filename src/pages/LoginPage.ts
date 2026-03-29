import { type Locator, type Page } from "@playwright/test";
import { PageBase } from "./PageBase";

export class LoginPage extends PageBase {
  private readonly txtUsername: Locator;
  private readonly txtPassword: Locator;
  private readonly submitButton: Locator;
  public readonly msgFlash: Locator;
  public readonly content: Locator;
  public readonly hdrLogin: Locator;

  constructor(page: Page) {
    super(page);
    this.txtUsername = page.locator("#username");
    this.txtPassword = page.locator("#password");
    this.submitButton = page.locator('button[type="submit"]');
    this.msgFlash = page.locator("#flash-messages");
    this.content = page.locator("#content");
    this.hdrLogin = page.locator("h2");
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
