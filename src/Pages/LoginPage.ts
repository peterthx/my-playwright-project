// LoginPage.ts
import { type Locator, type Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly flashMessages: Locator;
  readonly content: Locator;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator("#username");
    this.passwordInput = page.locator("#password");
    this.submitButton = page.locator('button[type="submit"]'); // Slightly more specific
    this.flashMessages = page.locator("#flash"); // Common ID for this specific demo site
    this.content = page.locator("#content");
    this.logoutButton = page.locator('a[href="/logout"]');
  }

  async navigate() {
    await this.page.goto("/login"); // Direct navigation is faster for login tests
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