---
sidebar_label: "Framework"
sidebar_position: 1
title: "Automotive Embedded Software Code Quality Management Framework"
description: "The lifecycle-based software code quality management framework: four elements, roles, gates and controlled evidence."
---

## 1\. Purpose of this document set

This is the consolidated, lifecycle\-based **Software Code Quality Assurance Framework** for an automotive R\&D Quality Engineer\. It turns code quality from a loose collection of "static\-analysis reports and review comments" into a **controlled process** built on four elements:

1. **Measurable requirements** — every check maps to a defined rule, severity, target and acceptance criterion\.

2. **Reproducible verification activities** — toolchain, configuration and execution are version\-pinned and auditable\.

3. **Clear responsibilities** — each gate and work product has a named owner, reviewer and approver\.

4. **Mandatory release criteria** — a release is blocked until defined evidence is complete and authorized\.

The framework is grounded in **Automotive SPICE 4\.0** \(SWE\.3 / SWE\.4 / SWE\.5 / SWE\.6 / SUP\.1\), with **ISO 26262** obligations applied where functional\-safety applies, and it references **MISRA C/C\+\+**, **AUTOSAR C\+\+14**, **ISO/SAE 21434**, **SPDX \(ISO/IEC 5962:2021\)** and **NIST SSDF** as applicable baselines\.

#### Purpose and scope of the document set

This document set is the single controlled reference that converts code quality from an ad\-hoc reporting activity into a managed lifecycle process\. It defines *what* must be checked \(rules, gates, exit criteria\), *how* it is verified reproducibly \(pinned toolchain, configuration, evidence\), *who* is accountable \(named roles per gate and work product\), and *when* a release may proceed \(mandatory release criteria\)\. It applies organization\-wide to all in\-house and supplier\-developed automotive embedded software deliverables, and is anchored in the process and safety/security baselines named above\.

#### Why a controlled framework is required

- **From activity to process:** Automotive SPICE 4\.0 expects development and verification work products to be produced against defined plans, criteria and records \(SWE\.3 detailed design, SWE\.4 unit verification, SWE\.5 integration verification, SWE\.6 software verification, SUP\.1 quality assurance\)\. A loose collection of reports has no defined entry/exit, no owner and no traceability — it cannot be assessed\.

- **Safety and security obligations:** ISO 26262 requires that software verification for ASIL\-relevant items be planned, independent and evidenced; ISO/SAE 21434 requires that secure\-development and vulnerability\-handling activities be defined across the lifecycle\. Neither can be satisfied by "we ran the tool once\."

- **Supplier and customer expectations:** OEMs \(e\.g\., via VW Formel Q supplier audits\) and customers sample evidence, not effort; a controlled set with named gates and deviations is what survives an audit\.

- **Repeatability across projects:** without a shared set, every project reinvents its own rules, thresholds and exit criteria — producing incomparable results and undetected drift\.

#### Read and apply the document set

1. **Start at the controlling document:** read Doc 01 first — it fixes scope, the layer model, roles, the G0–G5 gate model, the standards baseline and evidence obligations\. Everything in Docs 02–11 is subordinate to it\.

2. **Projectize at G0:** use Doc 01 to approve the project quality plan; use Docs 02–07 to fix the rule catalogue, toolchain, review and test baselines; use Doc 09 to pre\-name escalation authorities and the deviation path\.

3. **Execute during development:** run Docs 03–06 as defined; route every finding through Doc 09; feed results into Doc 10\.

4. **Assess at gates:** use Doc 08 for independent conformance assessment and Doc 11 as the release checklist at G5\.

5. **Tailor, do not weaken:** rigor may be reduced per project \(ASIL, exposure, language\) but no mandatory control may be removed; any relaxation follows the deviation path \(Doc 09\)\.

6. **Exit criteria for "framework adopted":** a project quality plan exists; the gate model G0–G5 is named per project; the toolchain is pinned; the deviation and escalation authorities are named; and the first gate report is archived against a source revision\.

## 2\. Document hierarchy

