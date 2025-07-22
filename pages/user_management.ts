import { Locator, expect, Page } from "@playwright/test";


export class UserManagement {
    readonly page: Page;
    readonly addButton: Locator;
    readonly adminButton: Locator;
    readonly userRoleMenu: Locator;
    readonly userRoleAdminOption: Locator;
    readonly employeeNameField: Locator;
    readonly listOfEmployees: Locator;
    readonly selectFirstEmployee: Locator;
    readonly statusOption: Locator;
    readonly statusOptionEnabled: Locator;
    readonly adminSectionUsername: Locator;
    readonly adminSectionPassword: Locator;
    readonly adminSectionConfirmPassword: Locator;
    readonly buttonInText: (text: string) => Locator;
    readonly successMessage: Locator;
    readonly cleanCreatedUserRecords: (name: string) => Locator;
    readonly confirmDeletion: Locator;

    //Constructor
    constructor(page: Page) {
        this.page = page;
        this.adminButton = page.getByRole('link', { name: 'Admin' })
        this.addButton = page.locator(`//button[normalize-space()='Add']`);
        this.userRoleMenu = page.getByText('-- Select --').first()
        this.userRoleAdminOption = page.getByRole('option', { name: 'Admin' }).locator('span');
        this.employeeNameField = page.locator(`//input[@placeholder='Type for hints...']`);
        this.listOfEmployees = page.locator('div[role="listbox"].oxd-autocomplete-dropdown');
        this.selectFirstEmployee = page.getByRole('option').first()
        this.statusOption = page.getByText('-- Select --');
        this.statusOptionEnabled = page.getByText('Enabled')
        this.adminSectionUsername = page.getByRole('textbox').nth(2);
        this.adminSectionPassword = page.locator('input.oxd-input.oxd-input--active[type="password"]').nth(0);
        this.adminSectionConfirmPassword = page.getByRole('textbox').nth(4);
        this.buttonInText = (text: string) => page.getByRole('button', { name: text });
        this.successMessage = page.getByText('Success', { exact: true })
        this.cleanCreatedUserRecords = (name: string) => page.locator(`//div[contains(@class, 'oxd-table-row') and .//div[contains(text(), ${name}')]`).locator('button i.oxd-icon.bi-trash').first();
        this.confirmDeletion = page.locator(`//button[normalize-space()='Yes, Delete']`);
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