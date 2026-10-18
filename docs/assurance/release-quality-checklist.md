---
sidebar_label: "Release Quality Checklist"
sidebar_position: 3
title: "Software Release Quality Checklist"
description: "Subordinate checklist for software release quality gates."
---

# Software Release Quality Checklist

> **Document type:** Subordinate checklist
> **Document set:** 11 of 11
> **Controlled by:** Doc 01 \(Software Code Quality Management Procedure\)
> **Purpose:** Consolidate all quality activity results into objective, evidence\-backed release decisions — instead of relying on a single score or a single static\-analysis report\.


---

## 1\. Purpose

Release approval consolidates results from **all** quality activities\. This checklist is the tool used at gates G4 and G5 to confirm that nonconforming code cannot enter a release\.

#### What — Purpose of the release checklist

This checklist is the **controlled instrument for the G4 and G5 release decisions**\. It consolidates the results of *all* quality activities \(static analysis, review, unit testing, robustness, OSS, defects/deviations\) into one objective, evidence\-backed release decision\. It is explicitly *not* based on a single quality score or a single static\-analysis report — every required evidence item must independently be present and acceptable\.

#### Why — Why consolidation, not a single score

- **A single score hides failures:** one composite number can be "green" while a blocking OSS finding or an expired deviation is buried in the detail\. Requiring each evidence item independently prevents averaging away a critical gap\.

- **Nonconforming code must not enter release:** this is the framework's final gate \(Doc 01 §6\.1 G5 — Release authorized decision; Doc 01 §6\.2 gate discipline\)\. The checklist operationalizes "blocked until evidence is complete and authorized"\.

- **Standards alignment:** it renders the ASPICE SWE\.6 \(software verification\) and SUP\.1 assurance outputs into a release decision, and the ISO 26262 requirement that release be based on verified, traceable evidence\.

#### How\-to — Use the checklist at G4/G5

1. **Pre\-stage at G4 \(release candidate\):** the QA owner assembles the §2 evidence package for the release candidate and runs the §3 checklist; G4 decides release\-candidate eligibility \(Doc 01 §6\.1\)\.

2. **Decide at G5 \(final release\):** on the exact revision to be delivered, re\-run the §3 checklist against the *released* revision; G5 decides release authorization\.

3. **Independent reading:** the release and quality owners \(Doc 01 §5\.2\) sign off; the developer/defect owner cannot self\-authorize \(Doc 09 §4\.2 independence rule\)\.

4. **Acceptance / exit:** every §3 checkbox checked against the exact revision; outcome recorded per §4; evidence archived against the released revision\.

## 2\. Release evidence — minimum required set

|\#|Evidence|Source doc|Gate|
|---|---|---|---|
|1|Successful build and approved toolchain identity|Doc 03|G3/G5|
|2|Static\-analysis compliance and deviation disposition|Doc 03|G3/G5|
|3|Completed review and approval records|Doc 04|G2/G5|
|4|Unit\-test and applicable coverage results|Doc 05|G3/G5|
|5|Robustness and regression test results|Doc 06|G4|
|6|OSS/SBOM compliance disposition|Doc 07|G4|
|7|No unresolved release\-blocking defects|Doc 09|G4/G5|
|8|Final quality gate report signed/authorized by designated release and quality owners|Doc 08/11|G5|

#### What — Minimum release evidence set

These eight evidence items are the **minimum package** required for a release decision\. Each names the evidence, the controlling source document, and the gate\(s\) at which it is required: build/toolchain identity \(Doc 03, G3/G5\), static\-analysis compliance \+ deviation disposition \(Doc 03, G3/G5\), review/approval records \(Doc 04, G2/G5\), unit\-test \+ coverage results \(Doc 05, G3/G5\), robustness \+ regression \(Doc 06, G4\), OSS/SBOM disposition \(Doc 07, G4\), no unresolved release\-blocking defects \(Doc 09, G4/G5\), and the signed final gate report by designated release and quality owners \(Doc 08/11, G5\)\.

#### Why — Why this exact eight