```
┌───────────────────────────────────────────────────────────────┐
│ 01 Software Code Quality Management Procedure  (CONTROLLING)  │
│   Scope · Process flow · Roles · Gates (G0–G5) · Escalation   │
└───────────────┬───────────────────────────────────────────────┘
                │  governs and cross-references
        ┌───────┴──────────────────────────────────────────────┐
        │  Detailed requirements / checklists / config         │
        ▼                                                      ▼
  Engineering-assurance layer                      Assurance & release layer
  ┌──────────────────────────────┐        ┌──────────────────────────────────┐
  │ 02 Coding Standards & Rule   │        │ 08 Code Quality Assurance &      │
  │    Catalogue                 │        │    Audit Checklist               │
  │ 03 Static Analysis &         │        │ 09 Defect Escalation & Deviation │
  │    Toolchain Guideline       │        │    Procedure                     │
  │ 04 Code Review Guideline     │        │ 10 Quality Dashboard Spec        │
  │ 05 Unit Testing Guideline    │        │ 11 Release Quality Checklist     │
  │ 06 Robustness Verification   │        └──────────────────────────────────┘
  │    Guideline                 │
  │ 07 OSS Compliance Guideline  │
  └──────────────────────────────┘
```

#### Hierarchy meaning

The hierarchy has one **controlling** document \(Doc 01\) and eleven **subordinate** documents\. The controlling document declares scope, the mandatory process, roles, gates and evidence obligations\. Subordinate documents \(02–11\) supply the detailed requirements, checklists, rule catalogues, tool configurations and templates that operationalize the controls\. They are grouped into an engineering\-assurance layer \(02–07: how checks are designed and executed\) and an assurance \& release layer \(08–11: how independent assessment, escalation, metrics and release authorization are performed\)\.

#### Why a single controlling document

- **Authority clarity:** if every subordinate document could independently raise mandatory requirements, projects could not trace "who mandated this\." A single controlling document makes every requirement traceable to one approved process\.

- **Change control:** a change to scope, gates or roles is made in Doc 01; subordinate documents are updated to remain consistent\. Without this, documents drift and contradict each other — a classic audit finding\.

- **Independence of assurance:** Docs 08 and 09 sit in the assurance layer precisely so that the people who build the evidence \(02–07\) are not the ones who independently judge it \(08\) or decide release waivers \(11\)\.

#### Maintain the hierarchy

1. **Never create a new mandatory control outside Doc 01\.** A new mandatory rule is declared in Doc 01 or Doc 02 \(with Doc 01 §5\.2 approval\) and implemented by the relevant subordinate doc\.

2. **Cross\-reference, do not duplicate\.** When a subordinate doc needs a concept owned by another \(e\.g\., the deviation path\), it references Doc 09 rather than re\-defining it\.

3. **Change propagation:** any edit to Doc 01 triggers a review of Docs 02–11 for consistency; the change is recorded in each affected document's change history\.

4. **Onboarding:** a new quality engineer reads 01 → 02/03 → 09 → 08/11; the remaining execution docs \(04–07\) are read on demand for their activity\.

## 3\. Framework layers \(recap — detailed in Doc 01\)

|Layer|Contents|
|---|---|
|**Layer 1 — Quality Governance**|Policy · coding standards · quality targets · roles · exceptions · escalation|
|**Layer 2A — Automated Assurance**|Static analysis · code metrics · unit\-test execution \& coverage · security scanning · OSS/SBOM analysis · build checks|
|**Layer 2B — Engineering Assurance**|Peer reviews · defect analysis · code robustness assessment · test\-case reviews · risk assessment \& independent verification|
|**Layer 3 — Quality Gates \& Release Authorization**|Pass / Fail / Approved Deviation · release evidence · quality approval · supplier accountability|

**Continuous feedback loop:** metrics → defect root causes → escaped defects → rule improvements → process audits\.

#### Layer model

The framework is organized into four layers\. **Layer 1 \(Quality Governance\)** sets the policy, standards, targets, roles and exception/escalation rules\. **Layer 2A \(Automated Assurance\)** runs the reproducible tool\-based checks: static analysis, metrics, unit tests and coverage, security scanning, OSS/SBOM analysis and build checks\. **Layer 2B \(Engineering Assurance\)** performs the human and analytical activities tools cannot replace: peer reviews, defect analysis, robustness assessment, test\-case reviews, risk assessment and independent verification\. **Layer 3 \(Quality Gates \& Release Authorization\)** aggregates evidence into pass/fail/approved\-deviation decisions, release evidence, quality approval and supplier accountability\. The continuous feedback loop closes the process: metrics feed defect root\-cause analysis, escaped defects drive rule improvements, and process audits verify effectiveness\.

