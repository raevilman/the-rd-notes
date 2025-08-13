---
title: '[Notes] IAM Authentication for RDS MySQL'
slug: '/rds-mysql-iam-authentication'
date_created: '2023-01-25'
date_modified: '2023-01-25'
author: 'RD'
is_published: true
show_in_recent: true
is_project: false
tags: aws, rds, mysql, iam, authentication
---

## Why cleartext-plugin is used?
IAM auth uses something, very similar to a pre-signed URL as a password.  

That is why we must use the `--enable-cleartext-plugin` option in the connection string.  

The `--enable-cleartext-plugin` syntax is used for passing the password as plain text.  

Default behaviour is to encrypt the password before sending it to the server.  

Because this pre-signed-url-like token needs to be understood by **AWSAuthenticationPlugin**, therefore it can not be encrypted.

Moreover for RDS, `--enable-cleartext-plugin` syntax also indicates that AWSAuthenticationPlugin must be used for the database connection.

### SSL
When using AWSAuthenticationPlugin, the connection is secured using SSL.  
To verify this  

```
show status like 'Ssl%';
```


Resources:  

- https://aws.amazon.com/premiumsupport/knowledge-center/rds-mysql-access-denied/
- https://www.thegeekdiary.com/understanding-mysql-pluggable-authentication/