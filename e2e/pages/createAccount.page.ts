import { Page } from "@playwright/test"
import * as dotenv from "dotenv"

export class CreateAccountPage {
    page: Page

    constructor(page: Page) {
        this.page = page
        dotenv.config()
    }

    firstNameInput() {
        return "#firstname"
    }

    lastNameInput() {
        return "#lastname"
    }

    emailInput() {
        return "#email_address"
    }

    passwordInput() {
        return "#password"
    }

    confirmPasswordInput() {
        return "#password-confirmation"
    }

    createAccountButton() {
        return "button[title='Create an Account']"
    }

    async createAccount(firstname: string, lastname: string, email: string, password: string): Promise<void> {
        await this.page.locator(this.firstNameInput()).fill(firstname)
        await this.page.locator(this.lastNameInput()).fill(lastname)
        await this.page.locator(this.emailInput()).fill(email)
        await this.page.locator(this.passwordInput()).fill(password)
        await this.page.locator(this.confirmPasswordInput()).fill(password)
        await this.page.locator(this.createAccountButton()).click()
    }
}
