---
title: 'Hash-Based Data Structures in Java'
description: 'A practical guide to Java hash-based collections, including HashMap, HashSet, concurrent variants, and collision behavior.'
slug: '/hash-based-data-structures-in-java'
date_created: '2026-05-11'
is_published: true
is_project: false
tags: java, collections, hashmap, hashset, concurrency
---

# Hash-Based Data Structures in Java

Hash-based collections in Java Platform, Standard Edition provide near **O(1)** average-time lookup, insertion, and deletion using hashing.

At the core, most of them rely on:

1. `hashCode()` → determines bucket
2. `equals()` → resolves collisions

---

# How Hashing Works

Simplified flow:

```java id="l5u3s1"
int bucket = hash(key.hashCode());
```

Objects with the same bucket index are grouped together.

When collisions occur:

* Java 7 → linked list chaining
* Java 8+ → linked list converts to balanced tree after threshold

This improves worst-case lookup from:

```text
O(n) → O(log n)
```

---

# 1. `HashMap`

```java id="lk7h3o"
Map<String, Integer> map = new HashMap<>();
```

Most commonly used hash-based structure.

---

## Characteristics

* Key-value storage
* Unordered
* Allows one `null` key
* Allows multiple `null` values
* Not thread-safe

---

## Example

```java id="8twx1r"
map.put("a", 1);
map.put("b", 2);

System.out.println(map.get("a")); // 1
```

---

## Internal Structure

Java 8+ internally uses:

```text
Array of buckets
    ↓
Linked list / Red-black tree
```

Node structure:

```java id="b7uvbw"
class Node<K, V> {
    int hash;
    K key;
    V value;
    Node<K, V> next;
}
```

---

## Complexity

| Operation | Average | Worst    |
| --------- | ------- | -------- |
| Put       | O(1)    | O(log n) |
| Get       | O(1)    | O(log n) |
| Remove    | O(1)    | O(log n) |

---

## Important Parameters

### Initial Capacity

```java id="v9g61y"
new HashMap<>(128);
```

Avoids repeated resizing.

---

### Load Factor

Default:

```java id="v9go29"
0.75
```

Resize happens when:

```text
size > capacity × loadFactor
```

---

# 2. `LinkedHashMap`

```java id="6v6mv0"
Map<String, Integer> map = new LinkedHashMap<>();
```

Extends `HashMap` with ordering.

---

## Characteristics

* Maintains insertion order
* Slightly more memory usage
* Internally uses doubly linked list

---

## Example

```java id="rzvb8j"
map.put("c", 3);
map.put("a", 1);

System.out.println(map);
// {c=3, a=1}
```

---

## Access-Order Mode (LRU)

```java id="h6qkjd"
new LinkedHashMap<>(16, 0.75f, true);
```

Useful for:

* LRU caches
* Recently accessed tracking

---

# 3. `TreeMap` (Not Hash-Based)

People often compare it with hash maps.

```java id="av9on7"
Map<Integer, String> map = new TreeMap<>();
```

---

## Characteristics

* Red-black tree
* Sorted keys
* O(log n) operations
* No `null` keys

---

## When to Use

Use when ordering matters.

Not actually hash-based.

---

# 4. `Hashtable`

```java id="gl6cl2"
Hashtable<String, Integer> table = new Hashtable<>();
```

Legacy synchronized map.

---

## Characteristics

* Thread-safe
* No `null` keys or values
* Slower due to synchronization

---

## Why Mostly Avoided

Modern replacement:

```java id="kg9k2q"
ConcurrentHashMap
```

or:

```java id="i5q8ji"
Collections.synchronizedMap(...)
```

---

# 5. `ConcurrentHashMap`

```java id="d4d3w9"
Map<String, Integer> map =
    new ConcurrentHashMap<>();
```

High-performance concurrent hash map.

---

## Characteristics

* Thread-safe
* Better scalability than `Hashtable`
* Lock-striping / CAS-based internals
* No `null` keys or values

---

## Why Faster

Instead of locking entire map:

```text
Hashtable → global lock
ConcurrentHashMap → partial locking / lock-free reads
```

---

## Common Use Cases

* Shared caches
* Counters
* Concurrent services

---

# 6. `WeakHashMap`

```java id="ehyo38"
Map<Object, String> map = new WeakHashMap<>();
```

Uses weak references for keys.

---

## Behavior

If key has no strong references elsewhere:

```text
GC can remove entry automatically
```

---

## Use Cases

* Metadata caches
* Memory-sensitive mappings
* Classloader caches

---

## Example

