---
sidebar_label: "OSS Compliance"
sidebar_position: 6
title: "OSS Compliance Assurance Guideline"
description: "End-to-end open-source software compliance: governance, engineering controls, workflows and evidence."
---

Document type: Engineering Governance Guideline · Applicable scope: Automotive electronic software and embedded systems · Intended audience: Software Engineering, Functional Safety, Cybersecurity, Legal, Procurement, Product Quality and Supplier Management

# 1. Purpose and objectives
This guideline establishes an end-to-end **Open Source Software (OSS)** compliance assurance framework for automotive electronic software development. It defines the policies, governance structure, engineering controls, workflows, verification methods, release gates, and evidence requirements needed to ensure that open-source software is used lawfully, securely, transparently, and consistently across the vehicle software lifecycle.
The framework covers both direct OSS dependencies and indirect (transitive) dependencies, including source code, binary libraries, operating systems, middleware, SDKs, AI frameworks, development tools, container images, build systems, and supplier-provided software.

## 1.1 Assurance objectives
- License compliance: Fulfill applicable copyright, license notice, source-code disclosure, attribution, and redistribution obligations.
- IP and legal risk control: Prevent unauthorized use, incompatible licensing, improper relicensing, and intellectual property disputes.
- Cybersecurity: Identify vulnerable, malicious, abandoned, or compromised OSS components and manage their risks.
- Software supply-chain transparency: Maintain accurate component inventories, provenance, and traceability from source to vehicle software release.
- Automotive safety and quality: Evaluate OSS suitability for safety-related and mission-critical functions without assuming that license compliance implies technical suitability.
- Release assurance: Ensure no vehicle ECU, electronic control unit, cockpit system, domain controller, or OTA package is released without required OSS compliance evidence.

## 1.2 Guiding principles
1. No unidentified OSS in production.
2. No use without an approved license and usage assessment.
3. No distribution without an obligation assessment.
4. No release without verified compliance evidence.
5. No unresolved critical license, security, or provenance risks without formally authorized disposition.
6. No reliance on supplier declarations alone when independent verification is reasonably necessary.
7. Compliance is continuous: changes to dependencies, build configurations, products, distribution channels, or licenses trigger reassessment.

# 2. Scope and applicability

Vehicle electronic products
ECUs, body controllers, powertrain and chassis controllers, ADAS, infotainment, smart cockpit, telematics, gateways, zonal controllers and domain controllers.

Software layers and artifacts
Bootloaders, BSPs, RTOS, Linux, Android, middleware, communication stacks, cryptographic libraries, drivers, application frameworks, AI runtimes, model-serving dependencies, firmware and build artifacts.

Development and delivery ecosystem
Repositories, package managers, CI/CD pipelines, container images, test tools, generated code, supplier software, engineering workstations, cloud services and OTA delivery systems.

The scope includes production software and development or test software where its licensing, security, distribution, or contractual obligations create relevant risk.

## 2.1 OSS lifecycle coverage
| Lifecycle stage | Required compliance focus |
|---|---|
| Planning and procurement | OSS strategy, permitted licenses, supplier obligations |
| Architecture and design | Component selection, linkage model, copyleft implications |
| Development | Approved sources, license headers, attribution, dependency controls |
| Integration and build | Transitive dependencies, SBOM, source and binary traceability |
| Verification | License scanning, vulnerability analysis, notice and source completeness |
| Product release | Distribution-specific obligations, legal approval, release evidence |
| Field operation | Vulnerability monitoring, license changes, remediation and OTA updates |
| End of support | Retention of compliance records and fulfillment of continuing obligations |

# 3. Standards and reference framework
The organization should establish its OSS compliance program using recognized standards and industry references. The following sources provide a practical baseline.

| Standard or reference | Application to automotive OSS governance |
|---|---|
| ISO/IEC 5230:2020 | Organizational OSS license compliance program, roles, processes and evidence. The ISO catalogue confirms that this edition remains current following its 2026 review. |
| ISO/IEC 18974:2023 | OSS security assurance program, complementing license compliance. |
| SPDX | Standardized license identifiers, license expressions, copyright metadata and SBOM representation. |
| SLSA | Build integrity, artifact provenance and software supply-chain trust. |
| ISO 26262 | Functional-safety engineering and evidence for applicable safety-related software. |
| ISO/SAE 21434 | Cybersecurity risk management for automotive electrical and electronic systems. |
| UNECE R155/R156 | Vehicle cybersecurity management and software-update management where applicable. |

