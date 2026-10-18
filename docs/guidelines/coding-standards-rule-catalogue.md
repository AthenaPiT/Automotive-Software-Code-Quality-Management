---
sidebar_label: "Coding Standards & Rule Catalogue"
sidebar_position: 1
title: "Coding Standards and Rule Catalogue"
description: "Coding rules covering functional safety, cybersecurity, OSS compliance and verification enforcement."
---

Framework • Policy • Coding rules • Functional safety • Cybersecurity • Open-source software compliance • Verification and enforcement

## 1. Purpose and scope

This document defines an enterprise-level Automotive Software Coding Standards and Rule Catalogue for embedded software, ECU software, middleware, operating-system components, application software, and AI-enabled automotive electronic systems.

The objective is to establish a consistent, auditable and enforceable coding baseline that reduces software defects, supports functional safety and cybersecurity, controls open-source software (OSS) risks, and improves maintainability across the vehicle software lifecycle.

The catalogue is intended for:

- Body, chassis, powertrain, ADAS, autonomous-driving and vehicle-control ECUs.
- In-vehicle infotainment, smart cockpit, connectivity and telematics.
- AUTOSAR Classic and Adaptive platforms, embedded Linux, Android Automotive OS and RTOS-based systems.
- Vehicle middleware, hardware abstraction layers, drivers, bootloaders, diagnostic services and communication stacks.
- Cross-domain software platforms, AI runtime integration and application-layer components.
- In-house software, supplier-delivered code, third-party commercial components and open-source dependencies.

### 1.1 Governing principles

1. Safety by design: coding rules must support the safety requirements and safety architecture of the item.
2. Security by design: prevent memory corruption, injection, unauthorized access, insecure configuration and unsafe data handling.
3. Defect prevention: detect errors as early as possible through static analysis, peer review and automated checks.
4. Deterministic execution: control timing, memory, concurrency, resource usage and failure behavior where required.
5. Compliance by evidence: each applicable rule must have an identifiable verification method and retained result.
6. License compliance by construction: all incorporated OSS must be identified, approved and distributed in accordance with its license obligations.
7. Risk-based tailoring: safety-critical and security-sensitive components require stricter controls than non-critical tools or prototypes.
8. No silent exceptions: every deviation must have documented rationale, risk assessment, approval and an expiration or review condition.

## 2. Standards and regulatory alignment

The coding catalogue should be aligned with the applicable editions of the following standards and legal frameworks. The organization must verify the current edition, contractual applicability and jurisdiction-specific obligations before establishing a compliance baseline.

| Reference               | Primary application                                | Coding catalogue contribution                                                       |
| ----------------------- | -------------------------------------------------- | ----------------------------------------------------------------------------------- |
| ISO 26262               | Functional safety of road vehicles                 | Safe language usage, defensive programming, verification, freedom from interference |
| ISO/SAE 21434           | Automotive cybersecurity engineering               | Secure coding, threat-driven controls, vulnerability handling                       |
| UNECE R155              | Vehicle cybersecurity management, where applicable | Evidence supporting cybersecurity risk management and supplier controls             |
| UNECE R156              | Software update management, where applicable       | Update integrity, version traceability and software configuration controls          |
| MISRA C / MISRA C++     | Safety- and security-oriented C/C++                | Language restrictions, undefined behavior prevention, coding discipline             |
| AUTOSAR C++14           | C++14 guidance for applicable automotive software  | C++ usage restrictions and static analysis                                          |
| CERT C / CERT C++       | Secure C/C++ programming                           | Memory safety, integer handling, concurrency and secure APIs                        |
| ISO/IEC 5055            | Automated source-code quality measurement          | Structural weaknesses and selected critical coding defects                          |
| ISO/IEC 5230            | OpenChain open-source license compliance           | OSS compliance process and organizational governance                                |
| SPDX specifications     | Software package and license data                  | SBOM representation, license identifiers and exchange                               |
| CycloneDX               | Software bill of materials and supply-chain data   | Component inventory, dependencies and vulnerability metadata                        |
| Applicable OSS licenses | Distribution and use of third-party software       | Attribution, notices, source-code obligations and redistribution conditions         |

Important: these references are complementary, not interchangeable. MISRA or CERT conformance does not by itself demonstrate ISO 26262 compliance, ISO/SAE 21434 compliance, or regulatory approval. A coding rule must be mapped to the relevant project requirements, safety or cybersecurity analyses, and verification evidence.

## 3. Coding governance framework

The recommended model consists of one mandatory enterprise policy, a language-specific rule catalogue, risk-based project profiles, automated enforcement, and an auditable exception process.
![Coding standards framework](/img/cq/image.png)

### 3.1 Rule classification

Every rule in the master catalogue should have a unique identifier and these attributes:

| Attribute        | Definition                                                          |
| ---------------- | ------------------------------------------------------------------- |
| Rule ID          | Permanent unique identifier, e.g. `MEM-001`                         |
| Domain           | General, safety, security, OSS, concurrency, etc.                   |
| Requirement      | Testable, unambiguous normative statement                           |
| Rationale        | Defect, hazard, attack or compliance risk addressed                 |
| Applicability    | Language, component type, criticality and lifecycle phase           |
| Severity         | Blocker, critical, major, minor or advisory                         |
| Enforcement      | Static analysis, dynamic testing, review, scan or audit             |
| Exception policy | Whether deviation is prohibited or conditionally allowed            |
| Evidence         | Report, review record, test result, approval or compliance artifact |
| Traceability     | Related standard, requirement, hazard, threat or license obligation |

### 3.2 Severity and disposition

