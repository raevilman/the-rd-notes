---
title: 'Forward reference extends over definition'
description: 'A note on the issue I faced while working with Vert.x in Scala'
slug: '/forward-reference-extends-over-definition'
date_created: '2020-02-22'
date_modified: '2020-02-22'
author: 'RD'
is_published: true
show_in_recent: true
is_project: false
---

## Problem
So, I was writing a Vert.x periodic task and wanted to cancel that task in its handler itself on some condition.  

I wrote the following code.  

```scala
import java.lang
import io.vertx.core.{Handler, Vertx}

object lazyFuture {
  private val vertx: Vertx = Vertx.vertx()
  var count: Int = 0

  def main(args: Array[String]): Unit = {
    val periodId: Long = vertx.setPeriodic(1000, new Handler[lang.Long] {
      override def handle(event: lang.Long): Unit = {
        println(s"the count is at $count")
        if (count >= 1) {
          println("i've done once. wont do it again! because state management is yet to be implemented.")
          val isCancelled = vertx.cancelTimer(periodId)
          println(s"periodic task cancelled? : $isCancelled")
        }
        else {
          println("doing some work periodically!!")
        }
        count = count + 1
      }
    })
  }
}
```

But compilation gave me the following error:  
```
Error:(17, 47) forward reference extends over definition of value periodId

val isCancelled = vertx.cancelTimer(periodId)
```

It basically says that, I am actually trying to use(forward reference) the `val periodId` in its own definition. which i can/should not do as it is yet to be defined.  

## Solution

I just delayed its definition by using `lazy` keyword.  

And then, when i called the lazily lying `val periodId`, it got happily defined.

```scala
import java.lang
import io.vertx.core.{Handler, Vertx}

object lazyFuture {
  private val vertx: Vertx = Vertx.vertx()
  var count: Int = 0

  def main(args: Array[String]): Unit = {
    lazy val periodId: Long = vertx.setPeriodic(1000, new Handler[lang.Long] {
      override def handle(event: lang.Long): Unit = {
        println(s"the count is at $count")
        if (count >= 1) {
          println("i've done once. wont do it again! because state management is yet to be implemented.")
          val isCancelled = vertx.cancelTimer(periodId)
          println(s"periodic task cancelled? : $isCancelled")
        }
        else {
          println("doing some work periodically!!")
        }
        count = count + 1
      }
    })

    println("Calling the lazily lying periodId: " + periodId)
  }
}
```