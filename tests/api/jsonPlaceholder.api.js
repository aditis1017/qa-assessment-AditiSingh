class JSONPlaceholderAPI {
  constructor(request) {
    this.request = request;
    this.baseURL = process.env.JSONPLACEHOLDER_BASE_URL || 'https://jsonplaceholder.typicode.com';
  }

  // GET all posts
  async getAllPosts() {
    return await this.request.get(`${this.baseURL}/posts`);
  }

  // GET single post
  async getPost(postId) {
    return await this.request.get(`${this.baseURL}/posts/${postId}`);
  }

  // POST create a new post
  async createPost(body) {
    return await this.request.post(`${this.baseURL}/posts`, { data: body });
  }

  // PUT update a post
  async updatePost(postId, body) {
    return await this.request.put(`${this.baseURL}/posts/${postId}`, { data: body });
  }

  // DELETE a post
  async deletePost(postId) {
    return await this.request.delete(`${this.baseURL}/posts/${postId}`);
  }
}

module.exports = { JSONPlaceholderAPI };
