---
sidebar_label: "Robustness Verification"
sidebar_position: 5
title: "Code Robustness Verification Guideline"
description: "Robustness verification for non-nominal input, environment and system conditions."
---

## 1\. Purpose

Robustness is about **"what happens when the input, environment or system is not nominal\."** It is treated as a distinct verification workstream because normal unit tests and static analysis do not, by themselves, prove robustness\.

Code robustness in automotive electronic software development is the ability of software to perform its intended functions reliably and predictably under normal operating conditions, abnormal inputs, component failures, resource constraints, environmental disturbances, communication faults, and lifecycle changes.
Robustness must not be treated as a coding-style objective or a testing activity performed near release. It must be engineered throughout the product lifecycle, from requirements definition and architecture through implementation, integration, verification, vehicle validation, production release, and field monitoring.
This document establishes an end-to-end Automotive Software Code Robustness Management System for ECU software, embedded control systems, smart cockpit software, middleware, vehicle communication stacks, and cross-domain software platforms, including AI-enabled functions where applicable.

**The intended outcomes are to:**
- Prevent robustness defects through requirements, architecture, coding rules, and design reviews.
- Detect defects early through static analysis, dynamic analysis, fault injection, and layered testing.
- Contain faults through defensive design, resource isolation, degradation strategies, and recovery mechanisms.
- Establish objective quality gates for development milestones and production releases.
- Maintain traceability between requirements, risks, code changes, test evidence, defects, and release decisions.
- Continuously improve robustness using field data, incident analysis, and engineering metrics.


#### Scope of robustness verification

This document governs **robustness verification** — the workstream that deliberately drives the software into *abnormal and boundary conditions* and checks its behavior: malformed/ out\-of\-range inputs, memory exhaustion, allocation failure, invalid state transitions, missed deadlines, communication loss, and fault injection\. It is explicitly **distinct** from ordinary unit testing \(Doc 05, which verifies nominal behavior against requirements\) and from static analysis \(Doc 03\)\. It contributes to Quality Gate **G4 — Software quality assessment** \(robustness, regression\) and feeds G5 release evidence\. The controlled process area is \#7 in Doc 01 §4\.2\.


- **Normal tests miss the abnormal path:** Doc 05 unit tests use valid inputs and nominal environment; static analysis flags patterns but cannot exercise runtime fault behavior\. A system that works perfectly on good input but corrupts memory on a malformed CAN frame is the classic automotive field failure — and exactly what robustness verification targets\.

- **Safety and security convergence:** robustness under fault is an ISO 26262 expectation \(fail\-safe / degraded behavior, safe state\); robustness against malformed input is an ISO/SAE 21434 vulnerability expectation\. This workstream is where both are verified\.

- **Distinct evidence is required:** an assessor/customer distinguishes "nominal unit tests passed" from "fault behavior verified"; treating robustness as assumed\-by\-unit\-test is a standard process finding \(ASPICE SWE\.6 software verification adequacy\)\.

####  Establish the robustness workstream

1. **Declare it separate at G0:** in the project quality plan, name robustness verification as its own activity with its own owner \(test engineer / QA\), its own report \(§5\), and its own scope — not a subsection of unit testing\.

2. **Define failure classes per architecture:** with the system/software architect, list the abnormal conditions relevant to this product \(§2 areas\) — memory exhaustion, comms failure, sensor faults, etc\.

3. **Choose methods by risk:** host\-based vs\. target, fuzzing depth, fault\-injection scope — per §2\.1 tailoring and the safety/security plans\.

4. **Acceptance for setup:** failure\-class list approved by architect; method set chosen with rationale; report template \(§5\) adopted; one failure class demonstrated end\-to\-end as a pilot\.

## 2\. Robustness requirements by area

