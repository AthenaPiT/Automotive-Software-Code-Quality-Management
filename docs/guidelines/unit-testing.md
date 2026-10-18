---
sidebar_label: "Unit Testing"
sidebar_position: 4
title: "Software Unit Testing Guideline"
description: "Unit-test design, execution, structural coverage (C0/C1, MC/DC), traceability and exit criteria."
---

> **Document type:** Subordinate guideline
> **Document set:** 05 of 11
> **Controlled by:** Doc 01 \(Software Code Quality Management Procedure\)
> **Purpose:** Define unit\-test design, execution, structural coverage \(C0/C1 and applicable MC/DC\), traceability and exit criteria for automotive embedded software\.

---

## 1\. Purpose

Unit testing verifies each software unit against its requirements and detailed design\. This document makes terminology explicit, defines the test process, sets coverage criteria by risk class, and specifies the unit\-test release gate\.

#### What — Scope of unit testing

This document governs **software unit verification** — the construction and execution of test cases that verify individual software units \(functions/modules/classes\) against their unit requirements and detailed design\. It is the workstream behind Quality Gate **G3 — CI verification** \(static analysis, unit tests, coverage\) and feeds **G4/G5** release evidence\. It is deliberately scoped to *units*: integration testing, robustness testing \(Doc 06\) and system testing are separate workstreams and are not substitutes\. The terminology it fixes \(C0/C1/MC/DC\) is the framework's canonical vocabulary; it is reused unchanged across Doc 06, Doc 08 and Doc 10\.

#### Why — Rationale

- **Primary defect detection at unit level:** defects are cheapest to find and fix at unit level; Automotive SPICE 4\.0 SWE\.4 \(software unit verification\) is the process area that expects units to be verified against detailed design with defined criteria and recorded results\.

- **Coverage is the measurable lever:** without defined C0/C1/MC/DC criteria, "good unit tests" is a judgement call; structural coverage makes test completeness auditable and is the evidence assessors and customers sample\.

- **Safety alignment:** ISO 26262\-6 §9–10 mandates structural coverage \(statement/branch and, for higher ASILs, MC/DC\) for safety\-related software; this document ties those expectations to the gate rather than leaving them implicit\.

- **Traceability is mandatory:** a unit test that cannot be traced to a requirement/design element is unverifiable evidence — ASPICE SWE\.4 and ISO 26262 both require bidirectional traceability \(see §3\.1 and §6\)\.

#### How\-to — Establish unit testing on a project

1. **Freeze the baseline at G0:** unit\-test toolchain \(framework, compiler/host, target or host\-based runner\), the coverage tool, the per\-risk\-class coverage targets \(§4\), and the trace table format \(§6\) are recorded in the project quality plan; thresholds start as **\[TBD by organization\]** until piloted\.

2. **Integrate into CI:** unit tests and coverage run automatically at G3; coverage below target fails the build unless a deviation is approved \(Doc 09\)\.

3. **Train developers:** test\-design types \(positive, negative, boundary, error\-handling\) and the coverage terminology \(§2\) in one calibration session\.

4. **Acceptance for setup:** toolchain version\-pinned \(Doc 01 §8\); coverage gates enforced in CI; one module's trace table reviewed and accepted; thresholds documented as \[TBD by organization\] with the pilot plan\.

## 2\. Terminology — make it explicit in your procedure

|Term|Definition|
|---|---|
|**C0 — Statement coverage**|Whether executable statements have been executed by the test suite\.|
|**C1 — Branch coverage**|Whether the relevant branches or decision outcomes have been exercised\.|
|**MC/DC — Modified Condition/Decision Coverage**|Whether individual Boolean conditions can independently affect the decision outcome, subject to the applicable definition and verification method\.|

> **Caution:** C0 and C1 are useful measures but are **not complete evidence of correctness**\. A suite can reach high coverage yet miss incorrect requirements, boundary defects or missing test cases\.
> 
> 

#### What — The three coverage terms

These are the **framework's defined coverage vocabulary**, used verbatim throughout the set\. *C0 \(statement coverage\)* = every executable statement has been hit at least once\. *C1 \(branch coverage\)* = every decision \(if/switch/etc\.\) has taken each of its outcomes at least once\. *MC/DC* = for each Boolean decision with multiple conditions, each individual condition has been shown to independently affect the decision result — the strongest practical structural coverage, required by ISO 26262 for higher ASILs\. "Subject to the applicable definition and verification method" deliberately leaves the exact MC/DC variant \(e\.g\., unique\-cause vs\. masking\) to the safety plan / standard adopted\.

