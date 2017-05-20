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
containers, and other settings defined through there. Albeit, manually...

-   *Note: Eventually want to use the using ecs-cli compose*

-   *Note: Can also use the aws-cli to create the task definitions*

### Amazon EBS Volume

EBS Volume created to store and persist the database used by the mysql
container. If (and when) clusters or instances are deleted we don’t want to lose
the data!

Note that the volume must be in the same location (`us-east-1`) as the instance.

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

### Create the task definition

1.  Use the `docker-compose` file as a guide on how each container definition
    should be configured.

2.  When pointing to docker hub you can use `larsson719/fabioschicken:<tag>` or
    `mysql:5.7`.

3.  If you want `docker logs -f <container_id>` to work set the log-driver as
    `json-file`.

4.  When setting environment variables the task definition supports referencing
    the container name directly such as: `WORDPRESS_DB_HOST` set as
    `mysql:3306`.

5.  For the mysql container — create a volume-mapping with source path set as:
    `/mnt/fabioschicken/mysqldata`.

6.  Configure CPU Units (still figuring that out) and memory limits (still
    figuring that out)

### Create the EC2 Cluster and instance

1.  Create a cluster using the `fabioschicken` task definition from above (use
    `t2.micro` for free-tier)

2.  As of time of this writing you want number of instances set to `1`.

3.  Create a service and name it `fabioschicken`

### Attach the EBS volume to the instance

1.  Open up the ECS console and attach the volume to the instance created by the
    EC2 Cluster.

2.  Set the mount point as: `/dev/sdf`.

3.  SSH into the instance and mount the recently attached volume. [More
    info](https://devopscube.com/mount-ebs-volume-ec2-instance/).

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ bash
$ sudo mkdir /mnt/fabioschicken
$ sudo mount /dev/sdf /mnt/fabioschicken
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

1.  After attaching the volume — docker must be restarted along with the
    amazon-ecs-agent

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ bash
$ sudo service docker restart
$ docker ps -a # get the container id
$ docker restart <container_id>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

### Setup CodeDeploy Permissions

Setup permissions and roles before continuing:

-   <http://docs.aws.amazon.com/codedeploy/latest/userguide/getting-started-provision-user.html>

-   <http://docs.aws.amazon.com/codedeploy/latest/userguide/getting-started-create-service-role.html>

-   <http://docs.aws.amazon.com/codedeploy/latest/userguide/getting-started-create-iam-instance-profile.html>

### Install AWS CLI on the instance

SSH into the instance and install the AWS cli on that box. The reason being —
our deployment scripts make use of AWS cli commands for restarting services:

-   <http://docs.aws.amazon.com/cli/latest/userguide/awscli-install-linux.html>

### Setup CodeDeploy

Visit: <https://console.aws.amazon.com/codedeploy/>

When setting up CodeDeploy for the first time make sure you select `Custom
Deployment` from the list of options.

-   Application name: `fabioschicken`

-   Deployment group name: `fabioschicken`

-   Deployment type: `In-place deployment`

For `Add Instances` setting select: `Auto Scaling group` and choose the instance
created above.

-   Load balance: `None`

-   Deployment configuration: `One at a time`

-   Service role: `Choose service role created above`
