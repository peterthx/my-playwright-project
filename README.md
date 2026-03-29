# My Playwright Project

A Playwright test automation project using the **Page Object Model (POM)** pattern to test the login functionality of [The Internet](http://the-internet.herokuapp.com/).

## 📋 Project Overview

This project demonstrates E2E testing best practices with Playwright, including:
- ✅ **Base Page Pattern**: Shared logic and navigation in `BasePage.ts`.
- ✅ **Page Object Model (POM)**: Encapsulated page interactions in `LoginPage.ts`.
- ✅ **Data-Driven Testing**: Externalized test data in `src/data/Users.ts` with TypeScript interfaces.
- ✅ **Clean Assertions**: Using Playwright's web-first assertions for reliability.
- ✅ **Automated Reporting**: Integrated HTML and JUnit reports.

### Test Coverage

| Test File | Scenarios | Status |
|-----------|-----------|--------|
| `LoginPageUsecase.spec.ts` | Valid login, Invalid username, Invalid password, Both invalid | ✅ Passing |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18 or higher recommended)
- **pnpm** (v10.30.3 or higher)

### Installation

1. Install dependencies:
```bash
pnpm install
```

2. Install Playwright browsers:
```bash
pnpm exec playwright install chromium
```

---

## 📝 Available Scripts

Since this is a fresh setup, you can run Playwright commands directly:

### Run All Tests
```bash
npx playwright test
```

### Run Tests in Headed Mode
```bash
npx playwright test --headed
```

### Debug Tests
```bash
npx playwright test --debug
```

### View Test Report
```bash
npx playwright show-report
```

---

## 📁 Project Structure

```
my-playwright-project/
├── src/
│   ├── data/
│   │   └── Users.ts                # Test data and User interface
│   ├── pages/
│   │   ├── BasePage.ts             # Base class for all pages
│   │   └── LoginPage.ts            # Login page logic (POM)
│   └── tests/
│       └── LoginPageUsecase.spec.ts # Login test scenarios
├── playwright-report/              # Generated HTML reports
├── test-results/                   # Artifacts from failed tests (traces, videos)
├── package.json
├── playwright.config.ts            # Global Playwright configuration
└── README.md
```

---

## 🔧 Architecture

### Page Object Model
We use a hierarchical POM structure. `BasePage` contains common utilities like navigation and URL checks, while specific pages like `LoginPage` extend it.

```typescript
// src/pages/LoginPage.ts
export class LoginPage extends BasePage {
  public readonly usernameInput: Locator;
  // ...
  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    // ...
  }
}
```

### Test Data Management
Test data is decoupled from test logic using `src/data/Users.ts`:

```typescript
export interface User {
  username: string;
  password: string;
}

export const validUser: User = { ... };
```

---

## ✅ Best Practices Applied

1. **Separation of Concerns**: UI locators are in Page Objects, data is in Data files, and logic is in Specs.
2. **Type Safety**: Full TypeScript support with custom interfaces for test data.
3. **Web-First Assertions**: Utilizing `expect(locator).toBeVisible()` which includes built-in retries.
4. **Configuration over Hardcoding**: Screenshots, videos, and base URLs are managed in `playwright.config.ts`.
5. **No Manual Screenshots**: Configured to capture screenshots automatically on failure/success via config, keeping test code clean.

---

## 📄 License

ISC

---

**Last Updated**: March 29, 2026
