---
sidebar_label: "QA & Audit Checklist"
sidebar_position: 2
title: "Code Quality Assurance and Audit Checklist"
description: "Independent QA levels, minimum controlled evidence, audit frequency and ready-to-use checklist."
---

## 1\. Purpose

The QA function provides **independent** confidence in the software product **and** the development process\. This document defines the three levels of assurance, the minimum controlled evidence set, the recommended audit frequency, and a ready\-to\-use audit checklist\.

#### Scope of the assurance function

This document defines the **independent assurance layer** \(Layer 3 of the framework, Doc 01 §4\.1\)\. It governs three things: \(1\) the **three levels of quality control** \(developer, technical, independent\) and who owns which; \(2\) the **minimum controlled evidence set** an auditor must be able to request; and \(3\) a repeatable **audit checklist and reporting template** used at G0, at milestones and pre\-delivery\. It is not an engineering\-execution document — it does not redefine how static analysis \(Doc 03\), review \(Doc 04\), unit testing \(Doc 05\), robustness \(Doc 06\) or OSS compliance \(Doc 07\) are performed\. It defines how an independent QA verifies that those activities actually happened, with evidence, to the agreed criteria\.

#### Why independent assurance is a separate control

- **Assurance of the producer is not the producer's job:** Automotive SPICE 4\.0 SUP\.1 \(Software Product Assurance\) requires assurance activities to be planned, performed and reported independently of the people who produced the work product\. If the team that built the software also certifies it, the "assurance" is self\-declaration — exactly what assessors reject\.

- **Two objects must both be trustworthy:** a good product produced by an uncontrolled process will not stay good; a clean process record hiding a defective product will fail in the field\. QA must independently judge *both* the product *and* the process, which is why §2 splits assurance across developer, technical and independent levels\.

- **Audit evidence is contractual:** for in\-house programs and especially supplier programs \(VW Formel Q supplier evaluation, customer quality agreements\), the audit record is the evidence that the agreed quality system was in place\. Without a defined checklist and evidence set, the supplier\-audit finding is subjective and un\-defendable\.

- **Gate independence feeds release integrity:** the G4/G5 decision \(Doc 11\) relies on independent QA stating that evidence is complete and gate discipline held\. Doc 08 is the source of that statement\.

#### Stand up the assurance function on a project

1. **Assign the independent role at G0:** name the Project QA / R\&D Quality person \(or team\) who performs Level 3 assurance; confirm they do not have line responsibility for the code being audited\. Record it in the project quality plan \(Doc 01 §5\.1\)\.

2. **Confirm the evidence set is collectable:** before the first milestone audit, verify that each of the ten work products in §3 is actually being produced and stored against a source revision \(Doc 01 §8\)\. If a work product has no owner, assign one before development starts\.

3. **Tailor frequency, never the checklist minimum:** set the §4 audit cadence to project risk; keep every §5\.1–§5\.9 checklist item as an audit question regardless of cadence\. Tailoring may reduce how often you audit a low\-risk module, not what you may accept\.

4. **Calibrate the checklist once:** run a pilot audit on one mature module, record false\-positive checklist items, and adjust wording with R\&D Quality\. Do not silently drop items — changes to the checklist are configuration changes approved by the quality owner\.

5. **Acceptance / exit for setup:** named independent QA; evidence owners assigned; baseline review at G0 completed; the audit\-reporting template \(§6\) agreed\.

## 2\. Three levels of quality assurance

|Level|Responsible party|Main activities|
|---|---|---|
|**Level 1 — Developer quality control**|Developer|Local checks, self\-review, test development, correction of findings|
|**Level 2 — Technical quality control**|Peer reviewer / technical lead|Formal code review, result review, defect verification, merge authorization|
|**Level 3 — Independent quality assurance**|Project QA / R\&D Quality|Compliance audits, evidence sampling, gate oversight, deviation audits, process\-effectiveness assessment|

