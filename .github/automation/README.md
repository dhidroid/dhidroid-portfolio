# GitHub Automation — CI Monitoring & README Generation

This folder documents the automation components added to this repo. The automation aims to provide enterprise-grade, reliable, and traceable CI monitoring and README generation.

What it does
- Monitors workflow runs and automatically files issues when CI/build/deploy failures occur (see `.github/workflows/ci-monitor.yml`).
- Generates a dynamic `README.md` weekly or on-demand using `scripts/generate-readme.js` and commits it back to the repository (see `.github/workflows/update-readme.yml`).

Design principles
- Idempotency: failures are detected by a fingerprint embedded in the issue body; duplicate issues are avoided by searching for that fingerprint before creating a new issue.
- Least privilege: workflows use `GITHUB_TOKEN` with narrow permissions (issues: write, contents: write) and avoid using personal tokens.
- Traceability: issues include the workflow name, branch, commit SHA, run ID, and direct link to logs.
- Re-open behavior: when the same failure recurs, the automation reopens an existing issue and appends a comment instead of creating duplicates.

Extending
- Add new mappings to `OG_MAP` for blog/project fallback images (not directly related to CI but part of wider automation).
- Update `scripts/generate-readme.js` to include more project-specific details (badges, tags, etc.).
