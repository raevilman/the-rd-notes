---
title: 'Kubernetes deployment from scratch for beginners | Multi environment setup | Argo CD | Kustomize | AWS EKS'
description: 'Lets deploy two apps on Kubernetes from scratch with separate environments for dev and qa.'
slug: '/kubernetes-deployment-from-scratch'
date_created: '2022-10-07'
date_modified: '2022-10-07'
author: 'RD'
is_published: true
show_in_recent: true
is_project: false
tags: kubernetes, kustomize, argo-cd, aws-eks, multi-environment, deployment
---

![Kubernetes deployment from scratch for beginners | Multi environment setup | Argo CD | Kustomize | AWS EKS](./assets/yt_thumb_k8s_deployment_from_scratch.png)


10 days back I was given a task to deploy two applications in kubernetes.  

Acceptence criteria

- Apps should be accessible using endpoints
- Separate deployments for dev and qa
- Follow GitOps approach
- One app needs to access the RDS database
- Use AWS EKS

So lets finish this task starting from scratch and learn along the way.

# 🤔 Where to start from?

All we got are two apps and a database. Lets get ourselves a kubernetes cluster.

## 1. Create k8s cluster 🚀 

- Go to AWS EKS console
  - Create cluster
    - Name -> my-first-eks
    - Version -> default
    - Role
      - Create Role
      - Service -> EKS -> EKS Cluster
      - Name -> my-first-eks
    - Default for VPC and networking
  - Create node group
    - Name -> my-first-eks-node-group
    - Role
      - Create Role
      - Name -> my-first-eks-node-role
      - Permissions
        - AmazonEC2ContainerRegistryReadOnly
        - AmazonEKS_CNI_Policy
        - AmazonEKSWorkerNodePolicy
      - Scaling
        - Desired: 1
        - Min: 1
        - Max: 1

<br/>
<br/>


## 2. Setup `kubectl`

Now that we have a cluster, lets connect to it using `kubectl`

`kubectl` is your primary tool to interact with kubernetes cluster.

- Download and install
    ```
    curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"

    sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
    ```
- Setup kubeconfig 
  - Followed this 👉 [AWS documentation](https://docs.aws.amazon.com/eks/latest/userguide/create-kubeconfig.html)
    
    ```sh
    aws sts get-caller-identity
    aws eks update-kubeconfig --region region-code --name my-cluster
    ```

    The above command will create a file `~/.kube/config` with the cluster details.
- Verify by listing pods  
  `kubectl get pods -A`
  
- [Optional] Add shell completions
  - For zsh, add following to the .zshrc file and restart the shell  
    `source <(kubectl completion zsh)`

<br/>
<br/>

## 3. My first k8s deployment 🚀

Now lets get our hands dirty and deploy our first app.  

- Create a deployment
  - Create a file `deployment.yaml` with the following content

    ```yaml
    apiVersion: apps/v1
    kind: Deployment
    metadata:
    name: my-first-deployment
    spec:
    replicas: 1
    selector:
        matchLabels:
        app: my-first-deployment
    template:
        metadata:
        labels:
            app: my-first-deployment
        spec:
        containers:
            - name: my-first-deployment
            image: nginx:latest
            ports:
                - containerPort: 80
    ```
  - Apply the deployment  
    `kubectl apply -f deployment.yaml`
  - Verify the deployment  
    `kubectl get deployments`

- Create a service
    - Create a file `service.yaml` with the following content
        ```yaml
        apiVersion: v1
        kind: Service
        metadata:
            name: my-first-service
        spec:
            ports:
            - port: 80
                targetPort: 80
                protocol: TCP
            selector:
                app: my-first-deployment
        ```
    - Apply the service  
        `kubectl apply -f service.yaml`
    - Verify the service  
        `kubectl get services`

- Accessign the app
    - Forward the port
      - `kubectl port-forward svc/my-first-service 8080:80` 
    - Now you can access the app  
      at `http://localhost:8080`


## 4. Tools
Couple of tools that I used in my first week of kubernetes

1. k9s
2. kubens
3. kubectx
4. VS Code Kubernetes extension by Microsoft

## 5. Argo CD 🚀

- Install ArgoCD
    
    ```sh
    kubectl create namespace argocd
    kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
    ```

- Configure port forwarding  
  `kubectl port-forward svc/argocd-server -n argocd 8080:443`

- Access the UI
  - https://localhost:8080
  - Credentials
    - Username: admin
    - Password: use below command
      - `kubectl get secret argocd-initial-admin-secret -n argocd -o jsonpath="{.data.password}" | base64 -d; echo`







---

Link:

- Get to know Kubernetes  
    - [Kubernetes Crash Course for Absolute Beginners](https://youtu.be/s_o8dwzRlu4)


|  HIH  
|  Take care  
~ @raevilman