import { test, expect } from "@playwright/test";
import { LoginPage } from "../Pages/LoginPage";

test.describe("Login page demo", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test("logs in with valid credentials and shows secure area", async ({
    page,
  }) => {
    await loginPage.login("tomsmith", "SuperSecretPassword!");
    await page.screenshot({
      path: "src/screenshots/login-success.png",
      fullPage: true,
    });

    // Assertions
    await expect(page).toHaveURL(/\/secure/);
    await expect(page.locator("h2")).toHaveText("Secure Area");
    await expect(loginPage.content).toContainText("Welcome to the Secure Area");
  });

  test.afterEach(async () => {
    await loginPage.logout();
  });
});
