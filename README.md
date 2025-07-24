# E-Nop QA Automation Framework

[![Build Status](https://github.com/barisayt/E-Nop/actions/workflows/playwright.yml/badge.svg)](https://github.com/barisayt/E-Nop/actions/workflows/playwright.yml)

---

## Table of Contents

- [Project Overview](#project-overview)  
- [Technologies & Tools](#technologies--tools)  
- [Project Structure](#project-structure)  
- [Setup & Installation](#setup--installation)  
- [Running Tests](#running-tests)  
- [Test Design](#test-design)  
- [CI/CD Integration](#cicd-integration)  
- [Reporting & Cloud Storage Integration](#reporting)
- [Authentication Handling](#authentication-handling)  
- [Future Enhancements](#future-enhancements)  
- [Contact](#contact)  

---

## Project Overview

E-Nop is a comprehensive QA Automation framework built from scratch to validate the [OrangeHRM Open Source Demo](https://opensource-demo.orangehrmlive.com/) application.  

It combines Playwright, Cucumber (BDD), and Faker to provide robust functional UI tests, with integration for continuous testing via GitHub Actions and Jenkins pipelines. The project is designed for maintainability, scalability, and performance monitoring.

---

## Technologies & Tools

- **Test Automation:** Playwright (TypeScript), Cucumber (BDD)  
- **Test Data Generation:** Faker.js  
- **CI/CD:** GitHub Actions, Jenkins (DinD with Docker)  
- **Reporting:** Allure Reports, Playwright HTML Reporter  
- **Containerization:** Docker, Docker Compose  
- **Cloud:** AWS S3 for report storage, Azure Blob for report storage  
- **Performance Testing:** (Planned) k6 and Lighthouse integration  
- **Others:** TypeScript, Node.js, dotenv  

---

## Project Structure
```plaintext
E-Nop/
├── .github/workflows/        # GitHub Actions workflows
│   └── playwright.yml        # Playwright test CI pipeline
├── Feature/                  # Cucumber feature files (BDD)
│   └── add_member.feature
├── Hooks/                    # Cucumber hooks for setup/teardown
│   └── hooks.ts
├── Steps/                    # Cucumber step definitions
│   ├── userManagement.ts
│   └── world.ts
├── fixtures/                 # Playwright test fixtures
│   └── orangeHRM-fixture.ts
├── jenkins-dind/             # Jenkins + Docker-in-Docker setup files
│   ├── docker-compose.yml
│   └── Dockerfile
├── pages/                           # Page Object Models
│   ├── base-page.ts
│   ├── pim-page.ts
│   ├── recruitment-page.ts
│   ├── sign-in-page.ts
│   └── user_management.ts
├── tests/                    # Playwright test specs
│   ├── pim-photo-upload.spec.ts
│   ├── recruitment.spec.ts
│   ├── sign-in-user.spec.ts
│   └── userManagement.spec.ts
├── allure-results/           # Generated Allure report data
├── general-auth.json         # Cached authentication state
├── .dockerignore             # Docker ignore file
├── .gitignore                # Git ignore file
├── Jenkinsfile               # Jenkins pipeline definition
├── README.md                 # Project documentation
├── auth-setup-hook.ts        # Auth state saving helper
├── auth-setup.ts             # Playwright test for auth state creation
├── cucumber.js               # Cucumber config file
├── fakerData.ts              # Custom password generator using Faker
├── package.json              # Node dependencies and scripts
├── playwright.config.ts      # Playwright test runner config
└── tsconfig.json             # TypeScript compiler config
```

## Setup & Installation
## Clone the repository
git clone https://github.com/barisayt/E-Nop.git
cd E-Nop

## Install dependencies
npm install

## Setup environment variables
Included .env file with UI basic account with:

TEST_EMAIL=your_test_email
TEST_PASSWORD=your_test_password

These credentials are used by the test suite for signing into the OrangeHRM demo application.

## Generate Authentication State (Optional)
The framework automatically uses a saved authentication state (general-auth.json) to skip login where possible.
If you need to refresh the login state manually (e.g., credentials changed, session expired), you can run:
# Option 1: Run the dedicated auth setup script
npm run auth-setup
# Option 2: Run the Playwright tests (auth-setup runs automatically as a dependency)
npx playwright test
# Option 3: Run the Cucumber tests (hooks trigger auth setup)
npx cucumber-js

## Running Tests
## Run all Playwright tests (Chromium)
npm run tests:chrome

## Run tests with Cucumber
npx cucumber-js

## Run tests with retries (configured in CI)
Automatically retries twice on CI environment.

## Test Design
- **Page Object Model (POM)** implemented under pages/ for maintainable selectors and actions.
- **BDD with Cucumber:** Features and steps organized in Feature/ and Steps/.
- **Fixtures: Centralized** test data and helper objects with Faker integration in fixtures/.
- **Authentication:** Stored and reused login state with general-auth.json and helpers.
- **Tests include:** User management flows with positive and placeholders for negative scenarios.

## CI/CD Integration
- **GitHub Actions:** Workflow runs on pushes, pull requests, and scheduled daily runs.
- **Jenkins:** Docker-in-Docker setup to run tests inside containers.
- **Docker:** Supports containerized test execution.

## Reporting
- **Playwright HTML report:** Stored in playwright-report/ folder.
- **Allure report:** Generated from test results, uploaded as artifact in CI, and viewable locally.
- **Reports uploaded to GitHub Pages** for easier access.
- **Reports uploaded to AWS S3** for cloud access and archiving.
- **Reports uploaded to Azure Blob Storage** for cloud access and archiving.


## Authentication Handling
**auth-setup.ts** and **auth-setup-hook.ts** automate login and save storage state for reuse across tests, improving test speed and stability.

## Future Enhancements
- Additional positive and negative test scenarios, including edge cases.
- Integration of performance testing tools: k6 and Lighthouse.
- Extending CI/CD pipelines to Azure DevOps.
- Expand API testing using REST-assured or similar tools.

**Thank you for visiting this project!**