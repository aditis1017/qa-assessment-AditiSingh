class CartPage {

    constructor(page) {
        this.page = page;
        this.cartItems = page.locator('.cart_item');
        this.cartItemNames = page.locator('[data-test="inventory-item-name"]');
        this.cartItemPrices = page.locator('[data-test="inventory-item-price"]');
        this.cartItemQuantities = page.locator('.cart_quantity');
        this.checkoutBtn = page.locator('[data-test="checkout"]');
    }

    async getItemDetails(index) {
        const itemName = await this.cartItemNames.nth(index).textContent();
        const itemPrice = await this.cartItemPrices.nth(index).textContent();
        return { name: itemName, price: itemPrice };
    }

    async getItemNames() {
        return await this.cartItemNames.allTextContents();
    }

    async getItemPrices() {
        return await this.cartItemPrices.allTextContents();
    }

    async getItemQuantities() {
        return await this.cartItemQuantities.allTextContents();
    }

    async getItemCount() {
        return await this.cartItems.count();
    }



    async clickCheckout() {
        await this.checkoutBtn.click();
    }
}

module.exports = { CartPage };