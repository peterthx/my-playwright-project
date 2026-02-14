import { test, expect } from "@playwright/test";
import { LoginPage } from "../Pages/LoginPage";

test.describe("Login page demo", () => {
let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    await page.goto("http://the-internet.herokuapp.com/login");
    await expect(page).toHaveTitle(/The Internet/);
  });

  test("logs in with valid credentials and shows secure area", async ({page,}) => {
    loginPage = new LoginPage(page);

    await Promise.all([
      loginPage.login('tomsmith', 'SuperSecretPassword!'),
    ]);

    await expect(page).toHaveURL(/\/secure/);
    await expect(page.locator('h2')).toHaveText('Secure Area');
    await expect(loginPage.content).toContainText('Welcome to the Secure Area');
  });

  test.afterEach(async ({ page }) => {
    const logout = page.locator('a[href="/logout"]');
    if ((await logout.count()) > 0 && (await logout.isVisible())) {
      await logout.click();
      await expect(page).toHaveURL(/\/login/);
    }
  });
});
