---
title: 'WSL date and time out of sync'
slug: '/wsl-date-and-time-out-of-sync'
date_created: '2023-08-20'
date_modified: '2023-08-20'
author: 'RD'
is_published: true
show_in_recent: true
is_project: false
tags: wsl, date, time, sync
---

## Problem
WSL data/time is out of sync with Windows or the actual time.

## Solution 1

Run below command in WSL terminal:
```bash
sudo hwclock -s
```

## Solution 2

Sometimes, the above solution doesn't work.  
Then go the hard way.  

```bash
sudo date -s "$(wget -qSO- --max-redirect=0 google.com 2>&1 | grep Date: | cut -d' ' -f5-8)Z"
```

---

  HIH  
~ RD