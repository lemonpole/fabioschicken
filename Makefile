UNTAGGED_IMAGES=docker images -a | grep "^<none>" | awk '{print $$3}'
REPO_BASEPATH=larsson719/fabioschicken

default: development
install: development

build:
	@docker build -t ${REPO_BASEPATH}:$(or $(TAG_NAME), reactapp) \
	$(or $(TAG_NAME), reactapp)

publish:
	@docker push ${REPO_BASEPATH}:$(or $(TAG_NAME), reactapp)

create-env:
	@if [ ! -f .env ]; then \
		echo ".env file not found. Creating..."; \
		cp .env.example .env && echo "Done"; \
	fi

development: create-env
	@echo "Running development environment"
	@docker-compose up -d

down:
	@docker-compose down

unbuild:
	@docker-compose down --rmi local

rebuild: unbuild
	@echo "Rebuilding docker images..."
	@docker-compose build

down-unbuild: down unbuild
down-rebuild: down rebuild

restart: restart
	@docker-compose restart mysql

restart-quick:
	@docker-compose restart nginx reactapp wordpress;

bounce: down development

clean-untagged:
	@echo "Removing untagged images..."
	@docker rmi $$($(UNTAGGED_IMAGES)) && echo "Done."; \
	if [ $$? -ne 0 ]; then \
		echo "Some untagged images could not be deleted."; \
	fi

clean-system:
	@docker system prune -f && docker container prune -f
	@docker image prune -f && docker volume prune -f


clean: clean-untagged clean-system

clean-mysqldata:
	@echo "Removing mysqldata directory..."
	@rm -rf mysql/data/* && echo "Done."

import-mysqldata:
	@echo "Importing mysqldata..."
	@docker exec -i fabioschicken_mysql_1 mysql \
	-u$(or $(MYSQL_USERNAME), wordpress) \
	-p$(or $(MYSQL_PASSWORD), wordpress) \
	$(or $(MYSQL_DATABASE), wordpress) < $(or $(MYSQLDUMP_PATH), ./mysql/dumps/fresh.sql) \
	&& echo "Done."

export-mysqldata:
	@echo "Exporting mysqldata..."
	@docker-compose exec mysql mysqldump \
	-u$(or $(MYSQL_USERNAME), wordpress) \
	-p$(or $(MYSQL_PASSWORD), wordpress) \
	$(or $(MYSQL_DATABASE), wordpress) > $(or $(MYSQLDUMP_PATH), ./mysql/dumps/fresh.sql) \
	&& echo "Done."

lint:
	@echo "Running lint on reactapp container..."
	@docker-compose exec reactapp npm run lint && echo "Done."; \
	if [ $$? -ne 0 ]; then \
		echo "Could not run lint on node container. Is it running?"; \
		exit 1; \
	fi

tail-log:
	@docker-compose logs -f ${CONTAINER}