|Area|Verification focus|Example methods|
|---|---|---|
|**Memory safety**|Buffer overflows, invalid pointers, use\-after\-free, resource leaks|Static analysis, runtime instrumentation, targeted tests|
|**Numeric safety**|Overflow, underflow, division by zero, signedness and conversion defects|Boundary tests, static analysis, targeted fuzzing|
|**Input handling**|Malformed, missing, out\-of\-range or unexpected inputs|Negative tests, boundary\-value analysis, fuzz testing|
|**State handling**|Invalid transitions, stale data, inconsistent internal state|State\-transition tests, scenario\-based tests|
|**Resource management**|Memory exhaustion, queue overflow, allocation failure, resource cleanup|Fault injection, stress and resource monitoring|
|**Concurrency**|Race conditions, deadlocks, shared\-state corruption|Concurrency analysis, stress tests, targeted synchronization tests|
|**Timing and execution**|Missed deadlines, excessive execution time, resource contention|Timing analysis, load testing, platform\-specific verification|
|**Fault handling**|Communication failures, unavailable services, sensor or data faults|Error injection, recovery tests, degraded\-mode verification|

#### The eight robustness areas

These eight areas are the **failure\-domain catalogue**: the dimensions along which abnormal conditions are defined and verified\. Each area pairs a *focus* \(what can go wrong\) with *example methods* \(how to verify it\)\. The areas are deliberately complementary to Doc 05's nominal tests: memory/numeric/input/state/resource/concurrency/timing/fault cover the ways an embedded ECU fails in the field\. Not every area applies equally to every module — selection is tailored in §2\.1\.

- **Completeness of the failure model:** without a catalogue, teams test the failures they happen to think of \(usually input validation\) and miss resource exhaustion, timing or concurrency faults — the most expensive field failures\.

- **Method alignment:** pairing each area with methods \(static analysis, fuzzing, fault injection, stress\) gives the test engineer a concrete starting kit and maps to the ASPICE SWE\.6 verification\-method expectation and ISO 26262 fault\-handling verification\.

- **Security relevance:** input\-handling, memory\-safety and concurrency areas overlap directly with the ISO/SAE 21434 attack surface; robustness here doubles as security robustness testing\.

#### Apply the eight areas per module

1. **Select applicable areas** with the architect: a small state\-machine module emphasizes state handling \+ input handling; a comms stack emphasizes memory \+ input \+ concurrency \+ fault handling; a control\-loop module emphasizes timing \+ numeric\.

2. **For each selected area, define expected behavior** \(see §3\) — e\.g\., "on allocation failure, the module returns an error, frees partial state, and degrades gracefully; it must not crash or corrupt\."

3. **Pick methods** from the "example methods" column as the starting set; adjust depth per risk \(§2\.1\)\.

4. **Record scope and results** in the robustness report \(§5\): which areas/failure classes were verified per module\.

### 2\.1 Tailoring the method set

The specific methods are tailored to the software architecture and deployment environment\. In particular:

- **Host\-based testing is useful but does not by itself prove correct behavior on the target ECU or embedded platform\.**

- For safety\-related software, define the robustness verification approach per the applicable ISO 26262 requirements and safety plan\.

- Select fuzzing / fault\-injection depth based on risk class and attack surface \(ISO/SAE 21434 where applicable\)\.

#### Tailoring rules

These three rules govern **how much robustness verification is applied**: \(1\) host\-based testing is a useful early signal but not sufficient proof on the real ECU; \(2\) safety\-related software's robustness approach is defined by ISO 26262 and the safety plan, not ad hoc; \(3\) fuzzing/fault\-injection depth scales with risk class and attack surface \(ISO/SAE 21434\)\. Tailoring reduces *effort*, never removes the requirement to verify abnormal behavior\.

- **Host ≠ target:** timing, memory layout, compiler behavior, and hardware peripherals differ between host and ECU; a robustness test passing on host does not prove safe behavior on the deployed target \(a recurring audit finding\)\.

- **Safety plan governs:** for ASIL\-classified software, the safety plan defines the verification approach; this guideline must follow it rather than inventing a parallel method \(ISO 26262\-6 §9–10\)\.

- **Depth by attack surface:** fuzzing every module equally is wasteful; depth concentrates where risk and exposure are highest\.

#### Tailor

1. **Host\-based:** use host tests for fast feedback and broad coverage early; **then** re\-verify the safety\-relevant and failure\-critical behavior on the target ECU \(or hardware\-in\-the\-loop\) before G4\. *Evidence:* host results \+ target results both recorded\.

