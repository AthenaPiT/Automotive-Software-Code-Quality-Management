---
sidebar_label: "Quality Dashboard"
sidebar_position: 4
title: "Software Code Quality Dashboard Specification"
description: "Requirements for the code quality dashboard: metrics, evaluation, communication and continuous improvement."
---

## 1. Purpose

This specification defines the requirements for a Software Code Quality Dashboard used to monitor, evaluate, communicate, and improve software code quality throughout the automotive software development lifecycle.

The dashboard shall provide a consistent, evidence-based view of:
- Code health and maintainability.
- Coding-standard compliance and static-analysis findings.
- Defects, complexity, duplication, and technical debt.
- Unit-test quality and code coverage.
- Functional-safety-related software verification evidence.
- Cybersecurity weaknesses and secure-coding compliance.
- Open-source software (OSS) compliance indicators where relevant.
- Quality-gate status, release readiness, trends, and unresolved risks.

The dashboard supports engineering decisions; it does not replace required safety analyses, cybersecurity analyses, reviews, verification activities, or release approvals.

## 2. Objectives

1. Provide a single, role-appropriate view of code quality from component to product and program level.
2. Detect quality regression early through pull-request and continuous-integration checks.
3. Make quality-gate rules explicit, version-controlled, and auditable.
4. Link findings to source code, requirements, components, builds, test evidence, and owners.
5. Distinguish ordinary quality findings from safety- or security-significant findings.
6. Support trend analysis, corrective action, and continuous improvement.
7. Produce reproducible evidence for internal assessments, customer reviews, and applicable process assessments.

## 3. Scope

### 3.1 In Scope

- C, C++, assembly, Python, Java, Kotlin, Rust, and other project-approved languages.
- AUTOSAR Classic and Adaptive software, BSW, RTE, application software, middleware, drivers, bootloaders, diagnostics, and update software.
- Model-generated code where the analysis toolchain supports it.
- Unit-test source code and test results.
- Static analysis, coding-rule checking, code coverage, complexity, duplication, defect tracking, and quality-gate results.
- Safety and cybersecurity metadata associated with software elements.
- OSS inventory and license/vulnerability status when connected to approved OSS tooling.

### 3.2 Out of Scope

The dashboard is not, by itself:
- Proof that a product is safe or secure.
- A substitute for ISO 26262 work products or confirmation measures.
- A substitute for ISO/SAE 21434 cybersecurity engineering.
- A substitute for software requirements traceability, integration testing, system testing, or vehicle validation.
- A replacement for the official OSS bill of materials (SBOM), license review, or legal approval.
- An automatic release authorization mechanism unless the organization explicitly integrates it with a controlled approval process.

## 4. Normative Language and References

The terms **shall**, **should**, and **may** express mandatory, recommended, and optional requirements respectively.

Tailor this specification against the editions and contractual applicability of the following:
- ISO 26262 — Road vehicles, functional safety.
- ISO/SAE 21434 — Road vehicles, cybersecurity engineering.
- Automotive SPICE (ASPICE) process assessment model and relevant process reference model.
- MISRA C and MISRA C++ guidelines, where adopted by the project.
- CERT C/C++ secure coding rules, where adopted.
- ISO/IEC 5055 or other approved source-code weakness measurement methods, if applicable.
- ISO/IEC 5230 (OpenChain) and project OSS policy, where applicable.
- ISO/IEC 25010 software product quality model, as a reference for quality characteristics.
- Organization-specific software development, configuration management, defect management, and release procedures.

**Important:** This document does not claim that using the dashboard alone demonstrates compliance with any standard. Applicable editions, tailoring decisions, and required work products shall be controlled by the organization.

## 5. Design Principles

1. **Risk-based:** Safety- and security-significant findings receive explicit classification and escalation.
2. **Traceable:** Every displayed result links to its source data and the analyzed revision.
3. **Reproducible:** Results include tool version, rule-set version, build identifier, and analysis timestamp.
4. **Comparable:** Metric definitions, exclusions, thresholds, and aggregation rules are centrally governed.
5. **Actionable:** Every actionable finding has an owner, status, priority, and due date or documented disposition.
6. **No hidden dilution:** Suppressions, exclusions, waivers, and unscanned code are visible.
7. **Shift left:** New or worsened findings are checked at change/merge time where technically feasible.
8. **Separation of concerns:** Safety, cybersecurity, maintainability, test adequacy, and OSS indicators remain distinguishable even when summarized.
9. **Evidence over color:** Red/amber/green states are always backed by explicit criteria and drill-down evidence.
10. **Controlled change:** Metric definitions and gates are versioned and approved.

