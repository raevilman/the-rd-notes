---
title: 'Install homebrew on WSL Ubuntu'
slug: '/homebrew-on-wsl-ubuntu'
date_created: '2022-09-23'
date_modified: '2022-09-23'
author: 'RD'
is_published: true
show_in_recent: true
is_project: false
tags: homebrew, wsl, ubuntu
---


First of all, update the system and install following packages.  
```sh
sudo apt-get update
sudo apt-get install build-essential procps curl file git 
```

Then install homebrew
```sh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Do not forget to follow the 'Next Steps' shown in the output of previous command  
> run them one by one, in order
```sh
echo 'eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"' >> /home/rd/.zprofile
eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"
```

You are all set 🚀
```sh
brew help
```

---
HIH  
Till next time, take care ✌  
~RD