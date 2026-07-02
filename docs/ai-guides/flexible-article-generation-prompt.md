# Flexible Article Generation Prompt

Use this as your single reusable prompt in ChatGPT.

You are a senior technical writer and engineer. Write a high-quality markdown article for my notes repository.

Goal:
Create a practical, accurate, scannable article on the requested topic with strong examples and useful decision guidance. Keep quality and depth high, but do not force the same rigid structure every time.

Output requirements:
1. Return only markdown.
2. Include frontmatter exactly in this shape:
---
title: '<article title>'
description: '<one-line practical summary>'
slug: '/<kebab-case-slug>'
date_created: '<YYYY-MM-DD>'
date_modified: '<YYYY-MM-DD>'
author: 'RD'
is_published: true
show_in_recent: true
is_project: false
tags: tag1, tag2, tag3
---
3. Use heading depth up to H3 only.
4. Keep tone practical and implementation-oriented.
5. Use concise paragraphs, bullets, tables, and code examples where useful.
6. Add horizontal separators between major sections when it improves readability.
7. If something is version-sensitive or uncertain, say so explicitly and suggest verification.
8. Do not invent APIs, flags, classes, or behavior. Prefer correctness over coverage.

Structure policy (important):
1. First, infer article type from topic:
- Deep concept explanation
- Step-by-step how-to
- Quick reference or comparison
2. Then choose a fitting structure dynamically. Vary section order and composition based on topic.
3. Never force a fixed sequence like Intro -> Characteristics -> Example -> Table for every article.
4. Keep a coherent flow, but allow optional sections such as:
- Mental model
- Internal working
- Trade-offs
- Common mistakes
- Performance notes
- Decision matrix
- Rule of thumb
- Debugging checklist
- FAQ

Depth and variability controls:
1. Target depth: medium-to-deep by default.
2. Include at least one practical example and one decision aid (table, checklist, or when-to-use list).
3. Use 3 to 8 major sections depending on topic breadth.
4. If topic is broad, cluster related concepts and compare them.
5. If topic is narrow, prioritize actionable steps and troubleshooting.

Quality checklist before finalizing:
1. Frontmatter is complete and valid.
2. Section flow matches the topic type.
3. No repetitive boilerplate section pattern.
4. Examples are realistic and runnable-looking.
5. Claims are technically plausible and internally consistent.
6. Reader can decide what to use and why.

Now generate the article using the input block below.

Input block:
- Topic: <fill>
- Audience level: <beginner|intermediate|advanced>
- Desired depth: <quick|medium|deep>
- Include comparisons: <yes|no>
- Include code examples: <yes|no>
- Constraints: <specific scope, version, or boundaries>
- Date to use in frontmatter: <YYYY-MM-DD>

Optional hard constraints I may add per run:
- Must include a short comparison table
- Must include at least 2 runnable snippets
- Must keep under N minutes read time
- Must avoid sections not relevant to this topic

---

## Example Invocation

Topic: Explain Java hash-based collections and when to use each one
Audience level: intermediate
Desired depth: deep
Include comparisons: yes
Include code examples: yes
Constraints: Cover HashMap, LinkedHashMap, Hashtable, ConcurrentHashMap, WeakHashMap, IdentityHashMap, HashSet, LinkedHashSet, and briefly contrast TreeMap/TreeSet/EnumMap/EnumSet
Date to use in frontmatter: 2026-05-12
