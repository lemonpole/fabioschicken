#!/bin/bash
~/.local/bin/aws ecs update-service --service fabioschicken --desired-count 1 --cluster fabioschicken