These references address different concerns. License compliance, cybersecurity, functional safety and software-update governance must be coordinated, not treated as interchangeable certifications.
Implementation note: ISO/IEC 5230 is a strong starting point for the OSS license compliance management system. ISO/IEC 18974 provides a complementary OSS security assurance reference. Confirm the applicable editions, contractual requirements, target markets and vehicle regulatory obligations during program planning.

# 4. OSS compliance governance model
## 4.1 Three-level governance structure
![OSS compliance diagram 1](/img/cq/image-1.png)

## 4.2 Roles and responsibilities
| Role | Core responsibility |
|---|---|
| Executive sponsor | Approves policy, resources and enterprise risk appetite |
| OSS Program Office / Open Source Program Office (OSPO) | Owns the compliance process, approved-license catalogue, training and metrics |
| Legal / IP counsel | Interprets license obligations, resolves ambiguity and approves exceptional legal risk |
| Software architect | Evaluates dependency architecture, linking, distribution and alternatives |
| Software development team | Declares dependencies, preserves notices and follows approved contribution and intake practices |
| OSS compliance engineer | Maintains inventory, scans components, analyzes findings and prepares compliance artifacts |
| Product cybersecurity team | Assesses CVEs, malicious packages, provenance, maintenance and vulnerability remediation |
| Functional safety team | Evaluates safety relevance, assumptions, verification evidence and lifecycle impacts |
| Procurement and supplier quality | Establishes OSS disclosure, audit, remediation and delivery requirements in contracts |
| Release manager / product quality | Enforces release gates and ensures evidence is complete and approved |

No individual should be able to bypass a mandatory release control merely because the component is technically functional or the delivery deadline is urgent.

# 5. OSS policy requirements
The enterprise OSS policy should contain the following mandatory rules.

## 5.1 Component intake and usage
1. OSS components must be obtained from identifiable, authorized or otherwise verified sources.
2. Every production dependency must have a recorded name, version, source, license, origin and product usage.
3. Unidentified or license-ambiguous components must be quarantined until resolved.
4. Components must undergo both license and technical suitability assessments.
5. New dependencies must use approved versions and repositories wherever practical.
6. Modified OSS must retain required notices and modification records.
7. External contributions must follow project-specific contribution requirements and corporate IP policy.
8. OSS must not be incorporated into proprietary deliverables in a way that violates its license terms.

## 5.2 Prohibited or restricted practices
- Copying source code from websites, forums or repositories without recording its origin and license.
- Removing copyright notices, license texts or required attribution.
- Using components with unknown or conflicting licensing without resolution.
- Distributing GPL-, LGPL-, AGPL- or other copyleft-licensed components without analyzing the actual obligations triggered by the intended use.
- Treating a permissive license as permission to ignore attribution, notices, patent provisions or other terms.
- Modifying a scanner report to conceal a license, component or vulnerability finding.
- Delivering a software package without the required notices, source code or other license artifacts.
- Assuming that an SBOM alone demonstrates compliance.

## 5.3 Policy exception requirements
Every exception must include a unique ID, affected product and version, component and license, business justification, legal assessment, technical mitigations, residual risk, compensating controls, approving authorities, expiration date and reassessment trigger.
Legal approval is required for unresolved license interpretation or material IP risk. Cybersecurity and functional safety authorities must independently approve exceptions within their respective domains.

# 6. License classification and risk-based approval
The organization should maintain a controlled OSS license catalogue, mapping license identifiers to permitted uses, obligations, prohibited use cases and approval requirements. Classification must consider the exact license version, exceptions, component modification, linking or combination, and distribution model.

## 6.1 Recommended license risk categories
**Low** Category A — Generally permitted
Examples: MIT, BSD-2-Clause, BSD-3-Clause, ISC, Apache-2.0.
Require license verification, applicable attribution and notice retention. Apache-2.0 additionally requires attention to its patent provisions and any applicable NOTICE file obligations. 

