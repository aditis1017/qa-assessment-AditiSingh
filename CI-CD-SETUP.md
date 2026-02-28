# CI/CD Pipeline Setup Guide

## Overview
This GitHub Actions workflow runs automated UI and API tests on every push to `main` branch and pull requests.

## Workflow File
Location: `.github/workflows/qa-tests.yml`

## Triggers
The pipeline runs automatically when:
- Code is pushed to the `main` branch
- A pull request is created targeting the `main` branch

## Jobs

### 1. UI Tests Job
**Name:** `ui-tests`

**What it does:**
- Installs Node.js dependencies
- Installs Playwright browsers
- Runs all UI tests from `tests/ui/` directory
- Generates HTML test report
- Uploads test artifacts on any result

**Environment Variables:**
- `SAUCE_DEMO_URL` - Sauce Demo application URL
- `VALID_USERNAME` - Standard user credentials
- `VALID_PASSWORD` - Password for testing
- `LOCKED_OUT_USERNAME` - Locked out user for negative tests

**Test Files Run:**
- `tests/ui/TC001-Valid-Login.spec.js`
- `tests/ui/TC002-Invalid-Login.spec.js`
- `tests/ui/TC003-CartPage.spec.js`
- `tests/ui/TC003.spec.js`
- `tests/ui/TC004-CheckoutPage.spec.js`
- `tests/ui/Tc.spec.js`

### 2. API Tests Job
**Name:** `api-tests`

**What it does:**
- Installs Node.js dependencies
- Installs Playwright browsers
- Runs all API tests from `tests/api/` directory
- Generates HTML test report
- Uploads test artifacts on any result

**Environment Variables:**
- `JSONPLACEHOLDER_BASE_URL` - JSONPlaceholder API base URL

**Test Files Run:**
- `tests/api/jsonPlaceholder.spec.js`

### 3. Test Summary Job
**Name:** `test-summary`

**What it does:**
- Runs after both UI and API tests complete
- Checks if any tests failed
- Provides summary of test execution
- Fails the workflow if either job failed

## Artifacts (Generated on Completion)

### Success Case
Artifacts are uploaded regardless of test outcome:

1. **UI Test Report** 
   - Location: `ui-test-report/` (from `playwright-report/`)
   - Contents: HTML report with test results
   - Retention: 30 days

2. **API Test Report**
   - Location: `api-test-report/` (from `playwright-report/`)
   - Contents: HTML report with API test results
   - Retention: 30 days

### Failure Case
Additional artifacts on failure:

3. **UI Test Screenshots**
   - Location: `ui-test-screenshots/` (from `test-results/`)
   - Contents: Screenshots and error context
   - Retention: 30 days

4. **API Test Results**
   - Location: `api-test-results/` (from `test-results/`)
   - Contents: Detailed error information
   - Retention: 30 days

## Accessing Test Reports

### From GitHub Actions:
1. Go to your repository → **Actions** tab
2. Click on the workflow run
3. Scroll to **Artifacts** section
4. Download the desired report

### View HTML Report:
1. Download the artifact (e.g., `ui-test-report`)
2. Extract the zip file
3. Open `index.html` in your browser
4. View detailed test results with videos/screenshots

## Environment Variables / Secrets

### Setting up Secrets in GitHub:
1. Go to repository → **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Add the following secrets (optional - defaults are provided):

| Secret Name | Default Value | Purpose |
|---|---|---|
| `SAUCE_DEMO_URL` | `https://www.saucedemo.com` | Sauce Demo app URL |
| `VALID_USERNAME` | `standard_user` | Test user username |
| `VALID_PASSWORD` | `secret_sauce` | Test user password |
| `LOCKED_OUT_USERNAME` | `locked_out_user` | Locked out test user |
| `JSONPLACEHOLDER_BASE_URL` | `https://jsonplaceholder.typicode.com` | JSONPlaceholder API URL |

## Running Tests Locally (Without CI/CD)

### UI Tests:
```bash
npx playwright test tests/ui/
```

### API Tests:
```bash
npx playwright test tests/api/
```

### All Tests:
```bash
npx playwright test
```

### With HTML Report:
```bash
npx playwright test --reporter=html
```

### View Report:
```bash
npx playwright show-report
```

## Pipeline Status Badge

Add this to your README.md to display pipeline status:

```markdown
![QA Test Suite](https://github.com/YOUR_USERNAME/EndlessDomains/actions/workflows/qa-tests.yml/badge.svg)
```

## Troubleshooting

### Tests fail in CI but pass locally:
1. Check environment variables are set correctly
2. Verify `package.json` has all dependencies
3. Ensure `.env` file has correct values
4. Check Playwright browser versions

### Artifacts not uploading:
1. Verify test report paths in workflow
2. Check job hasn't been cancelled
3. Ensure runner has disk space

### Slow test execution:
1. Tests run serially by default
2. Consider parallel workers: `npx playwright test --workers=4`
3. Can be added to workflow file if needed

## Test Coverage

- **UI Tests:** 6 test files covering login, cart, and checkout flows
- **API Tests:** 5 test cases covering CRUD operations on JSONPlaceholder
- **Total Coverage:** 11+ test suites with comprehensive validations

## Workflow Duration

Typical execution times:
- UI Tests: ~2-3 minutes
- API Tests: ~1-2 minutes
- Total Pipeline: ~5-10 minutes

## Next Steps

1. Push code to GitHub with this workflow file
2. Create a pull request to see the workflow in action
3. Monitor the **Actions** tab for results
4. Download and review test reports
5. Customize environment variables as needed

## Support

For issues with:
- **Playwright**: https://playwright.dev/docs/intro
- **GitHub Actions**: https://docs.github.com/en/actions
- **Test Framework**: Check individual test file comments
