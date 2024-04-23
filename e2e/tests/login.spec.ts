import { Page, test, expect, BrowserContext } from "@playwright/test"
import { AccountPage } from "../pages/account.page"
import { MainPage } from "../pages/main.page"
import { SignInPage } from "../pages/signIn.page"
import * as loginMessages from "../testData/login.json"
import { faker } from "@faker-js/faker"
let context: BrowserContext, page: Page, accountPage: AccountPage, mainPage: MainPage, signInPage: SignInPage

test.describe("login test suite @login", async () => {

    test.beforeEach( async ({ browser }) => {
        context = await browser.newContext()
        page = await context.newPage()
        accountPage = new AccountPage(page)
        mainPage = new MainPage(page)
        signInPage = new SignInPage(page)
        await mainPage.open()
        await mainPage.openSignInPage()
    })

    test("shows info about wrong credentials", async () => {
        await signInPage.logUser(faker.internet.email(), faker.internet.password())
        expect(await signInPage.getLoginAlert()).toContain(loginMessages.incorrectLoginMessage)
    })

    test("logs user with correct login and password", async () => {
        await signInPage.logUser("testfake123@test.pl", "Test1234!")
        await accountPage.isCustomerMenuEnabled()
    })

    test.afterEach(async () => {
        await context.close()
    })
})
