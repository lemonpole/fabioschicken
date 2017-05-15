#!/bin/bash
~/.local/bin/aws ecs update-service --service fabioschicken --desired-count 0 --cluster fabioschicken