## 6. Users and Responsibilities

| Role | Primary Dashboard Needs | Responsibilities |
|---|---|---|
| Developer | Findings on changed code, rule explanation, remediation guidance | Fix findings; justify proposed deviations |
| Technical Lead / Software Architect | Component health, complexity, dependencies, technical debt | Review design risks and remediation plans |
| Software Quality Assurance (SQA) | Gate compliance, trends, overdue actions, evidence completeness | Monitor compliance and report exceptions |
| Functional Safety Manager / Safety Engineer | Safety-related findings, verification status, safety classifications | Assess impact on safety work products and required evidence |
| Cybersecurity Manager / Engineer | Vulnerabilities, secure-coding findings, dependency risks | Triage cybersecurity issues and approve risk treatment within authority |
| Test / Verification Engineer | Coverage, test status, flaky tests, verification gaps | Maintain trustworthy test evidence |
| Release Manager / Configuration Manager | Baseline quality, unresolved blockers, analyzed revision | Ensure release uses the approved baseline |
| Program / Engineering Manager | Cross-team trends, risk exposure, resource and closure status | Make prioritization and escalation decisions |
| OSS Compliance Owner | License, SBOM, provenance, known vulnerability indicators | Coordinate OSS policy and license approvals |

Role-based access control (RBAC) shall limit sensitive project, vulnerability, and customer information to authorized users.

## 7. Dashboard Information Architecture

The dashboard shall support the following views.

### 7.1 Executive / Program Overview

Show:
- Overall quality-gate status.
- Number of active components and analyzed revisions.
- Critical/high findings by category.
- Gate pass rate and trend.
- Open defects and overdue corrective actions.
- Coverage status against project targets.
- Safety/security blockers.
- Release readiness by software baseline.
- Data freshness and analysis completeness.

The executive summary shall not hide a critical safety or security blocker behind an average score.

### 7.2 Project / ECU Overview

Show:
- Component-level quality status.
- Findings by severity, rule family, and lifecycle state.
- New versus existing findings.
- Code size and analyzed scope.
- Unit-test results and coverage.
- Complexity and duplication distribution.
- Quality-gate history by build or release candidate.
- Unapproved waivers and expired waivers.
- Unanalyzed or stale components.

### 7.3 Component / Repository View

Show:
- Repository, branch, commit SHA, build ID, and analysis timestamp.
- Language and analyzed file count.
- Static-analysis and coding-rule findings.
- Changed-code findings versus baseline findings.
- Complexity hotspots and duplication.
- Unit-test and coverage results.
- Defect links and ownership.
- Exclusions, generated code, third-party code, and suppressions.
- Component-specific thresholds and deviations.

### 7.4 Change / Pull-Request View

Show:
- Quality-gate result for the proposed change.
- New findings introduced by the change.
- Findings resolved by the change.
- Changed-line coverage, where supported.
- Build and test results.
- Policy violations and missing evidence.
- Links to findings, source lines, and review records.

A change gate should prioritize **new or worsened findings** while preventing legacy debt from being silently ignored. Existing debt remains visible and governed by an approved remediation plan.

### 7.5 Safety and Cybersecurity View

Show separately:
- Safety-related coding-rule violations and associated safety classification.
- Findings requiring safety-engineer assessment.
- Verification evidence status for safety-related software elements.
- Security weaknesses, vulnerability identifiers, exploitability/impact assessment where available, and treatment status.
- Open safety/security deviations, approvals, expiry dates, and residual-risk decisions.
- Trace links to relevant requirements, analyses, tests, and change records.

A static-analysis severity score shall not automatically be treated as an ISO 26262 ASIL classification or a cybersecurity risk rating.

### 7.6 OSS Compliance View

Where OSS tools are integrated, show:
- SBOM generation status and baseline.
- Direct and transitive dependency inventory status.
- License-policy findings and approval status.
- Known vulnerable dependencies and remediation status.
- Unidentified packages, provenance gaps, and unsupported components.
- Exceptions, approvers, and expiry dates.

OSS status shall not be represented as “compliant” solely because no vulnerability was reported; license and policy checks are separate from vulnerability scanning.

### 7.7 Trend and Analytics View

