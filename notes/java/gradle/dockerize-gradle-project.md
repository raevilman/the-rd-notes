---
title: 'Dockerize gradle project'
slug: '/dockerize-gradle-project'
date_created: '2023-02-23'
date_modified: '2023-02-23'
author: 'RD'
is_published: true
show_in_recent: true
is_project: false
tags: docker, gradle, java
---

## #1: Configure gradle to produce fat jar
Read -> [this](/build-fat-jar-of-gradle-project)

## #2:  Writing `Dockerfile`

<br/>

### Stage 1: Cache dependencies


Use multi-stage docker build process to separate and cache the dependencies library

```
ARG BUILD_HOME=/home/gradle/app

FROM gradle:jdk17-alpine as cache
ARG BUILD_HOME
WORKDIR $BUILD_HOME
ENV GRADLE_USER_HOME /cache
COPY build.gradle gradle.properties settings.gradle ./
RUN gradle build --no-daemon --stacktrace
```

Above will produce a stage of docker build with all your project dependencies downloaded  
and this wont be built again untill you change anything in above code.


### Stage 2: Build your project

```
FROM gradle:jdk17-alpine as builder
ARG BUILD_HOME
WORKDIR $BUILD_HOME
COPY --from=cache /cache /home/gradle/.gradle
COPY . $BUILD_HOME/
RUN gradle --no-daemon clean build --stacktrace
```

In above, we copied the source code and did a clean gradle build.  

### Stage 3: Running the project

Separating this stage from the previous step allows us to produce a lighter image excluding source files etc.

```
FROM openjdk:17
ARG BUILD_HOME
WORKDIR $BUILD_HOME
COPY --from=builder $BUILD_HOME/build/libs/hello-api.jar app.jar
EXPOSE 80
ENTRYPOINT ["java","-jar","app.jar"]
```

## #3. Building

Run below  
```sh
docker build -t hello-api:latest .
```

----


So the final `Dockerfile` will look something like this  

```
ARG BUILD_HOME=/home/gradle/app

FROM gradle:jdk17-alpine as cache
ARG BUILD_HOME
WORKDIR $BUILD_HOME
ENV GRADLE_USER_HOME /cache
COPY build.gradle gradle.properties settings.gradle ./
RUN gradle build --no-daemon --stacktrace

FROM gradle:jdk17-alpine as builder
ARG BUILD_HOME
WORKDIR $BUILD_HOME
COPY --from=cache /cache /home/gradle/.gradle
COPY . $BUILD_HOME/
RUN gradle --no-daemon clean build --stacktrace

FROM openjdk:17
ARG BUILD_HOME
WORKDIR $BUILD_HOME
COPY --from=builder $BUILD_HOME/build/libs/hello-api.jar app.jar
EXPOSE 80
ENTRYPOINT ["java","-jar","app.jar"]
```

## FAQs

Q: What if I want to rebuild all stages i.e. not use cached stages?  
A: use `--no-cache` like below  

```sh
docker build --no-cache -t hello-api:latest .
```

Q: Why `ARG` declared before `FROM` statement at start of the file?  
A: Read -->  [this](/sharing-arg-in-multi-stage-dockerfile)

