# MealLoop — Non-Functional Requirements (NFR)
**Version:** 0.1 — Consolidated Review Draft  
**Date:** 23 October 2026  
**Product:** MealLoop  
**Initial deployment:** Meenakshi Girls' Mess, SRMIST Kattankulathur  
**Status:** DRAFT — Owner review pending

## 1. Purpose and scope

This document specifies the quality attributes and operational guarantees for MealLoop's student iOS application, mess staff workflows, administrator interfaces, guardian web experience, backend services, and outing-pass system.

It consolidates decisions made in NFR Rounds 1–3 and complements the functional PRD.

### Status definitions

- **Direction confirmed:** The owner has selected this behavior or engineering principle. Detailed implementation is not necessarily approved.
- **Provisional target:** A measurable objective selected for initial engineering/testing, subject to validation.
- **Technical design pending:** The quality requirement is agreed upon, but its implementation will be decided during C4/ADR/API design.
- **SRM approval required:** Activation or policy depends on formal institutional authorization.
- **Validation required:** Real measurements or user testing are necessary before final acceptance.

For simplicity, each requirement below includes a primary status. Where institutional approval is additionally required, that dependency is explicitly stated.

## 2. Reliability and data integrity

### NFR-REL-001 — Authoritative meal entries
**Status:** Direction confirmed

**Requirement:** A digital meal entry must be displayed as successfully recorded only after the backend has verified and durably committed it.

**Acceptance criteria:**
- A failed, timed-out, rejected, or offline request never produces a successful entry result.
- An uncertain outcome displays a verification-required state rather than assuming success.
- Retry behavior cannot create duplicate attendance.

**Verification:** Disconnect the network, delay responses, simulate server failures, and retry transactions while examining database records.

### NFR-REL-002 — Duplicate prevention
**Status:** Direction confirmed

**Requirement:** At most one accepted regular entry record may exist per student per meal, even with simultaneous scanners.

**Acceptance criteria:**
- Concurrent valid attempts result in one accepted entry.
- Duplicate requests do not increase the attendance count.
- Retrying a completed request produces a consistent result.
- Special-meal consumption remains independently constrained by its own rules.

**Verification:** Concurrent request tests, duplicate-key tests, and database invariant checks.

### NFR-REL-003 — Consistent meal lifecycle
**Status:** Direction confirmed

**Requirement:** Meal start and closure use one authoritative backend state, consistent across authorized staff roles.

**Acceptance criteria:**
- Opening a meal permits the corresponding authorized entry operations.
- Closing a meal prevents subsequent ordinary entries even if a client screen is stale.
- Invalid lifecycle transitions are rejected.
- Meal closure does not automatically resolve shortages, SOS incidents, or missing waste reports.

**Verification:** State-machine tests, role-to-role integration tests, simultaneous close-and-scan tests.

### NFR-REL-004 — Cross-role synchronization
**Status:** Confirmed direction; provisional time target

**Requirement:** Connected staff interfaces should reflect committed meal-state and operational changes within five seconds under normal pilot conditions.

**Acceptance criteria:**
- New state is eventually shown without requiring users to sign out.
- Screens indicate stale or unavailable information when synchronization fails.
- API operations enforce current server state regardless of client update delay.

**Verification:** Time synchronized tests across Supervisor, Door Scanner, Pass Desk and Kitchen clients, including reconnect scenarios.

**Open:** The final percentile, test-network specification and maximum acceptable refresh delay require validation.

### NFR-REL-005 — Offline entry policy
**Status:** Direction confirmed

**Requirement:** The initial pilot must not accept an offline QR scan as a digitally verified meal entry.

**Acceptance criteria:**
- The scanner explicitly displays that entry was not recorded.
- The system never claims a pending offline entry is committed.
- Restoring connectivity does not silently replay an unverified entry.

**Verification:** Offline and network-flapping tests.

### NFR-REL-006 — Manual continuity and reconciliation
**Status:** Direction confirmed; SRM operating procedure pending

**Requirement:** Meal service must be able to continue during a digital outage under an approved manual attendance procedure.

**Acceptance criteria:**
- Students are not denied ordinary meal service solely because MealLoop is unavailable.
- Reconciled records identify their manual source, actor and time of reconciliation.
- Conflicts with already verified entries are detected and reviewed.
- Reports distinguish QR-verified records from manually reconciled records.
- Reconciliation does not fabricate historical QR verification.

**Verification:** Simulated full-backend outage, manual service exercise, recovery and reconciliation test.

**Open:** Institutional manual logging process, authorized reconcilers, evidence required and reporting treatment.

