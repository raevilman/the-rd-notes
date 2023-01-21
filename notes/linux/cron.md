---
title: 'Add Cron Job on Linux'
slug: '/add-cron-job-on-linux'
date_created: '2022-12-20'
date_modified: '2022-12-20'
author: 'RD'
is_published: true
show_in_recent: true
is_project: false
tags: cron, linux
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

“At minute 30 of the day.”
```
30 * * * *
```

“At every 30th minute.”
```
*/30 * * * *
```

“At 04:05 on Sunday.”
```
5 4 * * sun
```

<br/>

“At 22:00 on every day-of-week from Monday through Friday.”
```
0 22 * * 1-5
```

## Operators
| Operator | Meaning | Example |
| :--- | :---: | ---: |
| `*` | Every possible value. | * in hour means every hour of the day|
| `,` | Comma separated list of values | 2,4 in hour field means 2nd and 4th hour of the day |
| `-` | Range of values | 9-11 days is equivalent to 9,10,11 with comma operator
| `/` | Step value, used to skip by the step value | Usage with range: 0-10/3 means every third hour in that range.  Can be used with `*` like */2 means every second hour of the day 



## Check Service
```sh
sudo service cron status
```

## Output to file
Update the cron job as below:  
```
* * * * * /path/to/script.sh >> /path/to/logfile/output.log 2>&1
```

> `2>&1` in the end also redirects error stream to the file. For more info read [this](/redirect-output-to-file-in-linux).

## Cron logs

```
cat /var/log/syslog | grep cron
```