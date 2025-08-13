---
title: 'Share ARG in multi-stage Dockerfile'
slug: '/sharing-arg-in-multi-stage-dockerfile'
date_created: '2023-02-23'
date_modified: '2023-02-23'
author: 'RD'
is_published: true
show_in_recent: true
is_project: false
tags: docker, dockerfile
---

ARGs are available only in the scope they are defined.  

To share an ARG in multiple stages, declare the ARG in global scope and then renew it in each stage by just mentioning it.  

```
ARG GREET='hello'

FROM alpine
ARG GREET
RUN echo "$GREET boys!"

FROM alpine
ARG GREET
RUN echo "$GREET girls!"
```

building above will produce below output  

```
docker build --no-cache -t tmp-work .
Sending build context to Docker daemon  2.048kB
Step 1/7 : ARG GREET='hello'
Step 2/7 : FROM alpine
 ---> b2aa39c304c2
Step 3/7 : ARG GREET
 ---> Running in 24eea34ca14c
Removing intermediate container 24eea34ca14c
 ---> 3e095cd0335c
Step 4/7 : RUN echo "$GREET boys!"
 ---> Running in 63016c210db3
hello boys!
Removing intermediate container 63016c210db3
 ---> d991adb5e54b
Step 5/7 : FROM alpine
 ---> b2aa39c304c2
Step 6/7 : ARG GREET
 ---> Running in a41c137efba1
Removing intermediate container a41c137efba1
 ---> d15ff519af57
Step 7/7 : RUN echo "$GREET girls!"
 ---> Running in fa765f66e01d
hello girls!
Removing intermediate container fa765f66e01d
 ---> 38250ae2031b
Successfully built 38250ae2031b
Successfully tagged tmp-work:latest
```


