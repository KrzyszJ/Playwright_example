import { Page, expect } from "@playwright/test"

export class AccountPage {
    page: Page

    constructor(page: Page) {
        this.page = page
    }
 let aeee
    customerMenu() {
        return "header [data-action='customer-menu-toggle']"
    }

    async isCustomerMenuEnabled(): Promise<void> {
        return await expect
            .poll(
                async () => {
                    return await this.page.locator(this.customerMenu()).isEnabled()
                },
                {
                    intervals: [250],
                    timeout: 10_000
                }
            )
            .toBe(true)
    }
}
