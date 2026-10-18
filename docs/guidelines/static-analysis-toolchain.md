---
sidebar_label: "Static Analysis & Toolchain"
sidebar_position: 2
title: "Static Analysis and Toolchain Guideline"
description: "Standardized static-analysis and code-metric toolchain, configuration, validation and version management."
---

> **Document type:** Subordinate guideline
> **Document set:** 03 of 11
> **Controlled by:** Doc 01 \(Software Code Quality Management Procedure\)
> **Purpose:** Ensure all development teams produce **consistent, reproducible and auditable** static\-analysis and code\-metric results by standardizing the toolchain, its configuration, validation and version management\.
>

---

## 1\. Purpose and scope

Static analysis is a **mandatory** quality activity, but its value depends on the toolchain being reliable, repeatable and auditable\. This document defines:

- the standard toolchain architecture;

- tool qualification and configuration controls;

- rule customization governance;

- the code\-quality metrics reported by the toolchain;

- minimum exit criteria for the static\-analysis gate\.

#### What — Purpose and scope of the toolchain guideline

Static analysis is a **mandatory** quality activity under Doc 01\. This document operationalizes it by defining five things: the standard toolchain architecture \(§2\), tool qualification and configuration controls \(§3\), rule customization governance \(§4\), the code\-quality metrics the toolchain reports \(§5\), and the minimum exit criteria for the static\-analysis gate \(§6\)\. It applies to all development teams producing static\-analysis and code\-metric results, and its core purpose is that those results are **consistent, reproducible and auditable** — not merely produced\.

#### Why — Why toolchain standardization is mandatory

- **Reproducibility:** a static\-analysis result is only evidence if another run, on the same revision with the same configuration, produces the same finding\. Unpinned tools/configs produce incomparable results \(ASPICE SWE\.6 verification evidence; ISO 26262 tool qualification\)\.

- **Auditability:** an assessor must be able to see which tool version, rule\-pack and compiler produced a result; without standardization, every team's results are unverifiable\.

- **Reliability:** an unvalidated tool produces unknown false positives and false negatives; teams either suppress all findings \(false positives\) or trust undetected defects \(false negatives\)\.

#### How\-to — Establish the toolchain

1. **Adopt the architecture** \(§2\): developer workstation → CI/CD pipeline → central quality platform → release gate\.

2. **Qualify and control tools** \(§3\): approval list, version pinning, environment, configuration, validation, failure handling\.

3. **Govern rules** \(§4\): central baseline \+ project extensions; custom rules with controlled specifications\.

4. **Define metrics** \(§5\): the seven metric groups; operational thresholds in Doc 10\.

5. **Freeze exit criteria** \(§6\): the six static\-analysis gate criteria\.

6. **Exit:** the toolchain is pinned, validated, and its results are the authoritative evidence for G2/G3/G4\.

## 2\. Standard toolchain architecture

```
┌────────────────────┐      ┌──────────────────────────────┐
│ Developer          │      │ CI/CD quality pipeline       │
│ Workstation        │      │ Build · Static analysis ·    │
│ · IDE plugins      │ ───▶ │ Metrics · Unit tests ·       │
│ · Local linting    │      │ Coverage · Security analysis │
│ · Pre-commit checks│      │ · OSS analysis               │
└────────────────────┘      └──────────────┬───────────────┘
                                            ▼
                    ┌───────────────────────────────────────┐
                    │ Central Quality Platform              │
                    │ Results aggregation · Baseline mgmt · │
                    │ Trend dashboards · Defect tracker ·   │
                    │ Evidence archive                      │
                    └──────────────┬────────────────────────┘
                                   ▼
                    ┌───────────────────────────────────────┐
                    │ Release Gate                          │
                    │ Automated decision + authorized       │
                    │ exceptions + accountable approval     │
                    └───────────────────────────────────────┘
```

### 2\.1 Component responsibilities

