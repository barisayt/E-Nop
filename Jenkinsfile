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
    }
}
