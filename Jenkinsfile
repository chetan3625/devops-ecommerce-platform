pipeline{
    agent any
    environment { 
    DOCKER_IMAGE = 'chetan3625/devops-backend' 
    CREDENTIALS_ID = 'docker-hub-credentials'
    }
    stages {
        stage('1 Checkout Code'){
           steps{
            echo "Checking out code from Git repository"
            checkout scm
           }
        }
        stage('2 Install Dependencies'){
            steps{
                echo "Installing dependencies"
                dir('server'){
                    sh 'npm ci'
                }
            }
        }
        stage('3 Code Quality'){
            steps{
                echo "Running code quality checks"
                dir('server'){
                    sh 'npm run lint'
                }
            }
        }
        stage('4 Unit Tests'){
            steps{
                echo "Running unit tests"
                dir('server'){
                    sh 'npm test'
                }
            }
        }
        stage('5 Security Audit(Dependency )'){
            steps{
                echo "Running security audit for dependencies"
                dir('server'){
                    sh 'npm audit --production || true'
                }
            }
        }
        stage('6 Build Docker Image'){
            steps{
                echo "Building Docker image: ${DOCKER_IMAGE}"
                dir('server'){
                    sh "docker build -t ${DOCKER_IMAGE}:${BUILD_NUMBER} -t ${DOCKER_IMAGE}:latest ."
                }

            }
        }
        stage('7 Container Vulnerability Scan'){
            steps{
                echo "Scanning Docker image for vulnerabilities"
                script{
                    sh "trivy image --exit-code 0 --severity HIGH,CRITICAL ${DOCKER_IMAGE}:${BUILD_NUMBER} || true"
                }
            }
        }
        stage('8 Push Docker Image'){
            steps{
                echo "Pushing Docker image to Docker Hub"
                script{
                    docker.withRegistry('https://index.docker.io/v1/', "${CREDENTIALS_ID}") {
                        sh "docker push ${DOCKER_IMAGE}:${BUILD_NUMBER}"
                        sh "docker push ${DOCKER_IMAGE}:latest"
                    }
                }
            }
        }

    }
    post{
        success{
            echo "Pipeline completed successfully!"
        }
        failure{
            echo "Pipeline failed. Please check the logs for details."
        }
    }

}