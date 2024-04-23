import { Page, expect } from "@playwright/test"

export class SignInPage {
    page: Page

    constructor(page: Page) {
        this.page = page
    }

    emailInput() {
        return "#email"
    }

    passwordInput() {
        return "[name='login[password]']"
    }

    signInButton() {
        return ".action.login.primary#send2"
    }

    loginAlert() {
        return "[data-ui-id='message-error'] div"
    }

    async logUser(login: string, password: string): Promise<void> {
        await this.page.locator(this.emailInput()).fill(login)
        await this.page.locator(this.passwordInput()).fill(password)
        await this.page.locator(this.signInButton()).click()
    }

    async getLoginAlert(): Promise<string> {
        expect(await this.page.locator(this.loginAlert()).textContent()).not.toHaveLength(0)
        return await this.page.locator(this.loginAlert()).textContent()
    }
}