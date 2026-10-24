# Rules for Claude (and any AI coding assistant) in this repository

These rules apply to every session. If a task prompt conflicts with them, stop and ask.

## Git
- **Branch names are given by the task or the owner.** Use exactly the name you are given. If no name is given, propose one that follows `docs/BRANCHING.md` and wait for confirmation. **Never create a branch with a `claude/` or `cowork/` prefix, or any auto-generated or random name.**
- Branch format: `<type>/<scope>-<short-description>`, lowercase, hyphens. Types: `feat`, `fix`, `docs`, `design`, `chore`, `refactor`, `test`, `spike`.
- Never commit to or push to the default branch directly. Never force-push. Never rewrite history. Never merge a pull request.
- Commit author: `VeeraaVikash <veeraavikashs21@gmail.com>` unless the owner says otherwise. **No `Co-Authored-By` trailers and no mention of AI tools in commit messages or PR text.**
- Commit messages and PR titles use Conventional Commits: `type(scope): summary` (imperative, no trailing period, under 72 characters).
- Keep commits small and focused. Do not mix documentation, code and configuration in one commit.
- Check `git status` before starting; stop if the working tree is not clean. Never overwrite uncommitted changes.

## Scope and honesty
- Do only what the task asks. Documentation tasks must not change code, designs, ADR decisions or API contracts.
- Never claim that something builds, passes tests or works unless you ran it and can show the result. If you cannot run it, say so.
- Never invent product policy, numbers, thresholds, approvals, Figma node IDs or institutional decisions. Record unknowns in `docs/OPEN_DECISIONS.md`.
- Archived or superseded designs are not requirements. The newest owner decision wins; flag conflicts instead of silently choosing.

## Product rules that must not be broken
- Missing data is never shown as zero. Forecast, approved headcount, sent headcount, actual entries and final entries are separate values. Entry QR proves entry, not that food was served.
- An offline scan is never shown as a recorded entry.
- Outing sequence: student request, guardian decision, warden decision, signed pass, gate exit, gate return. No timeout approves anything.
- Demo data stays isolated from production data and is always labelled.

## Pull requests
- One purpose per pull request, small enough to review. Fill in the pull request template. Stacked pull requests are allowed to two or three levels; state the base clearly.
