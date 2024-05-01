import { Page, test, BrowserContext } from "@playwright/test"
import { AccountPage } from "../pages/account.page"
import { CreateAccountPage } from "../pages/createAccount.page"
import { MainPage } from "../pages/main.page"
import { faker } from "@faker-js/faker"
let context: BrowserContext, page: Page, accountPage: AccountPage, createAccountPage: CreateAccountPage, mainPage: MainPage

test.describe("login test suite @user", async () => {

    test.beforeEach( async ({ browser }) => {
        context = await browser.newContext()
        page = await context.newPage()
        accountPage = new AccountPage(page)
        createAccountPage = new CreateAccountPage(page)
        mainPage = new MainPage(page)
        await mainPage.open()
        await mainPage.openCreateAccountPage()
    })

    test("creates user with valid data", async () => {
        await createAccountPage.createAccount(faker.person.firstName(), faker.person.lastName(), faker.internet.email(), "Test!" + faker.internet.password({ length: 10 }) )
        await accountPage.isCustomerMenuEnabled()
    })
})