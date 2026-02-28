class LoginPage {

    constructor(page) {
        this.page = page;
        this.username = page.locator('[data-test="username"]');
        this.password = page.locator('[data-test="password"]');
        this.loginBtn = page.locator('[data-test="login-button"]');
        this.errorMsg = page.locator('[data-test="error"]');
    }

    async goto() {
        await this.page.goto(process.env.SAUCE_DEMO_URL);
    }

    async login(user, pass) {
        await this.username.fill(user);
        await this.password.fill(pass);
        await this.loginBtn.click();
    }

    async getErrorMessage() {
        return await this.errorMsg.textContent();
    }
    async isErrorMessageVisible() {
        return await this.errorMsg.isVisible();
    }
}

module.exports = { LoginPage };