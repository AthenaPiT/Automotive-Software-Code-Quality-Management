---
sidebar_label: "Management Procedure"
sidebar_position: 2
title: "Software Code Quality Management Procedure"
description: "The governing procedure for code quality planning, activities, roles, escalation and release gates."
---

  Classification                      Internal
  -----------------------------------------------------------------------

> **Document use note:** This procedure is a customizable process
> template. Tailor it to the organization's quality management system,
> product architecture, safety and cybersecurity classifications,
> customer-specific requirements, and applicable regulations before
> release. It does not by itself establish compliance or replace
> project-specific safety, cybersecurity, or legal obligations.

------------------------------------------------------------------------

## 1. Purpose

This procedure defines a controlled, evidence-based method to plan,
implement, measure, review, improve, and release software code quality
for automotive electronic software. It establishes common controls
across the software lifecycle so that source code is maintainable,
analyzable, testable, secure, robust, traceable, and suitable for its
intended use.

The procedure is intended to prevent defects early, detect defects
systematically, manage exceptions transparently, and provide objective
evidence for engineering and release decisions.

## 2. Scope

This procedure applies to:

-   New software development, maintenance, refactoring, porting,
    integration, and defect correction.
-   Application software, basic software, firmware, bootloaders,
    drivers, middleware, diagnostics, communication stacks, and relevant
    scripts or generated code.
-   Internally developed software, supplier-delivered software, and
    open-source software (OSS) incorporated into a product.
-   Development branches, integration branches, release candidates, and
    production maintenance branches.
-   Static analysis, coding-rule compliance, code review, unit-level
    verification, code coverage, build quality, defect management, and
    quality reporting.

Project plans shall identify any software or generated artifacts that
are excluded from specific controls and document the rationale, risk
assessment, compensating controls, and approval.

## 3. References and governing requirements

Use the applicable editions and contractual versions of the following as
relevant to the product and organization:

-   **Automotive SPICE (ASPICE):** software engineering, verification,
    validation, configuration management, problem resolution, and
    quality assurance process expectations.
-   **ISO 26262:** functional safety lifecycle and software-related work
    products for road vehicles when functional safety applies.
-   **ISO/SAE 21434:** cybersecurity engineering for road vehicles when
    applicable.
-   **IATF 16949 / ISO 9001:** organizational quality management system
    requirements, where applicable.
-   **MISRA C, MISRA C++, AUTOSAR C++14, CERT C/C++, or other approved
    coding standards:** select according to language, architecture,
    customer requirements, and project risk.
-   **ISO/IEC 5055 or other approved source-code weakness taxonomies:**
    where adopted by the organization.
-   Customer-specific requirements, internal engineering standards, tool
    qualification/assessment requirements, and product-specific safety
    and cybersecurity plans.

The project shall maintain a controlled **Applicable Standards and
Requirements Register** listing the exact edition, customer deviations,
tailoring decisions, and owner. If requirements conflict, the project
shall resolve the conflict through the organization's requirements and
compliance process rather than silently choosing one.

---

## 4. Terms and abbreviations

| Term | Definition |
|---|---|
| Code quality | The degree to which source code satisfies defined functional, structural, maintainability, robustness, security, and compliance requirements. |
| Quality gate | A defined set of mandatory conditions that must be met before a lifecycle transition is allowed. |
| Static analysis | Analysis of source or object code without executing the software, including coding-rule checks and selected defect/security analyses. |
| Coding-rule violation | A finding that code does not comply with an approved coding rule or project-specific rule. |
| Deviation / waiver | An approved, bounded exception to a coding rule or quality criterion, with rationale, impact analysis, compensating controls, and expiry or review conditions. |
| False positive | A tool finding determined not to represent a real issue, supported by documented evidence. |
| Critical code | Code whose failure could contribute to a safety goal violation, security compromise, loss of essential vehicle function, or severe customer impact. |
| Baseline | An approved, uniquely identified set of software items and associated configuration information. |
| Technical debt | Known maintainability or design compromises that may increase future change cost or defect risk. |

## 5. Roles and responsibilities