Show trends by release, sprint, component, team, and finding category:
- New finding rate and closure rate.
- Defect escape or reopen rate where data is reliable.
- Quality-gate pass rate.
- Coverage trend.
- Technical-debt trend.
- Mean/median age of open findings.
- Waiver count and expiry trend.
- Analysis completeness and freshness.

Trend comparisons shall account for scope changes, rule-set changes, tool upgrades, and metric-definition changes.

## 8. Metric Catalogue

All metrics shall have a documented name, purpose, formula, unit, data source, collection frequency, owner, exclusions, target, and gate usage.

### 8.1 Core Metrics

| ID | Metric | Definition / Formula | Unit | Typical Use |
|---|---|---|---|---|
| CQ-001 | Quality Gate Status | Result of all applicable mandatory gate rules | Pass / Fail / Waived | Merge and release decisions |
| CQ-002 | Critical Findings | Count of open findings classified critical by approved policy | Count | Immediate escalation |
| CQ-003 | High Findings | Count of open high-severity findings | Count | Risk prioritization |
| CQ-004 | New Findings | Findings first introduced in the analyzed revision | Count | Change quality |
| CQ-005 | Finding Density | Open findings / KLOC of analyzed production code | Findings/KLOC | Trend and comparison |
| CQ-006 | Rule Compliance | Applicable mandatory rule checks passed / total applicable checks × 100 | % | Coding-standard adherence |
| CQ-007 | Unit Test Pass Rate | Passed executed unit tests / total executed unit tests × 100 | % | Test health |
| CQ-008 | Statement Coverage | Executed statements / instrumented executable statements × 100 | % | Test evidence |
| CQ-009 | Branch Coverage | Executed branches / instrumented branches × 100 | % | Test evidence |
| CQ-010 | Function Coverage | Executed functions / instrumented functions × 100 | % | Test evidence |
| CQ-011 | Complexity | Approved complexity measure, e.g. cyclomatic complexity, by function and distribution | Numeric / histogram | Hotspot identification |
| CQ-012 | Duplication | Duplicated eligible lines / eligible lines × 100 | % | Maintainability |
| CQ-013 | Open Defect Count | Count of unresolved software defects in scope | Count | Defect management |
| CQ-014 | Finding Age | Current date − first-detected date for an open finding | Days | Closure discipline |
| CQ-015 | Remediation SLA Compliance | Findings closed within applicable target / findings due in period × 100 | % | Process performance |
| CQ-016 | Waiver Count | Active waivers, grouped by severity, rule, component, and expiry | Count | Exception control |
| CQ-017 | Stale Analysis Rate | In-scope components without analysis within freshness window / in-scope components × 100 | % | Evidence completeness |
| CQ-018 | Dependency Risk | Count of dependencies with unresolved policy or vulnerability findings | Count | Supply-chain risk |
| CQ-019 | OSS License Status | Packages with completed policy disposition / packages requiring disposition × 100 | % | OSS governance |
| CQ-020 | Analysis Scope Completeness | Eligible in-scope source units analyzed / total eligible in-scope source units × 100 | % | Trustworthiness |

**Metric cautions**
- KLOC shall be defined consistently (e.g., executable source lines or nonblank, noncomment source lines); do not compare different counting methods.
- Coverage percentages shall include the coverage type, test level, configuration, compiler, and build identity.
- Test pass rate can be misleading if tests are skipped, filtered, or not executed. Display skipped/disabled tests separately.
- Rule compliance shall use the approved rule applicability matrix; not-applicable rules must be recorded rather than silently removed.
- Finding density shall not be used alone to rank teams or infer software safety.
- Generated code and third-party code shall be included or excluded according to a documented policy, with their scope visible.

### 8.2 Optional Metrics

Projects may add:
- Static-analysis warning-to-defect conversion rate.
- Mutation-testing score.
- Flaky-test rate.
- Review coverage for changed code.
- Mean time to acknowledge and resolve findings.
- Defect reopen rate.
- Escaped defects by lifecycle phase.
- Build reproducibility rate.
- Memory-safety or resource-leak finding counts.
- Dependency freshness and unsupported-version counts.
- Model-to-code consistency or model verification status.
- Requirements-to-test traceability completeness, sourced from the requirements/ALM system.

## 9. Severity and Priority Model

Severity, priority, safety relevance, and cybersecurity risk shall be distinct fields.

### 9.1 Suggested Finding Severity