**Supplier context:** for software suppliers, the OEM or customer quality organization may also conduct independent assessments, review the supplier's evidence and enforce contractual quality requirements\.

#### The three\-level control model

The model separates **who** assures **what**, by increasing independence:

- **Level 1 — Developer QC:** the author's own local checks before anything leaves their machine\. This is self\-checking and is necessary but never sufficient — it cannot be the only assurance on a mandatory control\.

- **Level 2 — Technical QC:** a peer or technical lead applies engineering judgment \(formal review, result review, defect verification, merge authorization at G2\)\. This is the *technical* gate; it is still inside the project team\.

- **Level 3 — Independent QA:** Project QA / R\&D Quality performs compliance audits, evidence sampling, gate oversight, deviation audits and process\-effectiveness assessment\. This is the *independent* layer and the owner of this document\.

The supplier context row means the independence chain can extend outside the company: the OEM/customer quality organization is effectively an external Level 3 for a supplier program\.

#### Why three levels \(not one "QA team"\)

- **Self\-checking is necessary but biased:** a developer cannot be relied on to objectively certify their own code \(the §4\.2 independence rule of Doc 09 in spirit\)\. Level 1 exists to catch the obvious early and cheaply; Level 2 exists to catch what the author cannot see; Level 3 exists to assure the system itself\.

- **Defense in depth matches ASPICE and ISO 26262:** layered verification and independent judgment are the ASPICE SUP\.1 / SWE\.6 expectation and the ISO 26262\-2 §5\.4\.5 independence concept — verification persons must have sufficient independence from the item they verify\.

- **Cost balance:** moving assurance later \(Level 3\) is far more expensive and less effective than catching defects at Level 1/2\. The three levels let the framework push defect prevention left while reserving independent oversight for the high\-value judgments\.

#### Assign and operate each level

1. **Level 1 — Developer:** mandate the pre\-commit checklist \(local build, lint/static analysis, relevant unit tests, self\-review per Doc 04\)\. *Evidence: local run logs / passing CI pre\-check\.Exit: changes only enter review after local checks pass\.* Owner: developer\.

2. **Level 2 — Technical:** every change passes formal review \(Doc 04\); merge is authorized by the technical lead only after findings are addressed and mandatory automated checks pass \(G2\)\. *Evidence: review record, approval, CI result\.Exit: merge permitted\.* Owner: peer reviewer / technical lead\.

3. **Level 3 — Independent QA:** sample evidence, run this document's §5 checklist, audit deviations and gate decisions, and produce the §6 report\. *Evidence: audit report with sampled evidence list\.Exit: conformant / conditional / nonconformant verdict\.* Owner: Project QA / R\&D Quality\.

4. **Supplier program:** add an external Level 3 row — OEM/customer quality reviews the supplier's evidence package and enforces the quality agreement\. *Evidence: supplier audit report, contractual notice\.* Owner: customer quality organization\.

5. **Exit criteria for the model to be credible:** no mandatory control is certified at Level 1 alone; every mandatory control has a Level 2 or Level 3 record; Level 3 reviewers are independent of the producing team\.

## 3\. Minimum controlled evidence set \(QA work products\)

|\#|Work product|Source|
|---|---|---|
|1|Software Code Quality Plan|Doc 01 \(project tailors\)|
|2|Approved Coding Standards and Rule Catalogue|Doc 02|
|3|Toolchain Qualification/Validation and Configuration Records|Doc 03|
|4|Static Analysis and Code Metrics Reports|Doc 03|
|5|Code Review Records and Checklists|Doc 04|
|6|Unit Test Specifications, Results and Coverage Reports|Doc 05|
|7|Robustness Verification Reports|Doc 06|
|8|SBOM and OSS Compliance Assessment|Doc 07|
|9|Defect, Deviation and Escalation Records|Doc 09|
|10|Software Quality Gate Report and Release Approval|Doc 11|