#### Why layers and a feedback loop

- **Separation of governance, execution and judgment:** Layer 1 decides what is required; Layers 2A/2B execute; Layer 3 authorizes\. Mixing these \(e\.g\., the same team that writes the code also unilaterally authorizes release\) is the root cause of escaped defects\.

- **Breadth of assurance:** automated checks \(2A\) catch known pattern defects cheaply and repeatedly; engineering assurance \(2B\) catches design, requirement and context defects tools miss\. Both are required — neither alone is sufficient \(ASPICE SWE\.4–SWE\.6 combine automated and manual verification\)\.

- **Continual improvement:** without the feedback loop, rule sets and thresholds become static even as the codebase, tooling and threat model change\. The loop is what makes Doc 10 metrics actionable rather than decorative\.

#### Apply the layers

1. **Map every activity to a layer** when planning the project: governance items → Layer 1 \(fixed at G0 in the quality plan\); automated runs → Layer 2A \(pinned in Doc 03\); reviews and robustness → Layer 2B \(Docs 04–07\); gate decisions → Layer 3 \(Docs 08/11\)\.

2. **Check coverage:** if a required control has no Layer 2A *and* no Layer 2B activity, it is only a policy statement with no verification — close the gap\.

3. **Operate the feedback loop monthly:** review Doc 10 metrics, identify the top root causes, decide whether a rule addition, test addition or audit\-topic change is warranted, and record the action\.

4. **Exit:** each layer's outputs are identifiable work products with owners; the loop has at least one documented improvement per review cycle\.

## 4\. The 12 controlled process areas

|\#|Process area|Primary objective|Mapped deliverable doc|
|---|---|---|---|
|1|Coding standards and static analysis|Prevent coding defects and unsafe patterns|02, 03|
|2|Code metrics and quality measurement|Quantify complexity, maintainability and trends|10|
|3|Toolchain management and rule customization|Ensure reliable, repeatable analysis|03|
|4|Code quality review|Detect defects tools cannot reliably find|04|
|5|Code quality assurance and audits|Independently verify process and product compliance|08|
|6|Unit testing and structural coverage|Verify units against requirements and design|05|
|7|Code robustness verification|Verify behavior under abnormal/boundary conditions|06|
|8|Open\-source software compliance|Control licensing, dependencies and related risks|07|
|9|Defect management and escalation|Ensure timely containment, resolution, prevention|09|
|10|Configuration and change management|Preserve traceability and reproducibility|01, 03|
|11|Software security and vulnerability control|Identify and manage security defects|03, 07|
|12|Release qualification and continual improvement|Prevent nonconforming code entering release|11|

#### The 12 process areas

The 12 process areas are the controlled scope of the framework\. Areas 1–8 directly cover coding standards, static analysis, metrics, toolchain, review, independent assurance, unit testing, robustness and OSS compliance\. Areas 9–12 close the common gaps: defect management and escalation, configuration/change management, software security and vulnerability control, and release qualification with continual improvement\. Each area has a primary deliverable document that defines its activities; some areas are split across two documents \(e\.g\., OSS compliance spans 03 and 07\)\.

#### Why 12 areas and not fewer

- **Gap closure:** areas 9–12 are the processes where automotive software quality most often fails in practice — defects caught too late, unreproducible builds, security findings un\-triaged, releases shipped without qualified evidence\. Naming them as controlled areas forces each to have an owner, activity and record\.

- **ASPICE/ISO mapping:** the areas collectively cover the development and verification processes \(SWE\.3–SWE\.6\), quality assurance \(SUP\.1\), configuration management \(SUP\.9 / related\), and the safety/security obligations of ISO 26262 and ISO/SAE 21434\.

- **Auditability:** an assessor or supplier auditor can sample each area's evidence; areas without a named deliverable are areas that cannot be demonstrated\.

#### Use the process\-area table

1. **During project scoping \(G0\):** for each of the 12 areas, record whether it is in scope for this project, who owns it, and which deliverable doc is authoritative\.

2. **During planning:** identify overlaps and dependencies \(e\.g\., area 11 security relies on area 1 static analysis *and* area 8 OSS SBOM\) and ensure evidence flows are defined\.