| Severity      | Meaning                                                                                                         | Required disposition                                                                                                    |
| ------------- | --------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| S0 — Blocker  | Potential catastrophic safety impact, critical exploitable weakness, or prohibited license/compliance condition | Stop integration or release; resolve or formally contain the release-blocking condition                                 |
| S1 — Critical | Serious safety, security, integrity or reliability risk                                                         | Mandatory correction before release unless a formally authorized, legally permissible disposition establishes otherwise |
| S2 — Major    | Significant maintainability, robustness or defect risk                                                          | Correct before release, or obtain approved risk-based deviation                                                         |
| S3 — Minor    | Limited impact, style or consistency issue                                                                      | Correct within the agreed baseline or deviation period                                                                  |
| S4 — Advisory | Improvement opportunity or non-mandatory recommendation                                                         | Record or address according to project policy                                                                           |

Severity must be assigned based on the actual risk and context, not merely on a tool's default severity. A vulnerability or license issue cannot be made acceptable simply by relabeling it as minor.

## 4. Enterprise coding policy

The following policy text can be adopted as a starting point for an internal engineering standard.

### POL-CODE-001 — Automotive Software Coding and Compliance Policy

Owner: Software Engineering Governance • Approval: Engineering Leadership, Functional Safety, Cybersecurity and OSS Compliance

Policy requirements

1. All production-intended automotive software shall comply with an approved project coding profile before integration.
2. Each project shall identify its programming languages, runtime environments, safety classification, cybersecurity risks, applicable standards and third-party software dependencies.
3. Safety-related C/C++ code shall use the approved MISRA or equivalent rule baseline where specified by the project. Applicable deviations shall be documented and assessed.
4. All production code shall undergo automated static analysis, code review, relevant dynamic verification and security checks at defined lifecycle gates.
5. Undefined behavior, unsafe memory operations, uncontrolled concurrency and unhandled failure paths shall be prevented or demonstrably controlled according to applicable risk.
6. Security-sensitive operations shall use approved APIs and cryptographic libraries, with appropriate authentication, authorization, input validation and error handling.
7. All OSS and third-party components shall be identified, versioned, license-reviewed and security-assessed before use and before distribution.
8. Software dependencies shall be traceable to the released product and supported by an accurate software bill of materials (SBOM) where required by policy, contract or regulation.
9. No developer may suppress a mandatory rule, alter a shared analysis baseline or introduce an unapproved dependency without the defined authorization.
10. Every production release shall retain evidence of coding compliance, approved deviations, security and license assessments, and tool execution.

### 4.1 Mandatory policy controls

- P-01: Establish an organization-wide master rule catalogue with controlled revisions.
- P-02: Maintain project-specific coding profiles and approved tool configurations.
- P-03: Require developers and reviewers to complete role-appropriate training.
- P-04: Prevent unauthorized modification of analysis rules and CI/CD quality gates.
- P-05: Require impact analysis when a coding rule, compiler, library or tool version changes.
- P-06: Require supplier flow-down of coding, security and OSS obligations.
- P-07: Maintain evidence in configuration-controlled repositories.
- P-08: Prohibit unresolved release-blocking findings without an authorized disposition consistent with safety, security, legal and contractual obligations.

## 5. Coding rule catalogue — general and language rules

The following is a proposed enterprise baseline. These are organization-defined rules, not a claim that the IDs are official MISRA or CERT rule numbers. Language-specific rules should be mapped to the applicable official guidelines in the controlled implementation.

### 5.1 Language and maintainability rules

| Rule ID | Mandatory requirement                                                                                                           | Verification                   |
| ------- | ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| GEN-001 | Every source file shall have a defined purpose, ownership and applicable license/copyright metadata where required.             | Repository audit               |
| GEN-002 | Naming conventions shall distinguish types, functions, variables, constants and macros consistently.                            | Linter                         |
| GEN-003 | Every function shall have a single clear responsibility and bounded complexity according to project thresholds.                 | Complexity analysis and review |
| GEN-004 | Public interfaces shall declare parameter meaning, units, ranges, ownership and error behavior.                                 | Interface review               |
| GEN-005 | Constants shall be used instead of unexplained numeric literals.                                                                | Static analysis and review     |
| GEN-006 | Code shall not contain dead code, unreachable branches or obsolete commented-out implementations in production.                 | Static analysis                |
| GEN-007 | All warnings from approved compiler configurations shall be eliminated or formally dispositioned.                               | Compiler log analysis          |
| GEN-008 | Source code shall follow the approved formatting and indentation baseline.                                                      | Formatter                      |
| GEN-009 | Functions and modules shall remain within approved size and complexity limits, or document an exception.                        | CI metrics                     |
| GEN-010 | Comments shall explain intent, constraints and non-obvious behavior rather than restating code.                                 | Peer review                    |
| GEN-011 | Public APIs shall define behavior for invalid parameters, unavailable resources and failure returns.                            | Review and unit tests          |
| GEN-012 | Production code shall not contain debug-only behavior, test bypasses or temporary development hooks unless explicitly approved. | Repository scan                |

### 5.2 C and C++ language safety

