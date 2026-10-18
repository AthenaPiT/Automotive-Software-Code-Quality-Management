---
sidebar_label: "Code Review"
sidebar_position: 3
title: "Code Review Guideline"
description: "Formal code review as a separate quality control: process, criteria and evidence."
---

## 1\. Purpose

Automated analysis cannot reliably identify every architectural, algorithmic, functional or maintainability problem\. Formal code review is therefore a **separate quality control** with its own process, criteria and evidence\.

#### Scope of code review as a control

This document defines **formal code review** — a documented, independent examination of newly developed or modified production source code against defined criteria, producing findings with severity, owner and closure evidence\. It is one of the two Engineering\-Assurance workstreams in Layer 2B \(peer reviews, independent verification\) alongside robustness assessment \(Doc 06\), and it is the control exercised at Quality Gate **G2 — Code review \(before merging\)**\. It is explicitly *not* a pull\-request "LGTM" button click, not a static\-analysis pass \(Doc 03\), and not the developer's own self\-check \(G1\)\. It covers in\-house code and, under controlled provenance rules, third\-party/generated code \(see §2\)\.

- **Automated tools have a ceiling:** static analysis \(Doc 03\) finds rule violations and many unsafe patterns, but it cannot judge whether the implementation *correctly realizes the requirement*, whether the design trade\-off is sound, or whether error handling is coherent across a module\. Automotive SPICE 4\.0 SWE\.4 \(software unit verification\) and SWE\.5 \(software integration verification\) expect verification that goes beyond tool execution; peer review is the human verification layer that catches design and logic defects\.

- **Early, cheap defect removal:** a defect found at G2 is fixed before integration; the same defect found at G4/G5 or by the customer costs an order of magnitude more to fix and risks release delay or an escaped defect \(Doc 10 metric\)\.

- **Independent judgment:** Doc 01 §5\.1 defines L2 \(Peer Reviewer / Technical Lead\) as an independent level of control; the control rule \(Doc 01 §5\.2 / Doc 09 §4\.2\) requires that a reviewer must not approve their own code\. This guideline operationalizes that independence at G2\.

- **Knowledge transfer and consistency:** review is the mechanism by which coding standards \(Doc 02\) are applied case\-by\-case and by which design decisions are shared — it supports the MISRA C/C\+\+ and AUTOSAR C\+\+14 "guideline adherence" expectation beyond what the tool enforces\.

#### Establish code review on a project

1. **Freeze the review baseline at G0:** record the review roles \(developer = author/submitter; reviewer = independent L2; technical lead = merge authorizer per Doc 01 §5\.2\), the review checklist \(§4 seven dimensions\), and the entry/exit criteria \(§3\) in the project quality plan\. Do not start development with "we'll review somehow\."

2. **Configure the tool chain:** a merge request / pull request system wired so that \(a\) CI pre\-checks \(build, static analysis, unit tests\) must be green before the review button is usable; \(b\) at least one independent reviewer approval is a hard merge condition; \(c\) the review record \(findings, severity, closure\) is retained and linked to the revision\.

3. **Calibrate reviewers:** run one calibration session using a sample change so reviewers apply the §4 dimensions and the finding severity model \(Doc 02 §7\.3\) consistently — inconsistent severity is the most common reason review data is useless for metrics\.

4. **Tailor, don't weaken:** per Doc 01 §2 tailoring rule, low\-risk modules may get lighter review \(e\.g\., a single reviewer, a focused checklist\), but the mandatory controls — independent reviewer, findings traced to closure, merge blocked at G2 — may never be removed\. Any relaxation goes through the deviation path \(Doc 09\)\.

5. **Acceptance / exit for setup:** roles named; checklist adopted; CI gate enforced; one dry\-run review completed and recorded; reviewers trained\.

## 2\. Review scope

Review all **newly developed or modified production source code** and associated changes to:

|Area|What is reviewed|
|---|---|
|Logic|Interfaces, algorithms, state transitions|
|Resource safety|Memory management, concurrency, error handling|
|Traceability|Requirements traceability, relevant design consistency|
|Tests|Tests, test doubles, test configurations, coverage exclusions|
|Build|Build scripts, compiler settings, static\-analysis configuration|
|Dependencies|Dependency declarations, generated code, third\-party integrations|

**Generated and imported third\-party code** may use different review methods \(e\.g\., provenance\-based assessment instead of line\-by\-line\), but must **not** become uncontrolled exclusions\. Their provenance, verification, ownership and applicable compliance obligations must be defined\.

#### The six review areas

The table defines the **object universe** of review\. "Newly developed or modified production source code" is the trigger — not every line in the repository is re\-reviewed on every change; the delta \(the change under review\) plus its interaction with touched interfaces is in scope\. The six areas break the delta down so a reviewer does not miss a category: *Logic* \(does the code do the right thing\), *Resource safety* \(does it not break the machine\), *Traceability* \(can it be linked back to requirements/design\), *Tests* \(is the verification itself adequate\), *Build* \(is the change reproducible\), and *Dependencies* \(what does it pull in\)\.

- **No single dimension is enough:** a change can be logically correct, pass all tools, and still be wrong because it breaks traceability \(ASPICE traceability expectation across SWE\.1–SWE\.6\), or because its own tests are weak, or because it silently changes compiler flags\. The six\-area model forces the reviewer to look at the whole change, not just the code diff\.

- **Tests and build are part of the product:** automotive deliverables include test code and build configuration; Doc 01 §2 puts build scripts and test code explicitly in scope\. Reviewing them prevents "the fix works but the build is no longer reproducible" escapes\.

- **Dependency scope is a security/compliance control:** a new dependency declaration is the entry point for OSS compliance \(Doc 07\) and supply\-chain risk \(ISO/SAE 21434, NIST SSDF\); reviewing it at G2 prevents un\-vetted components entering the codebase\.

#### Apply the six areas to a change

1. **Logic:** check interfaces \(pre/post conditions, parameter validity, return\-value semantics\), algorithm correctness vs\. the detailed design, and state transitions \(invalid/unexpected transitions\)\. *Exit:* every interface touched has a documented behavior; no state transition is left implicit\.

2. **Resource safety:** check memory allocation/deallocation pairing, concurrency \(shared\-state access, locking order\), and error\-handling paths \(every error branch releases resources — links to Doc 06 robustness criteria\)\. *Exit:* no resource leak or lock\-ordering issue on error paths\.

3. **Traceability:** verify the change is linked to a requirement/design element in the trace table \(Doc 05 §6 format\) and is consistent with the relevant design\. *Exit:* every functional delta traces to a requirement ID\.

4. **Tests:** review new/changed tests for adequacy \(positive, negative, boundary, error paths\), test doubles that hide behavior, and coverage exclusions \(justified per Doc 05 §3\.1\)\. *Exit:* tests reviewed, not merely present\.

5. **Build:** check build\-script changes, compiler warning/flag changes, static\-analysis configuration changes \(Doc 03\) — these affect reproducibility\. *Exit:* build changes explained and version\-controlled\.

6. **Dependencies:** check new/changed dependency declarations and generated code; route new OSS components through Doc 07 before they merge\. *Exit:* dependency provenance and license declared\.

#### Reviewing generated / third\-party code

Line\-by\-line review of generated code or imported third\-party code is neither feasible nor valuable\. Instead, apply a **provenance\-based assessment**:

|Question|Required evidence|
|---|---|
|Where did it come from?|Component origin, version, integrity \(hash/signature\) — Doc 07 provenance control|
|Was it verified already?|Existing test results, SBOM entry, prior assessment record|
|Who owns it going forward?|Named owner for defects, updates, security patches|
|What compliance obligations apply?|License classification \(Doc 07 §4\), attribution/copyleft handling|
|Is it re\-generable?|If generated: generator version and input stored so output is reproducible|