3. **During audit \(Doc 08\):** sample one or more work products per in\-scope area; report gaps as findings through Doc 09\.

4. **Exit:** all 12 areas have a named owner and an in/out\-of\-scope decision; out\-of\-scope areas are justified in the quality plan and may not silently drop a mandatory control\.

## 5\. Minimum release gates \(recap — detailed in Doc 01\)

|Gate|Timing|Decision|
|---|---|---|
|G0 — Project setup|Before development|Development baseline approved|
|G1 — Developer check|Before submitting changes|Ready for formal review|
|G2 — Code review|Before merging|Merge permitted|
|G3 — CI verification|Integration / continuous build|Integration eligible|
|G4 — Software quality assessment|Milestone / release candidate|Release\-candidate eligible|
|G5 — Final release approval|Before delivery|Release authorized|

A failed gate blocks progression **unless** a formally permitted exception is approved\. Every exception must identify affected scope, rationale, residual risk, compensating measures, approving authority and review conditions\.

#### Gate model G0–G5

The gate model is the framework's decision backbone: six points in the lifecycle where progression is conditional on completed checks and an authorized decision\. **G0** approves the development baseline \(quality plan, standards, toolchain, rules, metrics, risk\-based targets\) before coding starts\. **G1** is the developer's self\-check before submitting changes \(build, lint, self\-review, relevant unit tests\)\. **G2** is the independent code review before merging\. **G3** is CI verification on integration\. **G4** is the software quality assessment at milestone/release\-candidate\. **G5** is final release approval before delivery\. A failed gate blocks progression; the only lawful way around a block is a formally permitted exception \(deviation / waiver per Doc 01 §5\.2 and Doc 09\), and every exception must state scope, rationale, residual risk, compensating measures, approving authority and review conditions\.

#### Why gates are mandatory

- **Early and cheap feedback:** G1–G3 catch defects close to their origin, where rework is cheapest; G4–G5 ensure the whole release package is qualified\. This is the ASPICE SWE\.6 verification feedback loop made operational\.

- **Release integrity:** "release authorized" must be a recorded decision by an accountable authority, not an implicit consequence of "all tests passed\." Without gates, releases happen by default and waivers become invisible\.

- **Exception discipline:** making exceptions visible, scoped and time\-bounded is the control that prevents the framework from decaying into "we always waive this\."

#### Operate the gates

1. **Pre\-name gate authorities at G0:** for each gate, name the owner \(prepares evidence\) and approver \(decides pass/fail\) per Doc 01 §5\.2; record in the project quality plan\.

2. **Define gate evidence:** list the work products required at each gate \(Doc 11 release checklist is the G5 template\); archive each against the exact source revision\.

3. **Run the gate decision:** pass = all mandatory evidence complete; fail = block progression; exception = approved deviation/waiver with the six required elements\.

4. **Never self\-approve:** the gate owner cannot approve their own deliverable \(Doc 01 §6\.2 rule 4; Doc 09 §4\.2 independence rule\)\.

5. **Exit:** each gate has a recorded decision, named approver, evidence package and archive link\.

## 6\. How to use this document set

1. **A new project starts at G0\.** The project team uses Doc 01 to approve the quality plan and Doc 02–07 to fix the standards, rule catalogue, toolchain, review and test baselines\.

2. **During development**, Docs 03–06 are executed as defined; evidence flows into the gate reports in Doc 08/11\.

3. **Defects and deviations** are handled through Doc 09; dashboards and KPIs are managed via Doc 10\.

4. **Every release** is assessed against Doc 11 before authorization at G5\.

5. **Organizations and suppliers** assess conformance to Doc 08; the dashboard \(Doc 10\) drives continual improvement\.

#### Usage pattern

The five\-step usage pattern is the intended lifecycle path: \(1\) initialize at G0 with the quality plan and baselines; \(2\) execute automated and engineering assurance during development, feeding evidence to gate reports; \(3\) route every defect and deviation through the controlled lifecycle in Doc 09 and visualize via Doc 10; \(4\) assess every release against Doc 11 before G5; \(5\) use Doc 08 for independent conformance assessment \(internal or supplier\) and let Doc 10 metrics drive continual improvement\.

#### Why a fixed usage sequence

- **Prevents reverse use:** starting at G5 \(auditing an existing release\) or skipping G0 \(coding before the plan is approved\) produces the exact failures the framework exists to prevent\.