| Rule ID  | Mandatory requirement                                                                                                                       | Verification                       |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| LANG-001 | Use the approved C/C++ language version and compiler dialect; avoid unapproved compiler extensions.                                         | Build configuration                |
| LANG-002 | Avoid undefined, unspecified or implementation-defined behavior unless the behavior is explicitly identified and controlled by the project. | Static analysis and review         |
| LANG-003 | Avoid implicit narrowing, signed/unsigned conversion hazards and potentially overflowing arithmetic.                                        | Compiler diagnostics and analysis  |
| LANG-004 | Do not use unbounded or unsafe string and memory APIs when safer bounded alternatives are available.                                        | Static analysis                    |
| LANG-005 | Every pointer dereference shall be justified by valid lifetime, bounds and non-null assumptions.                                            | Static analysis and testing        |
| LANG-006 | Objects shall be initialized before use; initialization assumptions shall be explicit.                                                      | Static analysis                    |
| LANG-007 | Avoid unsafe type punning, invalid casts and reliance on object layout or alignment without a defined platform contract.                    | Static analysis and review         |
| LANG-008 | Macros shall not introduce unexpected evaluation, precedence or side-effect behavior. Prefer typed functions or constants.                  | Linter and review                  |
| LANG-009 | Resource acquisition and release shall follow a defined ownership strategy, including error paths.                                          | Static analysis and review         |
| LANG-010 | Exceptions, RTTI, dynamic allocation and standard-library features shall follow the approved platform and safety profile.                   | Build and architecture review      |
| LANG-011 | Do not use `volatile` as a substitute for atomicity, synchronization or memory-ordering guarantees.                                         | Concurrency analysis               |
| LANG-012 | Prohibit recursion where bounded stack consumption cannot be demonstrated or the project profile forbids recursion.                         | Static analysis and stack analysis |
| LANG-013 | Do not use unbounded loops in time-constrained execution paths unless a bounded termination argument exists.                                | Timing analysis                    |
| LANG-014 | All external inputs and return values shall be checked before use.                                                                          | Static analysis and tests          |
| LANG-015 | Compiler options affecting overflow, aliasing, exceptions or optimization assumptions shall be controlled and configuration-managed.        | Build audit                        |

### 5.3 C++-specific rules

- `CPP-001`: Define and enforce an approved ownership model; use RAII and smart pointers where supported by the platform profile.
- `CPP-002`: Avoid raw owning pointers and ambiguous ownership transfer.
- `CPP-003`: Avoid object slicing, unsafe casts and violations of class invariants.
- `CPP-004`: Define virtual destructors correctly for polymorphic base classes intended for deletion through base pointers.
- `CPP-005`: Prevent use-after-move and use-after-destruction.
- `CPP-006`: Avoid uncontrolled exceptions crossing safety-critical or ABI boundaries.
- `CPP-007`: Make constructors establish valid object invariants or use an approved failure-reporting pattern.
- `CPP-008`: Define thread safety and synchronization guarantees for shared objects.
- `CPP-009`: Avoid static initialization order dependencies.
- `CPP-010`: Apply the approved policy for templates, containers, allocators and dynamic memory.

These rules must be tailored for C++14, newer C++ standards, AUTOSAR C++14, or a specific RTOS toolchain as appropriate. An AUTOSAR C++14 profile, for example, should not be silently mixed with rules that require newer language features.

## 6. Functional safety coding rules

Functional safety coding rules must be derived from the software safety requirements, architecture, safety analyses and verification strategy. ISO 26262 includes specific software-level development activities in Part 6 and supporting processes across the standard series.


### 6.1 Safety rule catalogue

| Rule ID  | Requirement                                                                                                                   | Evidence                              |
| -------- | ----------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| SAFE-001 | Every safety-related software component shall have an identified safety role and applicable safety requirements.              | Software safety plan                  |
| SAFE-002 | Safety-relevant functions shall implement the specified safe-state and fault-response behavior.                               | Requirements-based tests              |
| SAFE-003 | Invalid, stale, out-of-range or unavailable sensor inputs shall be detected and handled according to the safety requirements. | Boundary and fault-injection tests    |
| SAFE-004 | Safety-relevant arithmetic shall have defined range, overflow and saturation behavior.                                        | Static analysis and tests             |
| SAFE-005 | Execution-time and stack requirements shall be established and verified for applicable safety-related execution paths.        | WCET and stack reports                |
| SAFE-006 | Dynamic allocation shall be prohibited or controlled according to the approved safety architecture and runtime profile.       | Code scan and memory analysis         |
| SAFE-007 | Recursion and unbounded execution shall be prohibited or justified under the approved timing and resource constraints.        | Static analysis                       |
| SAFE-008 | Safety-relevant state machines shall explicitly handle invalid states, unexpected events and invalid transitions.             | Model review and tests                |
| SAFE-009 | Safety mechanisms shall not be bypassed by debug, diagnostic or recovery code without an approved safety concept.             | Code review and fault injection       |
| SAFE-010 | Shared resources shall have a defined synchronization and freedom-from-interference strategy.                                 | Architecture and concurrency analysis |
| SAFE-011 | Safety-related interfaces shall define units, ranges, validity, initialization and failure behavior.                          | Interface specification               |
| SAFE-012 | Defensive checks shall not silently convert detected faults into apparently valid safety-relevant outputs.                    | Review and negative testing           |
| SAFE-013 | Diagnostic reporting and fault reactions shall be consistent with safety requirements and timing constraints.                 | Integration testing                   |
| SAFE-014 | Safety-relevant changes shall trigger impact analysis, regression testing and updates to applicable safety work products.     | Change assessment                     |
| SAFE-015 | Verification independence and review rigor shall meet the project's applicable safety requirements.                           | Review records                        |

### 6.2 Illustrative safety coding example

Unsafe pattern:

```
int32_t calculate_torque(int32_t speed, int32_t gain)
{
    return speed * gain;
}
```

Risk: the multiplication can overflow the range of `int32_t`, potentially causing undefined behavior in C. The function also has no stated input range or error behavior.

Safer design pattern:

