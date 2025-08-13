---
title: 'Setup cmder terminal'
description: 'Setting the cmder terminal on Windows'
slug: '/setup-cmder-terminal'
date_created: '2020-10-04'
date_modified: '2020-10-04'
author: 'RD'
is_published: true
show_in_recent: true
is_project: false
tags: windows, terminal, setup, cmder
---

## Installation

- Download the zip from https://cmder.net/
- Extract it 
- Run Cmder.exe

## Integration

### PATH
Extend the `PATH` to include this binary, so that you can summon it from anywhere.

### Windows Explorer
- Open `cmd` as Administrator.  
- Run the following command to enable the context menu option to open cmder from a folder.  
cd into the cmder directory
```
cmder.exe /REGISTER ALL
```

Now right click on a folder and you should see 'Cmder Here' option as shown below  

![cmder explorer context menu](/images/cmder-context-menu.png)  

## Alias

- `ll` isn't available out of the box. But `ls` is. So created my version of `ll` using alias command as below  
```cmd
alias ll=ls -ltr
```
- For git status
```cmd
alias gs=git status -u
```