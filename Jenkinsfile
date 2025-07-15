pipeline {
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.46.0-jammy'
            args '-u root' // Ensures permissions to install node_modules
        }
    }
    environment {
        CI = 'true'
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }
        stage('Install Browsers') {
            steps {
                sh 'npx playwright install --with-deps'
            }
        }
        stage('Run Tests') {
            steps {
                sh 'npx playwright test --reporter=dot,junit'
            }
        }
    } 
    post {
        always {
            archiveArtifacts artifacts: '**/playwright-report/**/*', allowEmptyArchive: true
            junit 'test-results/**/*.xml' // Produce JUnit reports
        }
    }
}
