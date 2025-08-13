---
title: 'Git init default branch name'
slug: '/git-init-default-branch-name'
date_created: '2024-02-09'
date_modified: '2024-02-09'
author: 'RD'
is_published: true
show_in_recent: true
is_project: false
tags: 
---

By default, git uses `master` as the default branch name.
But this can be changed to `main` or any other name.
Just configure git as follows:

```bash
git config --global init.defaultBranch main
```

You should be using git version >= 2.28.0 to use this feature.
Check your git version using:

```bash
git --version
```

For WSL users, you can update git to the latest version using [this guide](/update-git-in-wsl2-ubuntu).