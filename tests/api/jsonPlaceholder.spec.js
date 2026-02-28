import { test, expect } from '@playwright/test';
require('dotenv').config();
const { JSONPlaceholderAPI } = require('./jsonPlaceholder.api');

test.describe('JSONPlaceholder API Tests', () => {

  let api;

  test.beforeEach(async ({ request }) => {
    api = new JSONPlaceholderAPI(request);
  });

  // Test Case 1: List all posts
  test('TC-API-001: GET /posts - List all posts', async () => {
    const response = await api.getAllPosts();

    // Validate status code
    expect(response.status()).toBe(200);

    // Validate content-type header
    expect(response.headers()['content-type']).toContain('application/json');

    // Get response body
    const posts = await response.json();

    // Validate it's an array
    expect(Array.isArray(posts)).toBeTruthy();

    // Validate array length
    expect(posts.length).toBe(100);

    // Validate first post structure
    const firstPost = posts[0];
    expect(firstPost).toHaveProperty('id');
    expect(firstPost).toHaveProperty('title');
    expect(firstPost).toHaveProperty('body');
    expect(firstPost).toHaveProperty('userId');

    // Validate data types
    expect(typeof firstPost.id).toBe('number');
    expect(typeof firstPost.title).toBe('string');
    expect(typeof firstPost.body).toBe('string');
    expect(typeof firstPost.userId).toBe('number');

    // Validate all posts have required fields
    posts.forEach((post, index) => {
      expect(post.id).toBeTruthy();
      expect(post.title).toBeTruthy();
      expect(post.body).toBeTruthy();
      expect(post.userId).toBeTruthy();
    });
  });

  // Test Case 2: Get single post
  test('TC-API-002: GET /posts/1 - Get single post', async () => {
    const response = await api.getPost(1);

    // Validate status code
    expect(response.status()).toBe(200);

    // Validate content-type header
    expect(response.headers()['content-type']).toContain('application/json');

    // Get response body
    const post = await response.json();

    // Validate required fields exist
    expect(post).toHaveProperty('id');
    expect(post).toHaveProperty('title');
    expect(post).toHaveProperty('body');
    expect(post).toHaveProperty('userId');

    // Validate correct ID
    expect(post.id).toBe(1);

    // Validate data types
    expect(typeof post.id).toBe('number');
    expect(typeof post.title).toBe('string');
    expect(typeof post.body).toBe('string');
    expect(typeof post.userId).toBe('number');

    // Validate values are not empty
    expect(post.title.length).toBeGreaterThan(0);
    expect(post.body.length).toBeGreaterThan(0);
    expect(post.userId).toBeGreaterThan(0);
  });

  // Test Case 3: Create a post
  test('TC-API-003: POST /posts - Create a new post', async () => {
    const newPost = {
      title: 'foo',
      body: 'bar',
      userId: 1
    };

    const response = await api.createPost(newPost);

    // Validate status code (201 Created)
    expect(response.status()).toBe(201);

    // Validate content-type header
    expect(response.headers()['content-type']).toContain('application/json');

    // Get response body
    const createdPost = await response.json();

    // Validate required fields exist
    expect(createdPost).toHaveProperty('id');
    expect(createdPost).toHaveProperty('title');
    expect(createdPost).toHaveProperty('body');
    expect(createdPost).toHaveProperty('userId');

    // Validate returned values match sent values
    expect(createdPost.title).toBe(newPost.title);
    expect(createdPost.body).toBe(newPost.body);
    expect(createdPost.userId).toBe(newPost.userId);

    // Validate ID was generated
    expect(createdPost.id).toBeTruthy();
    expect(typeof createdPost.id).toBe('number');
  });

  // Test Case 4: Update a post
  test('TC-API-004: PUT /posts/1 - Update a post', async () => {
    const updatedPost = {
      title: 'updated title',
      body: 'updated body',
      userId: 1
    };

    const response = await api.updatePost(1, updatedPost);

    // Validate status code
    expect(response.status()).toBe(200);

    // Validate content-type header
    expect(response.headers()['content-type']).toContain('application/json');

    // Get response body
    const post = await response.json();

    // Validate required fields exist
    expect(post).toHaveProperty('id');
    expect(post).toHaveProperty('title');
    expect(post).toHaveProperty('body');
    expect(post).toHaveProperty('userId');

    // Validate updated values are reflected
    expect(post.title).toBe(updatedPost.title);
    expect(post.body).toBe(updatedPost.body);
    expect(post.userId).toBe(updatedPost.userId);
    expect(post.id).toBe(1);

    // Validate data types
    expect(typeof post.id).toBe('number');
    expect(typeof post.title).toBe('string');
    expect(typeof post.body).toBe('string');
    expect(typeof post.userId).toBe('number');
  });

  // Test Case 5: Negative test - Post not found
  test('TC-API-005: GET /posts/9999 - Post not found (404)', async () => {
    const response = await api.getPost(9999);

    // Validate status code (404 Not Found)
    expect(response.status()).toBe(404);

    // Validate content-type header
    expect(response.headers()['content-type']).toContain('application/json');

    // Get response body
    const body = await response.json();

    // Validate response body is empty object
    expect(body).toEqual({});
  });

});
