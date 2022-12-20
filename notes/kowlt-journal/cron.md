---
title: 'Add Cron Job on Linux'
slug: '/add-cron-job-on-linux'
date_created: '2022-12-20'
date_modified: '2022-12-20'
author: 'RD'
is_published: true
show_in_recent: true
is_project: false
tags: 
---

## Edit the `cron` file

Cron jobs are stored in a file.  
Edit that file as  

```sh
crontab -e
```

> No restart of cron service required after making changes to the cron file.


## Cron Syntax
```
1 2 3 4 5 /path/to/command arg1 arg2
```

or

```
1 2 3 4 5 /root/backup.sh
```

Where  

```
1: Minute (0-59)
2: Hours (0-23)
3: Day (0-31)
4: Month (0-12 [12 == December])
5: Day of the week(0-7 [7 or 0 == sunday])
/path/to/command – Script or command name to schedule

```

## Examples

Use [crontab.guru](https://crontab.guru/) website.  

<br/>

“At 04:05 on Sunday.”
```
5 4 * * sun
```

<br/>

“At 22:00 on every day-of-week from Monday through Friday.”
```
0 22 * * 1-5
```



## Check Service
```sh
sudo service cron status
```