**Medium** Category B — Conditional approval
Examples: LGPL-2.1, LGPL-3.0, MPL-2.0 and other licenses requiring analysis of modifications, file-level obligations, relinking, or source availability.
Review the exact integration architecture and distribution model. LGPL static linking, for example, can introduce object-file or relinking obligations. 

**High** Category C — Legal review required
Examples: GPL, AGPL, unknown or custom licenses, conflicting license expressions, and components with unclear provenance.
Determine whether the planned integration and distribution are permitted and identify all resulting obligations. GPL-covered binary distribution generally requires corresponding source under the applicable terms; AGPL requires separate analysis of its network-interaction provisions. 

These are recommended enterprise screening categories, not universal legal classifications. A permissive license can still create a compliance failure, and a copyleft license is not inherently prohibited. The decision depends on the specific license, product architecture, usage and distribution.
## 6.2 Mandatory license review dimensions
Every component approval must assess:
- License identity, version, SPDX identifier and any exceptions.
- Original copyright holders and license provenance.
- Whether the component is used unchanged, modified, linked, embedded or redistributed.
- Whether the component is distributed as source, binary, firmware, container, cloud service or a combination.
- Required copyright and attribution notices.
- Source-code availability, corresponding source and build-script requirements where applicable.
- Patent grants, patent termination provisions, trademarks and export or third-party restrictions where relevant.
- Compatibility with other included components and the intended product licensing model.
- Applicable obligations for modifications and downstream redistribution.
- Required customer-facing notices, source delivery channels and long-term availability.
Mandatory decision rule: automated license identification may recommend a classification, but ambiguous, conflicting or material licensing questions must be resolved by authorized reviewers.
# 7. End-to-end OSS compliance workflow
The following workflow should be implemented across product development and release management.
![OSS compliance diagram 2](/img/cq/image-2.png)

## 7.1 Workflow control requirements
| Control point | Pass condition | Failure action |
|---|---|---|
| Component intake | Complete identity and source data | Block approval |
| License analysis | License verified and obligations understood | Quarantine or escalate |
| Dependency scan | Required dependency coverage achieved | Block baseline acceptance |
| Risk review | Required technical and legal approvals obtained | Reject or hold |
| Build verification | Actual build matches approved dependency baseline | Block release candidate |
| Artifact generation | Required SBOM, notices and source artifacts are complete | Block release |
| Final release gate | All mandatory controls pass with evidence | No release authorization |

The controls should operate at both component intake and final product release. A previously approved component does not automatically remain approved when its version, license, distribution method or product integration changes.
# 8. OSS inventory and SBOM management
A Software Bill of Materials (SBOM) is a central compliance artifact. SPDX provides a standardized approach to license and component metadata; SBOMs should also support security and supplier traceability. 

## 8.1 Minimum component record
| Field | Requirement |
|---|---|
| Component identity | Name, version, package URL where applicable |
| Origin | Repository, supplier or distribution source |
| License | Declared license, detected license, SPDX identifier/expression |
| Copyright | Relevant copyright holders and notice locations |
| Dependency information | Direct/transitive relationship and parent component |
| Integration | Static/dynamic linking, embedding, process isolation or other applicable method |
| Modification status | Original, patched or modified; patch references |
| Product mapping | ECU, domain controller, software image, product and release |
| Security status | Vulnerabilities, remediation status and exceptions |
| Approval status | Owner, reviewers, decision and date |
| Compliance artifacts | License texts, notices, source package location or written offer as applicable |
## 8.2 SBOM requirements
1. Generate an SBOM from the actual release build or verified build inputs, not solely from a manually maintained list.
2. Include direct and transitive production dependencies to the extent supported by the format and discovery process.
3. Record versions and stable identifiers; avoid unversioned component references where identification is possible.
4. Reconcile SBOM records against build manifests, package inventories and final artifacts.
5. Preserve provenance and record the SBOM format and specification version.
6. Provide the SBOM to authorized internal stakeholders and external recipients according to contract, regulation, security policy and disclosure rules.
7. Regenerate or update the SBOM when a release changes.
8. Retain historical SBOMs so the organization can identify affected vehicle software when a vulnerability or licensing issue emerges.
## 8.3 Recommended compliance artifact package
For each production release, maintain a controlled package containing:
- Final SBOM in an approved format.
- OSS component inventory and license assessment.
- Third-party copyright and attribution notices.
- Applicable license texts and modification notices.
- Required source-code packages, corresponding source, build/install scripts or written offers, as determined by the license.
- Supplier declarations and relevant contractual records.
- License scan and manual-review reports.
- Exception approvals and residual risk acceptance.
- Final release compliance sign-off.
The exact package varies by license and distribution model; not every component requires every artifact.

