---
title: 'Converting Between Lists and Arrays in Java'
description: 'A practical guide to converting between Java arrays and lists, including mutability, immutability, streams, and common pitfalls.'
slug: '/converting-between-lists-and-arrays-in-java'
date_created: '2026-05-11'
is_published: true
is_project: false
tags: java, collections, arrays, list
---

# Converting Between Lists and Arrays in Java

In Java, converting between arrays and lists is common when working with legacy APIs, streams, or collection utilities. The important detail is understanding whether the conversion creates a **fixed-size view**, a **mutable copy**, or a **new typed array**.

---

# Array → List

## 1. Using `Arrays.asList()`

```java
String[] arr = {"a", "b", "c"};

List<String> list = Arrays.asList(arr);
```

### Characteristics

* Fixed-size list
* Backed by the original array
* Changes reflect both ways

```java
arr[0] = "x";
System.out.println(list); // [x, b, c]
```

### Limitation

```java
list.add("d"); // UnsupportedOperationException
```

Use when you only need a lightweight view.

---

## 2. Mutable List from Array

```java
List<String> list = new ArrayList<>(Arrays.asList(arr));
```

### Characteristics

* Fully mutable
* Independent copy
* Safe for add/remove operations

```java
list.add("d");
```

This is the most commonly used approach.

---

## 3. Using `List.of()` (Java 9+)

```java
List<String> list = List.of(arr);
```

### Characteristics

* Immutable list
* Cleaner syntax
* Null values not allowed

```java
list.add("d"); // UnsupportedOperationException
```

Best for read-only collections.

---

## 4. Using Streams

```java
List<String> list = Arrays.stream(arr)
                          .toList();
```

Or:

```java
List<String> list = Arrays.stream(arr)
                          .collect(Collectors.toList());
```

### Notes

* `toList()` returns an unmodifiable list (Java 16+)
* `Collectors.toList()` has no strict mutability guarantee (commonly mutable in practice)

Useful when transformations are needed during conversion.

---

# List → Array

## 1. Using `toArray()`

```java
List<String> list = List.of("a", "b", "c");

String[] arr = list.toArray(new String[0]);
```

### Why `new String[0]`?

It preserves type safety and lets Java allocate the correctly sized array.

---

## 2. Pre-sized Array

```java
String[] arr = list.toArray(new String[list.size()]);
```

Historically considered slightly faster. Modern JVMs optimize both similarly.

---

## 3. Primitive Arrays

Collections work with boxed types (`Integer`, `Double`, etc.), not primitives.

```java
List<Integer> list = List.of(1, 2, 3);

int[] arr = list.stream()
                .mapToInt(Integer::intValue)
                .toArray();
```

---

# Common Pitfall: Primitive Arrays with `Arrays.asList`

```java
int[] nums = {1, 2, 3};

List<int[]> list = Arrays.asList(nums);
```

This creates:

```java
List<int[]>
```

not:

```java
List<Integer>
```

Because primitive arrays are treated as a single object.

Correct approach:

```java
List<Integer> list = Arrays.stream(nums)
                           .boxed()
                           .toList();
```

---

# Quick Reference

| Conversion              | Method                 | Mutable         | Notes                    |
| ----------------------- | ---------------------- | --------------- | ------------------------ |
| Array → List            | `Arrays.asList()`      | No (fixed-size) | Backed by array          |
| Array → List            | `new ArrayList<>(...)` | Yes             | Independent copy         |
| Array → List            | `List.of()`            | No              | Immutable                |
| Array → List            | Streams                | Depends         | Good for transformations |
| List → Array            | `toArray(new T[0])`    | N/A             | Standard approach        |
| List<Integer> → `int[]` | `mapToInt().toArray()` | N/A             | Primitive conversion     |

---

# Rule of Thumb

* Need mutability → `new ArrayList<>(Arrays.asList(...))`
* Need immutability → `List.of(...)`
* Need transformations → Streams
* Need performance-sensitive primitive conversion → `mapToInt()` / specialized streams
