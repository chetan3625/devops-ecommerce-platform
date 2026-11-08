pipeline{
    agent any
    environment {
        DOCKER_IMAGE = "my-ecommerce-app:${env.BUILD_NUMBER}"
        CREDENTIALS_ID = "dockerhub-credentials"
    }
    stages {
        stage('1 Checkout Code'){
           steps{
            echo "Checking out code from Git repository"
            checkout([
                $class: 'GitSCM',
                branches: [[name: 'master']],
                userRemoteConfigs:[[
                    url:'https://github.com/chetan3625/devops-ecommerce-platform',
                    credentialsId: 'github-ssh-credentials'
                ]]
            ])
           }
        }
        stage('2 Build Docker Image'){
            steps{
                echo "Building Docker image: ${DOCKER_IMAGE}"
                dir('server'){
                    sh "docker build -t ${DOCKER_IMAGE}:${BUILD_NUMBER} -t ${DOCKER_IMAGE}:latest ."
                }

            }
        }
        stage('3 Push Docker Image'){
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

}