```
typedef enum
{
    TORQUE_OK,
    TORQUE_INVALID_INPUT,
    TORQUE_OUT_OF_RANGE
} TorqueStatus;

TorqueStatus calculate_torque(
    int32_t speed,
    int32_t gain,
    int32_t *result)
{
    if ((result == NULL) || (speed < 0) || (gain < 0))
    {
        return TORQUE_INVALID_INPUT;
    }

    /* Range checks must be designed before multiplication.
       The actual limits and safe response are project-specific. */

    /* Perform multiplication only after proving it is safe. */

    return TORQUE_OUT_OF_RANGE; /* Illustrative placeholder. */
}
```

This is a design illustration, not production-ready code. A production implementation must define the valid ranges, prove multiplication safety, specify the output state on failure, and test all boundary conditions. A complete implementation should not retain the illustrative placeholder.

### 6.3 Additional safety practices

- Establish an explicit contract for every safety-relevant function.
- Avoid shared mutable state where practical.
- Use defensive programming based on documented failure modes, not indiscriminate checks.
- Define initialization and shutdown sequences, including reset and watchdog behavior.
- Verify failure handling under resource exhaustion and communication faults.
- Check the interaction of safety mechanisms with diagnostic services and software updates.
- Preserve traceability between safety requirements, code, tests, defects and release evidence.

## 7. Cybersecurity coding rules

The cybersecurity baseline should be threat-driven and integrated into the vehicle cybersecurity lifecycle. ISO/SAE 21434 addresses cybersecurity risk management across development, production, operation, maintenance and decommissioning; it does not mandate one universal coding language or fixed set of source-code rules.&#x20;


### 7.1 Security rule catalogue

| Rule ID | Mandatory requirement                                                                                                                            | Verification                            |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------- |
| SEC-001 | Validate all external data at the relevant trust boundary, including length, encoding, type and semantic range.                                  | Static analysis and fuzzing             |
| SEC-002 | Prevent buffer overflows, out-of-bounds access, use-after-free and other memory-safety defects.                                                  | Static analysis, sanitizers and testing |
| SEC-003 | Prevent integer overflow, truncation and signedness errors in security-sensitive operations.                                                     | Static analysis                         |
| SEC-004 | Use parameterized database operations and safe command-execution APIs; prohibit unsafe construction of executable commands from untrusted input. | SAST and review                         |
| SEC-005 | Do not embed passwords, private keys, access tokens or production secrets in source code or build artifacts.                                     | Secret scanning                         |
| SEC-006 | Use approved cryptographic libraries and algorithms; prohibit custom cryptographic implementations unless formally approved.                     | Dependency and design review            |
| SEC-007 | Use secure random-number generation appropriate to the cryptographic purpose.                                                                    | Design review and tests                 |
| SEC-008 | Enforce authentication and authorization on privileged operations and diagnostic interfaces.                                                     | Security testing                        |
| SEC-009 | Check access control at the enforcement point; do not rely solely on UI restrictions or caller assumptions.                                      | Security review                         |
| SEC-010 | Protect sensitive data in transit and at rest according to the security architecture.                                                            | Configuration and security tests        |
| SEC-011 | Avoid logging secrets, personal data and sensitive vehicle information beyond approved needs.                                                    | Log review and scanning                 |
| SEC-012 | Use safe error handling that prevents sensitive internal information from being exposed.                                                         | Negative testing                        |
| SEC-013 | Verify message integrity, freshness, sequence and replay resistance where required by the threat analysis.                                       | Protocol testing                        |
| SEC-014 | Enforce secure parsing limits for network packets, diagnostic messages and serialized data.                                                      | Fuzzing                                 |
| SEC-015 | Define timeout, retry and resource-exhaustion behavior for untrusted or unreliable inputs.                                                       | Robustness testing                      |
| SEC-016 | Verify secure boot, update validation and rollback protection at the appropriate system boundary.                                                | Integration testing                     |
| SEC-017 | Pin and verify dependency versions and provenance; prohibit unapproved dependency substitution.                                                  | Dependency scanning                     |
| SEC-018 | Treat compiler, build scripts, CI pipelines and generated artifacts as security-sensitive assets.                                                | Pipeline security review                |
| SEC-019 | Fix or formally disposition vulnerabilities according to severity, exploitability, exposure and product risk.                                    | Vulnerability tracking                  |
| SEC-020 | Prohibit insecure fallback behavior that disables authentication, signature validation or integrity checks.                                      | Review and negative testing             |

### 7.2 Security implementation principles

Input validation

- Validate both syntactic correctness and business-level semantics.
- Reject oversized messages before expensive processing.
- Use explicit length parameters for binary data.
- Check bounds before copying, indexing or allocating.
- Treat values received from another ECU as untrusted unless the applicable security design establishes the required trust.

Memory and concurrency

- Prefer memory-safe constructs and languages where the platform and safety constraints permit.
- Apply static analysis to all applicable C/C++ code.
- Use fuzzing for parsers, protocol handlers, diagnostic services and file-format readers.
- Use concurrency analysis and race-detection tools where supported.
- Review interrupt handlers, DMA buffers, shared memory and cross-core communication.

Cryptography and secrets

- Use approved key-management services and hardware security facilities where applicable.
- Separate development credentials from production credentials.
- Prevent private keys and tokens from entering source control, logs or publicly distributed symbols.
- Define key rotation, revocation and compromise handling outside the coding standard as part of the broader security design.

### 7.3 Illustrative secure input handling

```
bool validate_payload(const uint8_t *data, size_t length)
{
    if (data == NULL)
    {
        return false;
    }

    if ((length == 0U) || (length > MAX_PAYLOAD_SIZE))
    {
        return false;
    }

    return true;
}
```

This demonstrates basic pointer and length checks. It is not a complete parser: the caller must still validate message structure, field ranges, authentication and integrity, replay behavior, and any applicable protocol constraints.

