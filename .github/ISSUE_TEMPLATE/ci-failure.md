---
name: CI / Pipeline Failure
about: Auto-generated issue when a CI, build, lint, or deployment pipeline fails
title: "[CI Failure] {{ workflow }} — {{ branch }} — {{ short_sha }}"
labels: [bug, ci, automation]
assignees: ["" ]
---

**Automatic CI Failure Report**

This issue was created by the automation system to track a failing workflow run.

- **Workflow:** {{ workflow }}
- **Status:** {{ conclusion }}
- **Branch:** {{ branch }}
- **Commit:** {{ sha }}
- **Run:** {{ run_id }}
- **Logs:** {{ html_url }}

Fingerprint: `{{ fingerprint }}`

Steps to triage:
1. Reproduce failing step locally where possible.
2. Inspect action logs at the provided link.
3. If this is caused by flaky tests, mark as flaky and add to flaky-test backlog.
4. Apply fix and push to the failing branch, or open a PR referencing this issue.

---

_This issue was generated automatically by GitHub Actions automation._
