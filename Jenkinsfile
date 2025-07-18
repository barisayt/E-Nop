pipeline {
    agent none

    stages {
        stage('Run Playwright Tests') {
            agent {
                docker {
                    image 'mcr.microsoft.com/playwright:v1.46.0-jammy'
                    args '-u root'
                }
            }
            steps {
                sh 'npm ci'
                sh 'npx playwright install --with-deps'
                sh 'npx playwright test'
                stash name: 'allure-results', includes: 'allure-results/**'
                stash name: 'playwright-report', includes: 'playwright-report/**'
            }
        }

        stage('Generate Allure Report') {
            agent { label 'master' }
            tools {
                jdk 'jdk17'
                // no allure tool here
            }
            environment {
                PATH = "/usr/local/bin:${env.PATH}"
            }
            steps {
                unstash 'allure-results'
                unstash 'playwright-report'
                sh 'allure generate allure-results --clean -o allure-report'
                archiveArtifacts artifacts: 'allure-report/**', allowEmptyArchive: true
                publishHTML(target: [
                    allowMissing: true,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: 'allure-report',
                    reportFiles: 'index.html',
                    reportName: 'Allure Report'
                ])
                publishHTML(target: [
                    allowMissing: true,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: 'playwright-report',
                    reportFiles: 'index.html',
                    reportName: 'Playwright Test Report'
                ])
            }
        }
    }
}