## 8. Open-source software compliance rules

OSS compliance is a software supply-chain governance process, not merely a license-header check. ISO/IEC 5230:2020 specifies requirements for an open-source license compliance program, while SPDX and CycloneDX support software component and SBOM representation. OpenChain also maintains ISO/IEC 18974 for open-source security assurance.

Information technology — OpenChain Specification


### 8.1 OSS compliance rule catalogue

| Rule ID | Mandatory requirement                                                                                                                         | Verification / evidence      |
| ------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| OSS-001 | Every incorporated third-party and OSS component shall be inventoried, including transitive dependencies where discoverable.                  | Dependency scan              |
| OSS-002 | Record component name, version, source, origin, checksum or equivalent identity, and supplier where known.                                    | Component inventory          |
| OSS-003 | Identify and verify applicable licenses using package metadata, license files and source notices.                                             | License scanner and review   |
| OSS-004 | Resolve ambiguous, conflicting or missing license information before distribution.                                                            | Legal/compliance approval    |
| OSS-005 | Evaluate license obligations in the context of the intended use, modification, linking, distribution and deployment model.                    | License assessment           |
| OSS-006 | Obtain approval before introducing a new dependency or changing an existing dependency's license or distribution terms.                       | Dependency approval          |
| OSS-007 | Prohibit unapproved components under restricted, incompatible or unacceptable licenses.                                                       | CI policy gate               |
| OSS-008 | Fulfil applicable attribution, copyright notice, license text and source-code availability obligations.                                       | Release compliance audit     |
| OSS-009 | Maintain required source-code offers, corresponding-source packages or written offers when the applicable license requires them.              | Distribution package review  |
| OSS-010 | Preserve required copyright notices and license notices in modified or redistributed source.                                                  | Source audit                 |
| OSS-011 | Review patent, trademark, export, privacy and other relevant obligations where applicable.                                                    | Legal review                 |
| OSS-012 | Record all modifications to OSS and maintain their provenance.                                                                                | Patch and source history     |
| OSS-013 | Produce a release-specific SBOM in an approved format where required by policy, contract or regulation.                                       | SBOM validation              |
| OSS-014 | Scan OSS components for known vulnerabilities and define remediation or risk acceptance criteria.                                             | SCA report                   |
| OSS-015 | Evaluate component maintenance status, provenance, integrity and supplier security risk.                                                      | Component assessment         |
| OSS-016 | Verify that distributed binaries, images and firmware correspond to the approved component inventory.                                         | Release reconciliation       |
| OSS-017 | Reassess OSS obligations when dependencies, distribution models or license terms change.                                                      | Change review                |
| OSS-018 | Preserve OSS compliance evidence for the required product-support and legal retention period.                                                 | Audit records                |
| OSS-019 | Prohibit unapproved copying of source code from public repositories, websites or third-party projects.                                        | Review and provenance checks |
| OSS-020 | Define an approved procedure for AI-generated code that may reproduce or derive from third-party code, including applicable licensing review. | AI-use policy and scanning   |

### 8.2 License review and approval workflow

1\. Discover component

Package manifests, source headers, build dependencies and binary analysis

2\. Identify license and obligations

Verify component identity, version, license expression and applicable notices

3\. Assess intended use

Linking, modification, redistribution, firmware delivery, hosted services and source availability

#### Approved

Record conditions and include in the approved dependency baseline.

#### Hold / reject

Escalate unresolved terms, conflicts or unacceptable obligations.

4\. Release verification

Generate SBOM, assemble notices and required source materials, reconcile the release package, retain evidence

### 8.3 License-specific caution

License classification must not be based on a simplistic list of "permissive" and "copyleft" labels alone.

- MIT, BSD and Apache-2.0 commonly permit commercial use, subject to their actual terms and conditions.
- GPL and LGPL require more detailed analysis of the license version, modifications, distribution model and linking arrangements.
- AGPL requires special attention to its network-interaction provisions.
- MPL and other file-level or weak-copyleft licenses require analysis of the covered files, modifications and distribution obligations.
- Components with unknown, conflicting or custom licensing terms must be escalated for review.

These are screening guidelines, not legal conclusions. A component must be approved for the actual product architecture and distribution model. For example, a component used only on an internal build server can have a different distribution analysis from one embedded in firmware delivered to customers.

### 8.4 OSS component inventory template

| Field               | Example                                                    |
| ------------------- | ---------------------------------------------------------- |
| Component ID        | `OSS-0001`                                                 |
| Name and version    | `ExampleLib 2.4.1`                                         |
| Origin              | Approved upstream repository                               |
| License             | Verified SPDX license identifier or expression             |
| Usage               | Static library in an ECU firmware image                    |
| Modification status | Unmodified / modified                                      |
| Distribution        | Binary firmware distributed to customers                   |
| Obligations         | Notices, source materials or other applicable requirements |
| Vulnerabilities     | Findings and remediation status                            |
| Approval            | OSS Compliance + Legal, if required                        |
| SBOM reference      | Release-specific component entry                           |
| Evidence            | Scanner report, license files, approval record             |

The example is illustrative and does not identify a real approved dependency.

## 9. Additional coding rule domains

### 9.1 Memory, resource and real-time behavior

