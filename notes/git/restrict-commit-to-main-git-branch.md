---
title: 'Restrict commit to main git branch'
slug: '/restrict-commit-to-main-git-branch'
date_created: '2024-02-09'
date_modified: '2024-02-09'
author: 'RD'
is_published: true
show_in_recent: true
is_project: false
tags: git, branch, commit, main, master
---

# Restrict commit to main git branch

Create a pre-commit hook to restrict commits to the main branch.

Create a file named `pre-commit` in `.git/hooks` directory.

```bash
#!/bin/bash

branch="$(git rev-parse --abbrev-ref HEAD)"

if [ "$branch" = "main" ]; then
  echo "You can't commit directly to main branch"
  exit 1
fi
```

## Points to note.
- This can be easily bypassed.
- GitHub offers branch protection which is a paid feature.