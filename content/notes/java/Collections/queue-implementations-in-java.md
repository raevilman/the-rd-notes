---
title: 'Queue Implementations in Java'
description: 'How to choose the right Java queue implementation for FIFO, priority, and concurrent producer-consumer workloads.'
slug: '/queue-implementations-in-java'
date_created: '2026-05-14'
is_published: true
is_project: false
tags: java, collections, queue, concurrency, blockingqueue
---

# Queue Implementations in Java

Java has multiple queue types, but they solve different problems:

1. Simple in-memory FIFO (`ArrayDeque`)
2. Priority ordering (`PriorityQueue`)
3. Thread-safe non-blocking handoff (`ConcurrentLinkedQueue`)
4. Thread-safe blocking pipelines (`BlockingQueue` family)

The biggest mistake is picking by class name instead of behavior.

This guide focuses on practical selection and trade-offs.

Version note: behavior described here is based on modern Java (Java 8+; examples are Java 17+ friendly). For older runtimes, verify API and performance details against your target JDK.

---

## Queue Semantics First

Before choosing an implementation, answer these in order:

1. Do you need strict FIFO or priority-based ordering?
2. Will multiple threads read/write concurrently?
3. Should producers block when full (backpressure), or fail/return immediately?
4. Do you need bounded capacity to protect memory?

If you skip these questions, you usually end up replacing the queue later.

---

## Core Queue APIs

A queue generally follows **FIFO (First-In-First-Out)** ordering.

Core operations:

```java
queue.offer(element); // insert
queue.poll();         // remove head
queue.peek();         // read head
```

Preferred over:

```java
add()
remove()
element()
```

because `offer/poll/peek` handle failure gracefully without exceptions.

---

## Quick Comparison

| Implementation | Thread-safe | Ordering | Blocking | Bounded | Typical use |
| --- | --- | --- | --- | --- | --- |
| `ArrayDeque` | No | FIFO | No | No | Default single-thread queue/deque |
| `LinkedList` | No | FIFO | No | No | Rarely preferred for queues |
| `PriorityQueue` | No | Priority | No | No | Schedulers, top-k, shortest path |
| `ConcurrentLinkedQueue` | Yes | FIFO | No | No | High-throughput multi-thread handoff |
| `ArrayBlockingQueue` | Yes | FIFO | Yes | Yes | Fixed-capacity producer-consumer |
| `LinkedBlockingQueue` | Yes | FIFO | Yes | Optional | Work queues with optional bounds |
| `PriorityBlockingQueue` | Yes | Priority | Yes (take only) | No | Concurrent priority scheduling |
| `SynchronousQueue` | Yes | N/A (no storage) | Yes | 0 | Direct handoff between threads |

---

## 1) ArrayDeque (Default Non-Concurrent Choice)

```java
Queue<String> queue = new ArrayDeque<>();
```

### Why it is the default

* Resizable circular array
* FIFO ordering
* Usually faster than `LinkedList` due to better locality
* Also supports deque operations (`offerFirst`, `offerLast`, etc.)
* Does not allow `null`

### Example

```java
Queue<String> tasks = new ArrayDeque<>();
tasks.offer("parse");
tasks.offer("validate");
tasks.offer("persist");

while (!tasks.isEmpty()) {
    System.out.println(tasks.poll());
}
```

### Use when

* Single-threaded producer/consumer logic
* BFS/traversal, buffering, task staging
* You want both queue and deque behavior

---

## 2) LinkedList (Usually Not the First Pick)

`LinkedList` works as a `Queue`, but is typically slower and more memory-heavy than `ArrayDeque` for queue-heavy workloads.

```java
Queue<Integer> q = new LinkedList<>();
```

Use it only when linked-node characteristics are genuinely required.

---

## 3) PriorityQueue (Order by Priority, Not Arrival)

```java
Queue<Integer> minHeap = new PriorityQueue<>();
```

`PriorityQueue` is heap-backed.

* `poll()` returns the smallest element (or comparator-defined highest priority)
* Insertion order is not preserved
* Not thread-safe

### Example: max-heap style ordering

