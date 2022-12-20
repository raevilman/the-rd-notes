---
title: 'Logback with JSON output'
slug: '/logback-with-json-output'
date_created: '2022-12-02'
date_modified: '2022-12-02'
author: 'RD'
is_published: true
show_in_recent: true
is_project: false
tags: 
---

> ## Watch the video instead: [link](https://youtu.be/usKrJZ7LcfE)  
> ## Source repo at GitHub: [link](https://github.com/raevilman/vlog-logback-json-data)

</br>
---
</br>
</br>

## #1 Add dependencies
```
implementation "ch.qos.logback.contrib:logback-json-classic:$logbackJsonVersion"
implementation "ch.qos.logback.contrib:logback-jackson:$logbackJsonVersion"
```

## #2 Add gradle properites
Add below to `gradle.properties`
```
logbackJsonVersion=0.1.5
```

## #3 Configure the logback
Make `logback.xml` look like below:  
```xml
<configuration debug="true">
    <variable name="LOG_LEVEL" value="${LOG_LEVEL:-INFO}"/>
    <variable name="LOG_DIR" value="${LOG_DIR:-/var/log}"/>

    <appender name="FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <file>${LOG_DIR}/app_logs.log</file>
        <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <!-- daily rollover -->
            <fileNamePattern>app_logs.%d{yyyy-MM-dd}.gz</fileNamePattern>
            <!-- keep 30 days' worth of history capped at 3GB total size -->
            <maxHistory>30</maxHistory>
            <totalSizeCap>3GB</totalSizeCap>
        </rollingPolicy>

        <layout class="com.therdnotes.CustomLogbackJsonLayout">
            <jsonFormatter
                    class="ch.qos.logback.contrib.jackson.JacksonJsonFormatter">
                <prettyPrint>false</prettyPrint>
            </jsonFormatter>
            <timestampFormat>yyyy-MM-dd' 'HH:mm:ss.SSS</timestampFormat>
            <appendLineSeparator>true</appendLineSeparator>
            <includeContextName>false</includeContextName>
        </layout>
    </appender>
    
    <root level="${LOG_LEVEL}">
        <appender-ref ref="FILE"/>
    </root>
</configuration>
```

> NOTE: CustomLogbackJsonLayout refers to the class we will create in the next step. Please update its path as per your project.
<br/>
<br/>  

---

<br/>  
<br/>


## #4 Custom JSON format (Optional step)

Create a custom `JsonLayout` like below

```java
package com.therdnotes;

import ch.qos.logback.classic.spi.ILoggingEvent;
import ch.qos.logback.contrib.json.classic.JsonLayout;

import java.util.Map;

public class CustomLogbackJsonLayout extends JsonLayout {

    public static final String APPLICATION = "Hello-API";
    public static final String REGION = EnvUtil.getEnvOrDefault("APP_REGION", "na");
    public static final String MACHINE_NAME = EnvUtil.getEnvOrDefault("HOSTNAME", "na");

    public CustomLogbackJsonLayout() {
        this.setIncludeMDC(false);
    }

    @Override
    protected void addCustomDataToJsonMap(Map<String, Object> map, ILoggingEvent event) {
        map.put("Application", APPLICATION);
        map.put("Region", REGION);
        map.put("MachineName", MACHINE_NAME);
        map.putAll(event.getMDCPropertyMap());
        super.addCustomDataToJsonMap(map, event);
    }
}
```