> **Process references:** Automotive SPICE **SUP\.1** is the appropriate reference for defining QA activities; **SWE\.3** and **SWE\.4** connect implementation and unit\-verification evidence to engineering objectives\.
> 
> 

#### The minimum evidence set

These ten work products are the **minimum set an independent auditor must be able to request and receive** for the audited scope\. Each row names the work product and the controlling subordinate document that produces it\. The set spans governance \(rows 1–3\), engineering execution evidence \(rows 4–8\), defect/deviation records \(row 9\) and the gate/release decision itself \(row 10\)\. "Minimum" means: a project may produce more, but may not be missing any of these for the audited scope\.

#### Why a fixed evidence set exists

- **Makes assurance repeatable:** without a defined list, an audit "looks at whatever is handy" and misses the same gaps every time\. The fixed set is the audit contract\.

- **Ties to ASPICE work products:** SUP\.1 expects assurance to reference the work products of the engineering processes; SWE\.3 \(software detailed design/construction\) and SWE\.4 \(software unit verification\) explicitly require implementation and unit\-verification evidence\. The ten rows are the auditable form of those outputs\.

- **Feeds traceability and release:** Doc 11's G4/G5 evidence package is a subset of these ten; a missing work product here is a missing release artifact there\.

- **Defends against "report shopping":** an auditor samples from this controlled set, not from self\-selected extracts\.

#### Use the evidence set in an audit

1. **Pre\-audit request:** send the work\-product list to the project QA/lead three working days before the audit, asking for each item *for the audited revision* \(with revision ID and configuration\)\.

2. **Row\-by\-row verification map \(what "present and adequate" means\):**

|\#|Work product|Present means|Adequate means \(sample\)|
|---|---|---|---|
|1|Quality plan|Approved, versioned, in repository|Tailored to ASIL/security/contract; thresholds and authorities projectized|
|2|Rule catalogue|Approved baseline pinned to version|Mandatory rules not independently disabled; deviations logged \(Doc 09\)|
|3|Toolchain records|Qualification/validation on file, versions pinned|Validation corpus re\-run on version change; ISO 26262 tool confidence addressed|
|4|Static\-analysis/metrics reports|Generated for the audited build|No missing/incomplete report; violations dispositioned; metrics within limits|
|5|Review records|Review records exist for changes|Seven\-dimension checklist used; approvals present; no self\-approval|
|6|Unit test specs/results/coverage|Executed and archived|Traceability unit↔requirement↔test; coverage criteria met or deviated|
|7|Robustness reports|Failure\-class tests executed|Critical findings linked to defects \+ regression tests|
|8|SBOM / OSS assessment|SBOM complete \(direct\+transitive\), verified|Licenses classified; vulnerabilities triaged/accepted before release|
|9|Defect/deviation/escalation records|Tracker contains all mandatory fields|Lifecycle followed; no owner self\-approved downgrade/deviation/waiver|
|10|Gate report / release approval|Gate report signed for the revision|Gate closure documented; open deviations current; tied to exact revision|

1. **Sampling rule:** for large projects, sample evidence statistically or risk\-based \(e\.g\., all high\-ASIL modules \+ a random sample of others\); record the sampling plan in the audit report\. Sampling depth is **\[TBD by organization\]** after pilot\.

2. **Record gaps:** any missing or inadequate work product becomes a finding \(§6\), not a "we'll get it later"\.

## 4\. Recommended QA audit frequency

Set frequency based on project risk and maturity:

|Point|Frequency / trigger|Focus|
|---|---|---|
|Project initiation|Baseline review|Quality plan, standards, toolchain, rules approved|
|Major development milestones|Compliance assessment|Evidence completeness, gate discipline|
|Periodic sampling|Ongoing|Code and verification evidence sampling|
|Pre\-delivery|Formal release\-readiness audit|Gate closure, deviations, release evidence|

