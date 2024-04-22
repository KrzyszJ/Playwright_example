import { Page, test, expect, BrowserContext } from "@playwright/test"
import { MainPage } from "../pages/main.page"
import { SignInPage } from "../pages/signIn.page"
import * as loginMessages from "../testData/login.json"
import { faker } from "@faker-js/faker"
let context: BrowserContext, page: Page, mainPage: MainPage, signInPage: SignInPage

test.describe("login test suite @login", async () => {

    test.beforeEach( async ({ browser }) => {
        context = await browser.newContext()
        page = await context.newPage()
        mainPage = new MainPage(page)
        signInPage = new SignInPage(page)
        await mainPage.open()
        await mainPage.openSignInPage()
    })
    test("shows info about wrong credentials", async () => {
        await signInPage.logUser(faker.internet.email(), faker.internet.password())
        expect(await signInPage.getLoginAlert()).toContain(loginMessages.incorrectLoginMessage)
    })

    test("shows info about missing login and password", async () => {
        await signInPage.logUser(faker.internet.email(), "")
        expect(await signInPage.getMissingPasswordAlert()).toContain(loginMessages.requiredField)
    })

    test.afterEach(async () => {
        await context.close()
    })
})
