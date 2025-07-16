pipeline {
    agent any

    environment {
        CI = 'true'
    }

    stages {
        stage('Run in Docker') {
            steps {
                script {
                    docker.image('mcr.microsoft.com/playwright:v1.46.0-jammy').inside('-u root') {
                        sh 'node -v'
                        sh 'npm -v'
                        sh 'npm ci'
                        sh 'npx playwright install --with-deps'
                        sh 'npx playwright test --reporter=dot,junit'
                    }
                }
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
