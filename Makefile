down:
	docker-compose down

build:
	docker-compose build

build-prod:
	docker-compose -f docker-compose.production.yml build

up-prod:
	docker-compose -f docker-compose.production.yml up -d

push-prod:
	docker-compose -f docker-compose.production.yml push app

docker-login:
	docker login -u becagis

publish: docker-login build-prod push-prod

up-deploy:
	docker-compose -f docker-compose.deploy.yml up -d