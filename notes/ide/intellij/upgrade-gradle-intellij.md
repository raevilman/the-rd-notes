---
title: 'Upgrade gradle in Intellij Project'
description: ''
slug: '/upgrade-gradle-intellij'
date_created: '2021-08-01'
date_modified: '2021-08-01'
author: 'RD'
is_published: true
show_in_recent: true
is_project: false
---

For those who land on this page because they are looking for how to update Gradle in IntelliJ.
This page explains that relatively well:
https://docs.gradle.org/current/userguide/gradle_wrapper.html#sec:upgrading_wrapper

For me (Windows) it was:

```
./gradlew.bat wrapper --gradle-version 6.6.1
```

source:  
https://intellij-support.jetbrains.com/hc/en-us/community/posts/360000029630/comments/360002221360