| Role | Key responsibilities |
|---|---|
| Project Manager / Software Project Manager | Ensures schedule, resources, and milestones include code-quality activities; escalates unresolved risks; chairs release readiness when assigned. |
| Software Development Lead | Owns implementation quality, coding practices, reviews, defect correction, and team adherence to this procedure. |
| Software Quality Assurance (SQA) | Independently monitors process compliance, checks objective evidence, tracks nonconformities, and reports quality status. SQA does not replace engineering ownership. |
| Software Architect | Defines architecture-level quality constraints, critical components, interfaces, and design-related quality measures. |
| Developer | Follows coding standards, runs required checks, provides tests and traceability, fixes findings, and documents justified exceptions. |
| Code Reviewer | Performs independent review of changes, verifies correctness and risk controls, and records review evidence. |
| Verification / Test Engineer | Defines and executes relevant unit, integration, robustness, and coverage activities; verifies defect fixes. |
| Functional Safety Manager / Safety Engineer | Defines safety-related constraints and evidence required by the safety plan, where applicable. |
| Cybersecurity Manager / Security Engineer | Defines security coding, analysis, vulnerability handling, and evidence requirements, where applicable. |
| Configuration Manager / DevOps Engineer | Controls repositories, tool configurations, build pipelines, baselines, permissions, and reproducibility of evidence. |
| Supplier Quality / Supplier Engineering | Ensures supplier software quality requirements, evidence, issue handling, and delivery acceptance are defined and followed. |
| Release Authority | Approves release only when mandatory gates are met or formally authorized dispositions exist under the organization's governance. |
- - - - -- -- - - - - - - 

One person may hold multiple roles in small teams, but required
independence for safety, quality assurance, or approval activities shall
be preserved where required by the applicable plan or standard.

## 6. Management principles

1.  **Prevention before detection:** use clear requirements,
    architecture, coding standards, and peer review to avoid defects.
2.  **Automation by default:** execute repeatable checks in the CI
    pipeline and preserve their results.
3.  **Risk-based rigor:** apply stronger scrutiny to safety-, security-,
    and mission-critical components without relaxing mandatory
    requirements.
4.  **Traceability:** link requirements, change requests, code changes,
    reviews, analysis results, tests, defects, and releases.
5.  **No silent exceptions:** every accepted violation or unmet
    threshold requires a documented disposition and authorized approval.
6.  **Reproducibility:** record tool versions, rule sets,
    configurations, build identifiers, and source revision for material
    results.
7.  **Continuous improvement:** use trends, escaped defects, root-cause
    analysis, and lessons learned to improve standards and practices.

## 7. Process overview

The process follows these stages:

1.  Plan code quality and define acceptance criteria.
2.  Establish coding standards, toolchain, and baseline metrics.
3.  Implement changes using controlled branching and secure development
    practices.
4.  Perform peer review and automated analysis.
5.  Execute unit verification and relevant coverage analysis.
6.  Triage findings, correct defects, and manage deviations.
7.  Evaluate quality gates and residual risks.
8.  Approve and baseline the release.
9.  Monitor field issues and improve the process.

A project may integrate these activities into its agile iteration,
V-model, continuous integration, or supplier workflow, provided that
required controls and evidence remain demonstrable.

## 8. Procedure

### 8.1 Plan code quality

At project initiation and at significant planning changes, the Software
Development Lead shall create or update a **Software Code Quality
Plan**. The plan shall define:

-   Applicable components, languages, repositories, generated code, and
    supplier code.
-   Applicable coding standards, rule sets, language versions, and
    approved deviations.
-   Component criticality and required verification rigor.
-   Toolchain and execution environments, including versions and
    configuration control.
-   Required code reviews, static-analysis checks, unit tests, coverage
    measures, and security checks.
-   Quality metrics, thresholds, reporting frequency, and owners.
-   Quality gates for merge, integration, release candidate, and
    production release.
-   Defect severity definitions, triage targets, escalation paths, and
    closure criteria.
-   Evidence retention location and retention period.
-   Responsibilities and approval authorities.
-   Tailoring decisions, exclusions, and compensating controls.

SQA shall review the plan for completeness and process consistency. The
project authority shall approve it before the first controlled
integration, or at the earliest project milestone defined by the quality
management system.

