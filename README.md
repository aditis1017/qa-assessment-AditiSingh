# QA Testing Framework - EndlessDomains

Welcome to the QA Testing Framework! This guide walks you through the project structure, how to run tests, and how our automated testing pipeline works. If you're new to testing, don't worry—we've kept things straightforward.

## Project Structure

Here's how the project is organized:

```
EndlessDomains/
│
├── tests/                             # All test files
│   ├── ui/                            # Web UI tests
│   │   ├── TC001-Valid-Login.spec.js
│   │   ├── TC002-Invalid-Login.spec.js
│   │   ├── TC003-CartPage.spec.js
│   │   └── TC004-CheckoutPage.spec.js
│   │
│   ├── api/                           # REST API tests
│   │   ├── jsonPlaceholder.spec.js
│   │   └── jsonPlaceholder.api.js
│   │
│   └── fixtures/                      # Test data files
│       ├── errorMessages.json
│       ├── inventoryItems.json
│       └── chechoutPage.json
│
├── pageObjects/                       # Page helper classes
│   ├── LoginPage.js
│   ├── InventoryPage.js
│   ├── CartPage.js
│   ├── CheckoutPage.js
│   └── Cart.js
│
├── .github/workflows/
│   └── qa-tests.yml                   # CI/CD pipeline configuration
│
├── playwright-report/                 # Auto-generated test results
├── .env                               # Environment variables (credentials, URLs)
├── playwright.config.js               # Playwright configuration
├── package.json                       # Project dependencies
└── README.md                          # This file
```

**tests/** contains all test files separated into two categories:
- **ui/** has tests that run against the web application (login, cart, checkout)
- **api/** has tests for REST API endpoints

**pageObjects/** holds helper classes that make tests cleaner and easier to maintain. Instead of writing the same selectors repeatedly, we create reusable methods.
**fixtures/** stores test data in JSON format. This keeps test data separate from test logic, making it easy to update values without touching code.

**.github/workflows/** contains the CI/CD configuration that automatically runs tests whenever code is pushed to GitHub.

## Tech Stack

The project uses Playwright 1.58.2 for both UI and API testing, Node.js 18 as the runtime, JavaScript for writing tests, dotenv for managing environment variables, and GitHub Actions for the CI/CD pipeline.

These tools were chosen because they're straightforward to use, well-documented, and integrate well together. Playwright is particularly nice because it handles both browser automation and API testing in one tool—you only need to learn one framework.

## Running Tests

### UI Tests Only

```bash
npx playwright test tests/ui/
```

This runs tests for the web UI: login, inventory, cart, and checkout. Takes about 2-3 minutes.

### API Tests Only

```bash
npx playwright test tests/api/
```

This tests the REST API endpoints (using JSONPlaceholder). Takes about 1 minute.

### All Tests

```bash
npx playwright test
```

Runs both UI and API tests together. Takes about 5 minutes total.

### Single Test File

```bash
npx playwright test tests/ui/TC001-Valid-Login.spec.js
```

Run just one specific test file. Useful for debugging.

### View Test Results

```bash
npx playwright show-report
```

After running tests, this opens an interactive HTML report showing results, execution times, screenshots (if tests failed), and videos. Pretty handy for understanding what happened.

## CI/CD Pipeline (Automated Testing)

When you push code to GitHub, our pipeline automatically runs all tests. The basic flow looks like this:


```
Developer pushes code → GitHub Actions runs tests → Tests pass? Merge it! Tests fail? Fix before merging
```

The pipeline runs UI and API tests in parallel (they don't wait for each other), so the whole thing takes about 3-4 minutes. When tests complete, GitHub generates reports and screenshots that you can review.

The configuration lives in `.github/workflows/qa-tests.yml`. It triggers on every push to main and every pull request. You can see the results in the Actions tab of your GitHub repo.

The pipeline also stores test artifacts for 30 days, so you can go back and check what happened with a test that failed last week.

## Environment Variables

We keep sensitive stuff in a `.env` file that doesn't get committed to Git:

```
SAUCE_DEMO_URL = https://www.saucedemo.com
VALID_USERNAME = standard_user
VALID_PASSWORD = secret_sauce
JSONPLACEHOLDER_BASE_URL = https://jsonplaceholder.typicode.com
```

This way, test credentials stay safe. Make sure your `.env` file is in `.gitignore` so it never gets pushed.

## Test Coverage

Right now we're testing:

**UI Tests** - 4 test files covering:
- Login with valid credentials
- Login failures (locked out user)
- Shopping cart (add items, verify names and prices)
- Checkout process (fill form, submit order)

**API Tests** - 5 test cases:
- GET /posts (fetch all)
- GET /posts/1 (fetch single post)
- POST /posts (create new)
- PUT /posts/1 (update existing)
- GET /posts/9999 (verify 404 handling)

All together, that's 9+ test scenarios covering 4 pages and 5 API endpoints.

### What We Could Add Later

If you want to expand coverage:
- Logout flow
- Product filtering and sorting
- Multiple payment methods
- API user/album endpoints
- Performance testing
- Visual regression testing
- Mobile responsive testing

## Page Object Model - Why We Use It

If you look at LoginPage.js or CartPage.js, you'll notice they're helper classes that wrap up page interactions. Instead of writing selectors everywhere, we centralize them.

The idea is simple: when the UI changes, you only fix it in one place (the page object), not in every test file. Tests also become much more readable because instead of seeing a bunch of selector strings, you see method names like `login()` or `addToCart()`.

## Common Commands

```bash
npm install                              # Install dependencies first
npx playwright test                      # Run all tests
npx playwright test tests/ui/            # Run UI tests
npx playwright test tests/api/           # Run API tests
npx playwright test tests/ui/TC001-*    # Run specific test
npx playwright show-report               # View test report
npx playwright test --headed             # Run with browser visible
npx playwright test --ui                 # Open interactive debugger
npx playwright install --with-deps       # Update browsers
```

## Troubleshooting

**Playwright browsers not found?** Run `npx playwright install --with-deps`

**Tests pass locally but fail on GitHub?** Check that your `.env` values match. Also verify Node.js version is 18+.

**Can't find a test file?** Make sure the path exists and use forward slashes like `tests/ui/TC001-Valid-Login.spec.js`

**Tests feel slow?** That's normal—Playwright runs tests one at a time by default for safety. If you want them faster, we can configure parallel execution.

## Getting Started

New to the project? Here's what to do:

1. Clone the repo and run `npm install`
2. Create a `.env` file with your credentials
3. Run `npx playwright test` to make sure everything works
4. Look at TC001-Valid-Login.spec.js to see what a test looks like
5. Check out LoginPage.js to see how page objects work
6. Ask questions if anything's unclear

When writing your own test, follow this pattern:

```javascript
import { test, expect } from '@playwright/test';

test('my test name', async ({ page }) => {
  // Set things up
  const loginPage = new LoginPage(page);
  
  // Do the action
  await loginPage.goto();
  await loginPage.login('user', 'pass');
  
  // Check the result
  expect(page).toHaveURL('**/inventory.html');
});
```

## Resources

- Playwright docs: https://playwright.dev/docs/intro
- GitHub Actions: https://docs.github.com/en/actions
- JavaScript primer: https://javascript.info/

## Questions or Issues?

Check CI-CD-QUICK-REFERENCE.md for common answers, look at existing tests for examples, or ask your team lead. Good luck!