| Severity | General Meaning | Expected Response |
|---|---|---|
| Critical | Credible potential for severe product, safety, security, or release impact; defined by project policy | Immediate triage; block merge/release unless formally resolved or handled under an authorized process |
| High | Significant correctness, robustness, security, or maintainability concern | Prompt owner assignment and time-bound remediation |
| Medium | Meaningful quality concern with bounded impact | Planned remediation within agreed SLA |
| Low | Minor concern, style issue, or limited impact | Fix opportunistically or through planned cleanup |
| Informational | Advisory, metric, or non-blocking observation | Review when relevant |

Severity definitions shall be calibrated to the project's domain and approved by the responsible quality, safety, and cybersecurity authorities.

### 9.2 Additional Required Attributes

Each finding should include, where applicable:
- Unique finding ID.
- Tool and rule ID.
- Severity and priority.
- Safety relevance and applicable ASIL context (if assessed by authorized personnel).
- Cybersecurity relevance and risk status (if assessed).
- First detected and last observed timestamps.
- Source file, line/range, function, and component.
- Introduced-by revision and baseline revision.
- Owner and due date.
- Lifecycle state.
- Linked defect, requirement, test, risk, or change request.
- Suppression/waiver rationale and approval.
- False-positive disposition and supporting evidence.

The dashboard shall not infer ASIL, safety classification, or cybersecurity risk solely from a tool rule ID.

## 10. Quality Gates

Quality gates are controlled, automated decision rules evaluated at defined lifecycle points.

### 10.1 Gate Types

1. **Local / pre-commit gate:** Fast checks for formatting, selected coding rules, and obvious defects.
2. **Pull-request / merge gate:** New findings, build/test status, changed-code coverage, and required reviews.
3. **Continuous-integration gate:** Full static analysis, coding-rule checks, unit tests, coverage, and data completeness.
4. **Integration gate:** Cross-component checks, integration-test evidence, interface consistency, and unresolved blocker review.
5. **Release-candidate gate:** Baseline-level quality status, approved deviations, safety/security evidence, OSS disposition, and reproducibility.
6. **Maintenance gate:** Regression checks for fixes, backports, and long-term support branches.

### 10.2 Example Gate Policy

The following is an illustrative baseline and must be tailored; it is not a universal automotive requirement.

| Gate Rule | Example Acceptance Criterion | Default Action |
|---|---|---|
| G-01 | Analysis completed on the exact candidate revision | Fail if missing or stale |
| G-02 | No new critical or high findings in changed production code, unless approved exception process permits otherwise | Fail |
| G-03 | No open finding designated a release blocker by authorized safety/security/release authority | Fail |
| G-04 | Mandatory coding rules pass or have valid, approved deviations | Fail |
| G-05 | Required unit tests pass; skipped/disabled tests are visible and justified | Fail on unexplained failure or omission |
| G-06 | Coverage meets project target for the applicable component and test level | Fail or require formal disposition |
| G-07 | No expired waiver applies to the candidate | Fail |
| G-08 | Required OSS license and vulnerability dispositions are complete | Fail for unresolved policy blockers |
| G-09 | Required analysis scope completeness threshold is met | Fail below threshold |
| G-10 | Required reviews and evidence links are present | Fail if mandatory evidence is missing |

Thresholds for coverage, complexity, finding density, and remediation SLA shall be defined per project/component and justified by risk, architecture, verification strategy, and historical baseline.

### 10.3 Legacy Debt and Baseline Policy

- Establish a controlled baseline of existing findings before enforcing new gates.
- Track findings as **new**, **existing**, **changed/worsened**, **resolved**, or **reopened**.
- Block new debt according to the approved gate policy.
- Manage existing debt through an owned backlog, risk assessment, target date, and periodic review.
- Rebaseline only through an approved change with recorded rationale and impact analysis.
- Never reset a baseline merely to make metrics appear green.

## 11. Workflow and Lifecycle

### 11.1 Data-to-Decision Workflow

1. Developer pushes a change or a scheduled pipeline starts.
2. CI builds the target configuration and executes approved analysis and tests.
3. Collectors upload machine-readable results and metadata.
4. The dashboard validates schema, revision identity, tool version, timestamp, and scope.
5. Findings are normalized and deduplicated according to governed rules.
6. Gate engine evaluates applicable rules and produces a versioned decision record.
7. Findings are assigned to owners and synchronized with the approved defect/work-item system.
8. Owners triage findings and select remediation, false positive, not applicable, accepted deviation, or other approved disposition.
9. Fixes are verified in a subsequent analysis and test run.
10. Quality/Safety/Security/OSS owners review exceptions within their authority.
11. Release authority reviews the complete candidate evidence package.
12. Results and decisions are retained according to the organization's record-retention policy.