```java id="1c2n94"
Object key = new Object();

map.put(key, "value");

key = null;
System.gc();
```

Entry may disappear.

---

# 7. `IdentityHashMap`

```java id="40h6fk"
Map<String, Integer> map =
    new IdentityHashMap<>();
```

Uses reference equality instead of `equals()`.

---

## Normal Map

```java id="dph3rq"
a.equals(b)
```

---

## IdentityHashMap

```java id="0y3ttn"
a == b
```

---

## Example

```java id="8x1mv6"
String a = new String("x");
String b = new String("x");

map.put(a, 1);
map.put(b, 2);
```

Both entries coexist.

---

## Rare Use Cases

* Object graph processing
* Serialization internals
* Proxy tracking

---

# 8. `HashSet`

```java id="ksx9n7"
Set<String> set = new HashSet<>();
```

Internally backed by `HashMap`.

---

## Internal Trick

```java id="z2f89f"
map.put(value, PRESENT);
```

Only keys matter.

---

## Characteristics

* Unique elements
* Unordered
* Allows one `null`

---

## Complexity

| Operation | Average |
| --------- | ------- |
| Add       | O(1)    |
| Contains  | O(1)    |
| Remove    | O(1)    |

---

# 9. `LinkedHashSet`

```java id="p9b9p2"
Set<String> set = new LinkedHashSet<>();
```

HashSet + insertion ordering.

Internally backed by:

```java id="v4x26o"
LinkedHashMap
```

---

# 10. `TreeSet` (Not Hash-Based)

```java id="r3j2bx"
Set<Integer> set = new TreeSet<>();
```

Backed by `TreeMap`.

---

## Characteristics

* Sorted set
* O(log n)
* Navigable operations

Not hash-based.

---

# 11. `EnumMap` (Not Hash-Based)

```java id="5yjlwm"
EnumMap<Day, String> map =
    new EnumMap<>(Day.class);
```

Specialized map for enums.

Not hash-based.

---

## Why Fast

Internally array-backed using enum ordinal values.

Usually faster than `HashMap` for enums.

---

# 12. `EnumSet` (Not Hash-Based)

```java id="2v4xq2"
EnumSet<Day> set =
    EnumSet.of(Day.MON, Day.TUE);
```

Bit-vector implementation for enums.

Very memory efficient.

Not hash-based.

---

# Hash Collision Handling

Before Java 8:

```text
Bucket → Linked List
```

After Java 8:

```text
Bucket → Linked List → Red-Black Tree
```

Treeification threshold:

```java id="j3ffkt"
8 entries
```

Improves worst-case performance.

---

# Importance of `equals()` and `hashCode()`

Broken implementations cause incorrect map behavior.

Rule:

```text
equal objects MUST have same hashCode
```

---

## Correct Example

```java id="6gn0qq"
@Override
public boolean equals(Object o) {
    ...
}

@Override
public int hashCode() {
    ...
}
```

---

# Comparison Table

| Structure           | Ordered   | Thread Safe | Nulls Allowed | Backing               |
| ------------------- | --------- | ----------- | ------------- | --------------------- |
| `HashMap`           | No        | No          | Yes           | Hash table            |
| `LinkedHashMap`     | Insertion | No          | Yes           | Hash + linked list    |
| `Hashtable`         | No        | Yes         | No            | Hash table            |
| `ConcurrentHashMap` | No        | Yes         | No            | Concurrent hash table |
| `WeakHashMap`       | No        | No          | Yes           | Weak references       |
| `IdentityHashMap`   | No        | No          | Yes           | Identity equality     |
| `HashSet`           | No        | No          | One `null`    | `HashMap`             |
| `LinkedHashSet`     | Insertion | No          | One `null`    | `LinkedHashMap`       |

---

# Recommended Defaults

| Requirement         | Recommended Structure |
| ------------------- | --------------------- |
| General map         | `HashMap`             |
| Ordered map         | `LinkedHashMap`       |
| Concurrent map      | `ConcurrentHashMap`   |
| Unique elements     | `HashSet`             |
| Ordered set         | `LinkedHashSet`       |
| Sorted data         | `TreeMap` / `TreeSet` |
| Enum keys           | `EnumMap`             |
| Identity comparison | `IdentityHashMap`     |

---

# Rule of Thumb

* Default map → `HashMap`
* Need predictable iteration order → `LinkedHashMap`
* Need sorting → `TreeMap`
* Need concurrency → `ConcurrentHashMap`
* Need uniqueness only → `HashSet`
* Avoid `Hashtable` in modern code unless interacting with legacy APIs
