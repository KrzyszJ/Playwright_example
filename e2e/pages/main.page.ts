import { Page } from "@playwright/test"
import * as dotenv from "dotenv"

export class MainPage {
    page: Page

    constructor(page: Page) {
        this.page = page
        dotenv.config()
    }

    signInLink() {
        return ".page-header .authorization-link a"
    }
    createAccountLink() {
        return ".page-header a:has-text('Create an Account')"
    }
    acceptCookiesButton() {
        return "[aria-label='Consent']"
    }

    async open(): Promise<void> {
        await this.page.goto("https://magento.softwaretestingboard.com/")
        if (!process.env.CI) await this.acceptCookies()
    }

    async openSignInPage(): Promise<void> {
        await this.page.locator(this.signInLink()).click()
    }

    async openCreateAccountPage(): Promise<void> {
        await this.page.locator(this.createAccountLink()).click()
    }

    async acceptCookies(): Promise<void> {
        await this.page.locator(this.acceptCookiesButton()).click()
    }
}