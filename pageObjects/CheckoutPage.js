class CheckoutPage {

    constructor(page) {
        this.page = page;
        this.firstName = page.locator('[data-test="firstName"]');
        this.lastName = page.locator('[data-test="lastName"]');
        this.zipCode = page.locator('[data-test="postalCode"]');

        this.continueBtn = page.locator('[data-test="continue"]');
        this.finishBtn = page.locator('[data-test="finish"]');

        this.confirmation = page.locator('[data-test="complete-header"]');
    }

    async fillDetails(fname, lname, zip) {
        await this.firstName.fill(fname);
        await this.lastName.fill(lname);
        await this.zipCode.fill(zip);
    }

    async continue() {
        await this.continueBtn.click();
    }

    async finish() {
        await this.finishBtn.click();
    }

    async getConfirmationText() {
        return await this.confirmation.textContent();
    }
}

module.exports = { CheckoutPage };