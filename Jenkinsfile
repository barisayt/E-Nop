pipeline {
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.46.0-jammy'
            args '-u root'
        }
    }
    stages {
        stage('Test') {
            steps {
                sh 'npm ci'
                sh 'npx playwright install --with-deps'
                sh 'npx playwright test'
            }
        }
    stage('Generate Allure Report') {
            agent {
                docker{
                    image 'openjdk:17-jdk'
                    args '-u root'
                }
            }
            when {
                expression { fileExists('allure-results') }
            }
            steps {
                sh 'allure generate --clean -o allure-report'
            }
        }
    }
    post {
        always {
            // Archive raw artifacts for download
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
            archiveArtifacts artifacts: 'allure-report/**', allowEmptyArchive: true

            // Publish Playwright HTML report
            publishHTML(target: [
                allowMissing: true,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright Test Report'
            ])

            // Publish Allure Report
            allure([
                includeProperties: false,
                jdk: '',
                commandline: 'allure', // Matches the name you set above
                results: [[path: 'allure-results']]
            ])
        }
    }
}