> **Recurring finding rule:** any recurring audit finding triggers **root\-cause analysis and an improvement action** — it must not be repeatedly treated as an isolated project deviation\.
> 
> 

#### The four audit points and the recurring\-finding rule

The frequency table defines **when** assurance happens, against project risk and maturity:

- **Project initiation \(baseline review\):** at G0, confirm the quality plan, standards, toolchain and rules are approved *before* coding\.

- **Major development milestones \(compliance assessment\):** at integration/milestone points, check evidence completeness and gate discipline\.

- **Periodic sampling \(ongoing\):** continuous/risk\-based sampling of code and verification evidence between milestones\.

- **Pre\-delivery \(release\-readiness audit\):** the formal audit at G4/G5 confirming gate closure, deviations and release evidence\.

The recurring\-finding rule is a standing control: the *same* finding appearing in more than one audit is treated as a **systemic process defect**, not as a one\-off project deviation — it must trigger root\-cause analysis and an improvement action\.

#### Why frequency is risk\-based and recurring findings are escalated

- **Fixed blind cadence misses drift:** auditing on a calendar rather than on risk means you over\-audit mature areas and under\-audit unstable ones\. Risk/maturity\-based frequency focuses independent effort where it pays\.

- **Recurrence is the leading indicator of process failure:** a finding that recurs is not an isolated mistake — it is evidence that the process \(rule, checklist, training, tool\) does not prevent the defect\. Treating each recurrence as a fresh "project deviation" allows the same defect class to escape release repeatedly\. This is the direct counter to the escaped\-defect metric in Doc 10\.

- **Standards alignment:** continual improvement and correction of nonconformities are expected by ASPICE SUP\.1 and by the plan\-do\-check\-act loop of the whole framework \(README §3 continuous feedback loop\)\.

####  Plan the cadence and handle recurrence

1. **Set frequency by risk/maturity** \(record the decision in the quality plan\): higher frequency for new teams, high\-ASIL modules, new toolchain versions and unstable defect trends; lower for mature, stable, low\-risk areas\. The actual cadence values are **\[TBD by organization\]** after a pilot cycle\.

2. **Always keep the two fixed points:** the G0 baseline review and the pre\-delivery release\-readiness audit are non\-negotiable regardless of maturity\.

3. **Operationalize the recurring\-finding rule:**

    - Maintain a finding register with the checklist area, the finding and the first/last occurrence dates\.

    - When the *same or equivalent* finding recurs \(threshold count is **\[TBD by organization\]**, e\.g\., after 2 occurrences across consecutive audits\), QA raises a process\-effectiveness review\.

    - The review performs root\-cause analysis \(5\-Why on the *process*, not the person\), assigns a corrective/preventive action with owner and deadline, and closes it through the Doc 09 lifecycle where it is a P1/P2\.

    - Feed the root cause into Doc 08 audit topics, Doc 02 rules or training so it does not recur\.

4. **Exit criteria:** every recurring finding has a documented root cause, an improvement action, an owner and a deadline; the next audit verifies the action took effect \(recurrence stopped\), not merely that the action was issued\.

## 5\. Audit checklist

The checklist below is the ready\-to\-use instrument\. Each subsection is applied as audit questions; items are preserved as checkboxes\. The expansion blocks after each subsection explain what each checkbox means, why it matters and how to evidence it\.

### 5\.1 Governance and planning

* [ ] Project quality plan approved at G0, tailored to ASIL/security/contract requirements\.

* [ ] Applicable standards pinned \(versions, applicability, deviations\)\.

* [ ] Roles and decision authorities defined; no self\-approval paths\.

#### Governance and planning audit area

This area checks that the project was **set up under control**: an approved quality plan exists \(Doc 01\), the applicable standards are version\-pinned with known applicability and deviations, and the role/decision\-authority model is defined with no self\-approval paths\.

#### Why it is audited first

- Setup is the root of most downstream nonconformity: a plan approved late, an unpinned standard, or an undefined authority reappears as gate failures and self\-approval findings at every later audit\.