# 9. Engineering implementation requirements
OSS compliance must be embedded in the development toolchain rather than relying exclusively on a release-time legal review.

## 9.1 Source-code and repository controls
| Control | Implementation guideline | Verification evidence |
|---|---|---|
| Repository allowlist | Use approved source registries and repositories | Repository configuration |
| Dependency pinning | Pin versions and use lockfiles where supported | Dependency manifest |
| License headers | Preserve required upstream notices and add appropriate headers to new files | Header scan report |
| Change tracking | Record upstream commits, local patches and modifications | Patch register |
| Dependency changes | Require review for adding, upgrading or removing OSS | Pull request and approval record |
| Code provenance | Record source URLs, checksums and acquisition methods | Provenance record |
| License changes | Detect changes in upstream license files or declared license metadata | License-change alert |
| Reproducibility and integrity | Use controlled build inputs and verify artifacts against trusted provenance where feasible | Build attestation or verification report |

A dependency version should not be silently replaced during a build. The approved baseline must identify the actual component version used to create the production artifact.

## 9.2 CI/CD compliance gates

![OSS compliance diagram 3](/img/cq/image-3.png)

The pipeline should fail closed for mandatory controls. Approved waivers may allow a narrowly defined exception only where the organization's governance permits it.

Recommended automated rules:
- Fail on unknown or unapproved licenses in production dependencies.
- Fail on missing required component identity or version.
- Fail when prohibited license combinations have not been resolved.
- Fail when required license texts or notices are missing.
- Fail when the SBOM does not match the approved release baseline.
- Flag newly introduced components and upstream license changes.
- Route suspected license conflicts to human review instead of making an unsupported automatic legal determination.

# 9.3 Tool capability requirements
Tool selection should be based on demonstrated coverage, accuracy, integration and evidence quality, not on a vendor's feature claims alone.

| Capability | Acceptance criterion |
|---|---|
| Source and binary scanning | Detects components in the applicable source and compiled artifacts |
| License identification | Supports license-text detection, SPDX expressions and manual overrides with audit history |
| Dependency resolution | Captures direct and transitive dependencies |
| SBOM generation | Exports a validated, versioned SBOM |
| Vulnerability management | Maps component versions to security advisories and tracks remediation |
| Policy enforcement | Applies configurable rules in development and release pipelines |
| Evidence retention | Stores scan reports, approvals and historical baselines |
| Supplier integration | Imports and validates supplier SBOMs and compliance declarations |

> **Note:** Tools are supporting controls. They cannot independently establish that all legal obligations have been fulfilled.

# 10. Supplier and third-party software assurance
Automotive products frequently contain supplier-controlled middleware, BSPs, operating systems, SDKs, firmware and binary-only deliverables. Supplier governance is therefore a mandatory part of the OSS compliance system.

## 10.1 Supplier qualification requirements
Before accepting a production software delivery, require the supplier to:
1. Disclose direct and transitive OSS components within the agreed scope.
2. Identify component versions, licenses, source origins and modifications.
3. Supply an SBOM and explain its generation method and coverage limitations.
4. Provide required notices, license texts and source-related artifacts.
5. Disclose known license conflicts, disputed ownership and unapproved dependencies.
6. Provide a process for vulnerability notification and remediation.
7. Notify the customer of material changes to component inventory, license terms or source provenance.
8. Preserve evidence supporting the supplied software's compliance status.
9. Support audits or reasonable verification requests under agreed confidentiality and contractual conditions.
10. Maintain a remediation and escalation process for noncompliance discovered after delivery.

## 10.2 Supplier acceptance checklist

**Supplier OSS acceptance review**

- [ ] SBOM received and validated
- [ ] Component identities and versions are traceable
- [ ] License and copyright data are complete
- [ ] Required notices and license texts are included
- [ ] Source obligations and delivery methods are assessed
- [ ] Security vulnerabilities and known exceptions are disclosed
- [ ] Contractual notification and remediation obligations are agreed
- [ ] Release-specific evidence is archived


