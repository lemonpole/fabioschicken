Fabio’s Chicken
===============

Deployment Description
----------------------

Current deployment setup consists of:

-   [EC2 Container
    Service](http://docs.aws.amazon.com/AmazonECS/latest/developerguide/ECS_GetStarted.html)

-   [Amazon EBS
    Volume](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EBSVolumes.html)

-   [CodeDeploy](http://docs.aws.amazon.com/codedeploy/latest/userguide/getting-started-codedeploy.html)

-   [Docker Hub](https://hub.docker.com/r/larsson719/fabioschicken/tags/)

 

### EC2 Container Service

Used to orchestrate the docker stack through [task
definitions](http://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definitions.html).
The task definitions are the equivalent of the `docker-compose.yml` file. Each
can be configured through the AWS Console with environment variables, linked
containers, and other settings defined through there. Albeit, manually.[^1][^2]

[^1]: Eventually want to use the using ecs-cli compose

[^2]: Can also use the awe-cli to create the task definitions

 

### Amazon EBS Volume

EBS Volume created to store and persist the database used by the mysql
container. If (and when) clusters or instances or deleted we don’t want to lose
the data!

 

Note that the volume must be in the same location (us-east-1) as the instance.

 

### CodeDeploy

Description coming soon

 

### Docker Hub

Each component of the stack is stored as a tag under the fabioschicken docker
repository:

-   reactapp

-   wordpress (wp-theme)

-   nginx

 

Getting Started
---------------

### Create the EC2 Cluster and instance

1.  Create a cluster using EC2 Container Service. (use `t2.micro` for free-tier)

2.  Create a service and name it `fabioschicken`

 

### Attach the EBS volume to the instance

1.  SSH into the instance and mount the recently attached volume:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ bash
$ sudo mkdir /mnt/fabioschicken
$ sudo mount /dev/sdf /mnt/fabioschicken
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

 

1.  After attaching the volume docker must be restarted along with the
    amazon-ecs-agent

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ bash
$ sudo service docker restart
$ docker ps -a # get the container id
$ docker restart <container_id>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

 

### Setup CodeDeploy on the instance

Coming soon