#### Why — Rationale

- **Common language prevents audit findings:** assessments repeatedly find that "coverage 100%" is claimed without defining whether it means C0, C1 or MC/DC; fixing the terms makes every coverage number comparable and auditable \(ASPICE SWE\.4 work product quality\)\.

- **Caution block is mandatory:** coverage measures *which code was exercised*, not *whether the right behavior was asserted*\. A suite can hit 100% C1 yet assert nothing, or miss a boundary defect that never branches differently\. This caution is what keeps coverage from being over\-trusted\.

- **MC/DC maps to ASIL:** ISO 26262\-6 specifies structural coverage methods by ASIL; introducing MC/DC here \(rather than in a separate safety doc\) keeps the unit\-test gate and safety plan on the same page\.

#### How\-to — Apply the terminology correctly

1. **Always state the coverage type** in any report/claim: "C1 = 92%" not "coverage 92%"\. The trace table \(§6\) records per\-test coverage contribution as C0/C1/MC/DC\.

2. **Do not equate coverage with correctness:** even at target coverage, verify that \(a\) expected results are asserted \(not just exercised\), \(b\) boundary/error cases exist \(§3 test types\), and \(c\) requirements without tests are gaps \(§6 caution\)\.

3. **Use MC/DC only where applicable:** it is reserved for safety\-related/higher\-ASIL modules per §4; applying it to all code is wasteful\.

4. *Exit:* every coverage statement names its type; every module's coverage report identifies the method used and any exclusions \(§3\.1\)\.

## 3\. Unit test process

```
Design (from requirements + detailed design) → Implement → Execute → Coverage analysis → Defect resolution → Regression
```

|Step|Actions|Work product|
|---|---|---|
|1\. Test design|Derive test cases from unit requirements and detailed design|Test specification|
|2\. Test implementation|Implement positive, negative, boundary, error\-handling cases|Test code|
|3\. Test execution|Run in the approved toolchain/environment|Execution log|
|4\. Coverage analysis|Measure C0/C1 \(and MC/DC where applicable\); classify exclusions|Coverage report|
|5\. Defect resolution|Fix defects, add regression tests|Defect records|
|6\. Regression|Re\-run affected tests after fixes and behavior changes|Regression results|

#### What — The six\-step process

The process is **mandatory and sequential**: design first \(from requirements/design, not from existing code\), then implement, execute, measure coverage, resolve defects, and regress\. Each step has a defined work product — test specification, test code, execution log, coverage report, defect records, regression results — so that the gate evidence \(§5\) can be assembled from completed steps rather than reconstructed\.

#### Why — Rationale

- **Design from requirements, not code:** deriving tests after the code exists tends to test what the code does rather than what it *should* do; ASPICE SWE\.4 expects test cases derived from requirements and detailed design \(and traced to them\)\.

- **Coverage analysis is its own step:** measuring coverage only after execution reveals un\-exercised code that must get more tests; skipping it produces unverified "100% by assumption\."

- **Regression closes the loop:** every defect found becomes a regression test, preventing recurrence — this is the direct counter to escaped defects \(Doc 10\)\.

#### How\-to — Execute each step

1. **Step 1 — Test design\.** From unit requirements/detailed design, derive test cases: normal inputs, invalid/out\-of\-range inputs, boundary values, and error\-handling paths\. Record in the §6 trace table \(one row per case\)\. *Work product: test specification\.Exit:* every requirement/design element has at least one mapped test; no test derived from un\-documented behavior\.

2. **Step 2 — Test implementation\.** Implement the four case types; use test doubles only with justification \(per §3\.1 "test configurations/coverage exclusions" — reviewers check test doubles in Doc 04\)\. *Work product: test code\.Exit:* all designed cases implemented; expected results asserted, not merely exercised\.

3. **Step 3 — Test execution\.** Run in the approved toolchain/environment \(host or target per project\); record pass/fail per case and the exact revision/configuration\. *Work product: execution log\.Exit:* no unexplained failure \(any failure goes to step 5\)\.

4. **Step 4 — Coverage analysis\.** Measure C0/C1 \(and MC/DC where applicable\); identify un\-covered code and classify exclusions \(see below\)\. *Work product: coverage report\.Exit:* coverage meets §4 targets or exclusions are technically justified\.

