import { test, expect } from "../fixtures/Page.Fixture";
import {
  validUser,
  invalidUser,
  invalidPassword,
  invalidUserPasswordBoth,
} from "../data/Users";

test.describe("Login page demo", () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigate();
  });

  test("logs in with valid credentials and shows secure area", async ({
    loginPage,
    securePage,
    page,
  }) => {
    await loginPage.login(validUser.username, validUser.password);

    // Assertions
    await expect(page).toHaveURL(/\/secure/);
    await expect(securePage.hdrSecure).toHaveText("Secure Area");
    await expect(securePage.content).toContainText(
      "Welcome to the Secure Area",
    );

    // Clean up
    await securePage.logout();
  });

  test("logs in with invalid username and shows error message", async ({
    loginPage,
  }) => {
    await loginPage.login(invalidUser.username, invalidUser.password);

    await expect(loginPage.hdrLogin).toHaveText("Login Page");
    await expect(loginPage.msgFlash).toContainText("Your username is invalid!");
    await expect(loginPage.content).toContainText(
      "This is where you can log into the secure area.",
    );
  });

  test("logs in with invalid password and shows error message", async ({
    loginPage,
  }) => {
    await loginPage.login(invalidPassword.username, invalidPassword.password);

    await expect(loginPage.hdrLogin).toHaveText("Login Page");
    await expect(loginPage.msgFlash).toContainText("Your password is invalid!");
    await expect(loginPage.content).toContainText(
      "This is where you can log into the secure area.",
    );
  });

  test("logs in with both invalid credentials and shows error message", async ({
    loginPage,
  }) => {
    await loginPage.login(
      invalidUserPasswordBoth.username,
      invalidUserPasswordBoth.password,
    );

    await expect(loginPage.hdrLogin).toHaveText("Login Page");
    await expect(loginPage.msgFlash).toContainText("Your username is invalid!");
    await expect(loginPage.content).toContainText(
      "This is where you can log into the secure area.",
    );
  });
});
