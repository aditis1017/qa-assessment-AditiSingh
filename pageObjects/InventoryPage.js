class InventoryPage {

    constructor(page) {
        this.page = page;
        this.inventoryItems = page.locator('.inventory_item');
        this.cartBadge = page.locator('.shopping_cart_badge');
        this.cartIcon = page.locator('.shopping_cart_link');
        this.cartButton = page.locator('[data-test^="add-to-cart"]');
    }

    async getInventoryItemsCount() {
        return await this.inventoryItems.count();
    }

    
    async addItemToCart(index) {
        await this.cartButton.nth(index).click();
    }

    async goToCart() {
        await this.cartIcon.click();
    }

    async getCartCount() {
        return await this.cartBadge.textContent();
    }

    async getProductNames() {
        return await this.page.locator('[data-test="inventory-item-name"]').allTextContents();
    }
}

module.exports = { InventoryPage };