- **Each row closes a known escape path:** a non\-reproducible build \(1\), un\-dispositioned violations/deviations \(2\), skipped review \(3\), unverified unit code \(4\), untested robustness \(5\), undislosed OSS exposure \(6\), open blocking defects \(7\), or an unsigned decision \(8\) are the eight ways nonconforming code historically enters a vehicle release\.

- **Gate phasing matches the lifecycle:** items required earlier \(G2/G3\) feed later gates; G4 adds robustness/OSS that only makes sense on a release candidate; G5 requires the final signed authorization\.

- **Traceability coupling:** row 7 consumes the Doc 09 defect/deviation records; row 8 is the gate report itself \(Doc 08 assurance\)\. The dashboard \(Doc 10\) is the live view of rows 2–7\.

#### How\-to — Assemble and verify the evidence package

1. **Collect against the exact revision:** for the released build, gather each row's evidence *for that source revision and configuration* \(Doc 01 §8 — every report tied to source revision, configuration, timestamp, owner\)\.

2. **Row\-by\-row acceptance map:**

|\#|Evidence|Acceptance criteria \(how QA checks it at G5\)|
|---|---|---|
|1|Build \+ toolchain identity|Build succeeded in the approved, reproducible environment; tool/compiler/plugin/rule\-pack versions pinned and match the qualified manifest|
|2|Static\-analysis compliance \+ deviations|No incomplete/missing report; no Critical findings; no unapproved mandatory violations; all deviations documented and current|
|3|Review records|All changes passed formal review \(or approved risk\-based treatment for generated/third\-party code\); required approvals present; no self\-approvals|
|4|Unit\-test \+ coverage|Unit tests passed; frozen C0/C1 \(MC/DC where applicable\) coverage met or deviated; requirements\-to\-test traceability complete|
|5|Robustness \+ regression|Robustness and regression results passed; exclusions classified and justified \(Doc 06\)|
|6|OSS/SBOM disposition|SBOM complete and verified against the delivered revision; no prohibited/high\-risk license or vulnerability without disposition|
|7|No blocking defects|No unresolved release\-blocking defects \(Doc 09\); deviation/waiver register reviewed, none expired/out\-of\-scope|
|8|Signed gate report|Final quality gate report signed/authorized by designated release and quality owners \(Doc 01 §5\.2\)|

1. **Gap = block:** any missing or failed evidence item is a release\-blocker unless covered by a formally approved exception \(§4 note\)\.

2. **Exit:** all eight items present, acceptable, and tied to the released revision\.

## 3\. Release decision checklist \(G5\)

The checklist below is applied at G5 against the exact released revision\. Items are preserved as checkboxes; the expansion blocks after each subsection explain what each item means, why it gates release, and how to evidence it\.

### 3\.1 Build and toolchain

* [ ] Build succeeded in the approved, reproducible environment\.

* [ ] Tool, compiler, plugin and rule\-pack versions identified and pinned\.

#### What — Build and toolchain check

Confirms the released binary came from a reproducible build in the approved environment, with all toolchain components version\-pinned \(Doc 03\)\.

#### Why — Why it gates release

A build that cannot be reproduced, or whose tool versions are unknown, means the released binary is not the one that was analyzed and tested — every other evidence item refers to the wrong artifact\.

#### How\-to — Evidence

Compare the released build's toolchain manifest against the qualified/pinned versions; confirm the build was produced in the approved environment\. A mismatch = blocker\.

### 3\.2 Static analysis

* [ ] Analysis completed successfully \(no incomplete/missing report\)\.

* [ ] No unresolved Critical findings; no unapproved mandatory\-rule violations\.

* [ ] All deviations documented \(justification, risk, scope, approval\) and current\.

#### What — Static\-analysis check

Confirms static analysis ran to completion on the released build, no Critical findings or unapproved mandatory violations remain, and every deviation is documented \(justification, risk, scope, approval\) and current \(Doc 03, Doc 09\)\.

#### Why — Why it gates release

An incomplete report means unknown code was never analyzed; an unapproved mandatory violation is nonconforming code; an expired or undocumented deviation is an unjustified exception\.

#### How\-to — Evidence

Obtain the Doc 03 report for the released revision; cross\-check the deviation list against the Doc 09 deviation register \(each with all eight fields, current — not expired\)\. Any expired/out\-of\-scope deviation = blocker until re\-approved\.