5. **Step 5 — Defect resolution\.** Fix defects; **add a regression test for each behavioral defect**; link the defect to the issue record \(Doc 09 lifecycle\)\. *Work product: defect records\.Exit:* all blocking defects fixed; each has a regression test\.

6. **Step 6 — Regression\.** Re\-run affected tests after fixes and behavior changes; confirm no new failure\. *Work product: regression results\.Exit:* full affected regression set green\.

**Coverage exclusions — how to classify them:** un\-covered code is never silently dropped\. Classify each exclusion as: \(a\) *unreachable/dead code* — remove it or justify; \(b\) *defensive/unable\-to\-trigger* — justify why it cannot be triggered in the delivery configuration; \(c\) *missing test* — add the test \(not an exclusion\)\. Every exclusion carries a justification and owner; unjustified exclusions count against the coverage target\.

### 3\.1 Verification package contents

|Item|Detail|
|---|---|
|Traceability|Between software units, requirements/design elements and test cases|
|Test procedures|Defined input data and expected results|
|Test types|Positive, negative, boundary, error\-handling tests|
|Execution records|Logs, pass/fail results, unresolved\-defect records|
|Coverage report|C0/C1 \(and applicable MC/DC\) with identified exclusions and justifications|
|Regression tests|For fixed defects and changed behavior|

#### What — The unit\-test verification package

This is the **complete evidence bundle** that proves a unit was properly verified — the artifact an assessor, customer or release board samples\. Six items: traceability \(unit ↔ requirement/design ↔ test\), defined test procedures \(inputs \+ expected results — not just code\), the four test types, execution records, the coverage report with exclusions, and regression tests\. It is assembled per unit and rolled up into the G3/G4 evidence\.

#### Why — Rationale

- **Assessor sample:** ASPICE SWE\.4 and ISO 26262\-6 sample exactly these items — traceability, test specifications, results, coverage; a package missing any item is a finding\.

- **Expected results are evidence:** "test procedure with defined input data and expected results" distinguishes a real test from a run that merely executes code without asserting anything \(the §2 caution made concrete\)\.

- **Exclusions must be visible:** coverage without an exclusions list cannot be trusted; the package makes exclusions and their justifications auditable\.

#### How\-to — Assemble and check the package

|Item|How to produce / check|
|---|---|
|Traceability|§6 trace table; every unit and requirement maps to ≥1 test row|
|Test procedures|Each test has defined inputs and an expected result \(not "runs without crash"\)|
|Test types|Confirm positive, negative, boundary, error\-handling all present for the unit|
|Execution records|Execution log tied to exact revision; pass/fail per case; unresolved defects linked|
|Coverage report|C0/C1 \(MC/DC where applicable\); exclusions listed with justification \+ owner|
|Regression tests|One regression test per fixed behavioral defect; linked to defect record|

*Exit criterion \(pre\-gate\):* all six items present and internally consistent — the same revision appears in logs, coverage report and trace table\. Any gap is a P2/P3 finding tracked to closure\.

## 4\. Coverage criteria by software category

Use a **two\-part policy**: a company\-wide minimum baseline **plus** stricter requirements determined by the product's safety and cybersecurity needs\.

|Software category|Recommended policy|
|---|---|
|**Standard production software**|Define and enforce explicit C0 and C1 targets, with separate criteria for critical functionality and changed code|
|**Security\-sensitive modules**|Increase coverage targets for security decisions, validation logic, permission checks and error paths|
|**Safety\-related software**|Set verification methods and structural coverage expectations per applicable ISO 26262 requirements, safety classification and safety plan|
|**Legacy / third\-party code**|Use documented, risk\-based treatment; do **not** silently remove from coverage or compliance reporting|

> **Example internal starting policy — not a universal industry requirement:**
> 100% statement coverage and ≥ 90% branch coverage for ordinary production units, with stricter criteria for designated high\-risk units\. Final thresholds are validated against project context and contractual requirements\.
> 
> 

> **For safety\-related software:** C0/C1 alone must **not** be assumed sufficient\. ISO 26262 may require additional structural coverage methods, **including MC/DC**, depending on the applicable requirements and ASIL\.
> 
> 

#### What — The two\-part coverage policy