### 8.2 Define and maintain coding standards

The Software Development Lead, supported by the Software Architect and
safety/security specialists as applicable, shall select a
language-specific coding standard and a controlled rule set.

The project rule set shall address, as applicable:

-   Language subset and prohibited or restricted language features.
-   Type safety, integer conversions, overflow, pointer use, memory
    ownership, and bounds checking.
-   Initialization, lifetime, resource management, error handling, and
    defensive programming.
-   Concurrency, interrupt context, reentrancy, race conditions, and
    deadlock risks.
-   Timing, stack, memory, and execution determinism.
-   Interface contracts, API usage, and data validation.
-   Logging and diagnostics without leaking secrets or sensitive data.
-   Secure coding issues such as injection paths, unsafe functions,
    hard-coded credentials, and cryptographic misuse.
-   Readability, naming, function size, complexity, duplication, and
    modularity.
-   Rules for macros, preprocessor conditions, compiler extensions, and
    generated code.

For each mandatory rule, record a unique rule ID, description,
rationale, applicability, severity, verification method, and deviation
policy. The coding standard and tool rule configuration shall be
version-controlled. Changes to the rule set shall be reviewed for
impact, trialed where practical, and approved before broad adoption.

### 8.3 Establish the baseline and development environment

Before controlled development or integration, Configuration Management
shall establish:

-   Repository ownership, access controls, protected branches, and merge
    permissions.
-   Branching, commit-message, pull-request, and tagging conventions.
-   Approved compiler, linker, build system, analysis tools, test tools,
    and versions.
-   Reproducible build configuration and dependency management.
-   CI pipeline configuration, quality-gate implementation, and artifact
    retention.
-   Versioned analysis rules, suppressions, and baseline findings.
-   Traceability conventions for requirements, change requests, defects,
    commits, and test results.

Tool updates that can affect results shall be impact-assessed and
recorded. Where a tool is relied on to satisfy a safety-related or
otherwise regulated objective, tool confidence, qualification,
validation, or assessment shall be handled according to the applicable
project plan and standard.

### 8.4 Implement code changes

For every change, the developer shall:

1.  Confirm the approved requirement, defect, or change request and
    understand acceptance criteria.
2.  Assess affected components, interfaces, dependencies, safety impact,
    cybersecurity impact, and compatibility.
3.  Implement the smallest coherent change that meets the requirement.
4.  Follow the approved coding standard and avoid unrelated
    modifications.
5.  Add or update unit tests and relevant robustness or negative tests.
6.  Update comments, interface documentation, design records, and
    traceability where needed.
7.  Run local build, formatting, static-analysis, and unit-test checks
    required by the project.
8.  Review all new warnings and findings; do not suppress findings
    merely to obtain a clean report.
9.  Submit the change with a description, test evidence, known
    limitations, and linked work items.

Generated code shall be managed under a defined policy identifying the
generator, version, configuration, ownership, permitted manual edits,
and verification approach. Third-party and OSS code shall follow the
project's supplier, vulnerability, licensing, and compliance processes.

### 8.5 Perform peer code review

Every non-trivial production code change shall receive documented peer
review before merge. The project may define narrowly scoped exceptions
for trivial changes, generated files, or emergency fixes, but exceptions
shall be justified, risk-assessed, and subject to retrospective review
where appropriate.

Reviewers shall consider at least:

-   Requirement correctness and traceability.
-   Logic, boundary conditions, error paths, and failure handling.
-   Compliance with coding rules and project architecture.
-   Memory safety, resource lifecycle, concurrency, timing, and
    determinism.
-   Safety mechanisms and safe-state behavior, where applicable.
-   Attack surface, input validation, privilege boundaries, and secret
    handling, where applicable.
-   Test adequacy, test readability, and coverage of changed behavior.
-   API/interface compatibility and impact on dependent components.
-   Maintainability, complexity, duplication, and clarity.
-   Whether analysis warnings, suppressions, and deviations are
    justified.

The review record shall identify the change, reviewer(s), review date,
findings, dispositions, and approval status. The author shall resolve or
formally disposition each finding. The author shall not approve their
own change where independent review is required by project rules.

