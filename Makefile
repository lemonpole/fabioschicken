UNTAGGED_IMAGES=docker images -a | grep "^<none>" | awk '{print $$3}'
DANGLING_IMAGES=docker volume ls -qf dangling=true

IMAGE_NGINX=fabioschicken_nginx
IMAGE_WORDPRESS=fabioschicken_wordpress
IMAGE_REACTAPP=fabioschicken_reactapp

CONTAINER_MYSQL=fabioschicken_mysql_1
CONTAINER_NGINX=nginx
CONTAINER_WORDPRESS=wordpress
CONTAINER_REACTAPP=reactapp

NGINX_PUBLISH_ADDR=larsson719/fabioschicken:nginx
WORDPRESS_PUBLISH_ADDR=larsson719/fabioschicken:wp-theme
REACTAPP_PUBLISH_ADDR=larsson719/fabioschicken:reactapp

default: production
install: production

build-nginx:
	@echo "Building docker image..."
	@cd nginx && docker build -t ${IMAGE_NGINX} .
	@echo "Done."

build-wordpress:
	@echo "Building docker image..."
	@cd wordpress && docker build -t ${IMAGE_WORDPRESS} .
	@echo "Done."

build-reactapp:
	@echo "Building docker image..."
	@cd reactapp && docker build -t ${IMAGE_REACTAPP} .
	@echo "Done."

tag-nginx:
	@echo "Tagging docker image..."
	@docker tag ${IMAGE_NGINX} ${NGINX_PUBLISH_ADDR}
	@echo "Done"

tag-wordpress:
	@echo "Tagging docker image..."
	@docker tag ${IMAGE_WORDPRESS} ${WORDPRESS_PUBLISH_ADDR}
	@echo "Done"

tag-reactapp:
	@echo "Tagging docker image..."
	@docker tag ${IMAGE_REACTAPP} ${REACTAPP_PUBLISH_ADDR}
	@echo "Done"

publish-nginx:
	@echo "Publishing docker image..."
	@docker push ${NGINX_PUBLISH_ADDR}
	@echo "Done"

publish-wordpress:
	@echo "Publishing docker image..."
	@docker push ${WORDPRESS_PUBLISH_ADDR}
	@echo "Done"

publish-reactapp:
	@echo "Publishing docker image..."
	@docker push ${REACTAPP_PUBLISH_ADDR}
	@echo "Done"

release-nginx: build-nginx tag-nginx publish-nginx
release-wordpress: build-wordpress tag-wordpress publish-wordpress
release-reactapp: build-reactapp tag-reactapp publish-reactapp
release: release-nginx release-wordpress release-reactapp

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
	@docker-compose exec mysql mysqldump -u${MYSQL_USERNAME} \
	-p${MYSQL_PASSWORD} ${MYSQL_DATABASE} > ${MYSQLDUMP_PATH} && echo "Done."

lint:
	@echo "Running lint on reactapp container..."
	@docker-compose exec reactapp npm run lint && echo "Done."; \
	if [ $$? -ne 0 ]; then \
		echo "Could not run lint on node container. Is it running?"; \
		exit 1; \
	fi

tail-log:
	@docker-compose logs -f ${CONTAINER}
