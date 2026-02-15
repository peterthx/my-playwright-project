# My Playwright Project

A Playwright test automation project using the **Page Object Model (POM)** pattern to test the login functionality of [The Internet](http://the-internet.herokuapp.com/).

## 📋 Project Overview

This project demonstrates E2E testing best practices with Playwright, including:
- ✅ Page Object Model pattern for maintainable tests
- ✅ Multiple test scenarios (success, validation failures)
- ✅ Proper setup/teardown with `beforeEach` and `afterEach` hooks
- ✅ Safe element waits and navigation handling

### Test Coverage

| Test File | Scenarios | Status |
|-----------|-----------|--------|
| `LoginPageUsecase.spec.ts` | Valid login, invalid username, invalid password, invalid credentials | ✅ Passing |

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
│   ├── pages/
│   │   └── LoginPage.ts              # Page Object Model
│   ├── screenshots/                  # Test screenshots
│   └── tests/
│       └── LoginPageUsecase.spec.ts  # Login test scenarios
├── playwright-report/                # Test report
├── test-results/                     # Test execution details
├── package.json
├── pnpm-lock.yaml
├── playwright.config.ts
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

## � Git Commit Guidelines

### Commit Message Format

Follow the **Conventional Commits** specification for clear, semantic commit messages:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat**: New feature or test scenario
- **fix**: Bug fix or test correction
- **refactor**: Code refactoring without feature changes
- **test**: Adding or updating tests
- **docs**: Documentation updates (README, comments)
- **chore**: Build, dependencies, configuration changes
- **perf**: Performance improvements

### Scope

Optional scope indicating which part of the project:
- `login-tests` - Login test scenarios
- `page-object` - LoginPage class updates
- `config` - Configuration files
- `deps` - Dependencies

### Subject

- Use imperative mood ("add" not "added")
- Don't capitalize first letter
- No period (.) at the end
- Limit to 50 characters

### Examples

**Good commits:**
```bash
git commit -m "test(login-tests): add invalid password error scenario"
git commit -m "feat(page-object): add new helper method for form validation"
git commit -m "docs: update README with setup instructions"
git commit -m "fix(login-tests): handle navigation timeout in beforeEach"
git commit -m "chore(deps): update playwright to v1.40.0"
```

**With body (for complex changes):**
```bash
git commit -m "refactor(page-object): reorganize locators by element type

- Group input locators together
- Group button locators together
- Improve readability and maintainability

This makes the LoginPage class easier to navigate and update."
```

### Best Practices

1. **Commit Often** - Make small, focused commits
2. **One Concern Per Commit** - Don't mix multiple features/fixes
3. **Descriptive Messages** - Future you will appreciate clarity
4. **Reference Issues** - Use `Fixes #123` in footer for issue tracking
5. **Review Before Committing** - Use `git diff` to review changes

### Useful Commands

```bash
# View staged changes
git diff --staged

# View unstaged changes
git diff

# Amend last commit
git commit --amend

# Interactive rebase (clean up commits)
git rebase -i HEAD~3

# View commit history
git log --oneline
```

---

## �📚 Resources

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

**Last Updated**: February 15, 2026
