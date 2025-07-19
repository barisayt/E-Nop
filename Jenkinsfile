pipeline {
    agent none

    environment {
        // Define TIMESTAMP globally, UTC time to keep folder unique per build
        TIMESTAMP = new Date().format("yyyyMMdd-HHmmss", TimeZone.getTimeZone('UTC'))
    }

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
        stage('Upload Reports to AWS S3') {
            agent { label 'master' }
            environment {
                AWS_ACCESS_KEY_ID = credentials('AWS-credentials')
                AWS_SECRET_ACCESS_KEY = credentials('AWS-credentials')
                AWS_DEFAULT_REGION = 'us-east-1'  // Adjustable if needed
            }
            steps {
                sh '''
                    aws s3 cp allure-report s3://playwright-allure-reports-536/allure-report-${TIMESTAMP}/ --recursive
                    aws s3 cp playwright-report s3://playwright-allure-reports-536/playwright-report-${TIMESTAMP}/ --recursive
                '''
            }
        }
        stage('Upload Reports to Azure Blob') {
            agent { label 'master' }
            environment {
                AZURE_STORAGE_NAME = credentials('Azure_Account_Name')
                AZURE_ACCESS_KEY = credentials('Azure_Access_Key')
            }
            steps {
                sh "az storage blob upload-batch --destination allure-report --destination-path allure-report-${TIMESTAMP} --source allure-report --account-name $AZURE_STORAGE_NAME --account-key $AZURE_ACCESS_KEY --overwrite"
                sh "az storage blob upload-batch --destination playwright-report --destination-path playwright-report-${TIMESTAMP} --source playwright-report --account-name $AZURE_STORAGE_NAME --account-key $AZURE_ACCESS_KEY --overwrite"
            }
        }
    }
}