- **Consistent evidence chain:** the sequence ensures that each gate's evidence was produced by the activities in the preceding steps, rather than reconstructed after the fact\.

- **Supplier alignment:** suppliers are expected to demonstrate the same sequence; a customer audit \(Doc 08\) checks that the sequence was followed, not just that final artifacts exist\.

#### Operationalize the five steps

1. **Step 1 \(G0\):** hold a kickoff; approve the quality plan \(Doc 01\), rule catalogue \(Doc 02\), toolchain config \(Doc 03\), review procedure \(Doc 04\), unit\-test baseline \(Doc 05\), robustness scope \(Doc 06\), OSS policy \(Doc 07\); pre\-name escalation/deviation authorities \(Doc 09\)\.

2. **Step 2 \(development\):** developer local checks \(G1\) → code review \(G2\) → CI \(G3\); archive each report\.

3. **Step 3 \(defects/deviations\):** every finding gets a unique ID, lifecycle record \(Doc 09 §3\), and is reflected in Doc 10\.

4. **Step 4 \(release\):** run Doc 11 checklist; resolve or formally disposition all open items; obtain G5 signature\.

5. **Step 5 \(assurance\):** independent assessment per Doc 08; review Doc 10 trends; schedule corrective actions\.

6. **Exit:** the project can show a G0 approval, gate reports for G1–G4, a G5 signature, defect/deviation records, and at least one improvement action from the latest trend review\.

## 7\. Version control \& document set metadata

|Field|Value|
|---|---|
|Document set version|1\.0|
|Status|Draft for organizational review|
|Owner|R\&D Quality Engineering|
|Approving authority|Quality Management / Release Management|
|Review cycle|Annually or upon standard/process change|
|Change record|See `## 8. Change history` in each document|

> All company\-specific numeric values \(coverage thresholds, complexity limits, SLA times, approval roles\) are marked **\[TBD by organization\]** throughout\. They must be piloted against representative projects, evaluated for false positives and engineering impact, then frozen into the project quality plan — they are not derived from MISRA, ISO 26262 or Automotive SPICE\.
> 
> 

#### Metadata and the \[TBD by organization\] rule

The metadata table records the set's version, status, owner, approving authority, review cycle and where change records live\. The \[TBD by organization\] convention is a deliberate scoping decision: the framework defines *which* parameters must exist \(coverage thresholds, complexity limits, SLA times, approval\-role names\) but does **not** invent their numeric values, because those values depend on the organization's toolchain, false\-positive profile, project mix and risk appetite\. The framework does, however, define the *process* by which those values are set: pilot on representative projects → evaluate false positives and engineering impact → freeze into the project quality plan\.

#### Why values are not pre\-set

- **Standards do not mandate specific thresholds:** MISRA defines rule classes, not a cyclomatic\-complexity cutoff; ISO 26262 demands coverage objectives by ASIL but not a single percentage; ASPICE demands a defined process, not a numeric SLA\. Inventing numbers would misattribute them to the standards\.

- **False\-positive calibration is project\-specific:** a rule that produces too many false positives on one codebase will be silently disabled; freezing the wrong number therefore undermines enforcement\.

- **Audit defensibility:** an assessor accepts a threshold that was set, piloted and frozen through a defined process; they reject a threshold that appears from nowhere\.

#### Set and govern \[TBD by organization\] values

1. **Inventory required parameters:** from Doc 01 \(gates, authorities\), Doc 02 \(severity release policy thresholds\), Doc 03 \(complexity/metrics limits, recall/precision acceptance\), Doc 05 \(coverage targets by ASIL\), Doc 09 \(response/containment times\)\.

2. **Pilot:** apply candidate values on one or two representative projects for one release cycle; record false\-positive rate, engineering effort and any escapes\.

3. **Evaluate:** compare candidate values against the pilot data; adjust thresholds to balance defect detection against alert fatigue\.

4. **Freeze:** record each value in the project quality plan with its basis, pilot evidence and date.

5. **Govern:** treat each value as a configuration item — any change is impact\-assessed, approved per Doc 01 §5\.2, versioned and re\-piloted if material\.

6. **Exit:** every \[TBD by organization\] placeholder has either a concrete value with pilot evidence or a scheduled date by which it will be set\.