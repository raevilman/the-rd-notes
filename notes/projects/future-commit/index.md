---
title: 'git commit in future'
description: 'Use future date while making git commits'
slug: '/projects/git-commit-future-date'
date_created: '2022-09-30'
date_modified: '2022-09-30'
author: 'RD'
is_published: true
show_in_recent: true
is_project: true
tags: git, commit, date, homebrew
---

# What?
A tiny utility to `git commit` in the future.  

# Syntax

Below is the syntax to commit with future date. Just change both the dates:  

```sh
GIT_AUTHOR_DATE='2022-09-30 21:03' GIT_COMMITTER_DATE='2022-09-30 21:03' git commit -m 'msg'
```

# Install

Prefer to have it installed!
```
brew tap raevilman/tap
brew install future-commit
```

# Demo

![](https://github.com/raevilman/future-commit/raw/master/assets/demo.gif)

# Source

Github: https://github.com/raevilman/future-commit


# Learnings
Learnings from doing this project:
- How to package a node script into executable?
- How to brew your own formula?
- How to create and use your personal tap for homebrew?

# Create your own formulae

Watch the tutorial here 👉 https://youtu.be/HkIlWwKg6F 

