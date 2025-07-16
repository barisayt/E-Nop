pipeline {
    agent {
        docker {
            image 'my-playwright-with-docker'
            args '-u root'
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
            junit 'test-results/**/*.xml'
        }
    }
}
