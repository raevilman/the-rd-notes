---
title: 'MEL Privacy Policy'
slug: '/mel-privacy-policy'
date_created: '2026-04-02'
date_modified: '2026-04-02'
author: 'RD'
is_published: true
show_in_recent: true
is_project: false
tags: 
---
# Privacy Policy

**App:** MEL – Minimum Expense Ledger  
**Package:** com.therdnotes.mel  
**Effective date:** April 2, 2026

---

## 1. Overview

MEL is a personal expense tracking app. We are committed to protecting your privacy. This policy explains what data is collected, how it is used, and your rights.

---

## 2. Data We Collect

### Account Information
When you sign in with Google or Email via Firebase Authentication, we collect:
- Your display name
- Your email address
- A unique user identifier (Firebase UID)

### Expense Data
- Expense records you create (name, amount, date)
- Recurring expense templates you define

This data is stored in your personal Firebase Firestore database, scoped to your account. No other user can access your data.

---

## 3. How We Use Your Data

Your data is used solely to:
- Display your expenses and recurring items within the app
- Sync your data across your devices
- Apply recurring expenses automatically on schedule

We do **not** sell, share, or use your data for advertising or analytics.

---

## 4. Data Storage

- **Local storage:** Expense data is cached on-device (Firestore offline persistence) so the app works without an internet connection.
- **Cloud storage:** Data is synced to Google Firebase Firestore, hosted on Google's infrastructure. See [Google's Privacy Policy](https://policies.google.com/privacy) for details on how Google stores data.

---

## 5. Third-Party Services

This app uses the following third-party services:

| Service | Purpose | Privacy Policy |
|---|---|---|
| Firebase Authentication | Sign-in | [Link](https://firebase.google.com/support/privacy) |
| Firebase Firestore | Cloud data sync | [Link](https://firebase.google.com/support/privacy) |
| Google Sign-In | Authentication | [Link](https://policies.google.com/privacy) |

---

## 6. Data Retention

Your data is retained for as long as your account exists. You can delete your data at any time by deleting your account or by contacting us.

Deleted expenses are soft-deleted (tombstoned) and are permanently removed from the cloud on the next sync cycle.

---

## 7. Your Rights

You have the right to:
- **Access** your data (it is visible in the app)
- **Delete** your data by signing out and requesting account deletion
- **Export** your data (contact us for assistance)

---

## 8. Children's Privacy

This app is not intended for children under 13. We do not knowingly collect data from children.

---

## 9. Changes to This Policy

We may update this policy from time to time. Any changes will be reflected here with an updated effective date.

---

## 10. Contact

If you have questions about this privacy policy, contact us at:

**dev@therdnotes.com**