### 8.6 Run automated quality checks

The CI pipeline shall execute the checks defined in the Software Code
Quality Plan. Depending on component risk, these may include:

-   Build and compiler diagnostics, with warnings treated according to
    the approved policy.
-   Formatting and basic source hygiene checks.
-   Coding-standard compliance and static analysis.
-   Data-flow, control-flow, defect-pattern, and security analysis.
-   Unit tests and regression tests.
-   Statement, branch, condition, or modified-condition/decision
    coverage where required.
-   Dependency, OSS license, and known-vulnerability checks.
-   Binary, memory, stack, timing, or other resource checks where
    required.
-   Detection of secrets, prohibited APIs, and unsafe configuration.
-   Reproducible build and artifact-integrity checks.

The pipeline shall fail or block the relevant transition when a
mandatory gate fails, unless an approved exception mechanism explicitly
permits the transition. A green pipeline shall not be interpreted as
proof that software is defect-free; engineering review and verification
remain necessary.

### 8.7 Manage static-analysis findings

All findings shall be triaged using the approved workflow. The team
shall classify each finding as:

-   **Confirmed defect:** correct the code and add regression protection
    where appropriate.
-   **Valid rule violation without demonstrated defect:** correct it or
    request a formal deviation.
-   **False positive:** document technical evidence and obtain the
    required review/approval.
-   **Not applicable:** document why the rule does not apply to the code
    context and obtain approval where required.
-   **Duplicate:** link to the primary finding while retaining
    traceability.
-   **Deferred:** record risk, rationale, owner, due date, and approval.
    Deferral is not closure.

Each finding shall have a unique identifier, location, rule ID,
severity, status, owner, target date, disposition, and evidence.
Suppressions shall be as narrow as possible, include a reason and
reference to the approved disposition, and be periodically revalidated.
Blanket suppression or disabling a rule set to bypass a gate is
prohibited unless formally approved as a controlled tool-configuration
change.

### 8.8 Verify code changes and coverage

Verification shall be proportional to the change and component risk. At
minimum, the developer or verification owner shall demonstrate that:

-   The change builds in the controlled environment.
-   Unit tests cover normal, boundary, error, and relevant robustness
    behavior.
-   Changed behavior is tested and regression risk is addressed.
-   Tests are repeatable and their results are linked to the relevant
    source revision.
-   Coverage results meet project-defined thresholds where coverage is
    required.
-   Uncovered code and unreachable code are analyzed and dispositioned.
-   Mocks, stubs, test harnesses, and instrumentation do not invalidate
    the interpretation of results.

For safety-related software, coverage criteria and structural coverage
analysis shall be selected according to the applicable safety plan and
ISO 26262 requirements. Coverage thresholds shall not be treated as a
substitute for test quality, requirements coverage, or analysis of
uncovered behavior.

### 8.9 Manage defects and quality risks

Defects shall be logged in the approved defect or problem-resolution
system and classified by severity, priority, affected release,
component, and safety/security relevance.

The defect record shall include reproducible evidence where possible,
expected versus actual behavior, environment and version, impact
assessment, owner, containment, root cause when required, corrective
action, verification evidence, and closure approval.

For high-severity, safety-related, security-related, recurring, or
release-blocking defects:

1.  Notify the Software Development Lead and relevant quality, safety,
    security, and project authorities promptly.
2.  Assess exposure across branches, variants, platforms, and released
    products.
3.  Contain the issue and prevent unintended integration or release.
4.  Perform root-cause analysis proportional to risk and recurrence.
5.  Define corrective and preventive actions, including tests or rules
    that prevent recurrence.
6.  Verify the fix and affected regression scope.
7.  Escalate unresolved risk using the project escalation procedure.

A defect shall not be closed solely because code has been changed;
required verification and traceability must be complete.

### 8.10 Control deviations and waivers

A deviation request shall be raised before accepting a known
nonconformance, except for a documented emergency process approved by
the organization. Each request shall contain:

