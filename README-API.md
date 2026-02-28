# JSONPlaceholder API Tests

Comprehensive API testing suite using Playwright for JSONPlaceholder endpoints.

## Test Coverage

### Test Cases

| ID | Test Case | Method | Endpoint | Validations |
|---|---|---|---|---|
| TC-API-001 | List all posts | GET | /posts | Status 200, Array of 100 posts, Required fields (id, title, body, userId), Data types |
| TC-API-002 | Get single post | GET | /posts/1 | Status 200, Correct ID, All required fields present, Data types, Non-empty values |
| TC-API-003 | Create a post | POST | /posts | Status 201, Request body reflected in response, ID generated, Data types |
| TC-API-004 | Update a post | PUT | /posts/1 | Status 200, Updated fields reflected, All fields present, Data types |
| TC-API-005 | Post not found | GET | /posts/9999 | Status 404, Empty response body {} |

## Schema Validations

Each test validates:
- ✓ HTTP Status Code
- ✓ Content-Type Header (application/json)
- ✓ Required Fields Presence
- ✓ Data Types Correctness
- ✓ Array Structure (for list operations)
- ✓ Value Validity

## Running the Tests

### Run all API tests:
```bash
npx playwright test tests/api/
```

### Run specific test file:
```bash
npx playwright test tests/api/jsonPlaceholder.spec.js
```

### Run with verbose output:
```bash
npx playwright test tests/api/jsonPlaceholder.spec.js --reporter=list
```

### Run with UI mode:
```bash
npx playwright test tests/api/jsonPlaceholder.spec.js --ui
```

### Run with headed browser (for debugging):
```bash
npx playwright test tests/api/jsonPlaceholder.spec.js --headed
```

## Project Structure

```
tests/api/
├── jsonPlaceholder.spec.js    # All test cases
├── jsonPlaceholder.api.js     # API client helper class
└── README.md                   # This file
```

## API Helper Class

The `JSONPlaceholderAPI` class provides utility methods:

```javascript
const api = new JSONPlaceholderAPI(request);

// List all posts
await api.getAllPosts();

// Get single post
await api.getPost(postId);

// Create a post
await api.createPost({ title, body, userId });

// Update a post
await api.updatePost(postId, { title, body, userId });

// Delete a post
await api.deletePost(postId);
```

## Key Features

1. **Schema Validation** - Validates response structure and data types
2. **Header Validation** - Ensures correct Content-Type headers
3. **Status Code Validation** - Checks correct HTTP status codes
4. **Field Validation** - Verifies required fields are present
5. **Type Checking** - Validates data type correctness
6. **Error Handling** - Tests negative scenarios (404)

## Notes

- JSONPlaceholder is a fake API — POST/PUT/DELETE operations return correct responses but don't persist data
- Tests validate individual API responses, not data persistence across calls
- No authentication required
- Base URL: `https://jsonplaceholder.typicode.com`

## Framework Details

- **Framework**: Playwright
- **Assertion Library**: Playwright built-in expect()
- **Language**: JavaScript
- **Node Version**: 14+

## Test Execution Summary

All 5 test cases are designed to be independent and can run in any order. Each test:
- Sets up its own API client
- Makes isolated API calls
- Validates response independently
- Does not depend on other tests
command = "# qa-assessment-AditiSingh
npx playwright test tests/api/jsonPlaceholder.spec.js"