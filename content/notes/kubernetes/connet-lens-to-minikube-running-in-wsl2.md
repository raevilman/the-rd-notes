---
title: 'Connect Lens to Minikube running in WSL2'
slug: '/connet-lens-to-minikube-running-in-wsl2'
date_created: '2024-02-09'
date_modified: '2024-02-09'
author: 'RD'
is_published: true
show_in_recent: true
is_project: false
tags:  wsl, minikube, lens, kubernetes
---

## What internet suggests

Add following location to Lens > File > Preferences > Kubernetes > Kubeconfig Syncs > Sync File
```
\\wsl.localhost\Ubuntu\home\rd\.kube\config
```

## Issue
It did pick the configs but was messing up the path when trying to connect to the cluster.

Because the config had the path as `/home/rd/.minikube/profiles/minikube/client.crt`  
and Lens was trying to use `\\wsl.localhost\Ubuntu\home\rd\.kube\home\rd\.minikube\profiles\minikube\client.crt`

![Lens not connected to minikube](/images/lens-minikube-wsl2-error.png)

## Fix
- Copy the content of config file in an editor.
- Change all the paths in a format of `\\wsl.localhost\Ubuntu\home\rd\.kube...`. Something like below

```yaml
apiVersion: v1
clusters:
- cluster:
    certificate-authority: \\wsl.localhost\Ubuntu\home\rd\.minikube\ca.crt
    extensions:
    - extension:
        last-update: Fri, 09 Feb 2024 14:04:52 IST
        provider: minikube.sigs.k8s.io
        version: v1.30.1
      name: cluster_info
    server: https://127.0.0.1:32769
  name: minikube
contexts:
- context:
    cluster: minikube
    user: minikube
  name: minikube
current-context: minikube
kind: Config
preferences: {}
users:
- name: minikube
  user:
    client-certificate: \\wsl.localhost\Ubuntu\home\rd\.minikube\profiles\minikube\client.crt
    client-key: \\wsl.localhost\Ubuntu\home\rd\.minikube\profiles\minikube\client.key
```

- Then add a new cluster in Lens using 'Add from kubeconfig' option and paste the content in the editor.
- Try to connect using the new cluster.
  ![Lens connected to minikube](/images/lens-minikube-wsl2-connected.png)

## Tip

If you happen to delete the minikube cluster and recreate it, the config needs to be updated with the new port the new cluster is running on.

Get the new port from `/home/rd/.kube/config` file.

~  
HIH  
RD