```java
Queue<Integer> maxHeap = new PriorityQueue<>(Comparator.reverseOrder());
maxHeap.offer(10);
maxHeap.offer(30);
maxHeap.offer(20);

System.out.println(maxHeap.poll()); // 30
System.out.println(maxHeap.poll()); // 20
```

Complexity (typical):

| Operation | Complexity |
| --- | --- |
| `offer` | O(log n) |
| `poll` | O(log n) |
| `peek` | O(1) |

---

## 4) ConcurrentLinkedQueue (Concurrent, Non-Blocking)

```java
Queue<String> q = new ConcurrentLinkedQueue<>();
```

Use this for multi-threaded, lock-free style FIFO handoff where threads should not block.

* Thread-safe
* Non-blocking operations (`offer`, `poll`, `peek`)
* Unbounded
* No built-in backpressure

Good for high-throughput event passing where dropping or retrying is managed externally.

---

## 5) BlockingQueue Family (Producer-Consumer Pipelines)

`BlockingQueue` adds coordination primitives:

```java
queue.put(item);   // waits when full
queue.take();      // waits when empty
queue.offer(item); // immediate failure if cannot insert
```

### ArrayBlockingQueue

```java
BlockingQueue<String> q = new ArrayBlockingQueue<>(1000);
```

* Fixed capacity
* Predictable memory usage
* Strong choice when you need explicit backpressure

### LinkedBlockingQueue

```java
BlockingQueue<String> q = new LinkedBlockingQueue<>(1000);
```

* Linked-node structure
* Optionally bounded (always pass a capacity in production)
* Can show different contention characteristics than `ArrayBlockingQueue`

### PriorityBlockingQueue

```java
BlockingQueue<Integer> q = new PriorityBlockingQueue<>();
```

* Concurrent priority queue
* Unbounded in practice (no natural backpressure)
* `take()` blocks only when empty

### SynchronousQueue

```java
BlockingQueue<String> q = new SynchronousQueue<>();
```

* Capacity is zero
* Every `put` waits for a corresponding `take`
* Useful for direct handoff designs and thread pool internals

---

## Practical Example: Bounded Producer-Consumer

```java
import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.BlockingQueue;

public class PipelineDemo {
    public static void main(String[] args) {
        BlockingQueue<String> queue = new ArrayBlockingQueue<>(3);

        Thread producer = new Thread(() -> {
            try {
                for (int i = 1; i <= 5; i++) {
                    String job = "job-" + i;
                    queue.put(job); // blocks if queue is full
                    System.out.println("Produced " + job);
                }
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        });

        Thread consumer = new Thread(() -> {
            try {
                for (int i = 1; i <= 5; i++) {
                    String job = queue.take(); // blocks if queue is empty
                    System.out.println("Consumed " + job);
                    Thread.sleep(200);
                }
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        });

        producer.start();
        consumer.start();
    }
}
```

---

## Decision Matrix

| If your requirement is... | Use |
| --- | --- |
| Fast default queue in one thread | `ArrayDeque` |
| Sorted by priority | `PriorityQueue` |
| Concurrent FIFO without blocking | `ConcurrentLinkedQueue` |
| Concurrent FIFO with backpressure | `ArrayBlockingQueue` or bounded `LinkedBlockingQueue` |
| Direct producer-consumer handoff with no buffering | `SynchronousQueue` |

---

## Common Mistakes

1. Using `PriorityQueue` expecting FIFO behavior.
2. Using unbounded `LinkedBlockingQueue` in production and risking memory growth.
3. Using `ConcurrentLinkedQueue` when you actually need blocking semantics.
4. Choosing `LinkedList` by habit instead of defaulting to `ArrayDeque`.
5. Ignoring interruption handling in blocking operations (`put`, `take`).

---

## Rule of Thumb

* Default queue → `ArrayDeque`
* Need ordering by priority → `PriorityQueue`
* Need thread safety without waiting → `ConcurrentLinkedQueue`
* Need thread safety with waiting/backpressure → bounded `BlockingQueue`
* Treat unbounded queues as a conscious decision, not a default
