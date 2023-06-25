---
title: 'IntelliJ GUI application with WSL'
slug: '/intellij-gui-application-with-wsl'
date_created: '2023-06-25'
date_modified: '2023-06-25'
author: 'RD'
is_published: true
show_in_recent: true
is_project: false
tags: wsl, gui, wslg, applications
---


# IntelliJ in WSLg 

Download JetBrains toolbox. Get the latest link from [here](https://www.jetbrains.com/toolbox-app/download/download-thanks.html?platform=linux)

 

```bash

wget https://download.jetbrains.com/toolbox/jetbrains-toolbox-1.28.1.15219.tar.gz

```

Extract


```bash

sudo tar -xzf jetbrains-toolbox-1.28.1.15219.tar.gz -C /opt

```
Run and if Error

```bash

/opt/jetbrains-toolbox-1.28.1.15219/jetbrains-toolbox

dlopen(): error loading libfuse.so.2

 

AppImages require FUSE to run.

You might still be able to extract the contents of this AppImage

if you run it with the --appimage-extract option.

See https://github.com/AppImage/AppImageKit/wiki/FUSE

for more information
```

Fix

```bash
sudo apt install libfuse2
```
Run toolbox again

```bash
/opt/jetbrains-toolbox-1.28.0.15158/jetbrains-toolbox
```

if its not coming up

just install gedit like below

```bash
sudo apt update  // Do not ignore. Please run this first.
sudo apt install gedit -y
```

Close the termial window(not tab) and open again.

Run gedit like below

```bash
gedit
```

Now try to run toolbox again

Install IDEs you want.

Run IntelliJ from command line

```bash
idea
```
or

```bash
~/.local/share/JetBrains/Toolbox/scripts/idea
```