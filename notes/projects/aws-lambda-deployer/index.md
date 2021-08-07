---
title: 'AWS Lambda Deployer'
description: 'a plugin to deploy aws lambda right from IntelliJ IDEA'
slug: '/projects/aws-lambda-deployer'
date_created: '2020-07-18'
date_modified: '2021-03-29'
author: 'RD'
is_published: true
show_in_recent: true
is_project: true
---


Leveraging [AWS Lambdas](https://aws.amazon.com/lambda/) for coding microservices or better say utility functions over API, for different projects has been my go-to option.  

but deploying them after making changes is a bit brain tiring loop. therefore i developed a plugin for IntelliJ IDEA.

### Old routine 🤕, dealing with lambda

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

### New routine 🤩  

```
Open IntelliJ
 ↳ Write code (AWS Lambda)
  ↳ Build artifact
   ↳ Deploy directly from IntelliJ IDE
    ↳ <Repeat till EOD>
```

### Bonus 🎄  

this plugin also helps in case you are dealing with multiple [AWS Named Profiles](http://docs.aws.amazon.com/cli/latest/userguide/cli-multiple-profiles.html) or [AWS Organization](https://aws.amazon.com/organizations/)   
<br/>

---

<br/>

## Update v2020.3.3 | 29 March 2021

- Introducing support for Lambda Layers.  
  <br/>
  You can create new versions of Lambda layers as well delete the old ones.  
  <br/>
  Also(the most tedious task), you can update Lambda Functions to any layer version with one button, right from the IDE.  
  <br/>

- Support for inbuilt AWS profiles. No dependency on AWS CLI installation.


---

<br/>

### Demo videos   

|  | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |  |
| :---     |   :---: | ---:
| 👉 Second demo | [YouTube](https://youtu.be/cYftiidD7xU) | (27 March, 2021)  
| 👉 First demo | [YouTube](https://youtu.be/FgwptHeace4) | (25 July, 2020)

<br/>

### Link

Link to JetBrains Plugin website:  

[https://plugins.jetbrains.com/plugin/14742-aws-lambda-deployer](https://plugins.jetbrains.com/plugin/14742-aws-lambda-deployer)

---

### UPDATES
- 01 August, 2021
  - Makes it compatible with JetBrains IDE v2021.2.
- 08 April, 2021
  - Makes it compatible with JetBrains IDE v2021.1.
  - Support for inbuilt AWS profiles. No dependency on AWS CLI installation.
-  27 March, 2021  
  - Supports AWS Lambda Layers. Create new versions, delete old versions and update lambda functions to any layer version right from the IDE.  
  - Support for inbuilt AWS profiles. No dependency on AWS CLI installation.
- 28 August, 2020  
  - Plugin is now compatible with IntelliJ Platform 2020.2.1  
- 20 December, 2020  
  - Plugin is now compatible with IntelliJ Platform 2020.3