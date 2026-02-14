# My Playwright Project

A Playwright test automation project using the **Page Object Model (POM)** pattern to test the login functionality of [The Internet](http://the-internet.herokuapp.com/).

## 📋 Project Overview

This project demonstrates E2E testing best practices with Playwright, including:
- ✅ Page Object Model pattern for maintainable tests
- ✅ Multiple test scenarios (success, validation failures)
- ✅ Proper setup/teardown with `beforeEach` and `afterEach` hooks
- ✅ Safe element waits and navigation handling

### Test Coverage

| Test File | Scenario | Status |
|-----------|----------|--------|
| `example.spec.ts` | Valid login + secure area verification | ✅ Passing |
| `LoginPageSuccess.spec.ts` | Valid credentials login | ✅ Passing |
| `LoginPageUsrFail.spec.ts` | Invalid username error | 🔧 Configured |
| `LoginPagePswdFail.spec.ts` | Invalid password error | 🔧 Configured |
| `LoginPageBothFail.spec.ts` | Invalid username & password error | ✅ Passing |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v16 or higher)
- **pnpm** (v10.29.3 or higher) - see `packageManager` in `package.json`

### Installation

1. Install dependencies:
```bash
pnpm install
```

2. Install Playwright browsers:
```bash
pnpm exec playwright install
```

### Environment

- **Target Application**: [The Internet - Login Page](http://the-internet.herokuapp.com/login)
- **Valid Credentials**:
  - Username: `tomsmith`
  - Password: `SuperSecretPassword!`

---

## 📝 Available Scripts

### Run All Tests
```bash
pnpm test
```

### Run Tests in Headed Mode (see browser)
```bash
pnpm test:headed
```

### Run Specific Test File
```bash
pnpm exec playwright test src/tests/LoginPageSuccess.spec.ts
```

### Run Tests Matching a Pattern
```bash
pnpm exec playwright test -g "logs in with valid"
```

### Run with Debug Mode
```bash
pnpm exec playwright test --debug
```

### View Test Report
```bash
pnpm exec playwright show-report
```

---

## 📁 Project Structure

```
my-playwright-project/
├── src/
│   ├── Pages/
│   │   └── LoginPage.ts          # Page Object Model
│   └── tests/
│       ├── example.spec.ts       # Basic login test
│       ├── LoginPageSuccess.spec.ts
│       ├── LoginPageUsrFail.spec.ts
│       ├── LoginPagePswdFail.spec.ts
│       └── LoginPageBothFail.spec.ts
├── test-results/                 # Test execution reports
├── package.json
├── pnpm-lock.yaml
└── README.md
```

---

## 🔧 Page Object Model (LoginPage)

The `LoginPage` class encapsulates all login page interactions and locators:

```typescript
// Import
import { LoginPage } from "../Pages/LoginPage";

// Usage in tests
const loginPage = new LoginPage(page);
await loginPage.login('tomsmith', 'SuperSecretPassword!');
await expect(loginPage.content).toContainText('Secure Area');
```

### Available Methods & Locators

```typescript
// Methods
loginPage.login(username: string, password: string)

// Locators
loginPage.usernameInput      // #username
loginPage.passwordInput      // #password
loginPage.submitButton       // [type="submit"]
loginPage.flashMessages      // #flash-messages
loginPage.content            // #content
loginPage.page               // Playwright Page object
```

---

## ✅ Test Examples

### Valid Login
```typescript
test('logs in with valid credentials and shows secure area', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await Promise.all([
    page.waitForNavigation(),
    loginPage.login('tomsmith', 'SuperSecretPassword!'),
  ]);

  await expect(page).toHaveURL(/\/secure/);
  await expect(page.locator('h2')).toHaveText('Secure Area');
});
```

### Setup & Teardown
```typescript
test.beforeEach(async ({ page }) => {
  await page.goto('http://the-internet.herokuapp.com/login');
  await expect(page).toHaveTitle(/The Internet/);
});

test.afterEach(async ({ page }) => {
  const logout = page.locator('a[href="/logout"]');
  if ((await logout.count()) > 0 && (await logout.isVisible())) {
    await logout.click();
  }
});
```

---

## 🎯 Best Practices Used

1. **Page Object Model** - Locators and interactions are centralized in `LoginPage`
2. **Proper Waits** - Navigation waits prevent race conditions
3. **Safe Element Checks** - Logout checks if element exists before clicking
4. **Descriptive Test Names** - Test names clearly describe the scenario
5. **Reusable Setup/Teardown** - Common setup in `beforeEach`, cleanup in `afterEach`
6. **Test Isolation** - Each test is independent and doesn't rely on execution order

---

## 🐛 Troubleshooting

### Tests timeout
- Ensure The Internet website is accessible
- Check network connectivity
- Increase timeout: `test.setTimeout(60000)` in test file

### Browser not found
```bash
pnpm exec playwright install
```

### Port already in use
- Ensure no other instances of Playwright are running
- Kill process: `lsof -ti:3000 | xargs kill -9`

---

## 📚 Resources

- [Playwright Documentation](https://playwright.dev)
- [Playwright Testing Guide](https://playwright.dev/docs/intro)
- [The Internet - Practice Application](http://the-internet.herokuapp.com/)
- [Page Object Model Pattern](https://playwright.dev/docs/pom)

---

## 📄 License

ISC

---

## 👤 Author

Created as a Playwright testing demonstration project.

---

**Last Updated**: February 14, 2026