Coverage criteria are set in **two layers**: \(1\) a company\-wide minimum baseline that every unit must meet, and \(2\) stricter targets added per category — standard, security\-sensitive, safety\-related, legacy/third\-party\. The policy is *recommended* in form but the targets, once frozen in the project quality plan, become release\-blocking\. The categories deliberately map to risk drivers: security \(ISO/SAE 21434\), safety \(ISO 26262/ASIL\), and legacy/third\-party \(Doc 07 provenance\)\.

#### Why — Rationale

- **One baseline \+ risk uplift is the correct model:** a single threshold for all code either over\-tests low\-risk code or under\-tests safety/security code\. The two\-part model lets the baseline be reasonable while safety/security modules get commensurate rigor \(ISO 26262\-6 structural coverage by ASIL; ISO/SAE 21434 security testing expectations\)\.

- **Legacy/third\-party must stay visible:** silently excluding legacy code from coverage reporting creates a blind spot; documented risk\-based treatment keeps it reported \(consistent with Doc 07's "do not become uncontrolled exclusions"\)\.

#### How\-to — Apply the categories

1. **Standard production software:** apply the company C0/C1 baseline; set a *separate* \(stricter\) target for designated critical functionality and for newly changed code \(so refactored code is re\-tested\)\.

2. **Security\-sensitive modules:** raise coverage for validation logic, permission checks, and error paths — these are the attack\-surface decision points \(ISO/SAE 21434\)\. Targets are **\[TBD by organization\]**\.

3. **Safety\-related software:** do not invent a coverage number here — follow the applicable ISO 26262 requirements, ASIL and the project safety plan; C0/C1 alone are **not** assumed sufficient, and MC/DC applies where the standard/ASIL requires\.

4. **Legacy/third\-party code:** document the risk\-based treatment \(existing evidence, risk assessment, whether re\-testing is feasible\) — recorded in the verification package, never removed from reporting\.

### 4\.1 Setting and freezing thresholds \(practical\)

1. Propose initial C0/C1 \(and MC/DC where applicable\) targets per risk class\.

2. Pilot against representative modules; measure achievable coverage, false negatives and excluded\-code volume\.

3. Document the basis \(contractual requirements, ASIL, historical performance\)\.

4. **Freeze** the thresholds in the project quality plan; they become release\-blocking criteria\.

#### What — The threshold\-setting process

This is the **mandated method** for arriving at concrete coverage numbers: propose → pilot → document basis → freeze\. It exists because coverage thresholds must be evidence\-based, not copied\. The frozen numbers then become release\-blocking gate criteria \(§5\) — which is why they must be recorded in the project quality plan, not left in someone's head\.

#### Why — Rationale

- **Avoids two failure modes:** copying an unrealistic 100%\-everywhere target produces mass unjustified exclusions and demoralization; copying a too\-low target gives no assurance\. The pilot measures what is actually achievable\.

- **Basis is auditable:** the basis \(contract, ASIL, historical performance\) is exactly what an assessor/customer asks for; a threshold with no documented basis is itself a finding\.

- **Freeze = gate:** until frozen, the criteria are advisory; the freeze step converts them into the §5 gate that blocks release\.

#### How\-to — Run the four steps

1. **Propose:** draft initial C0/C1 targets per risk class \(e\.g\., start from the illustrative §4 example, but mark it internal\)\.

2. **Pilot:** measure on representative modules — achievable coverage, false negatives \(tests that should exist but are absent\), and the volume of code needing exclusion\. Identify whether the target is realistic for the toolchain\.

3. **Document the basis:** record contractual/customer requirements, ASIL\-driven methods, and historical coverage performance as the rationale for each number\.

4. **Freeze:** write the final thresholds into the project quality plan as release\-blocking criteria; any later change is a configuration change approved per Doc 01 §5\.2 and re\-validated\.

5. *Exit:* thresholds per risk class are documented with their basis, frozen in the quality plan, and enforced by the CI coverage gate\. All concrete numbers appear as **\[TBD by organization\]** until this process completes\.

## 5\. Unit\-test release gate

A unit\-testing gate requires **all** of the following:

|Criterion|Detail|
|---|---|
|All required tests executed successfully|No unexplained failures|
|Coverage criteria satisfied|Or deviations approved \(Doc 09\)|
|No unresolved blocking defects|Per severity model \(Doc 02\)|
|Requirements\-to\-test traceability completed|Trace table complete|
|Regression verification completed|For affected functionality|
|Coverage exclusions classified|Technically justified|
|Evidence from the identified software revision|Same revision being released|

#### What — The unit\-test gate

These seven criteria are the **mandatory conditions** that must all be true to pass the unit\-testing gate \(contributing to G3 integration eligibility and feeding G4/G5\)\. "All" is the operative word — partial completion does not pass\. The gate is explicit that coverage satisfaction may alternatively be met by an *approved deviation* \(Doc 09\), and that evidence must come from the *exact revision being released*\.

#### Why — Rationale

- **Gate discipline:** README §5 / Doc 01 §6\.1 — a failed gate blocks progression unless a formally permitted exception is approved; the seven criteria are the G3/G4 unit\-test content of that decision\.

- **"Same revision being released" closes a common audit gap:** coverage/run evidence from a different build than the released code proves nothing; this criterion enforces evidence\-to\-release integrity \(Doc 01 §8 evidence management\)\.

- **Deviation path preserves rigor:** coverage below target is not silently accepted — it must go through Doc 09 with scope, residual risk and approval\.

#### How\-to — Check each criterion at the gate

|Criterion|How to verify|Blocking?|
|---|---|---|
|All required tests executed successfully|Execution log shows all designed cases pass; no unexplained failure|Yes|
|Coverage criteria satisfied|Coverage report meets frozen §4 targets, OR approved deviation on file|Yes|
|No unresolved blocking defects|Issue tracker shows no open Critical/Major \(per Doc 02 severity\)|Yes|
|Requirements\-to\-test traceability completed|§6 trace table complete; no requirement un\-mapped|Yes|
|Regression verification completed|Regression results for affected functionality green|Yes|
|Coverage exclusions classified|Every exclusion has technical justification \+ owner|Yes|
|Evidence from the identified software revision|Logs/coverage/trace all reference the exact release revision|Yes|

*Exit:* all seven green \(or formally deviated\); QA records the gate result and links the evidence package to the release revision\. A failure returns the change to the developer per Doc 01 §6\.1 default actions\.

## 6\. Traceability template \(one row per test case\)

|Test ID|Unit ID|Requirement / design element|Inputs|Expected result|Pass/Fail|Coverage contribution \(C0/C1/MC/DC\)|Defect ref \(if any\)|
|---|---|---|---|---|---|---|---|
|UT\-001|SWU\-003|REQ\-102|boundary: `length==0`, `length==MAX`|returns `OK` / returns `ERR_BOUND`|Pass|branch|—|

> Populate a complete trace table for every release candidate\. Any requirement without a mapped test is a gap that must be justified or closed before release\.
> 
> 

#### What — The trace table

This is the **mandatory per\-test\-case trace format**: one row per test, linking test → unit → requirement/design element, with inputs, expected result, pass/fail, which coverage type it contributes to, and any linked defect\. The example row shows the expected granularity \(boundary values called out explicitly, branch contribution noted\)\. "One row per test case" is the rule — summary counts are not a substitute\.

#### Why — Rationale

- **Bidirectional traceability:** ASPICE SWE\.4 and ISO 26262 require tracing tests to requirements and back; the trace table is that work product\. A release candidate with a requirement but no test is a *verification gap* — which the blockquote explicitly says must be justified or closed\.

- **Gap detection:** the table is the mechanism that surfaces "requirements without tests" — these are the items that otherwise surface as escaped defects \(Doc 10\)\.

- **Coverage accounting:** recording per\-test coverage contribution \(C0/C1/MC/DC\) lets QA see *which* tests deliver which coverage, rather than only a aggregate percentage\.

#### How\-to — Build and audit the trace table

1. **One row per test case:** fill all eight columns; Test ID stable, Unit ID from the design, requirement/design element ID \(not free text\)\.

2. **Inputs / expected result:** concrete values \(e\.g\., `length==0`, `length==MAX`\) and concrete expected outcomes \(`OK` / `ERR_BOUND`\) — matching the §3\.1 "defined input data and expected results" requirement\.

3. **Coverage contribution:** mark which structural coverage this test delivers; MC/DC only for safety\-related modules\.

4. **Defect ref:** link to the issue record if this test was added for a defect \(regression tests\)\.

5. **Gap scan before release:** query the table for requirements/design elements with zero mapped tests; each gap is either closed \(add a test\) or formally justified \(and tracked as a deviation per Doc 09\)\.

6. *Exit:* complete trace table for the release revision; no un\-justified requirement gap; table version\-controlled with the evidence package\.

