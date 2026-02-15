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

  test("logs in with valid credentials and shows Your username is invalid!", async ({
    page,
  }) => {
    loginPage = new LoginPage(page);
    await Promise.all([loginPage.login("tomholland", "SuperSecretPassword!")]);
    await page.screenshot({
      path: "src/screenshots/login-fail-user.png",
      fullPage: true,
    });
    await expect(page.locator("h2")).toHaveText("Login Page");
    await expect(page.locator("#flash-messages")).toContainText(
      "Your username is invalid!",
    );
    await expect(page.locator("#content")).toContainText(
      "This is where you can log into the secure area. Enter tomsmith for the username and SuperSecretPassword! for the password. If the information is wrong you should see error messages.",
    );
  });

  test("logs in with valid credentials and shows Your password is invalid!", async ({
    page,
  }) => {
    loginPage = new LoginPage(page);
    await Promise.all([loginPage.login("tomsmith", "Password!")]);
    await page.screenshot({
      path: "src/screenshots/login-fail-password.png",
      fullPage: true,
    });
    await expect(page.locator("h2")).toHaveText("Login Page");
    await expect(page.locator("#flash-messages")).toContainText(
      "Your password is invalid!",
    );
    await expect(page.locator("#content")).toContainText(
      "This is where you can log into the secure area. Enter tomsmith for the username and SuperSecretPassword! for the password. If the information is wrong you should see error messages.",
    );
  });

  test("logs in with valid credentials and shows Your username and password are invalid!", async ({
    page,
  }) => {
    loginPage = new LoginPage(page);
    await Promise.all([loginPage.login("tomholland", "Password!")]);
    await page.screenshot({
      path: "src/screenshots/login-fail-both.png",
      fullPage: true,
    });

    await expect(page.locator("h2")).toHaveText("Login Page");
    await expect(page.locator("#flash-messages")).toContainText(
      "Your username is invalid!",
    );
    await expect(page.locator("#content")).toContainText(
      "This is where you can log into the secure area. Enter tomsmith for the username and SuperSecretPassword! for the password. If the information is wrong you should see error messages.",
    );
  });
});
