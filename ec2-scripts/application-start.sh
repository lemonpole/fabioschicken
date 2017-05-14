#!/bin/bash
aws ecs update-service --service fabioschicken --desired-count 1 --cluster fabioschicken