### NFR-REL-007 — Missing data integrity
**Status:** Direction confirmed

**Requirement:** Missing, unavailable, zero and not-applicable measurements must remain distinguishable.

**Acceptance criteria:**
- An unrecorded waste quantity never becomes zero.
- Not made and None left remain separate.
- Final entries remain unavailable until the appropriate meal closure state.
- Quantities in incompatible units are not incorrectly aggregated.
- Analytics identify incomplete datasets.

**Verification:** Data-model invariants, serialization tests, reporting tests with partial data.

### NFR-REL-008 — Optional AI failure isolation
**Status:** Direction confirmed

**Requirement:** Core dining and outing transactions must continue when optional AI services are unavailable.

**Acceptance criteria:**
- Student responses, approved headcounts, scanning, waste reports, SOS and outing decisions do not depend on synchronous AI availability.
- Unavailable predictions are labelled as unavailable or replaced only by an explicitly approved baseline.
- No AI outage causes automatic institutional approval.

**Verification:** Disable AI dependencies during end-to-end workflow tests.

## 3. Performance and responsiveness

### NFR-PER-001 — Verified scanning latency
**Status:** Provisional target

**Requirement:** At least 95% of ordinary online scan-confirmation operations should display the verified backend result within two seconds under defined normal pilot test conditions.

**Measurement:** Time from scanner confirmation/recognized-code submission until the final verified result is rendered, including API and database processing.

**Verification:** Instrumented physical-device and backend tests, reporting p50, p95, p99 and errors.

**Open:** Device specifications, test-network conditions and peak concurrency.

### NFR-PER-002 — Initial peak load
**Status:** Provisional target

**Requirement:** The backend should correctly process an initial burst-test workload of ten entry requests per second.

**Acceptance criteria:**
- No duplicate successful records.
- No silently lost committed records.
- Rejections and timeout outcomes are accurately reported.
- Latency and error rates are measured throughout the test.

**Verification:** Automated load test using a representative mixture of successful, duplicate, invalid and conflicting attempts.

**Open:** Burst duration, realistic peak rate and final capacity target.

### NFR-PER-003 — Responsive critical operations
**Status:** Technical design pending

**Requirement:** Long-running or unavailable services must not leave staff interfaces indefinitely blocked.

**Acceptance criteria:**
- Critical actions show pending, confirmed, failed or uncertain outcomes as appropriate.
- Repeated taps cannot create duplicate actions.
- Network timeouts have a visible recovery path.
- The interface never displays a success result before authoritative confirmation.

**Verification:** Latency injection, rapid repeated-tap testing, retry and timeout testing.

### NFR-PER-004 — Outage recovery objectives
**Status:** Unresolved measurable target

**Requirement:** Define and test recovery-time and recovery-point objectives appropriate to meal operations, institutional responsibilities and available infrastructure.

**Acceptance criteria:** The approved targets, backup strategy, restoration procedure and test evidence are documented before production activation.

**Verification:** Database restoration and controlled failure exercises.

**Open:** Recovery Time Objective (RTO), Recovery Point Objective (RPO), target availability and backup schedule. No numerical objective is approved yet.

## 4. Authentication, authorization and security

### NFR-SEC-001 — Production identity
**Status:** Direction confirmed; SRM integration pending

**Requirement:** Student access should use institution-verified identity where available. Production staff actions must be attributable to individually authenticated staff members.

**Acceptance criteria:**
- Staff sessions identify the actor and authorized role.
- Account deactivation prevents further protected operations.
- Debug/demo shared-role passwords are not sufficient as sole production authentication.
- Staff role selection does not grant permissions by itself.

**Verification:** Authentication tests, disabled-account tests, impersonation attempts and staff handover tests.

### NFR-SEC-002 — Server-side action authorization
**Status:** Direction confirmed

**Requirement:** Every protected backend operation must validate identity, action permission, resource ownership and applicable mess/block scope.

**Acceptance criteria:**
- Staff cannot operate on another mess without explicit authorization.
- Wardens cannot access unauthorized hostel blocks.
- Students cannot modify other students' records.
- Client-hidden controls do not substitute for backend enforcement.
- Default behavior is denial when authorization cannot be established.

**Verification:** Permission-matrix tests, cross-scope access attempts, manipulated-resource-ID tests.

### NFR-SEC-003 — Guardian evidence confidentiality
**Status:** Direction confirmed; SRM policy pending

**Requirement:** Guardian evidence may be accessed only by the assigned authorized warden and explicitly authorized institutional reviewers.

