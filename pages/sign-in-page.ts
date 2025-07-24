import { Locator, expect, Page} from "@playwright/test";
import { BasePage } from "./base-page";

export class SignInPage extends BasePage {
    readonly page: Page;
    readonly mainPageUserName: Locator;
    readonly logInPasswordField: Locator;

    //Constructor
    constructor(page: Page) {
        super(page)
        this.page = page;
        this.mainPageUserName = page.locator(`//input[@placeholder='Username']`);
        this.logInPasswordField = page.locator(`//input[@placeholder='Password']`); 
    }

    async visit() {
        await this.page.goto("https://opensource-demo.orangehrmlive.com/");
    }

    async authorizedUserLogin(){
        await this.page.goto("https://opensource-demo.orangehrmlive.com/");
        await this.page.waitForLoadState('domcontentloaded');
    }

    async enterUserName(string: string) {
        await this.mainPageUserName.click();
        await this.page.keyboard.type(string)
    }
    
    async logInPassword(string: string) {
        await this.logInPasswordField.click();
        await this.page.keyboard.type(string);
    }

    async signInUser(username: string, password: string){
        await this.enterUserName(username);
        await this.logInPassword(password);
        await this.logInButton.click();
    }
    

}