- It operationalizes Doc 01 §5\.2 \(named decision authorities\) and the Doc 09 §4\.2 independence rule\.

#### Evidence each checkbox

1. **Quality plan approved at G0:** evidence = approved, versioned quality plan in the repository, dated no later than the G0 decision; check it explicitly tailors for ASIL, cybersecurity exposure and contract clauses \(Doc 01 §2 tailoring rule\)\.

2. **Standards pinned:** evidence = a standards applicability list naming MISRA/C, AUTOSAR C\+\+14, ISO 26262, ISO/SAE 21434, SPDX/SPDX license policy with *adopted versions*; any deviation from a standard is logged per Doc 09\.

3. **Authorities defined / no self\-approval:** evidence = the projectized decision\-authority table \(Doc 01 §5\.2\) with named persons; sample two recent decisions \(e\.g\., a deviation, a merge\) and confirm approver ≠ owner\.

### 5\.2 Standards and rules

* [ ] Rule catalogue current, centrally versioned, mandatory rules not independently disabled\.

* [ ] Custom rules have ID, purpose, mapping, detection mechanism, test evidence, owner, change history\.

* [ ] Problem types \(config defect / false positive / deviation / real defect\) handled through distinct paths\.

#### Standards and rules audit area

This area verifies the coding\-standards system \(Doc 02\) is under configuration control: the rule catalogue is current and centrally versioned, mandatory rules cannot be switched off by an individual, custom rules are fully documented engineering artifacts, and the four finding categories \(config defect / false positive / deviation / real defect\) are routed through the distinct paths defined in Doc 09 §5\.1\.

#### Why it matters

- A catalogue that individuals disable locally becomes un\-auditable; a custom rule without detection evidence or owner is an unjustified rule; and mixing up the four problem types is the classic route to unjustified suppression of real findings\.

- It maps to ASPICE SUP\.1 assurance of defined standards and to the MISRA/AUTOSAR applicability expectations\.

#### Evidence each checkbox

1. **Catalogue current / centrally versioned:** evidence = a single controlled catalogue with version; confirm no developer\-local rule\-disabling overrides exist in the audited build configuration \(Doc 03\)\.

2. **Custom rule documentation:** for a sampled custom rule, verify it has all eight attributes — ID, purpose, standard mapping, detection mechanism, test/false\-positive evidence, owner, change history \(Doc 02 rule lifecycle\)\. A missing attribute = P2 finding\.

3. **Distinct problem\-type paths:** sample three recent findings and confirm they took the correct path \(Doc 09 §5\.1 decision sequence\): config defect → fix \& re\-run; false positive → justified suppression; deviation → approved exception; real defect → fix through the lifecycle\. Any finding "suppressed" without a documented path is a P1 finding\.

### 5\.3 Toolchain

* [ ] Tool, compiler, plugin, rule\-pack versions pinned; environment reproducible\.

* [ ] Tool validation corpus exists and is re\-run on version change\.

* [ ] ISO 26262 tool\-confidence requirements addressed where applicable\.

* [ ] Tool failures are gate failures, not silently skipped\.

#### Toolchain audit area

This area verifies the analysis/build toolchain \(Doc 03\) is reproducible and trustworthy: versions are pinned, a validation corpus proves the tool detects what it claims, ISO 26262 tool confidence \(TCL\) is addressed where functional safety applies, and a tool failure blocks the gate rather than being worked around\.

####  Why it matters

- Unpinned tools make every report non\-reproducible; a tool never re\-validated after an upgrade may silently stop detecting; and treating a failed analysis as "skip" destroys the gate's meaning\.

- ISO 26262\-8 §11 \(confidence in the use of software tools\) and ASPICE SUP\.1 both require justified tool confidence; this area is the audit of that justification\.

#### Evidence each checkbox

