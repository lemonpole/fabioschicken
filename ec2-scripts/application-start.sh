#!/bin/bash

# We need to wait 30 secs to give the previous command time to fully shut the tasks down
sleep 30 && \
~/.local/bin/aws ecs update-service --service fabioschicken --desired-count 1 --cluster fabioschicken