### 11.2 Finding Lifecycle

Suggested states:
- New
- Triaged
- Assigned
- In Progress
- Resolved / Fixed
- Verified
- Closed
- Reopened
- False Positive (approved)
- Not Applicable (approved)
- Accepted Deviation / Waived (time-bound)

A finding shall not be considered resolved solely because it disappears from a tool report; the system should verify that the relevant code scope was analyzed successfully.

### 11.3 Waiver / Deviation Workflow

1. Requester creates a waiver with finding/rule ID, affected scope, rationale, impact analysis, and compensating controls.
2. Relevant technical owner reviews the proposed disposition.
3. Safety or cybersecurity authority reviews if the finding affects their domain.
4. SQA checks process compliance and evidence completeness.
5. Authorized approver accepts, rejects, or requests additional evidence.
6. Approved waivers record scope, approver, approval date, expiry date, conditions, and linked evidence.
7. Dashboard alerts before expiry and blocks use of expired waivers where the gate requires it.
8. Waivers are periodically reviewed and closed when no longer needed.

No person shall approve a deviation beyond their delegated authority. Waivers shall not bypass legal, contractual, or mandatory safety obligations.

## 12. Data Architecture and Integration

### 12.1 Logical Architecture

Recommended logical layers:
1. **Source systems:** Git, code review, CI/CD, static analyzers, unit-test frameworks, coverage tools, defect/ALM systems, OSS/SBOM tools, requirements and test-management tools.
2. **Collectors and adapters:** Secure ingestion, schema validation, authentication, retries, and source metadata.
3. **Normalization layer:** Common finding schema, severity mapping, identity/deduplication, repository/component mapping.
4. **Metric and gate engine:** Metric calculations, policy evaluation, trend snapshots, exception rules.
5. **Storage layer:** Findings, analysis runs, gate decisions, configuration history, audit logs, and trend data.
6. **Presentation layer:** Role-based dashboards, drill-downs, reports, and alerts.
7. **Governance layer:** RBAC, policy versioning, approvals, retention, auditability, and data-quality monitoring.

### 12.2 Data Sources

| Data Domain | Example Source | Required Data |
|---|---|---|
| Source/configuration | Git or equivalent SCM | Repository, branch, commit SHA, tags, file scope |
| Build | CI/CD system | Build ID, configuration, compiler/toolchain version, status |
| Static analysis | Approved analyzer | Rule ID, finding ID, location, severity, status |
| Coding standards | MISRA/CERT or internal checker | Rule applicability, violation, deviation status |
| Testing | Unit-test framework | Test counts, pass/fail/skip, run identity |
| Coverage | Coverage tool | Coverage type, numerator/denominator, exclusions |
| Defects | ALM/issue tracker | Defect ID, state, owner, priority, due date |
| Requirements and verification | Requirements/test system | Links, verification status, traceability metadata |
| Safety | Safety lifecycle tool/process repository | Safety relevance, approved assessment, evidence links |
| Cybersecurity | Vulnerability/scanning/risk systems | Finding reference, risk status, treatment, owner |
| OSS | SCA/SBOM tool | Package identity, version, license, vulnerability and disposition |
| Organization metadata | CMDB/project registry | Product, ECU, component, team, owner, release baseline |

### 12.3 Minimum Analysis Run Metadata

Every analysis run shall record:
- Product/program and component identifiers.
- Repository URL or stable repository ID.
- Branch and exact commit SHA.
- Build/pipeline ID and build configuration.
- Analysis timestamp and tool versions.
- Rule-set and policy versions.
- Language and analyzed file counts.
- Included/excluded scope and reasons.
- Analysis status and error summary.
- Test/coverage run identifiers where relevant.
- Gate policy version and final decision.
- Links to raw reports and logs, subject to access controls.

### 12.4 Data Integrity and Freshness

- Results from different revisions shall not be combined without explicit labeling.
- Failed or partial analysis shall not be presented as a successful clean result.
- Missing data shall be displayed as **Unknown**, **Not Available**, or **Stale**, not as zero.
- Duplicate findings shall be merged only under documented, deterministic rules.
- Tool/rule-set upgrades shall record a version boundary and, where necessary, trigger a controlled baseline recalculation.
- Collector failures shall generate operational alerts and shall not silently bypass mandatory gates.

## 13. Visualization and Interaction Requirements

### 13.1 Visual Status

