# CI/CD Pipeline Quick Reference

## File Location
`.github/workflows/qa-tests.yml`

## What Triggers It?
✓ Push to `main` branch
✓ Pull Request to `main` branch

## What Tests Run?

### UI Tests
```
tests/ui/
├── TC001-Valid-Login.spec.js
├── TC002-Invalid-Login.spec.js
├── TC003-CartPage.spec.js
├── TC003.spec.js
├── TC004-CheckoutPage.spec.js
└── Tc.spec.js
```

### API Tests
```
tests/api/
└── jsonPlaceholder.spec.js
```

## Jobs
1. **ui-tests** - Runs all UI test suites
2. **api-tests** - Runs all API test suites
3. **test-summary** - Provides execution summary

## What Gets Generated?

### Always Generated
- `ui-test-report/` - HTML report of UI tests
- `api-test-report/` - HTML report of API tests

### On Failure
- `ui-test-screenshots/` - Screenshots and error details
- `api-test-results/` - Detailed error information

## How to View Results

### In GitHub:
1. Go to **Actions** tab
2. Click the workflow run
3. Scroll to **Artifacts**
4. Download and extract
5. Open `index.html` in browser

### Locally:
```bash
npx playwright show-report
```

## Configuration

### Node Version
- 18.x (configurable in matrix)

### Environment Variables
Set in repository Settings → Secrets:
- `SAUCE_DEMO_URL`
- `VALID_USERNAME`
- `VALID_PASSWORD`
- `LOCKED_OUT_USERNAME`
- `JSONPLACEHOLDER_BASE_URL`

(Defaults provided if not set)

## Pipeline Status
- ✅ Passes: All tests succeed
- ❌ Fails: Any test fails
- ⚠️ Pending: Still running

## Execution Time
- UI Tests: ~2-3 minutes
- API Tests: ~1-2 minutes
- Total: ~5-10 minutes

## Success Indicators

Check the Actions tab:
```
✅ ui-tests completed successfully
✅ api-tests completed successfully
✅ test-summary completed successfully
```

## Parallel Execution
Both jobs run in parallel, not sequentially. Test summary job waits for both to complete.

## Artifact Retention
All artifacts kept for **30 days**

## To Disable Pipeline
Comment out triggers in `.github/workflows/qa-tests.yml`

## To Run Manually
On GitHub: Actions → QA Test Suite → Run workflow

## Reports Structure
```
playwright-report/
├── index.html (main report)
├── <test-name>/
│   ├── trace.zip
│   ├── video.webm
│   └── screenshots/
```

## Common Issues

| Issue | Solution |
|---|---|
| Tests fail in CI but pass locally | Check .env values match GitHub secrets |
| Artifacts not generated | Verify test paths, check Playwright output |
| Slow execution | Tests run serially; consider optimizing test count |
| Browser not found | `npx playwright install --with-deps` in step |

## Quick Commands

```bash
# Run all tests with HTML report
npx playwright test --reporter=html

# View the report
npx playwright show-report

# Run only UI tests
npx playwright test tests/ui/

# Run only API tests
npx playwright test tests/api/

# Run specific test file
npx playwright test tests/ui/TC003.spec.js
```

## Next: Push to GitHub
Once you have this configured:
1. `git add .github/workflows/qa-tests.yml`
2. `git commit -m "Add CI/CD pipeline"`
3. `git push origin main`
4. Go to Actions tab to monitor

Pipeline will automatically run! 
