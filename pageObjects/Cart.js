class Cart {

    constructor(page) {

        this.page = page;
    }


    async getProductNames() {

        return await this.page.locator('.inventory_item_name').allTextContents();
    }


    async getProductPrice(productName) {

        const product = this.page.locator('.cart_item')
            .filter({ has: this.page.locator('.inventory_item_name', { hasText: productName }) });

        return await product.locator('.inventory_item_price').textContent();
    }

}

module.exports = { Cart };