### 3\.3 Review

* [ ] All changes passed formal review \(or approved risk\-based treatment for generated/third\-party code\)\.

* [ ] Required approvals present; no self\-approvals\.

#### What — Review check

Confirms all changes passed formal review \(Doc 04\), with an approved risk\-based treatment where generated/third\-party code is exempted; required approvals are present and no self\-approvals\.

#### Why — Why it gates release

Un\-reviewed changes or self\-approvals bypass the technical quality gate \(G2\); generated/third\-party code must have a documented risk decision, not an unspoken exemption\.

#### How\-to — Evidence

Sample the review records for changes in the release; confirm approvals present and approver ≠ author \(Doc 09 §4\.2\)\. Confirm the risk\-based treatment for generated/third\-party code is approved\.

### 3\.4 Testing

* [ ] Unit tests passed; coverage criteria met or deviations approved\.

* [ ] Requirements\-to\-test traceability complete\.

* [ ] Robustness and regression results passed; exclusions classified\.

#### What — Testing check

Confirms unit tests passed against frozen coverage criteria \(or approved deviations\), requirements\-to\-test traceability is complete, and robustness \+ regression results passed with classified exclusions \(Doc 05, Doc 06\)\.

#### Why — Why it gates release

Uncovered or untraced code is unverified; failed robustness/regression means known defects are shipping\. Coverage criteria themselves are frozen per the quality plan\.

#### How\-to — Evidence

Pull coverage \+ pass results for the released build; verify traceability unit↔requirement↔test; confirm exclusions are classified/justified\. A coverage gap without an approved deviation = blocker\.

### 3\.5 OSS / security

* [ ] SBOM complete and verified against the delivered revision\.

* [ ] No prohibited/high\-risk license or vulnerability without disposition\.

* [ ] Security findings triaged and resolved per policy\.

#### What — OSS/security check

Confirms the SBOM is complete and verified against the delivered revision, no prohibited/high\-risk license or vulnerability is un\-dispositioned, and security findings are triaged and resolved per policy \(Doc 07, ISO/SAE 21434\)\.

#### Why — Why it gates release

Undisclosed copyleft license or un\-triaged known vulnerability in a vehicle release is a legal/supply\-chain and cybersecurity exposure that cannot be waived silently\.

#### How\-to — Evidence

Verify the SPDX SBOM against the delivered revision; confirm license classification and vulnerability triage records; any open blocking finding = blocker or formally accepted per Doc 09\.

### 3\.6 Defects and deviations

* [ ] No unresolved release\-blocking defects\.

* [ ] Deviation/waiver register reviewed; none expired or out\-of\-scope\.

#### What — Defects and deviations check

Confirms no unresolved release\-blocking defects remain \(Doc 09\) and the deviation/waiver register has been reviewed — no deviation or waiver is expired or out\-of\-scope\.

#### Why — Why it gates release

An open blocking defect or an expired/wrongly\-scoped exception means residual unmanaged risk is shipping; the release board must see the true residual\-risk state\.

#### How\-to — Evidence

Read the Doc 09 defect list and deviation/waiver register; confirm each blocking defect closed \(with verification evidence per lifecycle step 6–7\) and each deviation current \(within scope, unexpired\)\. One expired deviation = blocker until re\-approved\.

### 3\.7 Evidence and authorization

* [ ] All evidence tied to the exact software revision being released\.

* [ ] Gate report signed/authorized by designated release and quality owners\.

#### What — Evidence and authorization check

Confirms every evidence item is tied to the exact software revision being released, and the gate report is signed/authorized by the designated release and quality owners \(Doc 01 §5\.2\)\.

#### Why — Why it gates release

Evidence not tied to the exact revision refers to the wrong build; an unsigned gate report has no authority and cannot support release\. The release waiver/authorization cannot be made by the developer/defect owner \(Doc 09 §4\.2\)\.

#### How\-to — Evidence

Verify each evidence artifact's revision matches the released build; confirm the gate report carries the named release and quality owners' authorization \(not the developer\)\. Missing authorization = blocker\.

## 4\. Decision outcomes