1. **Versions pinned / reproducible:** evidence = a pinned toolchain manifest \(tool, compiler, plugin, rule\-pack versions, environment\) tied to the audited build; confirm the same build can be reproduced\.

2. **Validation corpus:** evidence = a maintained corpus of known\-defect test inputs; confirm it was re\-run when any tool/rule\-pack version changed \(Doc 03\)\.

3. **Tool confidence:** where ASIL applies, evidence = a tool classification \(TCL\) and the argument/justification that the tool is safe to use for the claim made\.

4. **Failures = gate failures:** check the CI/gate configuration — a tool/analysis failure cannot be dismissed; sample one past failed build to confirm it blocked rather than skipped\. Silent skips = P1 finding\.

### 5\.4 Review

* [ ] Review scope and seven\-dimension checklist applied; high\-risk changes get escalated review\.

* [ ] Merge blocked until required approvals and automated checks pass; no self\-approval\.

* [ ] Review effectiveness measured by findings/escape/rework, not approval count\.

#### Review audit area

This area verifies code review \(Doc 04\) is performed to defined depth: the seven\-dimension checklist is applied, high\-risk changes get escalated review, merge is gated on approvals \+ automated checks with no self\-approval, and review performance is judged by outcomes \(findings, escaped defects, rework\) rather than by how many reviews were approved\.

#### Why it matters

- A review that approves without a checklist, or that counts "approvals" as success, gives false assurance; self\-approval defeats the purpose\. Measuring review by approval volume is a known anti\-pattern\.

- It maps to ASPICE SWE\.6 / peer\-review expectations and the independence principle\.

#### Evidence each checkbox

1. **Checklist applied / escalated review:** sample two reviews, confirm the seven\-dimension checklist was used and that high\-risk changes \(size, complexity, safety/security relevance\) received escalated/deeper review\.

2. **Merge gated / no self\-approval:** evidence = branch protection / merge policy requiring approvals \+ passing automated checks; sample merged changes to confirm approver ≠ author\. Self\-approval = P1 finding\.

3. **Effectiveness measured:** evidence = the review\-effectiveness KPI in Doc 10 \(findings by severity, escaped defects, rework\) — confirm the project reviews outcomes, not approval counts\.

### 5\.5 Unit testing

* [ ] C0/C1 \(and MC/DC where applicable\) criteria defined and frozen\.

* [ ] Traceability complete \(unit ↔ requirement ↔ test\)\.

* [ ] Coverage exclusions classified and justified; legacy code not silently excluded\.

#### Unit testing audit area

This area verifies unit verification \(Doc 05\) against defined structural coverage: C0/C1 criteria \(and MC/DC where the applicable standard/ASIL requires\) are frozen, traceability unit↔requirement↔test exists, and coverage exclusions are classified and justified rather than silently swept out of scope\.

#### Why it matters

- Unfrozen coverage criteria means the bar moves; missing traceability breaks the verification chain assessors check; silent legacy exclusions hide real untested code\.

- It maps to ASPICE SWE\.4 \(software unit verification\) and ISO 26262\-6 §9 structural coverage\.

#### Evidence each checkbox

1. **Criteria defined/frozen:** evidence = the frozen coverage target in the quality plan \(C0/C1; MC/DC where applicable by ASIL\) — the numeric threshold itself is **\[TBD by organization\]**; confirm it was set, not invented\.

2. **Traceability complete:** sample three units, confirm each links to its requirement and to its test cases\.

3. **Exclusions justified:** obtain the coverage\-exclusion list; confirm each exclusion is classified and justified and that legacy code is not bulk\-excluded without a documented risk decision\.

### 5\.6 Robustness

* [ ] Robustness is a distinct workstream; failure classes per Doc 06 defined and tested\.

* [ ] Critical robustness findings linked to defects \+ regression tests; root cause extended beyond the line\.

#### Robustness audit area

