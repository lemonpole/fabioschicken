UNTAGGED_IMAGES=docker images -a | grep "^<none>" | awk '{print $$3}'
DANGLING_IMAGES=docker volume ls -qf dangling=true
REPO_BASEPATH=larson719/fabioschicken

default: production
install: production

build:
	@docker build -t ${REPO_BASEPATH}:$(or $(TAG_NAME), reactapp) \
	$(or $(TAG_NAME), reactapp)

publish:
	@docker push ${REPO_BASEPATH}:$(or $(TAG_NAME), reactapp)

production:
	@echo "Running production environment"
	@docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

development:
	@echo "Running development environment"
	@docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d

down:
	@echo "Stopping containers..."
	@docker-compose down && echo "Done."; \
	if [ $$? -ne 0 ]; then \
		echo "Could not stop containers. Exiting..."; \
		exit 1; \
	fi

restart:
	@echo "Restarting containers...";
	@docker-compose restart nginx reactapp wordpress;

restart-all: restart
	@docker-compose restart mysql

unbuild:
	@echo "Stopping containers and removing images..."
	@docker-compose down --rmi local && echo "Done."; \
	if [ $$? -ne 0 ]; then \
		echo "Could not remove all images. Exiting..."; \
		exit 1; \
	fi

rebuild: unbuild
	@echo "Rebuilding docker images..."
	@docker-compose build 2> /dev/null && echo "Done."; \
	if [ $$? -ne 0 ]; then \
		echo "Could not rebuild all images. Exiting..."; \
		exit 1; \
	fi

clean-volumes:
	@echo "Removing dangling volumes..."
	@docker volume rm $$($(DANGLING_IMAGES)) && echo "Done."; \
	if [ $$? -ne 0 ]; then \
		echo "Could not find any dangling volumes. Skipping..."; \
	fi

clean-images:
	@echo "Removing untagged images..."
	@docker rmi $$($(UNTAGGED_IMAGES)) && echo "Done."; \
	if [ $$? -ne 0 ]; then \
		echo "Could not find any untagged images. Skipping..."; \
	fi

clean: clean-volumes clean-images

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
