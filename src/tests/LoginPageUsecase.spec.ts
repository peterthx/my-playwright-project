import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { validUser, invalidUser, invalidPassword, invalidUserPasswordBoth } from "../data/Users";

test.describe("Login page demo", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test("logs in with valid credentials and shows secure area", async ({ page }) => {
    await loginPage.login(validUser.username, validUser.password);

    // Assertions
    await expect(page).toHaveURL(/\/secure/);
    await expect(page.locator("h2")).toHaveText("Secure Area");
    await expect(loginPage.content).toContainText("Welcome to the Secure Area");
  });

  test.afterEach(async () => {
    await loginPage.logout();
  });

  test("logs in with invalid username and shows error message", async ({ page }) => {
    await loginPage.login(invalidUser.username, invalidUser.password);

    await expect(page.locator("h2")).toHaveText("Login Page");
    await expect(loginPage.flashMessages).toContainText("Your username is invalid!");
    await expect(page.locator("#content")).toContainText("This is where you can log into the secure area.");
  });

  test("logs in with invalid password and shows error message", async ({ page }) => {
    await loginPage.login(invalidPassword.username, invalidPassword.password);

    await expect(page.locator("h2")).toHaveText("Login Page");
    await expect(loginPage.flashMessages).toContainText("Your password is invalid!");
    await expect(page.locator("#content")).toContainText("This is where you can log into the secure area.");
  });

  test("logs in with both invalid credentials and shows error message", async ({ page }) => {
    await loginPage.login(invalidUserPasswordBoth.username, invalidUserPasswordBoth.password);

    await expect(page.locator("h2")).toHaveText("Login Page");
    await expect(loginPage.flashMessages).toContainText("Your username is invalid!");
    await expect(page.locator("#content")).toContainText("This is where you can log into the secure area.");
  });
});
