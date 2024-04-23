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

    async acceptCookies(): Promise<void> {
        await this.page.locator(this.acceptCookiesButton()).click()
    }
}