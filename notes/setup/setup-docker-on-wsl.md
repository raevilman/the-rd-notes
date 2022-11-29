---
title: 'Install docker in WSL without Docker Desktop'
slug: '/install-docker-in-wsl-without-docker-desktop'
date_created: '2022-11-29'
date_modified: '2022-11-29'
author: 'RD'
is_published: true
show_in_recent: true
is_project: false
tags: docker, wsl, docker-desktop
---

## Install WSL 

- Open PowerShell 
- Run `wsl –install` 
- Restart machine 
- Set username and password 

 

## Setup Docker  

```sh
# update system
sudo apt-get update 

# install deps
sudo apt-get install ca-certificates curl gnupg lsb-release 

# import gpg
sudo mkdir -p /etc/apt/keyrings 

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg 

echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null 

sudo apt-get update 

# install docker
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin 

# start docker service
sudo service docker start 

# verify the installation 
sudo docker run hello-world 

```

## Run docker without sudo 

```sh
sudo groupadd docker 

sudo usermod -aG docker $USER 

```

Restart the terminal 
 

## Start docker service on WSL boot 

```sh
sudo vim /etc/wsl.conf 
```
Paste below content   

```sh
[boot] 
command="service docker start" 
```

Next time docker service will start with WSL 

---

~ HIH  
RD

References:  
- https://docs.docker.com/engine/install/ubuntu/