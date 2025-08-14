---
title: 'Restrict commit to main git branch'
slug: '/restrict-commit-to-main-git-branch'
date_created: '2024-02-09'
date_modified: '2024-02-09'
author: 'RD'
is_published: true
show_in_recent: true
is_project: false
tags: git
---

# Understand the concept

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
- This file doesn't get pushed to the remote repository. So, this won't work for a team.

## For the team

The trick is create the above discussed file as part of the build process.

For gradle projects, add the following to `build.gradle` file.

```groovy
task createPreCommitHook(type: Copy) {
    from new File(rootProject.rootDir, 'scripts/pre-commit')
    into { new File(rootProject.rootDir, '.git/hooks')}
    fileMode 0775
}
```

Create a file named `pre-commit` in `scripts` directory with the content as discussed above.

You can verify the file is created by running `./gradlew build` command.

