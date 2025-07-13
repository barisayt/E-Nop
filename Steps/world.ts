import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import { Browser, BrowserContext, chromium, Page } from 'playwright';
import { SignInPage } from '../pages/sign-in-page';
import { UserManagement } from '../pages/user_management';
import { faker } from '@faker-js/faker';
import { generatePassword } from '../fakerData';
import * as path from 'path';

export class CustomWorld extends World {
  browser!: Browser;
  page!: Page;
  signInPage!: SignInPage;
  userManagement!: UserManagement;
  context!: BrowserContext;
  username!: string;
  password!: string;

  // faker data getters
  get fakerUsername() {
    return faker.internet.userName();
  }

  get fakerEmail() {
    return faker.internet.email();
  }

  get fakerPassword() {
    return generatePassword();
  }

  get fakerName() {
    return faker.person.fullName();
  }

  constructor(options: IWorldOptions) {
    super(options);
  }

  async init() {
    const storageStatePath = path.resolve(__dirname, '../general-auth.json')
    this.browser = await chromium.launch({ headless: false });
    this.context = await this.browser.newContext({
      storageState: storageStatePath, // <-- use the saved auth file here
    });
    this.page = await this.context.newPage();
    this.signInPage = new SignInPage(this.page);
    this.userManagement = new UserManagement(this.page);
    this.username = this.fakerUsername;
    this.password = this.fakerPassword;
  }

  async close() {
    await this.page.close();
    await this.browser.close();
  }
}

setWorldConstructor(CustomWorld);