*Exit criterion:* a generated/third\-party block is never merged with "we don't need to review it" — it merges only with the provenance record above filed\. This is the explicit control against "uncontrolled exclusions\."

## 3\. Review process \(six steps\)

```
1 Review initiation → 2 Automated pre-checks → 3 Independent technical review
   → 4 Finding classification → 5 Correction & re-review → 6 Approval & traceability
```

|Step|Actions|Owner|
|---|---|---|
|**1\. Review initiation**|Developer creates a review request: change purpose, linked requirements, affected modules, risk classification|Developer|
|**2\. Automated pre\-checks**|Build, static analysis, applicable unit tests, basic policy checks run before formal approval|CI/CD \(auto\)|
|**3\. Independent technical review**|Reviewer examines functionality, design consistency, error handling, readability, security, test adequacy|Reviewer|
|**4\. Finding classification**|Each finding recorded: location, evidence, severity, owner, required resolution|Reviewer|
|**5\. Correction and re\-review**|Author corrects defects, adds regression tests where applicable, obtains reviewer confirmation|Developer \+ Reviewer|
|**6\. Approval and traceability**|Merge only after required approvals, checks and evidence are complete|Reviewer / Technical lead|

#### The six\-step lifecycle

The process is **mandatory and sequential** for every change that passes G1\. Step 1 \(initiation\) is the developer's request carrying mandatory metadata; step 2 is the automated gate \(build/SAST/unit tests\) that must pass before a human reviewer spends time; step 3 is the core independent examination; step 4 turns observations into classified, tracked findings; step 5 is the correction loop; step 6 is the authorized merge with evidence\. Owners are fixed per the table — the developer may *not* self\-approve at step 6 \(Doc 01 §5\.2: merge authorization is reviewer / technical lead\)\.

- **Automated pre\-checks first \(step 2\):** having the reviewer read a change that does not build or fails static analysis wastes the scarcest resource \(independent expert time\) and normalizes low\-quality submissions\. This is the CI discipline expected by NIST SSDF and ASPICE SWE\.6\.

- **Classification, not commentary \(step 4\):** unrecorded review comments evaporate; a finding without severity, owner and required resolution is not a control\. Classification feeds defect tracking \(Doc 09\) and the review\-effectiveness metrics \(§6\)\.

- **Merge only after evidence \(step 6\):** G2 decision is "Merge permitted" — the evidence that made it permitted \(approvals, green automated checks, closed findings\) is the record the G4/G5 board reads \(Doc 11\)\.

####  Execute each step

1. **Step 1 — Review initiation \(Developer\)\.** Open the review request with: change purpose \(one paragraph\), linked requirement/design IDs, affected modules/files, and self\-classified risk \(per §5\.3\)\. *Exit:* request carries all four metadata fields; without them the reviewer may return it un\-reviewed\.

2. **Step 2 — Automated pre\-checks \(CI/CD, auto\)\.** Run build, static analysis \(Doc 03 rule\-pack\), applicable unit tests \(Doc 05\), and policy checks \(dependency/OSS scan per Doc 07\)\. *Exit:* all green; any failure returns the change to the developer at G1 — no human review of a red build\.

3. **Step 3 — Independent technical review \(Reviewer\)\.** Walk the change against the §4 seven dimensions and the §2 six areas\. Read the surrounding code, not just the diff\. *Exit:* findings noted with file/line evidence\.

4. **Step 4 — Finding classification \(Reviewer\)\.** Record each finding: location, evidence, severity \(Critical/Major/Minor per Doc 02 §7\.3 problem types\), owner \(the author, unless reassigned\), and required resolution\. *Exit:* every observation is a tracked finding, not a chat comment\.

5. **Step 5 — Correction and re\-review \(Developer \+ Reviewer\)\.** Author fixes, adds a regression test where the defect is behavioral, and requests re\-review\. Reviewer verifies the fix and that no new issue was introduced\. *Exit:* Critical/Major findings closed and verified\.