This area verifies robustness verification \(Doc 06\) is a planned workstream, not an afterthought: the defined failure classes are tested, and critical robustness findings are treated as defects with regression tests, with root\-cause analysis that extends beyond the single faulty line to the design/defense\-in\-depth gap\.

#### Why it matters

- Robustness \(behavior under abnormal/boundary input\) is where automotive field escapes originate; if it is not a distinct workstream it is not done\. Treating a robustness crash as a one\-line fix without regression tests guarantees recurrence\.

- It maps to ASPICE SWE\.5/SWE\.6 verification and to ISO 26262 robustness expectations\.

#### Evidence each checkbox

1. **Distinct workstream:** evidence = a robustness test plan covering the Doc 06 failure classes for the audited components\.

2. **Findings linked \+ root\-cause depth:** sample a critical robustness finding, confirm it is \(a\) logged as a defect in Doc 09, \(b\) has a regression test, and \(c\) the root cause addresses the defense\-in\-depth gap \(input validation, bounds handling\), not only the observed line\.

### 5\.7 OSS compliance

* [ ] SBOM complete \(direct \+ transitive\), submitted and verified\.

* [ ] Licenses classified per product policy; copyleft/incompatible findings dispositioned\.

* [ ] Vulnerabilities triaged and remediated or formally accepted before release\.

#### OSS compliance audit area

This area verifies open\-source compliance \(Doc 07\): the SBOM is complete \(direct \+ transitive dependencies\), licenses are classified against the product policy with copyleft/incompatible findings dispositioned, and known vulnerabilities are triaged and either remediated or formally accepted *before* release\.

#### Why it matters

- Incomplete SBOM or un\-dispositioned copyleft creates legal and supply\-chain exposure; an un\-triaged known vulnerability shipping in a vehicle is a recall\-level and ISO/SAE 21434 concern\.

- It maps to SPDX \(ISO/IEC 5962:2021\) as the SBOM format and to ISO/SAE 21434 vulnerability management\.

#### Evidence each checkbox

1. **SBOM complete/verified:** evidence = an SBOM \(SPDX format\) covering direct \+ transitive components, verified against the exact delivered revision\.

2. **Licenses classified:** evidence = a license classification table against the product policy; confirm copyleft/incompatible findings have a disposition \(approved, removed, or isolated\)\.

3. **Vulnerabilities triaged:** evidence = a vulnerability list with triage result \(remediated / formally accepted with justification\) closed before G4/G5; an open blocking vulnerability at release = release block per Doc 11\.

### 5\.8 Defects and deviations

* [ ] Escalation model and SLAs defined; decision authorities unambiguous\.

* [ ] No severity downgrade / deviation / waiver by the defect owner alone\.

* [ ] Recurring findings have root\-cause and improvement actions\.

#### Defects and deviations audit area

This area verifies the defect/escalation system \(Doc 09\) is in force: the P0–P3 escalation model and service\-level table are defined with named authorities, the independence rule holds \(no owner self\-approving downgrade/deviation/waiver\), and recurring findings carry root\-cause and improvement actions\.

#### Why it matters

- This is the direct audit of the Doc 09 controls; ambiguous SLAs or self\-approved exceptions are the root cause of unsafe releases\.

- It maps to ASPICE SUP\.1 assurance of issue handling and to the ISO 26262\-2 independence requirement\.

####  Evidence each checkbox

1. **Model/SLAs defined:** evidence = the projectized service\-level table \(Doc 09 §2\.1\) with response/containment times, named decision authority and notification channel per priority\. Times are **\[TBD by organization\]** but must exist\.

2. **Independence rule:** sample recent downgrades/deviations/waivers; confirm approver ≠ defect owner, justification exists, and approval predates effect\. One violation = P1 finding through Doc 09\.

3. **Recurring findings handled:** evidence = the finding register with root cause and improvement action per the §4 recurring\-finding rule\.

### 5\.9 Gates and release