| Rule ID | Requirement                                                                                               | Verification                   |
| ------- | --------------------------------------------------------------------------------------------------------- | ------------------------------ |
| MEM-001 | Every allocated buffer shall have an explicit size and verified access bounds.                            | Static analysis                |
| MEM-002 | Prevent use-after-free, double-free, dangling references and invalid object lifetimes.                    | Static analysis and sanitizers |
| MEM-003 | Resource ownership and release shall be defined for all normal and error paths.                           | Review                         |
| MEM-004 | Stack consumption shall remain within the approved task or thread budget.                                 | Stack analysis                 |
| MEM-005 | Heap usage and fragmentation shall meet platform-specific constraints.                                    | Memory profiling               |
| MEM-006 | Allocation failure shall have a defined recovery or safe-failure response.                                | Fault injection                |
| MEM-007 | DMA and shared-memory buffers shall meet alignment, lifetime, cache-coherency and ownership requirements. | Architecture review and tests  |
| RT-001  | Real-time tasks shall meet approved execution-time and deadline requirements.                             | WCET and timing tests          |
| RT-002  | Blocking calls and synchronization shall be controlled within time-constrained execution paths.           | Timing analysis                |
| RT-003  | Lock acquisition shall have a defined deadlock prevention or detection strategy.                          | Concurrency analysis           |
| RT-004  | Interrupt handlers shall be bounded and shall not perform prohibited blocking operations.                 | Code review                    |
| RT-005  | Retry loops, polling and timeout behavior shall be bounded where required.                                | Static analysis and tests      |
| RT-006  | Scheduling, priorities and resource sharing shall follow the approved real-time architecture.             | Design and integration review  |

### 9.2 Concurrency and data integrity

- `CON-001`: Shared mutable state shall be synchronized using approved mechanisms.
- `CON-002`: Data races shall be prevented; `volatile` alone shall not be treated as thread synchronization.
- `CON-003`: Lock ordering shall be documented or enforced where multiple locks are used.
- `CON-004`: Atomic operations shall use appropriate memory ordering.
- `CON-005`: Cross-core, interrupt and task communication shall define ownership and consistency guarantees.
- `CON-006`: Initialization and shutdown shall prevent concurrent access to partially initialized or destroyed objects.
- `CON-007`: Thread cancellation and timeout handling shall not leave resources or system state inconsistent.

### 9.3 Diagnostics, logging and observability

- `LOG-001`: Logs shall use controlled severity levels and structured fields where appropriate.
- `LOG-002`: Logging shall not expose credentials, cryptographic material or unauthorized personal data.
- `LOG-003`: Diagnostic counters and fault codes shall have defined initialization, overflow and persistence behavior.
- `LOG-004`: Logging shall not violate timing, memory or safety constraints.
- `LOG-005`: Diagnostic interfaces shall enforce the access-control and authentication requirements of the security architecture.
- `LOG-006`: Fault handling shall preserve the information necessary for diagnosis without masking the original failure.
- `LOG-007`: Production diagnostic behavior shall be explicitly configured and testable.

### 9.4 Interfaces, protocols and configuration

- `IF-001`: Every interface shall define data types, units, valid ranges, endianness and error behavior.
- `IF-002`: Serialization and deserialization shall validate lengths, offsets, field counts and encoding.
- `IF-003`: Network and inter-ECU messages shall validate freshness, integrity and authenticity when required.
- `IF-004`: Configuration values shall be validated at initialization and when changed at runtime.
- `IF-005`: Default values shall not silently weaken security or safety controls.
- `IF-006`: Versioned interfaces shall define compatibility and rejection behavior.
- `IF-007`: Generated code shall have controlled generator versions, configuration, traceability and verification evidence.

### 9.5 AI and machine-learning integration

For AI-enabled cockpit, perception, voice-assistant and cross-domain platforms, add a dedicated rule family.

| Rule ID | Requirement                                                                                               |
| ------- | --------------------------------------------------------------------------------------------------------- |
| AI-001  | AI model and runtime versions shall be identified and traceable to the released software.                 |
| AI-002  | Model inputs shall be validated for type, size, range and applicable trust boundaries.                    |
| AI-003  | Inference shall have defined timeout, resource-exhaustion and failure behavior.                           |
| AI-004  | Model outputs shall be validated before they can trigger downstream actions.                              |
| AI-005  | AI output shall not bypass authorization, safety interlocks or deterministic control constraints.         |
| AI-006  | Model files, weights, plugins and runtime dependencies shall undergo provenance and security checks.      |
| AI-007  | Nondeterministic behavior shall be assessed where repeatability or safety requirements apply.             |
| AI-008  | AI-generated code shall undergo the same coding, security, testing and OSS review as human-authored code. |
| AI-009  | Model and runtime updates shall follow controlled change management and regression verification.          |
| AI-010  | Resource limits, degraded operation and fallback behavior shall be defined for applicable AI services.    |

AI-related coding rules do not replace the separate verification of model performance, training-data governance, robustness, intended-use limitations or system-level safety.

## 10. Coding rule applicability matrix

Not every rule should apply identically to every automotive component. Establish a project profile based on the component's actual risk, language, architecture and delivery obligations.

| Component profile              | Safety rules                                    | Security rules          | OSS controls                                     | Additional emphasis                                        |
| ------------------------------ | ----------------------------------------------- | ----------------------- | ------------------------------------------------ | ---------------------------------------------------------- |
| Safety-critical control ECU    | Strict                                          | Strict                  | Mandatory                                        | Timing, memory, independence and fault response            |
| ADAS perception and control    | Risk-based, potentially stringent               | Strict                  | Mandatory                                        | Real-time processing, sensor faults and degraded operation |
| Gateway / telematics ECU       | As assigned by safety analysis                  | Strict                  | Mandatory                                        | Protocol parsing, authentication and isolation             |
| Smart cockpit / infotainment   | As applicable                                   | Strict                  | Mandatory                                        | Privacy, IPC, parser robustness and dependency exposure    |
| Vehicle middleware             | According to consuming components               | Strict                  | Mandatory                                        | API contracts, resource ownership and isolation            |
| AI runtime / inference service | Based on intended use and safety allocation     | Strict                  | Mandatory                                        | Model provenance, output validation and resource limits    |
| Build and development tools    | Based on tool role                              | Strict                  | Mandatory                                        | Tool integrity, supply chain and reproducible builds       |
| Prototype / research code      | Project-defined; restricted from production use | Appropriate to exposure | Mandatory if redistributed or otherwise in scope | Clear status labeling and production promotion gate        |