Use a consistent status model:
- **Pass:** All mandatory applicable checks pass.
- **Fail:** One or more mandatory checks fail.
- **Waived / Conditional:** A valid, authorized exception applies; the underlying risk remains visible.
- **Unknown:** Required data is absent or invalid.
- **Stale:** Data exceeds the approved freshness limit.
- **Not Applicable:** Explicitly justified and approved for the given scope.

Color shall never be the only way to communicate status; include text/icon labels for accessibility.

### 13.2 Drill-Down

Users should be able to navigate:
Program → Product/ECU → Component → Repository/Revision → Finding → Source/Rule/Evidence.

The dashboard should preserve filters and scope during drill-down. Each summary number shall be traceable to the underlying records used to calculate it.

### 13.3 Filtering

Support filters by:
- Program, product, ECU, component, repository, branch, release, and revision.
- Team, owner, severity, priority, rule family, and lifecycle state.
- Safety/cybersecurity relevance and approval status.
- New/existing/resolved findings.
- Tool, rule-set version, date range, and gate result.
- Production/test/generated/third-party code classification.

### 13.4 Alerts

Alerts shall be configurable for:
- New critical/high finding.
- Quality-gate failure.
- Failed or stale analysis.
- Coverage regression beyond an approved tolerance.
- Expiring or expired waiver.
- Overdue finding or corrective action.
- Unresolved OSS policy blocker.
- Missing release evidence.

Alerts should include context, affected revision, owner, due date, and a direct link to the record. Avoid alert floods through deduplication and configurable grouping.

## 14. Security, Privacy, and Availability

The dashboard platform shall:
- Use organization-approved authentication and RBAC.
- Enforce least privilege for projects and sensitive findings.
- Protect data in transit and at rest using approved controls.
- Keep audit records for policy changes, approvals, waiver updates, and access to sensitive records as required.
- Protect tokens and integration credentials using an approved secrets-management mechanism.
- Validate and sanitize ingested reports; treat repository text and tool output as untrusted data.
- Apply retention and deletion policies to source snippets, reports, and logs.
- Support backup, recovery, monitoring, and incident response.
- Define availability and recovery objectives according to project criticality.
- Avoid storing unnecessary proprietary source code in third-party services without approval.

## 15. Governance and Change Control

### 15.1 Metric Ownership

A named owner shall be assigned to every metric, gate, rule mapping, and dashboard view. Ownership includes definition, data quality, target approval, and change history.

### 15.2 Policy Change Process

1. Submit a change request describing the reason and affected projects.
2. Assess impact on current baselines, trends, gates, and release candidates.
3. Obtain approval from the designated engineering and quality owners; include safety/security/OSS authorities where relevant.
4. Test the new policy against representative historical data.
5. Publish a versioned policy with effective date and migration instructions.
6. Preserve previous versions and decision records.
7. Communicate changes to affected teams.

### 15.3 Metric Gaming Prevention

The organization shall prohibit:
- Deleting findings or changing severity to improve scores without evidence.
- Excluding code solely to improve dashboard status.
- Reducing test scope or suppressing failed tests without approval.
- Rebaselining without authorization.
- Treating waived findings as resolved.
- Comparing teams using raw counts without normalizing scope and considering context.

Metrics are diagnostic and management tools, not standalone measures of individual developer performance.

## 16. Reporting and Review Cadence

| Cadence | Review | Participants | Expected Output |
|---|---|---|---|
| Per change | PR/merge quality gate | Developer, reviewer, CI | Pass/fail decision and actionable findings |
| Daily / per CI cycle | Build and component health | Team, technical lead | Triage of new blockers and broken pipelines |
| Weekly | Quality trend and overdue actions | Team lead, SQA, component owners | Action list with owners and due dates |
| Per integration milestone | Cross-component quality review | Integration lead, SQA, verification | Integration risk and closure plan |
| Per release candidate | Release quality review | Release, SQA, safety, security, OSS owners as applicable | Release evidence and disposition of blockers |
| Monthly / quarterly | Program-level improvement review | Engineering leadership, SQA | Trend analysis, systemic actions, resource decisions |
| On policy change | Metric/gate review | Metric owners and affected authorities | Approved versioned policy |

## 17. Acceptance Criteria for Dashboard Delivery

The dashboard implementation shall be accepted only when the following are demonstrated:

- [ ] All in-scope repositories/components are registered with an accountable owner.
- [ ] Required data sources are integrated or formally recorded as unavailable with an approved plan.
- [ ] Analysis results are bound to exact revisions and build identities.
- [ ] Metric definitions and calculation tests are documented.
- [ ] Quality-gate rules are version-controlled and tested.
- [ ] Missing, stale, partial, and failed analysis states are distinguishable from pass/zero.
- [ ] Users can drill down from summary metrics to findings and evidence.
- [ ] Finding ownership, lifecycle, and due-date handling are operational.
- [ ] Waivers have approvals, scope, rationale, expiry, and audit history.
- [ ] Safety/security-related findings are visible without conflating tool severity with formal risk classification.
- [ ] OSS indicators distinguish license, vulnerability, and inventory completeness.
- [ ] RBAC, audit logging, backup, and retention controls are tested.
- [ ] Reports can reproduce the policy and source-data versions used for a gate decision.
- [ ] Representative failure scenarios have been tested, including collector outage and partial analysis.
- [ ] Users and administrators have received training and operating instructions.

## 18. Implementation Roadmap

### Phase 1 — Define and Baseline
- Identify programs, repositories, components, languages, and owners.
- Agree on metric definitions, scope classifications, and severity mapping.
- Inventory available analyzers, CI, test, defect, and OSS tools.
- Establish the initial legacy-finding baseline.
- Approve a minimal quality-gate policy.

### Phase 2 — Minimum Viable Dashboard
- Integrate SCM, CI, static analysis, unit tests, coverage, and defect management.
- Implement program, component, and pull-request views.
- Display data freshness and analysis completeness.
- Enable gate history, ownership, and basic alerts.

### Phase 3 — Automotive Lifecycle Integration
- Add safety and cybersecurity metadata links.
- Integrate OSS inventory/SBOM and policy disposition.
- Link requirements, tests, changes, and release baselines.
- Establish waiver governance and release evidence reports.

### Phase 4 — Optimization
- Add trend normalization and cross-release analysis.
- Introduce hotspot prioritization and risk-based remediation planning.
- Calibrate targets using historical data and engineering judgment.
- Automate recurring quality reviews and evidence packages.
- Reassess metric validity and unintended incentives periodically.

## 19. Example Dashboard Layout

### Program Summary

| Indicator | Current Value | Target / Rule | Status |
|---|---:|---|---|
| Quality gate | Fail | All mandatory checks pass | Fail |
| Open critical findings | 1 | 0 release blockers | Fail |
| Open high findings | 7 | Project-defined threshold | Review |
| Unit-test pass rate | 98.7% | Project target | Review |
| Branch coverage | 86% | Component-specific target | Review |
| Active waivers | 4 | All valid and approved | Review |
| Analysis scope completeness | 99.5% | Project minimum | Pass |
| OSS policy disposition | 100% | All required packages reviewed | Pass |

*Illustrative values only. Actual targets and status must be calculated from approved policy and verified source data.*

### Recommended Charts
- Stacked findings by severity and lifecycle state.
- New versus resolved findings by week or sprint.
- Coverage trend by component and test level.
- Complexity distribution and top hotspots.
- Waivers by age, severity, owner, and expiry.
- Gate pass rate by build/release.
- Analysis completeness and freshness by component.
- OSS inventory, license disposition, and vulnerability status.

Every chart shall show the selected time period, scope, and relevant denominator. Where data or scope changed, the chart should annotate the change.

## 20. Required Templates

### 20.1 Metric Definition Template

| Field | Description |
|---|---|
| Metric ID / Name | Stable identifier and display name |
| Purpose | Decision the metric supports |
| Definition | Exact meaning and scope |
| Formula | Reproducible calculation |
| Unit | Count, %, days, score, etc. |
| Data Sources | Systems and fields used |
| Refresh Frequency | Event-driven, per build, daily, etc. |
| Owner | Accountable role |
| Target / Threshold | Approved value and rationale |
| Exclusions | Permitted exclusions and approval method |
| Gate Usage | Informational, warning, blocking |
| Version / Effective Date | Change-control information |

### 20.2 Quality Gate Rule Template

| Field | Description |
|---|---|
| Gate Rule ID | Stable identifier |
| Lifecycle Point | PR, CI, integration, release |
| Rule Description | What must be true |
| Scope | Components, languages, code types |
| Evaluation Logic | Exact deterministic rule |
| Data Dependency | Required source data |
| Failure Behavior | Block, warn, or require review |
| Exception Process | Authorized deviation route |
| Owner / Approver | Responsible roles |
| Policy Version | Version used for evaluation |
| Test Cases | Positive, negative, and boundary tests |

