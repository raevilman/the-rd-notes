---
title: 'Listen to Article — Chrome extension'
description: 'A lightweight Chrome extension that extracts article content and reads it aloud using the system TTS voices.'
slug: '/projects/listen-to-article'
date_created: '2025-09-06'
date_modified: '2025-09-06'
author: 'RD'
is_published: true
show_in_recent: true
is_project: true
tags: chrome, extension, accessibility, tts
---

![Screenshot](/images/listen-to-article-player-screenshot.png)

## What?
Listen to Article is a small, privacy-minded Chrome extension that extracts the main article from a page and plays it using the browser / system text-to-speech voices. It focuses on a clean player UI, accurate content extraction, and minimal runtime dependencies.

## Key features

- Smart content extraction using `@mozilla/readability` (bundled at build time)
- Play / pause / stop controls with visual progress and highlighting
- Double click anywhere on the page to start reading from that point
- Optional auto-scroll while reading
- Keyboard shortcuts for playback and speed control
- Minimal runtime footprint — only the extraction library is bundled; core player is vanilla JS/CSS

## Why I built it
I wanted a distraction-free way to listen to long-form content in the browser without relying on remote services or introducing tracking. The extension keeps everything local, uses system voices for better naturalness, and provides quick controls to consume articles hands-free.

## Prerequisites

- The extension uses the system/browser TTS voices. Ensure the voice(s) you want are installed and available to your OS / browser.
   - macOS: System Settings → Accessibility → Spoken Content → System Voice
   - Windows: Settings → Time & Language → Speech
   - Linux: Install voices for your chosen TTS engine (for example, espeak or other engines)

## Install
Chrome Web Store: [Listen to Article - Chrome Web Store](https://chromewebstore.google.com/detail/hiddloodakfchibfjpnkanhdbmkifaij?utm_source=item-share-cb)
