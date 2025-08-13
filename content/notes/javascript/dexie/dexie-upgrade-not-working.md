---
title: 'Dexie upgrade function is not called'
description: 'While creating a new db version, upgrade is not called'
slug: '/dexie-upgrade-is-not-working'
date_created: '2022-11-12'
date_modified: '2022-11-12'
author: 'RD'
is_published: true
show_in_recent: true
is_project: false
tags: dexie, javascript, indexeddb
---

Important note:  
The upgrade function will only run for clients having version 1 installed.  
A clean browser will go directly to version 2 **without upgrade function** and only populate function will be called.