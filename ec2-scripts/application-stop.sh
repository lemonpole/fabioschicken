#!/bin/bash
aws ecs update-service --service fabioschicken --desired-count 0 --cluster fabioschicken
