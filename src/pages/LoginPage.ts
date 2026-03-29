import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
  public readonly usernameInput: Locator;
  public readonly passwordInput: Locator;
  public readonly submitButton: Locator;
  public readonly flashMessages: Locator;
  public readonly content: Locator;
  public readonly logoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.submitButton = page.locator('button[type="submit"]');
    this.flashMessages = page.locator("#flash-messages");
    this.content = page.locator("#content");
    this.logoutButton = page.locator('a[href="/logout"]');
  }

  async navigate() {
    await super.navigate("/login");
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async logout() {
    if (await this.logoutButton.isVisible()) {
      await this.logoutButton.click();
    }
  }
}