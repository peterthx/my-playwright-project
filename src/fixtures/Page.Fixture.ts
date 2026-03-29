import { test as base } from "@playwright/test";
import { PageBase } from "../pages/PageBase";
import { LoginPage } from "../pages/LoginPage";
import { SecurePage } from "../pages/SecurePage";

type CommonFixtures = {
  pageBase: PageBase;
  loginPage: LoginPage;
  securePage: SecurePage;
};

export const test = base.extend<CommonFixtures>({
  pageBase: async ({ page }, use) => {
    const pageBase = new PageBase(page);
    await use(pageBase);
  },
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  securePage: async ({ page }, use) => {
    const securePage = new SecurePage(page);
    await use(securePage);
  },
});

export { expect } from "@playwright/test";
