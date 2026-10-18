import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import React from 'react';

const sections = [
  {
    badge: 'Governance',
    title: 'Governance & Framework',
    text: 'The controlled process, roles, quality gates and evidence that govern code quality across the lifecycle.',
    links: [
      {to: '/docs/governance/framework', label: 'Code Quality Management Framework'},
      {to: '/docs/governance/management-procedure', label: 'Management Procedure'},
    ],
  },
  {
    badge: 'Engineering',
    title: 'Engineering Guidelines',
    text: 'Hands-on rules and methods applied every day by development teams.',
    links: [
      {to: '/docs/guidelines/coding-standards-rule-catalogue', label: 'Coding Standards & Rule Catalogue'},
      {to: '/docs/guidelines/static-analysis-toolchain', label: 'Static Analysis & Toolchain'},
      {to: '/docs/guidelines/code-review', label: 'Code Review'},
      {to: '/docs/guidelines/unit-testing', label: 'Unit Testing'},
      {to: '/docs/guidelines/robustness-verification', label: 'Robustness Verification'},
      {to: '/docs/guidelines/oss-compliance', label: 'OSS Compliance'},
    ],
  },
  {
    badge: 'Assurance',
    title: 'Assurance, Audit & Release',
    text: 'Independent assurance, defect handling and the final release decision.',
    links: [
      {to: '/docs/assurance/defect-escalation-deviation', label: 'Defect Escalation & Deviation'},
      {to: '/docs/assurance/qa-audit-checklist', label: 'QA & Audit Checklist'},
      {to: '/docs/assurance/release-quality-checklist', label: 'Release Quality Checklist'},
      {to: '/docs/assurance/quality-dashboard', label: 'Quality Dashboard'},
    ],
  },
];

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="Code Quality Management"
      description="Automotive embedded software code quality assurance framework — standards, guidelines, checklists and release gates."
    >
      <header className="hero">
        <div className="container">
          <img className="hero-logo" src="/img/CodeQuality.png" alt="Code Quality Management logo" />
          <h1 className="hero-title">Code Quality Management</h1>
          <p className="hero-subtitle">
            A controlled, lifecycle-based code quality assurance framework for automotive
            embedded software — from coding standards and static analysis to independent audit,
            defect escalation and release gates.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-primary" to="/docs">
              Read the Documentation
            </Link>
            <Link className="btn btn-ghost" to="/docs/category/governance--framework">
              Start with the Framework
            </Link>
          </div>
        </div>
      </header>

      <main className="container">
        <section className="section">
          <h2 className="section-title">A controlled, auditable document set</h2>
          <p className="section-sub">
            Twelve aligned documents organized into three layers — governance, engineering and assurance.
          </p>
          <div className="cq-grid">
            {sections.map((s) => (
              <div className="cq-card" key={s.title}>
                <span className="cq-badge">{s.badge}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <ul>
                  {s.links.map((l) => (
                    <li key={l.to}>
                      <Link to={l.to}>{l.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
}
