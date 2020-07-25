---
title: 'aws lambda deployer'
description: 'a plugin to deploy aws lambda right from IntelliJ IDEA'
slug: '/projects/aws-lambda-deployer'
date_created: '2020-07-18'
date_modified: '2020-07-18'
author: 'RD'
is_published: true
show_in_recent: true
is_project: true
---


Leveraging [AWS Lambdas](https://aws.amazon.com/lambda/) for coding microservices or better say utility functions over API, for different projects has been my go-to option.  

but deploying them after making changes is a bit brain tiring loop. therefore i developed a plugin for IntelliJ IDEA.

old routine 🤕, dealing with lambda

```
Open IntelliJ
 ↳ Write code (AWS Lambda)
  ↳ Build artifacts
   ↳ Switch from IDE to browser
    ↳ Head to AWS Console and sign in (One time step)
     ↳ Open AWS Lambda or AWS S3 web page in console
      ↳ Browse to file/folder to upload your artifact to cloud and
        hit save
       ↳ If deploying more than one lambda artifact
        ↳ Open another tab, open AWS console, browse artifact and 
          hit save
         ↳ Repeat last two steps for all lambdas to be deployed
          ↳ Switch back to IDE
           ↳ Continue coding
            ↳ <Repeat till EOD>
```

new routine 🤩  

```
Open IntelliJ
 ↳ Write code (AWS Lambda)
  ↳ Build artifact
   ↳ Deploy directly from IntelliJ IDE
    ↳ <Repeat till EOD>
```

🎄bonus: this plugin also helps in case you are dealing with multiple [AWS Named Profiles](http://docs.aws.amazon.com/cli/latest/userguide/cli-multiple-profiles.html) or [AWS Organization](https://aws.amazon.com/organizations/)  


## demo video

[YouTube link](https://youtu.be/FgwptHeace4)

## IntelliJ plugin repo link

https://plugins.jetbrains.com/plugin/14742-aws-lambda-deployer