|Component|Responsibilities|
|---|---|
|Developer workstation|Immediate feedback: IDE plugin linting, local pre\-commit checks|
|CI/CD pipeline|Authoritative run: build, static analysis, metrics, unit tests, coverage, security scan, OSS scan|
|Central quality platform|Aggregate results, manage baselines, trend dashboards, defect tracker, evidence archive|
|Release gate|Automated pass/fail decision plus authorized exceptions|

> **Authoritative source:** the CI/CD pipeline result is the authoritative analysis for gates\. Local runs are for developer feedback only and must not be used as release evidence\.
> 
> 

#### What — Four\-component architecture and authoritative\-source rule

The architecture has four components\. **Developer workstation** provides immediate feedback \(IDE plugin linting, local pre\-commit checks\)\. **CI/CD pipeline** is the authoritative run \(build, static analysis, metrics, unit tests, coverage, security scan, OSS scan\)\. **Central quality platform** aggregates results, manages baselines, trend dashboards, defect tracking and evidence archive\. **Release gate** makes the automated pass/fail decision plus authorized exceptions and accountable approval\. The authoritative\-source rule is normative: the CI/CD pipeline result is the authoritative analysis for gates; local runs are developer feedback only and must not be used as release evidence\.

#### Why — Why CI/CD is authoritative and local runs are not

- **Environment consistency:** local workstations differ \(IDE versions, OS, compiler flags\); the CI/CD environment is controlled and reproducible\.

- **Evidence integrity:** a developer's local run is not archived or configuration\-linked; a CI/CD run is revision\-tagged and archived\.

- **Independence:** using local runs as release evidence lets the developer control the evidence; the CI/CD run is independent of the developer's local environment\.

#### How\-to — Configure the architecture

1. **Workstation:** install matching IDE plugins and pre\-commit checks \(same rule\-pack as CI/CD\) for fast feedback; make clear these are not gate evidence\.

2. **CI/CD pipeline:** pin tool versions, rule\-pack version, compiler settings; run all checks on every integration build; archive results\.

3. **Central platform:** aggregate CI results; manage baselines \(existing findings\); trend dashboards \(Doc 10\); defect tracker \(Doc 09\); evidence archive linked to revisions\.

4. **Release gate:** automated pass/fail per §6 exit criteria; exceptions route to Doc 09; accountable approval at G5\.

5. **Exit:** local runs are feedback\-only; CI/CD is the only authoritative gate evidence; central platform aggregates all results\.

## 3\. Tool qualification and configuration controls

|Control|Required specification|
|---|---|
|**Tool approval**|Approved tool list, owner, supported languages, intended use|
|**Version management**|Pinned tool, compiler, plugin and rule\-pack versions|
|**Environment**|Reproducible build/analysis environment; controlled dependencies|
|**Configuration**|Central rule configuration, project\-specific extensions, change history|
|**Integration**|CI/CD execution, API/report integration, failure handling|
|**Result integrity**|Source revision, config version, timestamps, report retention, access control|
|**Validation**|Evaluation against representative code with known defects and expected findings|
|**Updates**|Impact assessment, regression testing, authorization before adopting new versions|
|**Tool failures**|Explicit handling of crashes, incomplete scans, missing reports, configuration errors|

#### What — Nine qualification controls

Nine controls govern tool qualification and configuration: **Tool approval** \(approved list, owner, supported languages, intended use\); **Version management** \(pinned tool, compiler, plugin, rule\-pack versions\); **Environment** \(reproducible build/analysis, controlled dependencies\); **Configuration** \(central rule config, project extensions, change history\); **Integration** \(CI/CD execution, API/report integration, failure handling\); **Result integrity** \(source revision, config version, timestamps, report retention, access control\); **Validation** \(evaluation against representative code with known defects\); **Updates** \(impact assessment, regression testing, authorization before new versions\); **Tool failures** \(explicit handling of crashes, incomplete scans, missing reports, config errors\)\.

#### Why — Why each control exists

