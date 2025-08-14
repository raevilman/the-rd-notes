---
title: 'NVM for Windows Subsystem for Linux'
description: 'Opt for nvm over node when using WSL'
slug: '/nvm-for-windows-subsystem-for-linux'
date_created: '2020-12-06'
date_modified: '2020-12-06'
author: 'RD'
is_published: true
show_in_recent: true
is_project: false
tags: windows, terminal, setup
---

A day back, I wrote about [Setting up Hyper terminal with ZSH on Windows](/setup-hyper-terminal-with-zsh-on-windows) machine.  

Although the setup might work flawless, but there were some hiccups when I tried Node projects with it.  

So here are notes on the problems I faced and solutions I opted for.  


- Your Window's NodeJs installation wont work in WSL. You would need to install it again using:  
```
sudo apt install nodejs
sudo apt install npm
```
- When trying to npm, you might see below:  
![Remove node modules](/images/remove-node-modules.png)  
  
Solution to this is to remove the `node_modules` directory and install the packages again:  
```
rm -rf ./node_modules
npm install
```

Still there might be cases where you can face problems like one below.  
Where I am trying to install `gatsby-cli` but failed because of write permissions.  

![](/images/npm-permission-issue.png)

For the solution, you can refer to this [StackOverflow answer](https://stackoverflow.com/a/40905762/958616).  

### NVM

As suggested in the SO answer, I decided to use `nvm`. Which felt a great option after reading about it.  

So I removed node and npm using apt and installed nvm as below:  

- Get the shell script  
```
curl -sL https://raw.githubusercontent.com/creationix/nvm/v0.35.3/install.sh -o install_nvm.sh
```

- After verifying, run it  
```sh
./install_nvm.sh
```

- It added its following stuff to the `.bashrc` file So i had to move it to `.zshrc` to make it work.
```sh
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_complet>
```

- Restart the hyper terminal or source the `.zshrc` file
- You can list available node version with following command  
  ```sh
nvm ls-remote
  ```
- Then you can install node as  
```sh
nvm install 14.15.1
```
- Try checking node version to verify installation  
```sh
node -v
```
- You can list node installations with  
```sh
nvm ls
```
- Switching between versions can be achieved as below  
```sh
nvm alias fix-bug 12.18.3
nvm use fix-bug
```

### Conclusion

After setting up node with nvm. Everything worked smoothly.  
Do remove `node_modules` directory and start fresh.  
----

Thats it for this note.  
HIH
~ RD