Supplier contractual obligations should be flowed down to relevant subcontractors. Where a supplier cannot disclose source code for legitimate reasons, alternative evidence may support component verification, but it must not replace a source-code obligation imposed by an applicable license.

# 11. Automotive-specific assurance considerations

## 11.1 Functional safety
OSS license approval and functional-safety approval are independent decisions.
For software used in safety-related functions:
- Identify the OSS component's role in the safety architecture.
- Assess its assumptions of use, known limitations, failure modes and dependencies.
- Evaluate verification evidence, configuration management, defect history and maintenance arrangements.
- Determine whether additional analysis, testing, qualification or safety measures are necessary for the intended use.
- Record the rationale for accepting the component within the applicable safety lifecycle.
- Reassess the impact of component upgrades and patches on safety evidence.
The use of OSS does not automatically establish compliance with ISO 26262. Equally, an OSS license does not inherently make a component unsuitable for safety-related use.

## 11.2 Cybersecurity and software supply-chain security
OSS security review should cover:
- Known vulnerabilities and applicable severity and exploitability.
- Malicious or compromised packages and upstream repositories.
- Dependency confusion and package substitution risks.
- Source and binary integrity, signing and provenance.
- Abandoned projects, maintenance health and unsupported versions.
- Vulnerability remediation and coordinated disclosure.
- Security impact of local modifications and backported fixes.
SLSA provides a useful reference for progressively improving build integrity and software artifact provenance. 

## 11.3 ECU, firmware and OTA distribution
For each ECU software image or OTA package, the organization should:
1. Bind the release to an immutable software manifest.
2. Map included OSS components to the exact software image and version.
3. Verify the applicability of license obligations to the distribution model.
4. Include or provide required notices and source-related materials as applicable.
5. Preserve the exact component and artifact records for future investigations.
6. Ensure updates trigger the appropriate SBOM, vulnerability and license reassessment.
7. Maintain a method to identify affected released versions when a component is withdrawn, found vulnerable or discovered to be noncompliant.

## 11.4 AI and machine-learning software stacks
For cockpit assistants, cross-domain AI platforms and other AI-enabled automotive software, OSS assurance should additionally cover:
- AI frameworks, inference runtimes, tokenizers and supporting libraries.
- Model weights and datasets under their own licenses and terms.
- Code generators, plugins and model-conversion tools.
- Third-party assets, sample code and bundled model artifacts.
- Model redistribution rights and usage restrictions.
- Provenance and integrity of downloaded models and packages.

Important: a model's license is not necessarily the same as the license of its framework, source code, training data or accompanying artifacts. Track these as distinct inventory objects and assess each applicable license or agreement.

# 12. Compliance metrics and audit
## 12.1 Recommended key performance indicators
The following are proposed starting targets for an automotive engineering organization. They should be calibrated to the product risk, baseline maturity and contractual requirements.

| KPI | Definition | Initial target |
|---|---|---|
| OSS inventory coverage | Production dependencies inventoried / identified production dependencies | 100% |
| License identification coverage | Production dependencies with verified license status / production dependencies | 100% |
| Approved dependency ratio | Approved production dependencies / identified production dependencies | 100% before release |
| SBOM release coverage | Production releases with validated SBOMs / production releases | 100% |
| Notice fulfillment | Applicable notice obligations fulfilled / identified notice obligations | 100% |
| Open critical license findings | Unresolved critical license findings at release | 0 |
| Overdue remediation | High-risk findings past approved due dates | 0 without approved exception |
| Supplier evidence coverage | Applicable suppliers with accepted OSS evidence / applicable suppliers | 100% before release |
| Audit traceability | Sampled components traceable to source, approval and release | 100% |

Metrics must not reward teams for suppressing findings, reducing reported dependencies or treating unverified scan results as confirmed compliance.

## 12.2 Audit frequency
- Every pull request or dependency change: automated policy checks.
- Every release candidate: complete release compliance verification.
- Quarterly: review overdue findings, policy exceptions, supplier changes and license changes.
- At least annually: audit the OSS governance program, process effectiveness, training and evidence retention.
- On a material trigger: reassess immediately when a significant legal, security, supplier or provenance issue arises.
Retain evidence according to applicable legal, contractual, regulatory and corporate retention requirements.

