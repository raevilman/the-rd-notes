---
title: 'Kill process running on port'
slug: '/kill-process-running-on-port'
date_created: '2023-01-09'
date_modified: '2023-01-09'
author: 'RD'
is_published: true
show_in_recent: true
is_project: false
tags: linux
---

### To get the open file:  
```sh
sudo lsof -i:8080
```

![lsof command output](/images/list-of-open-files-by-port.png)

### To kill it one go

```sh
sudo kill -9 `sudo lsof -t -i:8080`
```