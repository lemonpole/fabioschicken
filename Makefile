default: production

IMAGE=fabioschicken_reactapp
IMAGES=local
UNTAGGED_IMAGES=docker images -a | grep "^<none>" | awk '{print $$3}'
DANGLING_IMAGES=docker volume ls -qf dangling=true
CONTAINER=reactapp
DOCKERHUB_ADDR=larsson719/fabioschicken:reactapp

install: production

build-reactapp:
	@echo "Building docker image..."
	@cd reactapp && docker build -t ${IMAGE} .
	@echo "Done."

remove-reactapp:
	@echo "Removing existing docker image..."
	@docker rmi ${IMAGE} && echo "Done."; \
	if [ $$? -ne 0 ]; then \
		echo "Could not remove docker image."; \
	fi

tag-reactapp:
	@echo "Tagging docker image..."
	@docker tag ${IMAGE} ${DOCKERHUB_ADDR}
	@echo "Done"

publish-reactapp:
	@echo "Publishing docker image..."
	@docker push ${DOCKERHUB_ADDR}
	@echo "Done"

production:
	@echo "Running production environment"
	@docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

development:
	@echo "Running development environment"
	@docker-compose up -d

down:
	@echo "Stopping containers..."
	@docker-compose down && echo "Done."; \
	if [ $$? -ne 0 ]; then \
		echo "Could not stop containers. Exiting..."; \
		exit 1; \
	fi

restart:
	@echo "Restarting containers...";
	@docker-compose restart nginx && docker-compose restart reactapp \
	&& docker-compose restart wordpress;

restart-all: restart
	@docker-compose restart mysql

unbuild:
	@echo "Stopping containers and removing images..."
	@docker-compose down --rmi ${IMAGES} && echo "Done."; \
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

lint:
	@echo "Running lint on node container..."
	@docker-compose exec reactapp npm run lint && echo "Done."; \
	if [ $$? -ne 0 ]; then \
		echo "Could not run lint on node container. Is it running?"; \
		exit 1; \
	fi

tail-log:
	@docker-compose logs -f ${CONTAINER}
