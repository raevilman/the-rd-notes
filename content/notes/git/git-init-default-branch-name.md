---
title: 'How to Change the Default Git Branch Name to Main (Best Practices for Modern Repositories)'
slug: '/git-init-default-branch-name'
date_created: '2024-02-09'
date_modified: '2024-02-09'
author: 'RD'
is_published: true
show_in_recent: true
is_project: false
tags:  git, default-branch, main-branch
---

By default, git uses `master` as the default branch name.

## Why Change the Default Git Branch Name?

Historically, Git has used `master` as the default branch name when initializing new repositories. However, many teams and platforms now recommend or require using `main` as the default branch for inclusivity and consistency.

## How to Set a New Default Branch Name in Git

You can easily change the default branch name for all new repositories you create by configuring Git globally. For example, to use `main` as the default branch:

```bash
git config --global init.defaultBranch main
```


> **Note:** This feature requires Git version 2.28.0 or newer.

Check your Git version with:

```bash
git --version
```


---

**Summary:**
Changing the default branch name in Git helps align your projects with modern best practices and platform requirements. Setting `main` as the default branch is now the standard for new repositories.