# 13. Standard operating procedure templates
The following templates can be adopted directly as controlled engineering records.
## 13.1 Template A — OSS intake and approval record
![OSS compliance diagram 4](/img/cq/image-4.png)
The permanent record should also include an intake ID, transitive dependencies, modification details, security findings, reviewer identities, approval dates and links to evidence.

## 13.2 Template B — License obligation assessment
| Assessment field | Required entry |
|---|---|
| Component and version | Exact component identity |
| Declared and verified license | SPDX expression and source of verification |
| License version and exceptions | Full applicable terms |
| Distribution model | Internal use, binary delivery, source delivery, firmware, service or other |
| Integration method | Linking, embedding, modification, process separation or other |
| Required actions | Attribution, license text, modification notices, source availability and other applicable terms |
| Compatibility assessment | Compatibility with surrounding software and product licensing |
| Open questions | Unresolved interpretation or provenance issues |
| Disposition | Approved, conditional, rejected or quarantined |
| Approval evidence | Legal and engineering reviews where required |

## 13.3 Template C — OSS release compliance sign-off
**Release checklist**

- [ ] SBOM generated from the release baseline and validated
- [ ] All production dependencies have known and reviewed license status
- [ ] License compatibility and applicable obligations assessed
- [ ] Required license texts, notices and modification records included
- [ ] Applicable source-code and corresponding-source obligations fulfilled or supported by valid delivery arrangements
- [ ] Supplier declarations and evidence accepted
- [ ] Critical license and provenance findings resolved
- [ ] Security findings reviewed and dispositioned
- [ ] Functional-safety review completed where applicable
- [ ] Exceptions approved by authorized stakeholders
- [ ] Compliance package archived and linked to release identifier

# 14. Implementation roadmap
A staged rollout reduces the risk of building a paper-only compliance process.
1. Phase 1 — Establish governance (Weeks 1–4)
   
   Approve the OSS policy, define accountability, identify in-scope product lines, establish license risk categories, and define exception and escalation mechanisms.
2. Phase 2 — Inventory and tooling (Weeks 5–8)
   
   Discover existing OSS, assess dependency coverage, select scanning and SBOM tools, build the approved-license catalogue, and define supplier disclosure requirements.
3. Phase 3 — Pilot integration (Weeks 9–12)
   
   Pilot the workflow on one representative ECU, embedded Linux product or smart cockpit software stack. Validate scanning, legal review, artifact generation and release gates.
4. Phase 4 — Production deployment (Months 4–6)
   
   Integrate the controls into CI/CD and product release management, onboard suppliers, train engineering teams, and require release evidence for in-scope products.
5. Phase 5 — Continuous improvement (Ongoing)
   
   Audit effectiveness, monitor vulnerabilities and upstream changes, improve dependency discovery, measure compliance KPIs and assess alignment with ISO/IEC 5230 and ISO/IEC 18974.

These timelines are planning estimates, not standard-mandated deadlines. Existing product maturity, supplier cooperation, legal complexity and legacy code may require a longer rollout.

# 15. Official references and implementation resources
- ISO/IEC 5230:2020 — Official ISO catalogue.
- OpenChain Project — Standards and adoption resources.
- SPDX License List — Official license list.
- GNU GPL FAQ — Official guidance on GPL obligations.
- Apache License 2.0 — Official license text.
- SLSA — Framework and implementation guidance.

**Final recommendation**

For automotive electronic software development, establish a unified OSS Compliance Assurance Management System that combines:
1. Corporate policy and clear accountability.
2. Risk-based license and IP assessment.
3. Automated component discovery and SBOM management.
4. Secure, traceable dependency integration.
5. Supplier compliance and contractual controls.
6. Independent functional-safety and cybersecurity assessments where applicable.
7. Evidence-based release gates and continuous monitoring.

The essential acceptance criterion is that every production software release has a traceable inventory of its OSS components, verified applicable obligations, fulfilled distribution requirements, documented exceptions and authorized compliance sign-off. This provides a repeatable, auditable foundation for OSS compliance across the automotive product lifecycle.