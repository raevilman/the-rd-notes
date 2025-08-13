---
title: 'Update git in WSL2 Ubuntu'
slug: '/update-git-in-wsl2-ubuntu'
date_created: '2024-02-09'
date_modified: '2024-02-09'
author: 'RD'
is_published: true
show_in_recent: true
is_project: false
tags: 
---

## Check the current version of git
```bash
❯ git --version
git version 2.25.1
```

## Update git to the latest version
Ubuntu by default doesn't offer the latest version of git. 
Add `git-core` PPA to get the latest version of git.
And then install the latest version of the git.

```bash
❯ sudo add-apt-repository ppa:git-core/ppa
❯ sudo apt update
❯ sudo apt install git
```

## Check the updated version of git
```bash
❯ git --version
git version 2.43.0
```