A component's profile must be based on engineering assessment. For example, a non-safety-critical smart cockpit service can still be security-critical if it handles credentials or exposes a vehicle network interface.

## 11. End-to-end coding compliance workflow

### Gate 1 — Project initiation

Identify languages, software architecture, safety classification, cybersecurity risks, dependencies and contractual requirements.

Outputs: Coding profile, applicable standards matrix, initial OSS policy.

### Gate 2 — Development environment setup

Configure compiler warnings, formatters, static analysis, secure-development checks, dependency scanners and approved baselines.

Outputs: Tool configuration, rule mapping, CI/CD gates.

### Gate 3 — Coding and change review

Perform local analysis, peer review, unit tests, input validation and dependency approval.

Outputs: Review records, test results, defect and deviation records.

### Gate 4 — Integration verification

Run static analysis, integration and regression tests, applicable fuzzing, concurrency checks, security testing and OSS scans.

Outputs: Analysis reports, vulnerability assessment, component inventory.

### Gate 5 — Release readiness

Review unresolved findings, approved deviations, safety evidence, security risk, license obligations and SBOM completeness.

Outputs: Release compliance report, approved software baseline, distribution materials.

### Gate 6 — Field monitoring and maintenance

Monitor vulnerabilities, OSS changes, field defects and software updates. Reassess the impact of changed components and rules.

Outputs: Corrective actions, updated SBOM, revised compliance evidence.

### 11.1 CI/CD enforcement levels

| Check                               | Pull request                               | Main branch                          | Release                                       |
| ----------------------------------- | ------------------------------------------ | ------------------------------------ | --------------------------------------------- |
| Formatting and basic linting        | Block violations                           | Enforce baseline                     | Verify configuration                          |
| Compiler diagnostics                | Block new unapproved warnings              | Enforce approved baseline            | Archive build evidence                        |
| Static analysis                     | Block applicable release-blocking findings | Full configured scan                 | Review complete report                        |
| Unit tests                          | Required for affected code                 | Full component suite                 | Verify release baseline                       |
| Dependency and license scan         | Scan dependency changes                    | Scan complete dependency tree        | Approve final distribution obligations        |
| Secret scanning                     | Block detected secrets                     | Full repository scan                 | Final artifact scan where appropriate         |
| Fuzzing and sanitizers              | Run selected fast checks                   | Scheduled or change-triggered checks | Review applicable verification evidence       |
| Safety and cybersecurity regression | Risk-based change checks                   | Integration verification             | Confirm required safety and security evidence |
| SBOM generation                     | Optional interim SBOM                      | Generate candidate SBOM              | Validate release-specific SBOM                |
| Deviation validation                | Verify approved records                    | Enforce expiry and scope             | Final authorization review                    |

A CI gate must be fail-closed for defined mandatory conditions. If a required scanner is unavailable, the pipeline must not silently report success. Any emergency bypass must use an approved, auditable process with a documented restoration action.

## 12. Coding rule exception and deviation management

An exception is a controlled engineering decision, not permission to ignore an inconvenient finding.

### 12.1 Deviation workflow

1. Developer submits a deviation request with the rule ID, affected code and technical justification.
2. Static-analysis or code-review evidence identifies the exact violation and its scope.
3. The requester evaluates technical consequences, including safety, cybersecurity, maintainability and licensing impacts.
4. The designated authority reviews compensating controls and independent evidence where required.
5. The decision is recorded as approved, rejected or pending.
6. Approved exceptions are restricted to the identified code, version, rationale and validity period.
7. CI validates that the exception remains in scope and has not expired.
8. Changes to the code or its context trigger reassessment.

Non-waivable conditions: an internal deviation must never be used to waive a legal obligation, an applicable regulatory requirement, an unmet safety requirement, or an unacceptable unresolved cybersecurity risk. Such conditions require remediation or a legally and technically valid disposition through the appropriate governance process.

### 12.2 Required approvers

| Deviation type                           | Minimum review authority                            |
| ---------------------------------------- | --------------------------------------------------- |
| Formatting or minor maintainability      | Software team lead                                  |
| Language or static-analysis rule         | Software architect / coding-standard owner          |
| Safety-related rule                      | Functional Safety Manager or authorized safety role |
| Security-related rule                    | Product cybersecurity lead                          |
| OSS license or redistribution obligation | OSS compliance and Legal, as required               |
| Multiple risk domains                    | All relevant authorities                            |

The approver must be authorized under the applicable governance process; the developer must not self-approve a deviation where independent approval is required.

## 13. Coding compliance metrics and management dashboard

Metrics should measure both compliance and actual risk reduction. A high pass rate alone does not demonstrate robust software.

