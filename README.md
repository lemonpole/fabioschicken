Fabio’s Chicken
===============

Getting Started
---------------

### Create a launch configuration and auto-scaling group in EC2

We want to manually create these so that we don’t end up going over the 30GB
storage limit for the free-tier:  
**Launch Configuration**

1.  Name it `fabioschicken-1`

2.  Ensure that the data volume storage do not exceed 30GB!

3.  Configure the security group. By default the instance does not allow traffic
    in (not even SSH)

**Auto-scaling group**

1.  Name it `fabioschicken`

2.  Use the launch configuration created above

### Create the task definition in EC2 Container Service

1.  Use the `docker-compose` file as a guide on how each container definition
    should be configured.

2.  When pointing to docker hub you can use `larsson719/fabioschicken:<tag>` or
    `mysql:5.7`.

3.  If you want `docker logs -f <container_id>` to work set the log-driver as
    `json-file`.

4.  When setting environment variables the task definition supports referencing
    the container name directly or a URL such as: `WORDPRESS_DB_HOST` set as
    `<rds_instance_ip>:3306`.

5.  Configure CPU Units (still figuring that out) and memory limits (still
    figuring that out)

### Create the EC2 Container Service Cluster

1.  Create a **empty** cluster.

2.  As of time of this writing you want number of instances set to `1`.

3.  Create a service and name it `fabioschicken`

### Setup CodeDeploy Permissions

Setup permissions and roles before continuing:

-   <http://docs.aws.amazon.com/codedeploy/latest/userguide/getting-started-provision-user.html>

-   <http://docs.aws.amazon.com/codedeploy/latest/userguide/getting-started-create-service-role.html>

-   <http://docs.aws.amazon.com/codedeploy/latest/userguide/getting-started-create-iam-instance-profile.html>

### Install AWS CLI on the instance

SSH into the instance and install the AWS cli on that box. The reason being —
our deployment scripts make use of AWS cli commands for restarting services:

-   <http://docs.aws.amazon.com/cli/latest/userguide/awscli-install-linux.html>

After installing run `aws configure` and setup with Access and Secret Keys.

### Setup CodeDeploy

Visit: <https://console.aws.amazon.com/codedeploy/>

Note: CodeDeploy agent must also be installed on the instance:
<http://docs.aws.amazon.com/codedeploy/latest/userguide/codedeploy-agent-operations-install.html>

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

### Add CodeDeploy integration to Github

-   Click repository settings: `Integration and Services`

-   Add Service: `AWS CodeDeploy`

-   Fill out fields to match the application and deployment name

-   For AWS Access and Secret Key:

    -   <https://console.aws.amazon.com/iam/>

    -   Select a user that’s configured with CodeDeploy permissions

    -   `Security Credentials`

    -   `Create Access Key` — Make sure to save these keys because they are only
        shown once! (Cannot go back to them again)

-   `Add Service`

Add Github AutoDeploy

Finally, the last step involves adding one more github integration called
`Github AutoDeploy`. Follow the instructions (add a github auth token).

After this is completed the last step is to attach the following custom policy
to the user on aws console— either directly or through its own dedicated role:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "codedeploy:GetDeploymentConfig",
      "Resource": "arn:aws:codedeploy:us-east-1:123ACCOUNTID:deploymentconfig:*"
    },
    {
      "Effect": "Allow",
      "Action": "codedeploy:RegisterApplicationRevision",
      "Resource": "arn:aws:codedeploy:us-east-1:123ACCOUNTID:application:APPLICATION_NAME"
    },
    {
      "Effect": "Allow",
      "Action": "codedeploy:GetApplicationRevision",
      "Resource": "arn:aws:codedeploy:us-east-1:123ACCOUNTID:application:APPLICATION_NAME"
    },
    {
      "Effect": "Allow",
      "Action": "codedeploy:CreateDeployment",
      "Resource": "arn:aws:codedeploy:us-east-1:123ACCOUNTID:deploymentgroup:APPLICATION_NAME/DEPLOYMENT_GROUP"
    }
  ]
}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