* [ ] Gates G0–G5 enforced; exceptions documented with scope, risk, compensating measures, approver, review conditions\.

* [ ] Release evidence per Doc 11 complete and tied to the exact software revision\.

#### Gates and release audit area

This area verifies the gate model \(Doc 01 §6\.1, G0–G5\) is actually enforced and that release evidence \(Doc 11\) is complete and tied to the exact released revision\. Every gate exception must carry the full set of exception attributes: scope, rationale, residual risk, compensating measures, approving authority, review conditions/expiry\.

#### Why it matters

- Gates that are bypassed or "passed" without documented exceptions are not gates; release evidence not tied to the exact revision means the released binary is un\-auditable\.

- It maps to the framework's mandatory release criteria \(Doc 01 §6\.2 gate discipline\) and to the G5 release decision \(Doc 11\)\.

#### Evidence each checkbox

1. **Gates enforced / exceptions documented:** sample the gate history; confirm each gate has a pass/fail decision and that every exception has all six attributes\. A gate "passed" on an undocumented exception = P1 finding\.

2. **Release evidence tied to revision:** evidence = the Doc 11 evidence package for the released build, each item linked to the exact source revision and configuration \(Doc 01 §8\)\.

## 6\. Audit reporting

The audit outcome records:

|Item|Detail|
|---|---|
|Audit scope and date|Project, modules, processes audited|
|Evidence sampled|Reports/records reviewed \(with revision\)|
|Findings|Severity, area, evidence, required action, owner, due date|
|Nonconformities|Mandatory\-control breaches and gap to standard|
|Improvement actions|Root cause, corrective/preventive action, owner, deadline|
|Verdict|Conformant / conditionally conformant / nonconformant; next audit date|

> A **nonconformant** verdict on a mandatory control blocks progression to the next gate until corrective actions are verified \(per Doc 09 escalation\)\.
> 
> 

#### The audit report structure

The report is the **controlled work product** of an audit\. It records scope/date, the exact evidence sampled \(with revision\), findings \(severity, area, evidence, required action, owner, due date\), nonconformities \(mandatory\-control breaches and the gap to the standard\), improvement actions \(root cause, corrective/preventive action, owner, deadline\) and a verdict \(conformant / conditionally conformant / nonconformant\) with the next audit date\.

#### Why a structured report is mandatory

- An audit without a structured record is not evidence; assessors and customer/supplier audits \(VW Formel Q\) judge the *record*, not the meeting\.

- Distinguishing "findings" from "nonconformities" matters: a nonconformity is a breach of a *mandatory* control and carries gate\-blocking weight; ordinary findings are improvements\.

- The verdict drives the gate: a nonconformant mandatory\-control finding blocks progression until corrective actions are verified \(Doc 09 escalation\)\.

####  Produce and close the report

1. **Fill the six items** using the table; attach the sampled\-evidence list with revisions so the report is reconstructible\.

2. **Severity findings using P0–P3** \(Doc 01 §9 / Doc 09 §2\): a mandatory\-control breach = at least P1; a blocked\-gate issue = P0/P1 per consequence\.

3. **Assign nonconformities:** each breach of a mandatory control is logged as a nonconformity with the gap statement \("control X of Doc 02/03/… not met"\)\.

4. **Issue improvement actions:** root cause \+ corrective/preventive action \+ owner \+ deadline; recurring findings route through the §4 root\-cause rule\.

5. **Render the verdict and gate effect:**

    - **Conformant:** no open mandatory\-control breach; gate may progress\.

    - **Conditionally conformant:** non\-blocking gaps tracked with owners/deadlines\.

    - **Nonconformant:** a mandatory\-control breach exists → blocks progression to the next gate until corrective actions are verified \(per Doc 09 escalation\)\.

6. **Close\-out verification:** QA re\-checks that corrective actions actually closed the gap at the next audit \(or sooner for P0/P1\); the report's "next audit date" is set from risk/maturity per §4\.