-   Deviation ID and affected rule/criterion.
-   Affected files, components, variants, and releases.
-   Technical rationale and why compliant alternatives are unsuitable.
-   Functional, safety, cybersecurity, reliability, maintainability, and
    customer impact analysis, as applicable.
-   Risk assessment and evidence supporting the assessment.
-   Compensating controls and verification activities.
-   Scope, owner, approver, validity period, expiry/review date, and
    closure conditions.
-   Customer or external approval when contractually or legally
    required.

The author shall not be the sole approver. Safety or cybersecurity
authorities shall participate when their domain may be affected. A
deviation does not waive applicable law, regulation, customer
requirements, or mandatory safety obligations. Expired deviations shall
be treated as nonconformities until renewed or closed.

### 8.11 Conduct quality reviews and reporting

The Software Development Lead shall review code-quality status at the
cadence defined in the project plan, and at minimum at significant
integration and release milestones. SQA shall independently sample
evidence and report process nonconformities.

Reports shall include:

-   Mandatory gate pass/fail status.
-   Open findings by severity, age, component, and rule category.
-   Trend of newly introduced versus resolved findings.
-   Review completion and review-finding closure.
-   Unit-test results and required coverage status.
-   Defect escape rate and recurring root causes.
-   Approved deviations, expired deviations, and suppressions.
-   OSS compliance and dependency vulnerability status where applicable.
-   Resource, complexity, duplication, and maintainability trends where
    adopted.
-   Risks, owners, due dates, and decisions required.

Metrics shall be interpreted in context. Teams shall not optimize a
metric by suppressing findings, reducing test scope, splitting defects,
or changing thresholds without controlled approval.

### 8.12 Release readiness and approval

Before a release candidate is approved, the responsible team shall
confirm that:

-   The release source revision and build artifacts are uniquely
    identified.
-   Required code reviews are complete and approved.
-   Mandatory CI checks and quality gates pass.
-   No unresolved release-blocking defects remain.
-   Remaining findings and deviations have documented, authorized
    dispositions.
-   Required unit verification and coverage objectives are met or
    formally dispositioned under applicable rules.
-   Safety and cybersecurity work products and approvals are complete
    where applicable.
-   OSS inventory, license obligations, and vulnerability dispositions
    are complete under the relevant process.
-   Traceability and evidence are complete and retrievable.
-   Known residual risks are accepted by the authorized decision-maker.
-   Release notes and relevant limitations are documented.

The Release Authority shall record the decision, evidence reviewed,
accepted residual risks, and any conditions. A failed mandatory gate
shall not be overridden informally. Emergency releases shall follow the
approved emergency change process, including risk acceptance, minimum
required checks, post-release verification, and retrospective review.

### 8.13 Post-release monitoring and improvement

After release, the project shall monitor field defects, warranty data,
customer reports, security advisories, supplier notifications, and
production incidents relevant to code quality.

For significant issues, the team shall assess affected versions and
variants, determine containment or corrective action, and feed lessons
learned into coding rules, static-analysis configurations, test cases,
review checklists, architecture guidance, and training.

At planned intervals, the process owner shall review trends and
determine whether quality thresholds, tooling, training, or workflow
changes are needed. Improvements shall be tracked to completion and
their effectiveness evaluated.

## 9. Quality gates and minimum acceptance criteria

The following table is a starting point. Project-specific criteria shall
be approved in the Software Code Quality Plan and aligned with safety,
security, customer, and organizational requirements.
| Gate | Minimum acceptance criteria | Required evidence |
|---|---|---|
| G0 --- Plan ready | Scope, standards, roles, tools, metrics, thresholds, and gate owners defined | Approved Software Code Quality Plan |
| G1 --- Change ready for review | Change linked to requirement/defect; local build and required tests run; known findings disclosed | Change request, commit, local/CI results |
| G2 --- Merge | Required peer review approved; mandatory automated checks pass; no unresolved blocker findings | Review record, analysis report, pipeline run |
| G3 --- Integration | Integration build and regression checks pass; interfaces and dependencies reviewed; high-risk findings dispositioned | Integration report, defect list, test results |
| G4 --- Release candidate | Release checks complete; required coverage and safety/security evidence available; deviations valid; traceability complete | Release checklist, metrics snapshot, risk acceptance |
| G5 --- Release approval | Authorized approval recorded; artifact and source baseline frozen and identifiable | Approval record, baseline ID, release package |
| G6 --- Post-release follow-up | Significant field issues triaged; corrective actions tracked; lessons learned reviewed | Field issue records, root-cause and action records |
- - - - - -