- **Tool approval/version/configuration:** unpinned tools produce incomparable results; central config prevents per\-team drift\.

- **Environment:** a non\-reproducible environment makes evidence invalid\.

- **Result integrity:** without source revision \+ config version \+ timestamps, evidence is untraceable \(Doc 01 §8\)\.

- **Validation:** an unvalidated tool's recall/precision is unknown; the team cannot trust its findings\.

- **Updates:** adopting a new tool version without regression can change findings across the codebase\.

- **Failures:** a crashed or missing report must be treated as a gate failure, not a skipped step \(§3\.3\)\.

#### How\-to — Implement the nine controls

1. **Tool approval:** maintain an approved tool list with owner, supported languages, intended use; no unapproved tool in the pipeline\.

2. **Version management:** pin exact versions in the pipeline config; record in the central platform\.

3. **Environment:** use a controlled container/image for the build/analysis environment; no ad\-hoc local installs\.

4. **Configuration:** central rule config with project extensions; every config change has a history entry\.

5. **Integration:** pipeline calls the tool, ingests the report via API; failures are handled per §3\.3\.

6. **Result integrity:** every report embeds source revision, config hash, timestamp; retained with access control\.

7. **Validation:** follow §3\.1 validation procedure\.

8. **Updates:** impact assessment \+ regression \+ authorization before adopting new versions\.

9. **Failures:** follow §3\.3 matrix\.

### 3\.1 Practical validation of a tool \(how\-to\)

1. Build a **validation corpus**: a representative set of files containing known defects of each category \(buffer overflow, null deref, uninitialized var, unsafe cast, resource leak, unreachable code\)\.

2. Record the **expected findings** \(rule IDs \+ severity\) for each seeded defect\.

3. Run the tool with the candidate configuration and **compare actual vs\. expected** findings \(recall\)\.

4. Run on **clean code** to measure **false\-positive rate** \(precision\)\.

5. Record the result \(tool ID, version, config hash, recall, precision, date, evaluator\) in the tool qualification record\.

6. Re\-validate on **tool/rule\-pack version change** and after **custom rule** introduction\.

#### What — Six\-step tool validation

Validation is a controlled experiment: build a corpus of representative files with known seeded defects \(buffer overflow, null deref, uninitialized var, unsafe cast, resource leak, unreachable code\); record expected findings \(rule IDs \+ severity\); run the candidate config and compare actual vs\. expected \(recall\); run on clean code to measure false\-positive rate \(precision\); record tool ID, version, config hash, recall, precision, date, evaluator in the tool qualification record; re\-validate on tool/rule\-pack version change and after custom rule introduction\.

#### Why — Why recall and precision must be measured

- **Recall** measures whether the tool finds the defects it should; low recall means undetected defects \(false negatives\)\.

- **Precision** measures whether flagged findings are real; low precision causes alert fatigue and silent suppression\.

- **Re\-validation:** a tool/rule\-pack update or a new custom rule can change recall/precision; without re\-validation, the team trusts an unmeasured change\.

#### How\-to — Run and record validation

1. **Build the corpus:** include representative real files plus seeded defects per category; keep it version\-controlled\.

2. **Seed and record:** for each seeded defect, record the expected rule ID and severity\.

3. **Run and compare:** count how many expected findings the tool reported \(recall = found/expected\)\.

4. **Clean\-code run:** count findings on known\-clean code \(false positives\); precision = real findings / total flagged\.

5. **Record:** tool ID, version, config hash, recall, precision, date, evaluator in the qualification record\.

6. **Re\-validate:** on every tool/rule\-pack version change and after custom rule introduction; compare to baseline\.

7. **Micro\-example \(illustrative\):** a new static\-analysis tool is run on a corpus with 50 seeded defects; it reports 40 → recall 80%\. On clean code it reports 12 findings, 3 of which are real → precision 20% on that run\. The low precision triggers tuning before adoption; after config adjustment, precision improves and the tool is approved\.

