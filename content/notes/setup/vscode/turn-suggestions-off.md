---
title: 'Turn off VSCode suggestions'
description: 'Steps to turn off VSCode suggestions so that they only show up when you press ctrl+space'
slug: '/turn-off-vscode-suggestions'
date_created: '2022-10-12'
is_published: true
is_project: false
tags: vs-code
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