---
title: 'IntelliJ hangs on edit configurations of DockerFile'
description: ''
slug: '/intellij-hangs-on-edit-configurations-of-docker'
date_created: '2021-08-18'
date_modified: '2021-08-18'
author: 'RD'
is_published: true
show_in_recent: true
is_project: false
---

## Problem

This note is regarding one issue I faced yesterday, where in I wasn't able to edit the docker configuration which was added using the option in context menu of DockerFile, as shown below:



![docker-modify-run-config](./docker-modify-run-config.jpg)


## Solution


The solution was to get rid of this corrupted configuration and add a new one using edit configurations dialog itself.  
I've recorded the below vlog about it.  

[![Video showcasing the solution](./intellij-docker-config-issuevideo-thumbnail.jpg)](https://youtu.be/6WTvK_ltqig "IntelliJ hangs on edit configurations of DockerFile")

HIH