### 9.1 Example threshold policy

The project shall set numeric thresholds based on baseline data, product
risk, and customer requirements. The following are examples only and
must not be adopted without project approval:

-   Zero open critical or blocker findings at merge and release.
-   Zero unresolved mandatory coding-rule violations unless a valid,
    approved deviation is permitted.
-   100% completion of required peer reviews.
-   100% pass rate for mandatory pipeline checks on the release
    baseline.
-   Unit-test and structural coverage targets defined by component risk
    and applicable safety plan.
-   No expired deviations at release.
-   All high-severity defects assigned an owner and containment/decision
    plan within the project-defined response time.

A threshold shall specify the measurement method, scope, data source,
responsible owner, review cadence, and permitted exception process.

## 10. Metrics and definitions
| Metric | Definition / calculation | Use |
|---|---|---|
| Open finding density | Open findings divided by a defined code-size measure, such as KLOC; state exclusions and counting method | Compare trends within a consistent codebase and tool configuration |
| Finding closure rate | Findings closed in period divided by findings open at period start plus findings raised in period, using a documented convention | Assess resolution throughput |
| Mean finding age | Average elapsed time from finding creation to closure for closed findings, with open-age distribution also reported | Identify stale risks |
| Review coverage | Changes with required approved review divided by changes requiring review | Verify review discipline |
| CI gate pass rate | Successful mandatory pipeline runs divided by eligible pipeline runs, with retries and canceled runs defined | Monitor pipeline stability and change quality |
| Unit-test pass rate | Passed required unit tests divided by executed required unit tests | Monitor verification status |
| Structural coverage | Measured coverage metric for the applicable test configuration | Evaluate structural test adequacy where required |
| Defect escape rate | Defects discovered after the defined lifecycle boundary divided by a defined defect population | Evaluate effectiveness of prevention and verification |
| Deviation aging | Age and count of open deviations, including time to expiry | Prevent indefinite acceptance of known nonconformance |
| Reopen rate | Closed defects or findings reopened divided by items closed in the reporting period | Evaluate fix quality and closure criteria |
- - - - 

Every metric definition shall be stable and documented. Comparisons
across teams or releases shall account for differences in scope,
language, tool version, code generation, and risk.

## 11. Escalation

Escalation shall follow the project's Defect Escalation and Deviation
Procedure. At minimum:

-   **Immediate escalation:** suspected safety impact, exploitable
    vulnerability, critical production failure, or credible risk of
    violating a safety goal or legal/customer obligation.
-   **Prompt engineering escalation:** release-blocking defect, repeated
    critical rule violation, failed mandatory gate, or deviation without
    required approval.
-   **Management escalation:** overdue high-risk corrective action,
    unresolved cross-team ownership, recurring quality deterioration, or
    resource constraints that threaten mandatory verification.
-   **Release hold:** when required evidence is missing, a mandatory
    gate fails, a deviation is invalid/expired, or residual risk lacks
    authorized acceptance.

Escalation records shall identify the issue, affected scope,
containment, accountable owner, decision deadline, and final
disposition.

## 12. Records and evidence retention

The following records shall be controlled under the organization's
document and configuration management rules:

-   Software Code Quality Plan and revisions.
-   Coding standards, rule catalogues, and tool configurations.
-   Source revisions, change requests, pull requests, and review
    records.
-   CI pipeline results, build logs, static-analysis reports, test
    results, and coverage reports.
-   Finding and defect records, root-cause analyses, corrective actions,
    and closure evidence.
-   Deviation/waiver requests, approvals, expiry dates, and
    reassessments.
-   Quality dashboards, milestone reports, gate decisions, and release
    approvals.
-   Supplier evidence, OSS inventory and compliance records, and
    vulnerability dispositions.
-   Training and process-improvement records where required.

