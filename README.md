# OneLogin Demo Lab

## Introduction

This project is meant to serve as a _very_ simplified example of a typical user-facing application that uses various OneLogin integrations for authentication. There is a login and sign up flow followed by a number of protected resources. The login and sign up flows can be altered by leveraging various react components or back-end apps that integrate OneLogin features.

## Example

You may want to examine what a multi-factor authentication flow looks like or see an end-to-end example of this using an integration with the back-end of your choice.

Let's say you have a back-end written in `TypeScript` that handles logins and sign ups, which uses OneLogin services to facilitate sending the one-time password (OTP) to a user based on some user behavior. This front-end would give you simple login and sign up form and make requests to the back-end containers so you can see this behavior without any sample code or, you may even want to use a copy of this project as a starting point for your app.

This would also integrate with our `Ruby` `Python` `Java` `C#/.NET` or `Golang` based back-end examples depending on your needs.

## Setup - Requires Docker

Currently we don't host or build images so you'll need to do the build step.

Generally the steps are

* Clone repositories and build images for front-end and back-end project(s) `docker-compose build`
* Create a network for all the projects to live on  `docker network create <network>`
* Ensure back-end examples have nginx proxies defined
* Start back-end `docker-compose up`
* Start front-end `docker-compose up`

1. Clone this repository and from the root run `docker-compose build`

2. Clone one of our backend examples, usually in the form of  `<feature>-<language>-example` and from its root run `docker-compose build`

   1.  e.g. `smartmfa-typescript-example`

3. Notice the `networks` node is set to `testbed` this is the network we'll want to create with `docker network create testbed`

   1. You may change this network name if you wish, just be sure to do it in the back-end and front-end `docker-compose.yml` files

4. Start the back-end project first `docker-compose up` to bring up the server side

5. Start the front-end project last. Nginx needs to know the back-end exists first or it will crash. `docker-compose up`

   1. The front-end uses nginx to proxy requests to the back-end(s)

   2. You'll notice there is a `nginx.conf` file here with the smartmfa example. Whenever you want to integrate with another back-end, make sure you change the `nginx.conf` to include the new service. For example:

      1. ```nginx
         location /<container_name_from_docker-compose.yml_for_service>/
         {
           proxy_pass http://<container_name_from_docker-compose.yml_for_service:<port>/;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
         }
         ```

### Major Compose File

If you wish to skip the bit about building a network, you may also elect to clone the repositories under a common directory and add a single `docker-compose.yml` file. Doing so will get around the need to create a network.

The easiest way to do this is to copy the service nodes from each service's `docker-compose.yml` file into your new major `docker-compose.yml` file. Ensure your `volumes` and `build` paths get updated with the actual locations of your projects.

## Distribution Notes

This app uses webpack to create a development server. It is intended to enable developers to make changes and observe them as they try to integrate or test other OneLogin services into it. Therefore this app should really only be distributed with the intent of demonstrating a concept or feature, facilitating a live workshop, or as a starting point for coding a new project. Therefore this app is NOT INTENDED FOR PRODUCTION USE.