| KPI                         | Definition                                                                                                | Suggested management target    |
| --------------------------- | --------------------------------------------------------------------------------------------------------- | ------------------------------ |
| Mandatory rule coverage     | Applicable rules mapped to enforceable checks or documented verification methods / total applicable rules | 100%                           |
| Static-analysis completion  | Required analysis runs completed successfully / required runs                                             | 100%                           |
| Release-blocking findings   | Unresolved S0/S1 findings without an authorized disposition                                               | 0                              |
| Deviation traceability      | Active deviations with owner, rationale, approval, scope and review date                                  | 100%                           |
| OSS identification coverage | Identified components / components discovered by applicable scans and reconciliation                      | 100% or formally resolved gaps |
| OSS approval coverage       | Distributed components with completed license assessment / all distributed components                     | 100%                           |
| SBOM completeness           | Required release artifacts with validated SBOM / required release artifacts                               | 100%                           |
| Vulnerability remediation   | Findings resolved within their assigned risk-based deadlines                                              | Project-defined SLA            |
| Escaped coding defects      | Coding-related defects found after release                                                                | Downward trend                 |
| Reopened findings           | Previously closed findings that recur                                                                     | Downward trend                 |
| Regression effectiveness    | Relevant regression tests passed after changes                                                            | 100% of required release tests |
| Supplier compliance         | Supplier deliverables meeting the applicable coding and OSS profile                                       | 100% of required deliverables  |

Targets should be baselined and formally approved. In particular, the absence of S0/S1 findings is meaningful only if the required analyses were performed, their coverage was adequate, and findings were not suppressed.

## 14. Release compliance checklist

The following checklist can be used as the final coding-compliance review for an automotive software release.


### Governance

Approved coding profile and rule baseline

Approved compiler, analysis tools and configuration

Required training and code-review records complete

### Code quality and safety

Required static analysis completed and findings dispositioned

Required unit, integration and regression tests passed

Timing, stack, memory and concurrency evidence available where applicable

Safety traceability and required safety work products updated

### Cybersecurity

Security scanning and applicable fuzzing completed

No unresolved release-blocking vulnerabilities

Secrets, authentication, authorization and secure-update controls verified

Threat-driven security findings assessed and recorded

### OSS compliance

Direct and transitive dependencies inventoried

Licenses and intended-use obligations approved

Required notices and source materials prepared

Release-specific SBOM validated and reconciled

Known OSS vulnerabilities assessed

### Release authorization

All active deviations are valid and authorized

Required residual-risk approvals obtained

Build and artifact provenance recorded

Compliance report approved and archived

Copy checklist and status

This checklist is a working aid, not an automatic release approval or proof of compliance.

## 15. Implementation roadmap

A practical rollout can be completed in phases, with duration adjusted for the number of projects, languages, toolchains and existing process maturity.

| Phase                | Activities                                                                        | Deliverables                     |
| -------------------- | --------------------------------------------------------------------------------- | -------------------------------- |
| 1. Assess            | Inventory languages, products, standards, tools, suppliers and existing rules     | Gap assessment                   |
| 2. Define            | Approve enterprise policy, severity model, rule catalogue and deviation procedure | Controlled coding standard       |
| 3. Configure         | Establish language-specific profiles, analysis tools, CI gates and OSS scanning   | Tool configuration baseline      |
| 4. Pilot             | Apply the profile to representative safety, security and non-safety projects      | Pilot findings and tuning report |
| 5. Deploy            | Roll out to project repositories and supplier development processes               | Project compliance profiles      |
| 6. Audit and improve | Review metrics, escaped defects, vulnerability trends and OSS compliance          | Periodic governance report       |

Recommended priority: begin with C/C++ coding controls, static analysis, security-sensitive interfaces, dependency identification and OSS license governance. Extend the catalogue to other languages and AI-specific controls based on the actual software portfolio.

## 16. Official reference sources

- ISO 26262 — [ISO official standard series overview](https://www.iso.org/publication/PUB200262.html?utm_source=chatgpt.com).

- ISO/SAE 21434:2021 — [ISO official standard page](https://www.iso.org/standard/70918.html?utm_source=chatgpt.com). The ISO catalogue recorded the standard as under revision in October 2026, so verify the applicable edition and transition requirements before baselining it.&#x20;

  Road vehicles — Cybersecurity engineering

- ISO/IEC 5230:2020 — [ISO official standard page](https://www.iso.org/standard/81039.html?utm_source=chatgpt.com). ISO records this edition as reviewed and confirmed in 2026.&#x20;

  Information technology — OpenChain Specification

- OpenChain — [Open-source compliance resources and specifications](https://openchainproject.org/get-started?utm_source=chatgpt.com).

- SAE International — [Standards catalogue for automotive engineering](https://saemobilus.sae.org/?utm_source=chatgpt.com).

- SPDX — [SBOM and license data resources](https://spdx.dev/?utm_source=chatgpt.com).

- CycloneDX — [SBOM specifications and resources](https://cyclonedx.org/?utm_source=chatgpt.com).

The official MISRA and CERT publications should be used to map the proposed organization-defined rules to exact guideline identifiers, applicability conditions and deviation requirements. The catalogue above is a practical governance baseline, not a substitute for the licensed or officially published normative texts.

Recommended controlled document set

1. `POL-CODE-001` — Automotive Software Coding and Compliance Policy.
2. `STD-CODE-001` — Enterprise Coding Standard.
3. `CAT-CODE-C-001` — C Coding Rule Catalogue.
4. `CAT-CODE-CPP-001` — C++ Coding Rule Catalogue.
5. `CAT-SAFE-001` — Functional Safety Coding Rules.
6. `CAT-SEC-001` — Secure Coding Rules.
7. `PROC-OSS-001` — Open-Source Software Compliance Procedure.
8. `PROC-DEV-001` — Coding Deviation and Exception Procedure.
9. `WI-CI-001` — Automated Coding Compliance and CI/CD Enforcement.
10. `FRM-REL-001` — Software Coding Compliance and Release Checklist.

Together, these documents establish a traceable system in which every applicable rule has an owner, a defined verification method, an enforcement point, and auditable evidence.