### 3\.2 ISO 26262 tool confidence

For projects subject to ISO 26262, determine the applicable **confidence in the use of software tools** \(TCL\) requirements under the relevant toolchain and safety lifecycle\. A tool is **not** considered suitable merely because it is widely used or commercially certified — the tool confidence argument must be made per the project's toolchain and safety requirements\.

#### What — Tool confidence \(TCL\)

For ISO 26262 projects, the applicable **confidence in the use of software tools \(TCL\)** requirements must be determined under the relevant toolchain and safety lifecycle\. A tool is not suitable merely because it is widely used or commercially certified; the tool confidence argument must be made per the project's toolchain and safety requirements\.

#### Why — Why TCL is per\-project

- **ISO 26262\-8 tool confidence:** the standard requires a tool\-confidence argument based on the tool's role in the safety lifecycle, the consequences of a tool error, and the existing validation measures\.

- **"Widely used" is not an argument:** commercial certification or market prevalence does not substitute for a project\-specific confidence argument\.

- **Consequence of tool error:** if the tool misses a safety\-relevant defect, the consequence is an unsafe release; the confidence argument must address this\.

#### How\-to — Make the tool\-confidence argument

1. **Determine the tool's role:** does it generate, analyze, or verify safety\-relevant code? What would a tool error \(false negative\) allow?

2. **Assess consequence:** could a tool error lead to an undetected safety violation? What is the ASIL of the affected item?

3. **Existing measures:** what independent measures \(review, test, robustness verification\) compensate for potential tool errors?

4. **Document the argument:** tool role, consequence assessment, existing measures, residual confidence; record in the safety case\.

5. **Exit:** a tool\-confidence argument exists for each tool used on ISO 26262 projects; commercial certification is noted but not relied upon\.

### 3\.3 Tool failure handling matrix

|Failure|Required action|
|---|---|
|Tool crashes mid\-scan|Mark analysis **incomplete**; block gate until re\-run succeeds|
|Incomplete scan / missing report|Treat as **no analysis**; cannot be used as evidence|
|Configuration error|Fix, re\-run, log the incident|
|Unexpected rule\-pack change|Halt integration; verify config hash before re\-run|

> A missing or failed report is a **gate failure**, not a silently skipped step\.
> 
> 

#### What — Failure handling matrix

Four tool\-failure types and their actions: **Tool crashes mid\-scan** → mark analysis incomplete; block gate until re\-run succeeds\. **Incomplete scan / missing report** → treat as no analysis; cannot be used as evidence\. **Configuration error** → fix, re\-run, log the incident\. **Unexpected rule\-pack change** → halt integration; verify config hash before re\-run\. The control: a missing or failed report is a gate failure, not a silently skipped step\.

#### Why — Why a failed run is a gate failure

- **No evidence = no pass:** an assessment that did not complete provides no evidence that mandatory checks passed; treating it as a pass is the classic way defects escape\.

- **Config hash verification:** an unexpected rule\-pack change means findings may not be comparable; halting prevents silently mixing rule sets\.

- **Audit:** an assessor expects failed runs to be recorded as failures, not hidden\.

#### How\-to — Handle failures

1. **Crash:** the pipeline marks the build red; the gate is blocked; the tool owner investigates; a clean re\-run is required\.

2. **Missing report:** no report = no evidence; the gate fails; do not proceed on "last known good\."

3. **Config error:** fix the config, re\-run, log the incident in the tool failure log \(Doc 09 trigger: repeated tool failures\)\.

4. **Unexpected rule\-pack change:** halt integration; verify the config hash against the approved baseline; re\-run with the correct hash\.

5. **Exit:** every failure is logged with action; no gate passes on a failed or missing run\.

## 4\. Rule customization and governance

### 4\.1 Custom\-rule specification

Every custom rule must have a controlled specification\. \(Fields mirror Doc 02 Section 6 — for the tool layer, additionally record:\)