6. **Step 6 — Approval and traceability \(Reviewer / Technical lead\)\.** Once approvals, automated checks and evidence are complete, the reviewer \(or technical lead for high\-risk changes per §5\.2\) authorizes the merge; the review record is linked to the merged revision\. *Exit:* merge permitted at G2; record archived against the exact revision \(Doc 01 §8\)\.

**Worked micro\-example \(illustrative\):** A developer modifies the CAN receive handler\. Step 1 request links it to REQ\-2201 and self\-classifies it high\-risk \(network code\)\. Step 2: build green, static analysis flags one un\-bounds\-checked index \(Doc 03\) — returned to developer, fixed, re\-run green\. Step 3: reviewer examines the handler and finds the error path leaks a buffer when the message is malformed\. Step 4: finding classified Major, owner = author\. Step 5: author adds the cleanup plus a negative test \(malformed frame\) and re\-requests; reviewer verifies\. Step 6: because the change touches safety\-relevant network code, two independent reviewers approve per §5\.2; merged; review record linked to the revision\. The Major finding feeds Doc 09 lifecycle and the robustness test feeds Doc 06\.

## 4\. Review criteria — seven dimensions

A formal checklist assesses these seven dimensions for every review\.

|Dimension|Key questions|
|---|---|
|**Requirements and design**|Does the implementation correctly realize the requirements and detailed design?|
|**Functional correctness**|Are algorithms, conditions, state transitions and return values correct?|
|**Coding standards**|Are mandatory rules followed; are deviations formally controlled?|
|**Robustness**|Are null values, boundary conditions, resource failures and abnormal inputs handled?|
|**Security**|Is input validated, data protected, and access and error handling appropriate?|
|**Maintainability**|Is the code understandable, modular, testable and appropriately documented?|
|**Verification**|Do tests cover relevant behavior, boundaries and failure paths? Is traceability maintained?|

#### The seven\-dimension checklist

These seven dimensions are the **formal checklist** applied to every review — they are not a suggested reading list\. Each dimension is a distinct lens: *requirements/design* \(correctness against intent\), *functional correctness* \(the code itself\), *coding standards* \(Doc 02 mandatory rules\), *robustness* \(abnormal conditions, links to Doc 06\), *security* \(validation/protection, links to ISO/SAE 21434 secure\-coding\), *maintainability* \(future cost\), and *verification* \(is the test adequate\)\. A review that only checks coding standards is incomplete\.

- **Completeness over gut feel:** without a fixed checklist, reviewers focus on what they personally find interesting — typically style and naming — and miss robustness/security/verification\. The seven dimensions are the established automotive verification expectation \(ISO 26262\-6 §9\-10 verification and ASPICE SWE\.4 unit verification expect adequacy against defined criteria, not subjective review\)\.

- **Standard alignment:** coding\-standards dimension operationalizes MISRA C/C\+\+ and AUTOSAR C\+\+14 adherence where the tool cannot judge; robustness and security dimensions connect review to Doc 06 and ISO/SAE 21434\.

- **Evidence for assessment:** an ASPICE assessor samples review records to verify they were performed against defined criteria; a checklist with sign\-off per dimension is that evidence\.

#### Use the checklist

1. **Pre\-fill the checklist:** in the review tool, create a per\-dimension sign\-off \(Pass / Concern raised\) so the reviewer must explicitly address each dimension rather than give a global "approve\."

2. **Per\-dimension focus prompts \(add to the tool\):**

|Dimension|Reviewer must confirm|
|---|---|
|Requirements and design|Change traces to REQ/design IDs; no undocumented behavior added|
|Functional correctness|Conditions/state transitions/return values match design; edge logic traced|
|Coding standards|No un\-controlled mandatory\-rule violations \(Doc 02\); any deviation raised via Doc 09|
|Robustness|Null, boundary, resource\-failure, abnormal\-input paths handled \(see Doc 06\)|
|Security|External input validated; sensitive data not exposed; error paths do not leak info \(ISO/SAE 21434\)|
|Maintainability|Naming, modularity, complexity within thresholds; comments explain *why*|
|Verification|New behavior has tests covering behavior/boundaries/failure paths; trace table updated|