|Outcome|Meaning|
|---|---|
|**Release authorized**|All criteria met; approval recorded|
|**Conditional release**|Blocking criteria met; non\-blocking items tracked with owners/deadlines|
|**Release blocked**|One or more blocking criteria not met; return to engineering|

> A failed gate blocks progression unless a formally permitted exception is approved\. Any exception must identify affected scope, rationale, residual risk, compensating measures, approving authority and review conditions\.
> 
> 

#### What — The three decision outcomes

The release board renders exactly one of three outcomes: **Release authorized** \(all criteria met, approval recorded\), **Conditional release** \(all *blocking* criteria met; non\-blocking items tracked with owners/deadlines\), or **Release blocked** \(one or more blocking criteria unmet; return to engineering\)\. The blockquote restates the framework's exception rule: a failed gate blocks progression unless a formally permitted exception is approved, and every exception must carry scope, rationale, residual risk, compensating measures, approving authority and review conditions\.

#### Why — Why three outcomes, with exceptions formalized

- **Authorized vs conditional vs blocked** gives a decision a clear meaning and a recordable state; "sort of OK" is not a decision\.

- **Conditional release** lets a ship\-ready release proceed while small, non\-blocking gaps are tracked — but it must not be used to smuggle a blocking gap through\.

- **Exceptions formalized** is the Doc 09 deviation path applied at the gate: no undocumented "we'll fix it later"\. The six exception attributes are the same gate\-discipline attributes as Doc 01 §6\.2\.

#### How\-to — Render and record the outcome

1. **Decide by blocking criteria:** if any §3 blocking item fails → **Release blocked**; return to engineering and record the gap\.

2. **Conditional release** only when all blocking criteria pass and only non\-blocking items remain — log each with an owner and deadline, and track them to closure \(Doc 09\)\.

3. **Release authorized** when all criteria met; record the approval, the released revision and the authorizing owners\.

4. **Exception path:** if a gate must proceed despite a gap, approve a formal exception carrying all six attributes \(scope, rationale, residual risk, compensating measures, approving authority, review conditions/expiry\) via the Doc 09 deviation lifecycle — never an oral or undocumented exception\.

5. **Exit:** the outcome, the released revision, the authorizing owners and any exception record are archived together\.

## 5\. Continual improvement

Review the recurring root causes of defects and use the evidence to improve:

- coding rules \(Doc 02\),

- test design \(Docs 05/06\),

- review checklists \(Doc 04\),

- training,

- supplier controls\.

Track whether corrective actions actually **reduce recurrence** — not just whether they were issued\.

#### What — Continual improvement loop

After release, the recurring root causes of defects are fed back into five levers: coding rules \(Doc 02\), test design \(Docs 05/06\), review checklists \(Doc 04\), training, and supplier controls\. The success measure is whether recurrence actually *decreases*, not whether a corrective action was merely issued\.

#### Why — Why improvement is part of release governance

- A release process that never feeds lessons back repeats the same escapes; this is the framework's continuous feedback loop \(README §3: metrics → root causes → escaped defects → rule improvements → audits\)\.

- Distinguishing "action issued" from "recurrence reduced" prevents the paper\-improvement anti\-pattern \(a corrective action logged but with no measured effect\)\.

#### How\-to — Run the improvement loop

1. **Aggregate root causes** from the closed defects of the release \(Doc 09 lifecycle step 4\) and from Doc 08 audit findings\.

2. **Assign each recurrence to a lever:** e\.g\., a repeated unchecked\-bounds finding → add a mandatory rule \(Doc 02\) \+ enable the static\-analysis check \(Doc 03\) \+ add a boundary test \(Doc 05\) \+ add a review\-checklist item \(Doc 04\)\.

3. **Measure recurrence reduction:** track the same defect class in the next release on the Doc 10 dashboard; confirm the rate dropped\. If not, the corrective action was ineffective — re\-open the root\-cause analysis\.

4. **Supplier controls:** for supplier\-originated defects, feed findings into supplier controls and the Doc 08 supplier audit \(VW Formel Q escalation path\)\.

5. **Exit:** each recurring root cause has a lever action, an owner, and a next\-release recurrence measurement\.

