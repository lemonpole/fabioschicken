UNTAGGED_IMAGES=docker images -a | grep "^<none>" | awk '{print $$3}'
REPO_BASEPATH=larsson719/fabioschicken
DEV_COMPOSE=-f docker-compose/base.yaml -f docker-compose/dev.yaml
PROD_COMPOSE=-f docker-compose/base.yaml -f docker-compose/prod.yaml

##
## Action commands
##
.PHONY: start
start:
	@docker-compose ${DEV_COMPOSE} up -d

.PHONY: start-prod
start-prod:
	@docker-compose ${PROD_COMPOSE} up -d

.PHONY: down
down:
	@docker-compose ${DEV_COMPOSE} down

.PHONY: restart
restart: restart
	@docker-compose ${DEV_COMPOSE} restart mysql

.PHONY: restart-quick
restart-quick:
	@docker-compose ${DEV_COMPOSE} restart nginx reactapp wordpress;

.PHONY: bounce
bounce: down start

.PHONY: bounce-prod
bounce-prod: down start-prod

.PHONY: pull
pull:
	@docker-compose ${PROD_COMPOSE} pull

##
## BUILD AND PUBLISH COMMANDS
##
.PHONY: build
build:
	@docker build -t ${REPO_BASEPATH}:$(or $(TAG_NAME), reactapp) \
	$(or $(TAG_NAME), reactapp)

.PHONY: publish
publish:
	@docker push ${REPO_BASEPATH}:$(or $(TAG_NAME), reactapp)

.PHONY: unbuild
unbuild:
	@docker-compose ${DEV_COMPOSE} down --rmi local

.PHONY: rebuild
rebuild: unbuild
	@docker-compose ${DEV_COMPOSE} build

.PHONY: down-unbuild
down-unbuild: down unbuild

.PHONY: down-rebuild
down-rebuild: down rebuild

##
## CLEAN AND MAINTENANCE COMMANDS
##
.PHONY: clean-untagged
clean-untagged:
	@docker rmi -f $$($(UNTAGGED_IMAGES)) &> /dev/null || true

.PHONY: clean-system
clean-system:
	@docker system prune -f && docker container prune -f
	@docker image prune -f && docker volume prune -f

.PHONY: clean
clean: clean-untagged clean-system

##
## MYSQL COMMANDS
##
.PHONY: clean-mysqldata
clean-mysqldata:
	@rm -rf mysql/data/*

.PHONY: import-mysqldata
import-mysqldata:
	@docker exec -i docker-compose_mysql_1 mysql \
	-u$(or $(MYSQL_USERNAME), wordpress) \
	-p$(or $(MYSQL_PASSWORD), wordpress) \
	$(or $(MYSQL_DATABASE), wordpress) < $(or $(MYSQLDUMP_PATH), ./mysql/dumps/fresh.sql)

.PHONY: export-mysqldata
export-mysqldata:
	@docker-compose ${DEV_COMPOSE} exec mysql mysqldump \
	-u$(or $(MYSQL_USERNAME), wordpress) \
	-p$(or $(MYSQL_PASSWORD), wordpress) \
	$(or $(MYSQL_DATABASE), wordpress) > $(or $(MYSQLDUMP_PATH), ./mysql/dumps/fresh.sql)

##
## MISC COMMANDS
##
.PHONY: lint
lint:
	@docker-compose ${DEV_COMPOSE} exec reactapp npm run lint

.PHONY: tail-log
tail-log:
	@docker-compose ${DEV_COMPOSE} logs -f ${CONTAINER}

.PHONY: status
status:
	@docker-compose ${DEV_COMPOSE} ps