1. **Sign\-off:** a dimension is "Pass" only when its prompts are answered; "Concern raised" becomes a tracked finding \(step 4\)\. *Exit:* all seven dimensions explicitly assessed; Critical/Major concerns closed before approval\.

## 5\. Risk\-based review depth

### 5\.1 When to apply stronger review

Apply stronger requirements to:

- Safety\-related \(ASIL\-classified\) or security\-sensitive modules;

- Memory\-management and concurrency code;

- Complex algorithms;

- Boot / update mechanisms;

- Changes with broad system impact\.

#### Stronger\-review trigger set

This is the **list of change/module classes that receive elevated review rigor** \(per §5\.2 measures\), rather than the standard single\-reviewer process\. It is the risk\-basis for depth: safety \(ASIL per ISO 26262\), security \(per ISO/SAE 21434\), memory/concurrency \(the classic defect\-density hotspots\), complex algorithms \(logic\-error density\), boot/update \(wrong = bricked vehicle\), and broad\-impact changes \(ripple effects\)\.

- **Rigour follows risk:** applying identical review depth to a one\-line UI string and the boot manager is both wasteful and ineffective — the one\-liner gets over\-reviewed while the boot path is under\-reviewed\. ISO 26262 requires verification methods be commensurate with ASIL; ISO/SAE 21434 ties rigor to attack surface\.

- **Where defects hurt most:** memory\-management and concurrency defects are the leading cause of field failures and safety/security incidents; boot/update defects are unrecoverable once shipped\. Elevated review here is cost\-effective defect prevention\.

#### Classify a change for depth

1. At step 1 \(initiation\), the developer self\-classifies against the five triggers; the reviewer/QA confirms\.

2. If **any** trigger matches → the change moves to the §5\.2 elevated measures; otherwise standard review applies\.

3. QA maintains a **module risk register** \(which modules are ASIL\-classified, security\-sensitive, boot/update\) so classification is data\-driven, not a guess at review time\. *Exit:* every change carries a documented risk class; elevated changes get the §5\.2 measures\.

### 5\.2 Escalated review measures for high\-risk changes

|Measure|When|Who|
|---|---|---|
|Two independent reviewers|High\-risk change|QA assigns|
|Formal technical review meeting|High\-risk, complex, or safety\-relevant|Technical lead chairs|
|Additional static\-analysis investigation|Deep data\-flow / security concern|QA / security engineer|
|Focused robustness testing|Memory / concurrency / fault handling|Test engineer|

#### Elevated measures

These four measures are the **concrete controls that define "stronger review\."** Two independent reviewers \(no single\-person approval\), a formal review meeting \(collaborative examination for complex/safety changes\), targeted static\-analysis investigation \(deep data\-flow/security beyond the standard rule\-pack run\), and focused robustness testing \(Doc 06 methods applied to the specific change\)\. They are additive — standard review still happens; these are layered on top\.

- **Two reviewers reduce individual miss\-rate:** human review has a known miss rate; two independent reviewers materially raise defect detection \(consistent with ISO 26262 independence expectations for safety\-relevant verification\)\.

- **Meeting for complexity:** complex algorithms and safety\-relevant changes benefit from shared examination; a meeting produces a collective decision and its record\.

- **Targeted tools for targeted risk:** deep data\-flow/security concerns are exactly where standard static\-analysis rules are weak; a focused investigation by QA/security is the right tool\.

#### Apply the measures

