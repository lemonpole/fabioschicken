UNTAGGED_IMAGES=docker images -a | grep "^<none>" | awk '{print $$3}'
REPO_BASEPATH=larsson719/fabioschicken

.PHONY: build
build:
	@docker build -t ${REPO_BASEPATH}:$(or $(TAG_NAME), reactapp) \
	$(or $(TAG_NAME), reactapp)

.PHONY: publish
publish:
	@docker push ${REPO_BASEPATH}:$(or $(TAG_NAME), reactapp)

.PHONY: development
development:
	@echo "Running development environment"
	@docker-compose up -d

.PHONY: down
down:
	@docker-compose down

.PHONY: unbuild
unbuild:
	@docker-compose down --rmi local

.PHONY: rebuild
rebuild: unbuild
	@echo "Rebuilding docker images..."
	@docker-compose build

.PHONY: down-unbuild
down-unbuild: down unbuild

.PHONY: down-rebuild
down-rebuild: down rebuild

.PHONY: restart
restart: restart
	@docker-compose restart mysql

.PHONY: restart-quick
restart-quick:
	@docker-compose restart nginx reactapp wordpress;

.PHONY: bounce
bounce: down development

.PHONY: clean-untagged
clean-untagged:
	@echo "Removing untagged images..."
	@docker rmi $$($(UNTAGGED_IMAGES)) && echo "Done.";

.PHONY: clean-system
clean-system:
	@docker system prune -f && docker container prune -f
	@docker image prune -f && docker volume prune -f

.PHONY: clean
clean: clean-untagged clean-system

.PHONY: clean-mysqldata
clean-mysqldata:
	@echo "Removing mysqldata directory..."
	@rm -rf mysql/data/* && echo "Done."

.PHONY: import-mysqldata
import-mysqldata:
	@echo "Importing mysqldata..."
	@docker exec -i fabioschicken_mysql_1 mysql \
	-u$(or $(MYSQL_USERNAME), wordpress) \
	-p$(or $(MYSQL_PASSWORD), wordpress) \
	$(or $(MYSQL_DATABASE), wordpress) < $(or $(MYSQLDUMP_PATH), ./mysql/dumps/fresh.sql) \
	&& echo "Done."

.PHONY: export-mysqldata
export-mysqldata:
	@echo "Exporting mysqldata..."
	@docker-compose exec mysql mysqldump \
	-u$(or $(MYSQL_USERNAME), wordpress) \
	-p$(or $(MYSQL_PASSWORD), wordpress) \
	$(or $(MYSQL_DATABASE), wordpress) > $(or $(MYSQLDUMP_PATH), ./mysql/dumps/fresh.sql) \
	&& echo "Done."

.PHONY: lint
lint:
	@echo "Running lint on reactapp container..."
	@docker-compose exec reactapp npm run lint && echo "Done."; \
	if [ $$? -ne 0 ]; then \
		echo "Could not run lint on node container. Is it running?"; \
		exit 1; \
	fi

.PHONY: tail-log
tail-log:
	@docker-compose logs -f ${CONTAINER}