|Field|Required information|
|---|---|
|Rule ID|Unique, stable identifier|
|Detection mechanism|Tool, configuration, validation method|
|Test evidence|Positive and negative test cases, including known false\-positive scenarios|
|Owner|Technical rule owner and approving authority|
|Change history|Revision, reason, impact assessment, approval|
|Deviation mechanism|Documentation, scope, justification, risk acceptance, expiration/review|

#### What — Custom\-rule specification at the tool layer

Every custom rule must have a controlled specification\. The fields mirror Doc 02 §6; for the tool layer, the required fields are: Rule ID \(unique, stable\), Detection mechanism \(tool, configuration, validation method\), Test evidence \(positive and negative cases including false\-positive scenarios\), Owner \(technical rule owner and approving authority\), Change history \(revision, reason, impact assessment, approval\), and Deviation mechanism \(documentation, scope, justification, risk acceptance, expiration/review\)\.

#### Why — Why custom rules need a tool\-layer specification

- **A custom rule is code:** it must be tested \(positive/negative\), owned, versioned, and have a deviation path — same discipline as production code\.

- **False\-positive calibration:** without test evidence including known false\-positive scenarios, a custom rule will either be too noisy \(silently disabled\) or too permissive\.

- **Consistency with Doc 02:** the tool layer must not invent rules outside the Doc 02 catalogue; this spec ensures traceability\.

#### How\-to — Specify a custom rule

1. **Assign a Rule ID** following the Doc 02 scheme \(e\.g\., `CQ-SEC-0001`\)\.

2. **Define the detection mechanism:** which tool, which configuration/script, which validation method\.

3. **Write test evidence:** at least one positive \(safe\) case, one negative \(defect\) case, and a known false\-positive scenario\.

4. **Name owner and approver:** technical rule owner; Quality \+ SW Architect approves \(Doc 01 §5\.2\)\.

5. **Change history and deviation mechanism:** record revisions; define the deviation path \(Doc 09\)\.

6. **Exit:** every custom rule has a controlled spec with test evidence and an owner\.

### 4\.2 Baseline \+ extensions model

- **Central rule baseline** — company\-wide mandatory rules, centrally maintained\.

- **Project\-level extensions** — project\-specific restrictions, version\-controlled\.

- Developers **cannot** disable mandatory rules independently; disablement requires the deviation process \(Doc 09\)\.

> **Distinction \(repeat of Doc 02 §7\.3\):** separate *tool configuration defects*, *false positives*, *legitimate deviations* and *genuine source\-code defects*\. Do not close them through the same mechanism\.
> 
> 

#### What — Baseline \+ extensions and problem\-type distinction

The model repeats Doc 02 §7\.1/§7\.3: a central rule baseline \(company\-wide mandatory rules\), project\-level extensions \(version\-controlled\), and a hard rule that developers cannot disable mandatory rules independently \(deviation process, Doc 09\)\. The problem\-type distinction is restated: separate tool configuration defects, false positives, legitimate deviations and genuine source\-code defects; do not close them through the same mechanism\.

#### Why — Why this is restated in the tool doc

- **The tool layer is where suppression happens:** a developer can locally suppress findings in the IDE or config; restating the control here makes it enforceable at the point of use\.

- **Problem types are closed differently at the tool level:** a config defect is fixed in config; a false positive is a documented suppression; a deviation is a Doc 09 record; a real defect is a fix\. Conflation here is the most common evidence\-trail break\.

#### How\-to — Enforce at the tool layer

1. **Central baseline:** mandatory rules are in the central config; developer workstations inherit it\.

2. **Project extensions:** added to the project rule\-pack; version\-controlled; never remove baseline rules\.

3. **No local disable:** the toolchain blocks local suppression of mandatory rules; suppressions go through Doc 09\.

4. **Classify findings per Doc 02 §7\.3:** tool config defect → fix config; false positive → documented suppression; deviation → Doc 09; real defect → fix \+ regression\.