|Measure|Trigger condition|Execution|Evidence|
|---|---|---|---|
|Two independent reviewers|High\-risk change per §5\.1/§5\.3|QA assigns a second reviewer who did not author and is independent per Doc 01 §5\.2|Two approvals recorded|
|Formal technical review meeting|High\-risk, complex, or safety\-relevant|Technical lead chairs; author, reviewers, QA attend; findings logged in the review record|Meeting minutes \+ findings list|
|Additional static\-analysis investigation|Deep data\-flow/security concern|QA/security engineer runs targeted analyzer queries \(e\.g\., taint on external input\) beyond CI rule\-pack|Investigation report linked to review|
|Focused robustness testing|Memory/concurrency/fault handling|Test engineer adds Doc 06 negative/fault\-injection cases around the change|New robustness tests \+ results|

*Exit:* for a high\-risk change, the required measures per the risk register are all executed; missing a required measure blocks approval at step 6\.

### 5\.3 How to decide "high risk" \(practical\)

A change is high\-risk if **any** of the following is true:

- touches safety\-related or security\-critical functionality;

- modifies shared infrastructure, boot, or update paths;

- changes concurrency, memory management, or error\-handling patterns;

- exceeds a defined complexity/scale threshold \(e\.g\., \> **\[TBD by org\]** changed lines, \> **\[TBD\]** changed files\);

- requires a deviation to a mandatory rule\.

#### The high\-risk decision rule

This is the **operational, binary test**: "any of these five is true → high\-risk\." The first three are content\-based \(safety/security, infrastructure/boot/update, concurrency/memory/error\-handling patterns\); the fourth is a size/complexity trigger; the fifth is a governance trigger \(a deviation request itself signals elevated risk\)\. It intentionally uses **any** \(OR\), not "all," so that a change only needs one match to get elevated treatment\.


- **Objective boundary:** without a defined threshold, "high risk" becomes a debate at review time\. The fifth trigger \(deviation required\) is critical: any change asking to waive a mandatory rule is, by definition, a risk decision and must get elevated scrutiny — this connects review to the deviation process \(Doc 09\) and the independence rule\.

- **Size as a proxy:** very large changes are harder to review thoroughly and carry higher integration risk; a line/file threshold \(after pilot\) forces decomposition or elevated review\.

#### Apply and set the thresholds

1. **Apply the five tests at step 1** and record the matched reason \(e\.g\., "matches trigger 2: boot path"\)\.

2. **Set the numeric thresholds by pilot, not by guess:**

    - Propose initial line/file limits based on past review capacity\.

    - Pilot on representative changes: measure how many changes would be flagged, reviewer throughput, and defect escape rates\.

    - Freeze the numbers in the project quality plan as **\[TBD by organization\]** → concrete values; re\-baseline annually \(Doc 10 trend\)\.

3. **Deviation trigger:** if the change requires a deviation to a mandatory rule \(Doc 02\), it is automatically high\-risk regardless of size, and the deviation approval authority \(Doc 01 §5\.2\) is independent of the author\.

4. *Exit:* every change has a recorded risk class and reason; elevated changes route to §5\.2 measures\.

## 6\. Review effectiveness measurement

Review effectiveness is measured by **outcome**, not by the number of approved pull requests:

|Metric|Definition|Use|
|---|---|---|
|Findings per review effort|Findings per review session / per KLOC reviewed|Review thoroughness|
|High\-severity defects found|Count of Critical/Major findings in review|Review value|
|Defect escape rate|Defects found later / defects found in review \+ later|Process improvement|
|Rework|Re\-opened findings / re\-reviews per change|Review efficiency|

#### WThe four outcome metrics

These metrics judge **whether review actually finds defects**, not whether reviews happen\. *Findings per effort* measures thoroughness; *high\-severity defects found* measures value \(finding style nits is not value\); *defect escape rate* measures how many defects slipped past review to later stages \(integration/system/test/release\) — this is the link to the escaped\-defect concept in Doc 01 §3 and Doc 10; *rework* \(re\-opened findings, re\-reviews\) measures review efficiency and quality of the original finding\.