2. **Safety\-related:** read the safety plan; adopt its defined robustness/fault\-handling verification approach; record conformance; deviations go through Doc 09\.

3. **Fuzzing/fault\-injection depth:** set depth by risk class and attack surface — e\.g\., deepest on external\-input\-facing, safety\-relevant interfaces\. Concrete depth values are **\[TBD by organization\]**, set after a pilot measuring defect yield\.

4. *Exit:* tailoring decision per module/area is documented with rationale; no safety\-relevant abnormal behavior is left verified on host only\.

## 3\. Robustness acceptance criteria

A practical minimum:

|Criterion|Detail|
|---|---|
|Defined expected behavior for every applicable failure class|No "undefined" or "don't care" outcomes for defined failure classes|
|Resources released safely|On failure paths, memory, locks, handles are cleaned up|
|Invalid inputs produce no unsafe states|No crash, corruption, or safety violation from malformed inputs|
|Recovery or fault containment tested where required|Degraded mode / reset / safe\-state behavior verified|

#### The four acceptance criteria

These are the **minimum pass conditions** for robustness verification: \(1\) every applicable failure class has a *defined expected behavior* — "undefined/don't care" outcomes are not acceptable; \(2\) on failure paths, resources \(memory, locks, handles\) are released; \(3\) invalid inputs cause no unsafe state \(no crash/corruption/safety violation\); \(4\) recovery/fault\-containment behavior \(degraded mode, reset, safe state\) is actually tested where required\.

- **"Defined expected behavior" is the key criterion:** robustness verification can only pass or fail against a defined expected outcome\. Leaving failure behavior "undefined" is how unsafe defaults \(silent corruption, reboot loops\) ship\. This is the ISO 26262 safe\-state / degraded\-mode expectation made testable\.

- **Resource cleanup on failure is a leading indicator:** leaks on error paths are the most common robustness defect class; requiring their verification prevents field resource exhaustion\.

- **Recovery must be tested, not assumed:** "the system recovers" is a claim until degraded\-mode/reset/safe\-state behavior is executed — this is what G4 samples\.

####  Check the four criteria

|Criterion|How to verify|
|---|---|
|Defined expected behavior|For each failure class in scope, the expected outcome is documented \(in the test specification / safety plan\); no "TBD/don't care" remains at G4|
|Resources released safely|On every tested failure path, memory/locks/handles are released \(observed via instrumentation, leak check, or resource monitor\)|
|Invalid inputs no unsafe state|Malformed/out\-of\-range inputs produce no crash, memory corruption, or safety violation \(fuzz/negative\-test results\)|
|Recovery/fault containment tested|Degraded mode, reset, or safe\-state behavior is executed and observed where the safety/architecture plan requires it|

*Exit:* all four met for in\-scope failure classes; any un\-defined or failing behavior is a finding \(§4\) tracked through Doc 09\.

## 4\. Linking findings to defect management

- **Critical robustness findings** are linked to defect management \(Doc 09\) and get a **regression test**\.

- If a robustness defect reveals a flaw in a **shared library, coding rule or architecture**, the correction extends **beyond the individual line of code**:

    1. fix the defect;

    2. add/adjust the coding rule \(Doc 02\) or static\-analysis rule \(Doc 03\);

    3. update test design guidance to cover the class of defect;

    4. assess whether other modules share the same pattern and re\-test them\.

#### Findings handling and systemic correction

Robustness findings follow two rules\. First: **critical robustness findings** are raised into the Doc 09 defect lifecycle \(classification P0–P3, ownership, correction, verification\) and each gets a **regression test** so the fault is never re\-introduced\. Second: when the root cause is systemic \(a shared library, a coding\-rule gap, or an architecture flaw\), the fix is **beyond one line of code** — the four\-step systemic correction loop runs\.

- **Regression test per critical finding:** without a regression test, the same robustness defect \(e\.g\., a buffer overrun on a specific malformed frame\) recurs elsewhere; this is the escaped\-defect countermeasure\.

