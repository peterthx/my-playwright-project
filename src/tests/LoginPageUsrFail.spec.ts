import { test, expect } from "@playwright/test";
import { LoginPage } from "../Pages/LoginPage";

test.describe("Login page demo", () => {
  let loginPage: LoginPage;
  test.beforeEach(async ({ page }) => {
    await page.goto("http://the-internet.herokuapp.com/login");
    await expect(page).toHaveTitle(/The Internet/);
  });

  test("logs in with valid credentials and shows Your username is invalid!", async ({
    page,
  }) => {
    loginPage = new LoginPage(page);
    await Promise.all([loginPage.login("tomholland", "SuperSecretPassword!")]);
    await expect(page.locator("h2")).toHaveText("Login Page");
    await expect(page.locator("#flash-messages")).toContainText(
      "Your username is invalid!",
    );
    await expect(page.locator("#content")).toContainText(
      "This is where you can log into the secure area. Enter tomsmith for the username and SuperSecretPassword! for the password. If the information is wrong you should see error messages.",
    );
  });
});
