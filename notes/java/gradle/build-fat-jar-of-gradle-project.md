---
title: 'Build fat jar of a gradle project'
slug: '/build-fat-jar-of-gradle-project'
date_created: '2023-02-23'
date_modified: '2023-02-23'
author: 'RD'
is_published: true
show_in_recent: true
is_project: false
tags: docker, gradle, java
---

### Use the `shadow` plugin
```
plugins {
    id 'application'
    id 'com.github.johnrengelman.shadow' version '7.1.2'
}
```

### Declare main class
```
application {
    mainClass='com.therdnotes.hello.Main'
}
```

### Customize the jar(output) name | optional
```
// Output to build/libs/hello-api.jar
shadowJar {
    archiveBaseName.set('hello-api')
    archiveClassifier.set('')
    archiveVersion.set('')
}
```