**Acceptance criteria:**
- Evidence access is checked for every request and download.
- Storage locations do not provide uncontrolled public access.
- View/download actions are logged with actor, request and time.
- Any temporary reviewer delegation has defined scope and duration.

**Verification:** Unauthorized video-access attempts, direct-URL access tests and audit-log inspection.

### NFR-SEC-004 — Secure shared-device sessions
**Status:** Direction confirmed; technical design pending

**Requirement:** Staff account sessions must support safe handover, revocation and reauthentication on shared operational devices.

**Acceptance criteria:**
- Signing out removes access to protected screens and operations.
- A new staff member cannot reuse the previous worker's identity silently.
- A revoked session cannot continue privileged operations.
- Sensitive authentication material is not exposed in logs.

**Verification:** Shared-device handover, token/session revocation and session-expiry tests.

### NFR-SEC-005 — Encryption and secrets
**Status:** Direction confirmed; detailed standards pending

**Requirement:** Protected data must be encrypted in transit and sensitive stored data, including guardian evidence and credentials, must be protected using approved security controls.

**Acceptance criteria:**
- No credentials or signing secrets are hardcoded in production application builds.
- Protected APIs reject insecure connections.
- Evidence and backups are protected against unauthorized access.
- Keys and secrets can be revoked or rotated through a documented procedure.

**Verification:** Configuration inspection, transport-security tests and secrets scanning.

### NFR-SEC-006 — Abuse and rate-limiting controls
**Status:** Direction confirmed; limits pending

**Requirement:** Authentication, guardian verification and other abuse-sensitive endpoints require protection against automated guessing and excessive requests.

**Acceptance criteria:**
- Failed attempts are restricted and recorded.
- Rate-limited responses do not reveal sensitive user information.
- Controls do not permanently block legitimate users without an authorized recovery path.

**Verification:** Repeated-login tests, request flooding and recovery testing.

### NFR-SEC-007 — Auditability of privileged operations
**Status:** Direction confirmed

**Requirement:** High-impact operations must preserve the authorized actor, action, affected resource and transaction outcome.

Includes headcount approvals, meal lifecycle changes, attendance corrections, waste edits, SOS handling, outing decisions, evidence access, permission changes and gate events.

**Acceptance criteria:**
- Audit records distinguish requested, completed and failed actions.
- Historical values are preserved where required.
- Ordinary users cannot edit protected audit history.
- Audit records are queryable by authorized reviewers.

**Verification:** Audit completeness tests and unauthorized modification tests.

### NFR-SEC-008 — Outing pass security
**Status:** Direction confirmed; implementation pending

**Requirement:** Issued outing passes must be verifiable, time-bound and resistant to unauthorized reuse.

**Acceptance criteria:**
- Only an authorized request with required approvals can produce a valid pass.
- A pass cannot be used for multiple exits.
- Return and exit are independently recorded.
- Expired, revoked, invalid or replayed passes are rejected.
- A verified guardian response does not bypass the warden decision.

**Verification:** State-transition tests, altered-pass tests, replay tests and concurrent gate-verification tests.

## 5. Privacy and data governance

### NFR-PRI-001 — Data minimization
**Status:** Direction confirmed

**Requirement:** Each role and subsystem receives only the personal information necessary for its authorized function.

**Verification:** Review API responses, logs, exports and operational screens for unnecessary identity and behavioral information.

### NFR-PRI-002 — Restricted behavioral modeling
**Status:** Direction confirmed; policy and validation pending

**Requirement:** Forecasting may use restricted pseudonymous student-level history where authorized and validated, while normal kitchen and supervisor views present aggregate operational predictions.

**Acceptance criteria:**
- Routine operational dashboards do not expose individual prediction histories.
- Mapping pseudonymous records to student identities is restricted.
- Model-training and inference datasets follow documented access rules.
- Unvalidated behavioral features do not drive operational predictions.

**Verification:** Data-flow review, access testing and model-feature audit.

### NFR-PRI-003 — Student eligibility privacy
**Status:** Direction confirmed

**Requirement:** Individual participation and reliability evidence used for digital-outing eligibility must be accessible only to the student and authorized decision/review services or personnel.

**Acceptance criteria:**
- Eligibility is explainable without disclosing unnecessary behavioral data.
- Scanner failures and incomplete verification are not treated as proven absences.
- Students have a correction/dispute route.
- Initial outing-pilot eligibility bypass applies only to the authorized pilot cohort.

**Verification:** Eligibility audit tests, missing-data scenarios and authorization tests.

### NFR-PRI-004 — Guardian consent and evidence retention
**Status:** SRM approval required

