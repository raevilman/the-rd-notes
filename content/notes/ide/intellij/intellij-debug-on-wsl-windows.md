---
title: 'IntelliJ Debug on WSL Windows'
slug: '/intellij-debug-on-wsl-windows'
date_created: '2022-12-27'
date_modified: '2022-12-27'
author: 'RD'
is_published: true
show_in_recent: true
is_project: false
tags: intellij, wsl, debug, windows, java
---

Steps, I've taken to debug apps on WSL.  

## #1 Note the network type you are connected to
I was working on my home network, so I marked it as private network.  

![Windows Wifi Settings](./assets/wifi-network-type.png)  

## #2 Make sure IntelliJ is allowed on the network type  

As I am connected to private network, IntelliJ should be allowed on same as shown below  

![Windows Defender allow Intellij](./assets/windows-defender-intellij-allow.png)


## #3 Use IP4 for debugging
I used below JVM parameter in the run configurations of Intellij  

```
-Djava.net.preferIPv4Stack=true
```

as shown below  

![IntelliJ run config](./assets/intellij-run-config-java-ip4.png)

and I was able to connect to the debugger 🤘  

---

PS: HIH
~RD