### 20.3 Finding Record Template

| Field | Example / Requirement |
|---|---|
| Finding ID | Stable unique ID |
| Product / Component | Controlled identifiers |
| Repository / Revision | Exact repository and commit SHA |
| Source Location | File, line/range, symbol |
| Tool / Rule | Tool version and rule identifier |
| Severity / Priority | Approved mappings |
| Safety / Security Context | Assessment and evidence link, if applicable |
| Status / Owner | Current lifecycle state and accountable person |
| First Seen / Last Seen | Timestamps |
| Due Date | Based on approved remediation policy |
| Related Work Item | Defect, change, requirement, test |
| Disposition | Fixed, false positive, N/A, waiver, etc. |
| Approval / Expiry | Required for controlled exceptions |

### 20.4 Waiver / Deviation Template

- Waiver ID:
- Finding/rule ID:
- Product/component/repository/revision scope:
- Requester and date:
- Technical rationale:
- Impact analysis:
- Safety impact assessment, if applicable:
- Cybersecurity impact assessment, if applicable:
- Compensating controls:
- Verification evidence:
- Residual risk and acceptance rationale:
- Required approvers:
- Decision and decision date:
- Conditions and limitations:
- Expiry date:
- Review date:
- Closure evidence:

## 21. Operational Risks and Controls

| Risk | Potential Impact | Control |
|---|---|---|
| Incomplete source ingestion | False confidence in quality | Scope-completeness metric and explicit unknown state |
| Stale analysis | Wrong release decision | Freshness gate and revision binding |
| Tool/rule-set drift | Misleading trend | Version metadata and controlled recalculation |
| Severity mapping inconsistency | Incorrect prioritization | Governed cross-tool mapping and periodic calibration |
| Excessive false positives | Reduced trust and ignored alerts | Triage process, tuning under change control |
| Uncontrolled suppressions | Hidden defects | Audited suppression/waiver workflow |
| Metric gaming | Poor decisions and quality erosion | Governance, denominator visibility, audits |
| Safety/security misclassification | Risk overlooked or overstated | Authorized domain review; no automatic ASIL/risk inference |
| Dependency inventory gaps | OSS exposure not visible | SBOM completeness and provenance checks |
| Dashboard outage | Delayed quality decisions | Monitoring, recovery plan, and defined fallback procedure |

## 22. Final Requirements Summary

A compliant implementation of this specification shall:
1. Provide traceable quality views from program to source finding.
2. Use explicit, versioned metric definitions and quality gates.
3. Distinguish critical safety/security blockers from general code-health metrics.
4. Bind every result to the analyzed revision and tool/policy versions.
5. Expose stale, missing, partial, excluded, and waived data.
6. Support controlled finding triage, remediation, verification, and waiver management.
7. Integrate relevant test, defect, safety, cybersecurity, and OSS evidence.
8. Protect sensitive engineering information and preserve auditability.
9. Provide actionable trends and role-appropriate reporting.
10. Be tailored and approved for each project's standards, risk profile, toolchain, and contractual obligations.

---

## Appendix A — Suggested Project-Specific Decisions

Before production rollout, record decisions for:
- Applicable standards and editions.
- Supported languages and analyzers.
- Coding-rule baseline and applicability matrix.
- Severity mapping and safety/security escalation criteria.
- Coverage types and targets by component and test level.
- Code scope policy for generated, test, vendor, and third-party code.
- Legacy baseline and rebaseline authorization.
- Finding remediation SLAs.
- Waiver authorities and maximum waiver duration.
- OSS policy, SBOM format, and vulnerability response policy.
- Data retention, access controls, and dashboard availability targets.
- Release-gate ownership and fallback procedure.

## Appendix B — Glossary

| Term | Meaning |
|---|---|
| ALM | Application Lifecycle Management |
| ASPICE | Automotive SPICE process assessment framework |
| ASIL | Automotive Safety Integrity Level |
| CI/CD | Continuous Integration / Continuous Delivery or Deployment |
| ECU | Electronic Control Unit |
| Gate | A controlled acceptance decision at a lifecycle point |
| KLOC | Thousand lines of code, using a documented counting convention |
| OSS | Open-source software |
| SCA | Software Composition Analysis |
| SBOM | Software Bill of Materials |
| SQA | Software Quality Assurance |
| Waiver / Deviation | Authorized, scoped exception with rationale and evidence |