**Requirement:** Guardian video collection, storage, review, deletion and retention require an institutionally approved privacy policy and appropriate consent.

**Acceptance criteria:**
- Approved information is presented before collection.
- Evidence access is restricted and audited.
- Retention and deletion follow the approved policy.
- No unapproved retention duration is hardcoded as institutional policy.

**Verification:** Consent-flow test, access audit and retention/deletion test.

### NFR-PRI-005 — Feedback and operational-data retention
**Status:** SRM approval required

**Requirement:** Retention policies must be defined for feedback, skipping reasons, student entry history, correction records, report photos, operational analytics and audit records.

**Verification:** Data inventory, scheduled-retention test and policy review.

### NFR-PRI-006 — Privacy-safe observability
**Status:** Direction confirmed

**Requirement:** Logs, metrics, error reports and alerts must avoid unnecessary personal information, raw guardian videos, authentication tokens and sensitive complaint text.

**Verification:** Automated and manual inspection of representative telemetry and error scenarios.

## 6. Observability and operations

### NFR-OBS-001 — Structured operational logs
**Status:** Direction confirmed

**Requirement:** Backend operations must produce structured logs containing appropriate timestamps, operation identifiers, sanitized outcomes and request correlation identifiers.

**Verification:** Trace representative cross-role workflows through logs.

### NFR-OBS-002 — Health and readiness visibility
**Status:** Direction confirmed

**Requirement:** Operators must distinguish a running process from a backend capable of serving its required operations.

**Acceptance criteria:**
- Health checks report relevant service/database readiness.
- Degraded dependencies are visible.
- An optional AI failure is not treated as complete core-system unavailability.

**Verification:** Simulated database, AI and network failures.

### NFR-OBS-003 — Critical failure monitoring
**Status:** Direction confirmed; alert thresholds pending

**Requirement:** Operators can detect abnormal scan failures, backend unavailability, unsuccessful headcount delivery, notification problems and pending reconciliation.

**Verification:** Inject each failure and confirm the monitoring and escalation behavior.

### NFR-OBS-004 — Performance measurement
**Status:** Direction confirmed

**Requirement:** Operators can measure API response time, error rate, throughput and relevant business-operation failure counts without exposing sensitive student data.

**Verification:** Load-test telemetry reconciliation and dashboard inspection.

## 7. Accessibility and localization

### NFR-ACC-001 — Native accessibility
**Status:** Direction confirmed

**Requirement:** Critical iOS workflows must support Dynamic Type, VoiceOver and accessible interaction labels.

**Acceptance criteria:**
- Enlarging text preserves critical content and actions.
- VoiceOver conveys actionable control names and relevant states.
- Critical functions do not rely on colour alone.

**Verification:** Accessibility audits on student, scanner, kitchen, supervisor and approval workflows.

### NFR-ACC-002 — Readability and touch targets
**Status:** Direction confirmed; measurement standard to finalize

**Requirement:** Operational screens must use readable text, adequate contrast and touch targets suitable for fast staff use.

**Verification:** Automated accessibility checks and physical-device usability tests.

**Initial design references:** 44-point general targets and larger staff targets where specified by the active Figma design.

### NFR-ACC-003 — Localization
**Status:** Direction confirmed; institutional rollout pending

**Requirement:** The student interface initially supports English, while critical staff-facing workflows must support validated Tamil/Hindi language options where required by the institution.

**Acceptance criteria:**
- Critical translated instructions are reviewed by proficient speakers.
- Language switching preserves current workflow state.
- Errors, warnings and safety instructions remain understandable.
- Missing translations have a documented fallback rather than misleading text.

**Verification:** Native-speaker reviews, layout testing and workflow-based localization testing.

### NFR-ACC-004 — Clear operational feedback
**Status:** Direction confirmed

**Requirement:** Critical operations explicitly distinguish confirmed, pending, failed, unavailable and stale states.

**Verification:** End-to-end success/failure tests, accessibility review and usability walkthroughs.

## 8. Scalability and maintainability

### NFR-SCL-001 — Pilot-first scalability
**Status:** Direction confirmed

**Requirement:** The initial system must adequately serve the authorized one-mess pilot without claiming untested campus-wide capacity.

**Verification:** Load tests representing measured pilot conditions.

### NFR-SCL-002 — Multi-mess configurability
**Status:** Direction confirmed

**Requirement:** Messes, meals, assignments, policies and permitted access must be represented as configurable, scoped entities rather than hardcoded for a single location.

**Verification:** Configure a second synthetic mess and confirm independent data, permissions and meal lifecycle.