5. **Exit:** no developer\-local disablement; findings are correctly classified by type\.

## 5\. Code\-quality metrics produced by the toolchain

Report both defect\-oriented and structural metrics\. \(Operational use is defined in Doc 10\.\)

### 5\.1 Metric groups

|Metric group|Required metrics|
|---|---|
|**Rule compliance**|Total violations; violations by rule and severity; violations per KLOC; deviation count|
|**Complexity**|Cyclomatic complexity, nesting depth, function length, number of parameters|
|**Maintainability**|Code duplication, dead code, coupling, cohesion indicators, maintainability index \(if useful\)|
|**Reliability**|Defects detected, defect density, reopened defects, escaped defects|
|**Security**|Confirmed vulnerabilities by severity, unresolved security findings, time to remediation|
|**Verification**|Statement and branch coverage, test pass rate, requirements traceability, regression results|
|**Process effectiveness**|Review completion rate, analysis compliance, closure lead time, overdue issues|

#### What — Seven metric groups

The toolchain reports both defect\-oriented and structural metrics across seven groups: **Rule compliance** \(total violations; by rule and severity; per KLOC; deviation count\); **Complexity** \(cyclomatic complexity, nesting depth, function length, parameter count\); **Maintainability** \(duplication, dead code, coupling, cohesion, maintainability index\); **Reliability** \(defects detected, defect density, reopened defects, escaped defects\); **Security** \(confirmed vulnerabilities by severity, unresolved security findings, time to remediation\); **Verification** \(statement and branch coverage, test pass rate, requirements traceability, regression results\); **Process effectiveness** \(review completion rate, analysis compliance, closure lead time, overdue issues\)\. Operational use \(targets, trends, dashboards\) is defined in Doc 10\.

#### Why — Why both defect\-oriented and structural metrics

- **Defect\-oriented metrics** \(compliance, reliability, security, verification\) measure the current state of defects\.

- **Structural metrics** \(complexity, maintainability\) predict future defect\-proneness; high complexity correlates with escaped defects\.

- **Process\-effectiveness metrics** measure whether the process itself is working \(reviews completed, analysis compliance, closure speed\) — not just the product\.

- **Escaped defects** are the leading KPI for process effectiveness \(Doc 10\)\.

#### How\-to — Collect and report metrics

1. **Automate collection:** the CI/CD pipeline computes these groups on every build; the central platform stores them\.

2. **Separate new/legacy:** report new and changed code separately from the legacy baseline \(§5\.2 rule 1\)\.

3. **Normalize:** report absolute counts and normalized measures \(e\.g\., violations per KLOC\)\.

4. **Operationalize in Doc 10:** set targets, trends, dashboards; this document defines what is reported, Doc 10 defines how it is tracked\.

5. **Exit:** all seven groups are collected; new/legacy separation; normalized measures available\.

### 5\.2 Metric design rules

1. Measure **new and changed code separately** from the legacy baseline\.

2. Track **absolute counts** and **normalized measures** \(e\.g\., findings per KLOC\)\.

3. Do **not** use code volume or comment ratio as standalone quality indicators\.

4. Do **not** use a low violation count as proof code is defect\-free\.

5. Evaluate **trends across releases**, not a single snapshot\.

6. Set complexity / function\-size / nesting\-depth thresholds via **pilot projects** first; evaluate false positives and engineering impact; then **freeze approved limits** in the project quality plan\.

7. **Do not present arbitrary complexity values as requirements of MISRA, ISO 26262 or Automotive SPICE\.**

#### What — Seven metric design rules

The rules: \(1\) measure new and changed code separately from the legacy baseline; \(2\) track absolute counts and normalized measures \(findings per KLOC\); \(3\) do not use code volume or comment ratio as standalone quality indicators; \(4\) do not use a low violation count as proof code is defect\-free; \(5\) evaluate trends across releases, not a single snapshot; \(6\) set complexity/function\-size/nesting\-depth thresholds via pilot projects first, then freeze approved limits in the project quality plan; \(7\) do not present arbitrary complexity values as requirements of MISRA, ISO 26262 or Automotive SPICE\.