- **Activity ≠ effectiveness:** counting merged pull requests rewards rubber\-stamping; measuring escaped defects rewards actually finding issues\. This is the continual\-improvement feedback loop \(README §3: metrics → root causes → rule improvements\)\.

- **Assessment input:** ASPICE SUP\.1 and ISO 26262 expect verification process effectiveness to be monitored; these metrics are that evidence and feed Doc 10\.

- **Detecting rubber\-stamp review:** a review with zero findings on high\-risk code, or a very high rework rate, is a signal of ineffective review — not a sign of clean code\.

#### How\-to — Collect and use the metrics

1. **Source the data automatically:** the review tool records findings \(severity, location\), KLOC reviewed, re\-opened findings, and re\-reviews; defect tracking \(Doc 09\) records where each defect was first found \(review vs\. later\)\.

2. **Compute defect escape rate** per module/quarter: `defects found after review ÷ (defects found in review + defects found after)`\. A rising rate is an escalation trigger \(Doc 09 §4\.1 "increasing defect escape rate"\)\.

3. **Calibrate findings\-per\-effort:** an abnormally low finding rate on high\-risk code prompts a QA spot\-check of review quality rather than assuming clean code\.

4. **Thresholds for action are \[TBD by organization\]:** pilot the metrics for one cycle, set warning/escalation thresholds, freeze into Doc 10\. *Exit:* metrics reported per release; trend reviewed at G4; out\-of\-range trends trigger process\-effectiveness review\.

## 7\. Findings and approval rules

- **No finding is silently dropped** — every finding is classified \(Doc 02 §7\.3 problem types\) and traced to closure\.

- **Merge is blocked** until required approvals, automated checks and evidence are complete \(Gate G2\)\.

- **Approval authority** for merge is the reviewer / technical lead; a reviewer must not approve their own code\.

- **Escalation** of unresolved blocking findings follows Doc 09\.

#### The four approval rules

These are the **hard controls at the end of the review process\.** \(1\) Findings are never silently dropped — every observation is classified and closed; \(2\) merge is blocked at G2 until approvals \+ automated checks \+ evidence are complete; \(3\) merge authority is reviewer/technical lead and no self\-approval; \(4\) unresolved blocking findings escalate per Doc 09 rather than being negotiated away informally\.

- **Prevents the "comment and forget" failure:** unrecorded or unclosed findings are the most common reason review data does not exist at audit time; classification per Doc 02 §7\.3 and closure tracing make findings auditable\.

- **Gate discipline:** README §5 / Doc 01 §6\.1 — a failed gate blocks progression; G2's decision is "Merge permitted," which is conditional on exactly the evidence listed\.

- **Independence:** the no\-self\-approval rule is the Doc 01 §5\.2 / Doc 09 §4\.2 control applied to merge — the developer responsible for the code is not the merge authority\.

#### Enforce the rules

1. **No silent drop:** in the tool, every finding has a status \(open/resolved/deferred\) and a resolution; a review cannot be approved with open Critical/Major findings\. A finding the author disputes is escalated, not deleted\.

2. **Block merge in CI:** configure the merge condition so the build is literally blocked unless required approvals, green automated checks and closed Critical/Major findings are all present — enforcement beats manual discipline\.

3. **No self\-approval:** tool rule prevents the author from being counted as the approving reviewer; high\-risk changes require two independent approvals \(§5\.2\)\.

4. **Escalation path:** an unresolved blocking finding that the author and reviewer cannot resolve escalates per Doc 09 — classified P0–P3 \(Doc 01 §9 / Doc 09 §2\), routed to the named authority \(Doc 01 §5\.2\), and never decided by the defect owner alone \(Doc 09 §4\.2 independence rule\)\.

5. *Exit:* merged code has \(a\) independent approval, \(b\) green automated checks, \(c\) all Critical/Major findings closed with evidence, \(d\) any deviation approved per Doc 09\. The review record is archived against the exact merged revision\.