Retention periods shall meet legal, regulatory, customer, safety-case,
cybersecurity, and organizational requirements. Evidence shall be
retrievable by release baseline and protected against unauthorized
modification.

## 13. Training and competency

Personnel performing code development, review, analysis, testing, and
approval shall receive role-appropriate training on:

-   Applicable coding standards and project-specific rules.
-   Tool usage and interpretation of results.
-   Review and defect-management practices.
-   Safety and cybersecurity obligations relevant to their work.
-   Deviation handling, evidence requirements, and escalation paths.

Competency expectations and training records shall be maintained
according to the organization's training process. Significant changes to
standards or tools shall trigger an impact assessment for retraining.

## 14. Process compliance and audit

SQA or an authorized assessor shall periodically sample projects and
releases to verify that:

-   Planned activities were performed.
-   Evidence is complete, consistent, and traceable to the source
    baseline.
-   Required independence and approval rules were followed.
-   Findings and deviations are controlled and not improperly
    suppressed.
-   Quality gates were applied consistently.
-   Corrective actions were completed and effectiveness was checked.

Nonconformities shall be recorded and managed through the organization's
corrective-action process. Audit sampling shall be risk-based and
include high-criticality components, recurring problem areas, and
releases with significant deviations.

## 15. Tailoring rules

Tailoring is permitted only when documented and approved before the
affected activity, unless an approved emergency process applies. Each
tailoring decision shall identify:

-   Requirement or activity being tailored.
-   Reason and affected scope.
-   Risk and impact analysis.
-   Alternative or compensating control.
-   Approver and validity period.
-   Evidence needed to show the tailored process remains effective.

Tailoring shall not be used to bypass mandatory legal, regulatory,
contractual, safety, or cybersecurity requirements.

------------------------------------------------------------------------

# Appendix A --- Software Code Quality Plan Template

| Field | Entry |
|---|---|
| Project / product | `[Enter project and product]` |
| ECU / domain / component | `[Enter scope]` |
| Software version / baseline | `[Enter version or baseline ID]` |
| Languages and generated code | `[List languages, generators, and scope]` |
| Criticality classification | `[Enter project-defined classification]` |
| Applicable standards and editions | `[List standards and customer requirements]` |
| Coding standard and rule-set version | `[Enter name, version, configuration ID]` |
| Static-analysis and test tools | `[Tool, version, configuration, owner]` |
| Mandatory quality gates | `[List gate IDs and criteria]` |
| Coverage objectives | `[Define metric, threshold, scope, and rationale]` |
| Defect severity and response targets | `[Reference approved procedure]` |
| Deviation authority | `[Role(s) and approval route]` |
| Reporting cadence | `[Weekly / iteration / milestone / release]` |
| Evidence repository and retention | `[Location, access control, retention]` |
| Tailoring and exclusions | `[Rationale, risk, compensating controls]` |
| Prepared / reviewed / approved | `[Names or role IDs, dates, approvals]` |

# Appendix B --- Code Review Checklist

Use the checklist for each applicable change. Mark `Pass`, `Fail`, `N/A`, or `Action required`; explain all `Fail` and `N/A` responses where required.

- [ ] Requirement or defect link is valid and acceptance criteria are clear.
- [ ] Change is limited to the intended scope; unrelated modifications are justified.
- [ ] Logic, boundary conditions, invalid inputs, and error paths are handled.
- [ ] Data types, conversions, bounds, pointer use, and memory/resource lifecycle are safe.
- [ ] Concurrency, timing, interrupt behavior, and reentrancy are addressed where applicable.
- [ ] Interfaces, dependencies, compatibility, and architectural constraints are respected.
- [ ] Applicable safety mechanisms and safe-state behavior are preserved.
- [ ] Security-sensitive inputs, permissions, secrets, and error messages are handled appropriately.
- [ ] Approved coding standard is followed; findings and suppressions are reviewed.
- [ ] Tests cover normal, boundary, negative, and relevant regression scenarios.
- [ ] Test results correspond to the reviewed source revision.
- [ ] Documentation, traceability, and diagnostic behavior are updated as needed.
- [ ] Deviations are approved, scoped, and within validity.
- [ ] Reviewer findings are resolved or formally dispositioned.

