---
title: 'Turn off VSCode suggestions'
description: 'Steps to turn off VSCode suggestions so that they only show up when you press ctrl+space'
slug: '/turn-off-vscode-suggestions'
date_created: '2022-10-12'
date_modified: '2022-10-12'
author: 'RD'
is_published: true
show_in_recent: true
is_project: false
tags: vscode, suggestions, intellisense
---

Settings to turn off VSCode suggestions so that they only show up when you press ctrl+space

```
"editor.suggestOnTriggerCharacters": false,
"editor.quickSuggestions": {
  "other": false,
  "comments": false,
  "strings": false
}
```