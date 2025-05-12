pipeline {
    agent any
    
    tools {
        nodejs 'node' 
    }

    stages {
        
        stage('SonarQube analysis') {
            steps {
                script {
                    scannerHome = tool 'sonarqube'
                }
                withSonarQubeEnv('sonarqube') {
                    sh """
                        ${scannerHome}/bin/sonar-scanner \
                        -Dsonar.projectKey=frontend \
                        -Dsonar.sources=. \
                        -X
                    """
                }
            }
        }

        stage('Build') {
            when {
                expression { env.BRANCH_NAME == 'dev' }
            }
            steps {
                script {
                    docker.build("levyf2i/thetiptop_frontend:1.0.0", "-f Dockerfile.dev .")
                }
            }
        }
        
        stage('Backup to Docker Hub') {
            when {
                expression { env.BRANCH_NAME == 'dev' }
            }
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'dockerhub') {
                        docker.image("levyf2i/thetiptop_frontend:1.0.0").push("1.0.0")
                        docker.image("levyf2i/thetiptop_frontend:1.0.0").push("latest")
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    switch (env.BRANCH_NAME) {
                        case 'main':
                            sh 'docker-compose -f docker-compose.prod.yml down && docker-compose -f docker-compose.prod.yml up -d --build'
                            break
                        case 'dev':
                            sh 'docker-compose -f docker-compose.dev.yml down && docker-compose -f docker-compose.dev.yml up -d --build'
                            break
                        case 'pre':
                            sh 'docker-compose -f docker-compose.pre.yml down && docker-compose -f docker-compose.pre.yml up -d --build'
                            break
                        default:
                            echo "Branch ${env.BRANCH_NAME} not handled in the build stage"
                    }
                }
            }
        }
    }
}