**Review record**

| Field | Entry |
|---|---|
| Change / pull request ID | `[ID]` |
| Source revision | `[Commit or revision]` |
| Reviewer | `[Name / role]` |
| Review date | `[Date]` |
| Findings and dispositions | `[Link to records]` |
| Decision | `[Approved / Changes requested]` |

# Appendix C --- Static-Analysis Finding Record

| Field | Entry |
|---|---|
| Finding ID | `[Unique ID]` |
| Rule ID / tool | `[Rule, tool, version]` |
| Source revision and location | `[Commit, file, line or symbol]` |
| Description and evidence | `[Finding details]` |
| Severity / risk | `[Project classification]` |
| Disposition | `[Fix / false positive / deviation / duplicate / deferred]` |
| Technical rationale | `[Evidence and reasoning]` |
| Owner / due date | `[Owner, date]` |
| Corrective action / test | `[Action and verification evidence]` |
| Approval / deviation reference | `[Approver and record ID]` |
| Closure evidence / date | `[Link, date]` |

# Appendix D --- Deviation / Waiver Request

| Field | Entry |
|---|---|
| Deviation ID | `[Unique ID]` |
| Rule / threshold | `[Rule ID and requirement]` |
| Affected scope | `[Files, component, variants, releases]` |
| Reason and alternatives considered | `[Technical justification]` |
| Impact and risk assessment | `[Functional, safety, security, reliability, maintainability]` |
| Compensating controls | `[Controls and evidence]` |
| Required verification | `[Tests, analysis, review]` |
| Owner | `[Name / role]` |
| Approvers | `[Engineering plus relevant quality/safety/security/customer authority]` |
| Valid from / expiry | `[Dates or milestone conditions]` |
| Reassessment trigger | `[Tool/rule change, architecture change, release, incident]` |
| Final disposition | `[Approved / rejected / closed]` |

# Appendix E --- Release Code Quality Checklist

- [ ] Release baseline and build artifacts are uniquely identified.
- [ ] Required reviews are complete.
- [ ] Mandatory static-analysis and CI gates pass.
- [ ] Critical/blocker findings are closed; other findings are dispositioned under approved criteria.
- [ ] Required unit tests, regression tests, and coverage analyses are complete.
- [ ] Defects and residual risks have owners and authorized dispositions.
- [ ] No expired deviations or unapproved suppressions remain.
- [ ] Safety and cybersecurity evidence is complete where applicable.
- [ ] OSS inventory, license obligations, and vulnerability dispositions are complete where applicable.
- [ ] Traceability and records are retrievable.
- [ ] Release notes, limitations, and known issues are documented.
- [ ] Release Authority approval is recorded.

| Approval role | Name / role ID | Decision | Date | Record reference |
|---|---|---|---|---|
| Software Development Lead | `[ ]` | `[ ]` | `[ ]` | `[ ]` |
| Software Quality Assurance | `[ ]` | `[ ]` | `[ ]` | `[ ]` |
| Safety / Cybersecurity authority, if applicable | `[ ]` | `[ ]` | `[ ]` | `[ ]` |
| Release Authority | `[ ]` | `[ ]` | `[ ]` | `[ ]` |

# Appendix F --- Example RACI Matrix

`R = Responsible; A = Accountable; C = Consulted; I = Informed`

| Activity | Project Manager | Development Lead | Developer / SQA Reviewer | Safety / Security | Configuration / DevOps | Release Authority |
|---|---|---|---|---|---|---|
| Quality plan | A | R | C | C | C | I |
| Coding standard and rules | I | A/R | C | C | C | I |
| Implement code change | I | A | R | I | C | I |
| Peer review | I | A | R | I | C as needed | I |
| CI and analysis configuration | I | A | C | C | R | I |
| Finding triage and correction | I | A | R | C | C as needed | I |
| Deviation approval | I | R | C | A/C when relevant | I | I |
| Quality audit | I | C | I | A/R | C | I |
| Release readiness | R | R | C | C | C | A |
| Post-release improvement | A | R | C | C | C | I |
- - - - 