### NFR-SCL-003 — Expansion validation
**Status:** Validation required

**Requirement:** Additional messes must not be activated solely because the data model supports them; representative load, data-isolation and operational tests must pass first.

**Verification:** Staged multi-mess load and role-isolation tests.

### NFR-MNT-001 — Maintainable module boundaries
**Status:** Direction confirmed; architectural implementation pending

**Requirement:** Core dining, mess operations, outings and optional intelligence must have clear ownership and testable interfaces.

**Acceptance criteria:** Changes to one area do not require accidental edits to unrelated internal state or create unauthorized data access.

**Verification:** Module dependency tests, contract tests and code review.

## 9. Testing and quality gates

### NFR-TST-001 — Automated critical-path tests
**Status:** Direction confirmed

**Requirement:** Critical operations must have automated tests before they are treated as complete.

Minimum coverage areas:
- Duplicate and concurrent entry handling
- Server-authoritative meal lifecycle
- Intentions and two-hour cutoff
- Waste-report states and six-hour editing
- Headcount authorization and audit history
- Permission boundaries
- Guardian-to-warden outing state transitions
- Gate exit/return replay protection
- Offline and failed-operation behavior

**Verification:** CI test reports and repeatable local execution.

### NFR-TST-002 — Regression quality gates
**Status:** Direction confirmed

**Requirement:** Relevant automated checks must pass before protected application or backend changes are merged.

**Verification:** Confirm a deliberately failing critical test blocks a test pull request.

### NFR-TST-003 — Integration and contract testing
**Status:** Direction confirmed

**Requirement:** iOS, backend and related clients must use mutually compatible versioned API contracts.

**Verification:** Schema validation, request/response contract tests and cross-role integration tests.

### NFR-TST-004 — Failure testing
**Status:** Direction confirmed

**Requirement:** Test outages, timeouts, repeated actions, delayed responses and recovery rather than only successful paths.

**Verification:** Controlled fault-injection and recovery exercises.

## 10. Deployment and operational recovery

### NFR-DEP-001 — Environment separation
**Status:** Direction confirmed

**Requirement:** Demo, staging and production configurations and data must remain logically isolated.

**Acceptance criteria:**
- Production does not use demo credentials or seeded academic records.
- Debug-only simulation cannot silently become production behavior.
- Staging operations cannot modify production student, guardian or mess records.

**Verification:** Configuration, build and database-access tests.

### NFR-DEP-002 — Controlled releases
**Status:** Direction confirmed

**Requirement:** Production releases must have a reproducible build, documented deployment procedure and a recovery strategy.

**Verification:** Staging deployment and release rehearsal.

### NFR-DEP-003 — Safe schema changes
**Status:** Direction confirmed

**Requirement:** Database schema changes must be version-controlled, reviewed and tested against representative existing data.

**Verification:** Migration tests from prior schema versions, including rollback or forward-recovery rehearsal.

### NFR-DEP-004 — Institutional feature activation
**Status:** Direction confirmed; SRM approval required

**Requirement:** Features requiring institutional authorization must remain disabled for real users until the necessary approvals and readiness checks exist.

Includes:
- Digital outing activation
- Guardian video collection
- Real reward redemption
- Institution-dependent operational policies

**Verification:** Feature-gate tests, authorized activation audit and disabled-state tests.

### NFR-DEP-005 — Backup and restoration
**Status:** Direction confirmed; targets pending

**Requirement:** Operational data must be backed up and recoverable according to approved recovery and retention policies.

**Verification:** Restore into an isolated environment and verify record integrity.

## 11. Architecture constraints and non-decisions

The NFR does not itself approve:
- A specific cloud hosting provider
- WebSockets versus polling
- Microservices versus modular monolith
- Redis, Kafka or Kubernetes
- A specific identity provider
- A guardian video storage provider
- A particular monitoring service
- Any unmeasured latency, capacity or availability guarantee

These choices belong to C4 architecture and ADR reviews.

The existing Spring Boot/PostgreSQL modular-monolith proposal may be evaluated against these NFRs, but is not automatically approved merely because it already exists in the repository.

## 12. NFR acceptance evidence

Each requirement shall eventually be linked to:
1. Its owning functional requirements.
2. The component or service responsible.
3. An automated test, operational exercise or documented institutional approval.
4. Test results and the environment in which those results were produced.
5. Its readiness status: not started, implemented, verified or approved for deployment.

An implemented interface is not equivalent to verified operational behavior.

**Document status remains DRAFT until explicit owner review and approval.**
