import { Locator, expect, Page } from "@playwright/test";
import { BasePage } from "./base-page";


export class UserManagement extends BasePage {
    readonly page: Page;
    //readonly addButton: Locator;
    readonly adminButton: Locator;
    readonly userRoleMenu: Locator;
    readonly userRoleAdminOption: Locator;
    readonly userRoleESSOption: Locator;
    readonly employeeNameField: Locator;
    readonly listOfEmployees: Locator;
    readonly selectFirstEmployee: Locator;
    readonly statusOption: Locator;
    readonly statusOptionEnabled: Locator;
    readonly adminSectionUsername: Locator;
    readonly adminSectionPassword: Locator;
    readonly adminSectionConfirmPassword: Locator;
    readonly successMessage: Locator;
    readonly cleanCreatedUserRecords: (name: string) => Locator;

    //Constructor
    constructor(page: Page) {
        super(page);
        this.page = page;
        this.adminButton = page.getByRole('link', { name: 'Admin' })
        //this.addButton = page.locator(`//button[normalize-space()='Add']`);
        this.userRoleMenu = page.getByText('-- Select --').first()
        this.userRoleAdminOption = page.getByRole('option', { name: 'Admin' }).locator('span');
        this.userRoleESSOption = page.getByRole('option', { name: 'ESS' }).locator('span');
        this.employeeNameField = page.locator(`//input[@placeholder='Type for hints...']`);
        this.listOfEmployees = page.locator('div[role="listbox"].oxd-autocomplete-dropdown');
        this.selectFirstEmployee = page.getByRole('option').first()
        this.statusOption = page.getByText('-- Select --');
        this.statusOptionEnabled = page.getByText('Enabled')
        this.adminSectionUsername = page.getByRole('textbox').nth(2);
        this.adminSectionPassword = page.locator('input.oxd-input.oxd-input--active[type="password"]').nth(0);
        this.adminSectionConfirmPassword = page.getByRole('textbox').nth(4);
        this.successMessage = page.getByText('Success', { exact: true })
        this.cleanCreatedUserRecords = (name: string) => page.locator(`//div[contains(@class, 'oxd-table-row') and .//div[contains(text(), ${name}')]`).locator('button i.oxd-icon.bi-trash').first();
        //confirmDeletion is in base-page.ts
    }

    async addButtonForUser() {
        //Click on the Admin Button
        await this.adminButton.click();
        //Click on Add Button
        await this.addButton.click();
        //Wait for page fully loaded
        await this.page.waitForLoadState('domcontentloaded');
    }

    async addingUserRoleAsAdmin() {
        //Click on User Role option
        await this.userRoleMenu.click();
        //Select user role option as Admin
        await this.userRoleAdminOption.click();
    }

    async addingUserRoleAsESS() {
        //Click on User Role option
        await this.userRoleMenu.click();
        //Select user role option as ESS
        await this.userRoleESSOption.click();
    }

    async addingEmployeeName(name: string) {
        //Click on Employee Name Field
        await this.employeeNameField.click();
        //Type name as using Faker Name
        await this.page.keyboard.type(name);
    }

    async selectStatusOption() {
        //Click on Status Option
        await this.statusOption.click();
        //Select status as Enabled
        await this.statusOptionEnabled.click();
    }

    async setUserNameAndPassword(username: string, password: string, confirmPassword: string) {
        //Click on Username field
        await this.adminSectionUsername.fill(username);
        //Click on Password field 
        await this.adminSectionPassword.fill(password);
        //Click on Confirm Password field and Fill with same password
        await this.adminSectionConfirmPassword.fill(confirmPassword);
    }

    /* async addingUserAsAdminRole() {

    }

    async addMemberESSRole() {

    } */

}