#### Why — Why these design rules exist

- **New/legacy separation:** mixing new code with a large legacy baseline hides whether new code is clean \(the baseline dominates the count\)\.

- **Normalization:** absolute counts are incomparable across codebases of different size; per\-KLOC measures enable comparison\.

- **No code volume/comment ratio:** these measure style/effort, not defect content \(Doc 02 §8\.2 anti\-pattern\)\.

- **Low count ≠ clean:** see Doc 02 §8\.2; a low count can mean unenforced rules\.

- **Trends, not snapshots:** quality changes over time; a single snapshot misses direction\.

- **Pilot\-then\-freeze:** complexity thresholds set without pilot experience produce false positives or false negatives\.

- **No misattribution:** arbitrary complexity values are not standard requirements; presenting them as such is an audit finding\.

#### How\-to — Apply the design rules

1. **Tag new/changed code:** the pipeline tags changes since the last baseline; metrics are split\.

2. **Report both:** absolute counts and per\-KLOC measures in the dashboard\.

3. **Exclude volume/comment ratio** from quality indicators\.

4. **Pair low counts** with trend and escaped\-defect data\.

5. **Trend charts:** Doc 10 shows cross\-release trends, not single snapshots\.

6. **Pilot thresholds:** set candidate complexity limits on pilot projects; evaluate false positives; freeze in the quality plan as concrete values\.

7. **Label thresholds correctly:** project\-set limits are marked as project decisions, not standard requirements\.

## 6\. Minimum exit criteria for the static\-analysis gate

|Criterion|Detail|
|---|---|
|Analysis completed successfully|Approved configuration; CI/CD run|
|No unresolved Critical findings|Or formally disposed|
|No unresolved mandatory\-rule violations|Unless a deviation is formally approved|
|No unapproved new high\-risk findings|Trend stable or improving|
|All deviations documented|Justification, risk, scope, approval|
|Existing findings resolved or baselined|Controlled, traceable baseline|

#### What — Static\-analysis gate exit criteria \(tool layer\)

Six criteria at the tool layer: \(1\) analysis completed successfully with approved configuration on the CI/CD run; \(2\) no unresolved Critical findings \(or formally disposed\); \(3\) no unresolved mandatory\-rule violations \(unless a deviation is formally approved\); \(4\) no unapproved new high\-risk findings \(trend stable or improving\); \(5\) all deviations documented \(justification, risk, scope, approval\); \(6\) existing findings resolved or baselined through a controlled, traceable baseline\. These mirror Doc 02 §5; this section is the tool\-layer confirmation that the criteria are enforced by the pipeline\.

#### Why — Why exit criteria are stated in both docs

- **Doc 02 §5** defines the criteria from the rule/severity side; **Doc 03 §6** confirms the toolchain enforces them\. A criterion that is not technically enforced in the pipeline is aspirational\.

- **Automated blocking:** the CI/CD pipeline should block on unresolved Critical/mandatory violations; this makes the gate enforceable without manual judgment\.

#### How\-to — Enforce exit criteria in the pipeline

1. **Criterion 1:** the pipeline fails if the analysis does not complete \(§3\.3\)\.

2. **Criteria 2–3:** the pipeline blocks on unresolved Critical findings and mandatory\-rule violations unless a deviation record is linked\.

3. **Criterion 4:** the pipeline compares high\-severity findings to the previous release; a worsening trend blocks\.

4. **Criterion 5:** the pipeline verifies each linked deviation has the four required elements\.

5. **Criterion 6:** existing findings are in a controlled baseline list; no undeclared carry\-over\.

6. **Exit:** the pipeline automatically blocks or passes per the criteria; exceptions route to Doc 09; the gate report is archived\.