- **Systemic loop prevents repeat across modules:** a robustness defect in one module often means the same pattern exists in sibling modules \(same library, same missing rule\)\. The four steps — fix, add rule/static rule, update test guidance, hunt\-and\-retest sibling modules — convert one finding into a class\-level prevention, feeding the framework's continual\-improvement loop \(README §3\)\.

- **Connects to Doc 02/03:** the loop is the mechanism by which robustness experience improves the coding rule catalogue and static\-analysis rule\-pack — not an extra process\.

#### Execute the systemic correction loop

1. **Fix the defect:** immediate correction in the affected code; add a regression test reproducing the failure; link to the Doc 09 issue\.

2. **Add/adjust rule:** if the defect is the kind a rule could have prevented, add/adjust a Doc 02 coding rule and enable the corresponding Doc 03 static\-analysis rule \(rule change approved per Doc 01 §5\.2\)\.

3. **Update test design guidance:** record the defect class in the unit\-test \(Doc 05\) / robustness test design guidance so future tests cover it\.

4. **Assess siblings:** scan/re\-test other modules that use the same library, pattern or interface; open findings for any instance found\.

5. *Exit:* defect fixed \+ regression test in place; rule/static\-rule updated; guidance updated; sibling assessment recorded\. The finding closes only when the whole loop is done — not when the single line is fixed\.

**Worked micro\-example \(illustrative\):** A fuzz test on the diagnostic request handler reveals a buffer overrun when a length field exceeds the payload\. Step 1: bounds check added; regression fuzz test in place; finding classified P1 per Doc 09\. Step 2: Doc 02 mandatory rule added \("validate length fields against buffer size before copy"\); Doc 03 static rule enabled to flag unchecked length\-derived copies\. Step 3: Doc 05 test\-design guidance notes "always fuzz length/payload consistency\." Step 4: scan finds the same pattern in three other message handlers → all fixed and re\-tested\. The defect closes only after all four steps — preventing the class, not just the instance\.

## 5\. Robustness verification evidence

The robustness report records:

|Item|Detail|
|---|---|
|Scope|Modules, interfaces, failure classes verified|
|Methods used|Tooling, instrumentation, fuzz/fault\-injection configuration|
|Results|Pass/fail per failure class; findings by severity|
|Traceability|Which robustness requirement each test covers|
|Regression|Added regression tests for fixed robustness defects|

#### The robustness report

This is the **controlled work product** of the workstream — the report QA and the release board read at G4\. Five items: *scope* \(which modules/interfaces/failure classes were covered — so gaps are visible\), *methods used* \(tooling, instrumentation, fuzz/fault\-injection configuration — so results are reproducible per Doc 01 §8\), *results* \(pass/fail per failure class \+ findings by severity\), *traceability* \(which robustness requirement each test covers\), and *regression* \(tests added for fixed defects\)\.

- **Reproducibility:** Doc 01 §8 requires every result tied to revision and configuration; "methods used" \(including fuzz/fault\-injection configuration\) is what makes the result reproducible and auditable \(ASPICE SWE\.6 work product quality\)\.

- **Scope = gap visibility:** an assessor needs to see which failure classes were *not* verified, not just that tests passed; scope makes the negative space explicit\.

- **Traceability and regression close the loop:** trace links tests to robustness requirements; regression links fixed defects to prevention — together they are the evidence that the §4 loop was executed\.

#### Assemble the report

|Item|How to fill|
|---|---|
|Scope|List modules/interfaces/failure classes verified; explicitly list in\-scope failure classes not yet verified as open items|
|Methods used|Tool names \+ versions, instrumentation used, fuzz corpus/configuration, fault\-injection setup; tied to the exact revision|
|Results|Pass/fail per failure class; findings by P0–P3 severity \(Doc 01 §9\) linked to issue records|
|Traceability|Map each robustness test to the robustness requirement / safety\-plan item it covers|
|Regression|List regression tests added for fixed defects \(§4 step 1\), linked to defect records|

*Exit:* report assembled for the release revision; scope gaps and open findings explicitly listed; report archived against the exact revision as G4/G5 evidence\.
