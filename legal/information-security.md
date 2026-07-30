---
title: Information Security Policy
description: How Aurexus Group Ltd protects information assets, systems and data across its engineering, platforms and operations.
lastUpdated: 2026-07-30
effectiveDate: 2026-07-30
slug: information-security
---

## Introduction

Information security is fundamental to everything Aurexus Group Ltd ("Aurexus", "we", "us" or "our") builds. As an AI engineering and intelligent transformation company operating in healthcare, pharmaceutical and other regulated contexts, we are entrusted with sensitive data and critical systems. This Information Security Policy describes our approach to protecting confidentiality, integrity and availability of information.

This policy applies to all personnel, contractors, partners and systems within Aurexus' control, including our corporate infrastructure and product platforms (BioAegix, NPTTE PharmaNG, BeatIQ).

## Security Principles

Our security approach is guided by:

- **Defence in depth** — multiple layers of controls across people, process and technology
- **Least privilege** — access granted only to what is necessary for role and task
- **Security by design** — controls embedded from architecture through deployment
- **Accountability** — clear ownership, logging and audit trails
- **Continuous improvement** — regular assessment, testing and adaptation
- **Proportionality** — controls scaled to risk, recognising our stage as a growing organisation

## Scope

This policy covers:

- Corporate IT systems, email and communications
- Website and cloud infrastructure
- Software development, source code and CI/CD pipelines
- Client platforms and hosted environments
- Physical security at our registered office and remote working arrangements
- Third-party and supply chain security

## Governance

Security governance responsibilities:

| Role | Responsibility |
|---|---|
| Leadership | Approve policy, allocate resources, oversee major incidents |
| Engineering | Implement technical controls, secure development practices |
| All personnel | Comply with policy, report incidents, protect credentials |

We will formalise a dedicated security lead and structured governance forums as the organisation scales. Current controls are proportionate to our size and risk profile.

## Asset Management

We maintain inventories of:

- Hardware and endpoint devices
- Cloud services and infrastructure components
- Applications and platform deployments
- Data stores and classification levels

Assets are assigned owners responsible for appropriate protection throughout their lifecycle.

## Data Classification

Information is classified to ensure appropriate handling:

| Classification | Description | Examples |
|---|---|---|
| **Public** | Approved for public release | Marketing content, published policies |
| **Internal** | Internal use, limited sensitivity | Internal documentation, business plans |
| **Confidential** | Sensitive business or personal data | Client contracts, employee records, contact databases |
| **Restricted** | Highly sensitive, regulated data | Healthcare operational data, security credentials, encryption keys |

Handling requirements increase with classification level, including access restrictions, encryption and secure disposal.

## Access Control

We implement:

- Unique user identities — no shared accounts in production environments
- Role-based access control aligned to job function
- Multi-factor authentication for administrative, cloud and source code access
- Regular access reviews and prompt deprovisioning on role change or departure
- Privileged access management for elevated permissions

Remote access requires approved devices, secure connections and compliance with acceptable use standards.

## Secure Development

Our engineering practices include:

- Secure coding standards and peer review
- Dependency scanning and vulnerability management for third-party libraries
- Separation of development, staging and production environments
- Secrets management — no credentials in source code
- Automated testing including security-relevant test cases
- Change management with documented approvals for production releases

AI components follow the same security rigour as all platform code. See our [Responsible AI Policy](/legal/responsible-ai).

## Infrastructure and Cloud Security

Cloud and infrastructure controls include:

- Encryption in transit (TLS 1.2+) for data transmission
- Encryption at rest for databases and storage containing confidential or restricted data
- Network segmentation and firewall rules
- Patch management for operating systems and applications
- Backup and recovery procedures with tested restoration
- Logging and monitoring of security-relevant events

Cloud providers are selected based on security certifications, data residency options and contractual protections.

## Endpoint and Physical Security

- Company and personal devices accessing Aurexus systems must use screen locks, current operating system patches and endpoint protection
- Full-disk encryption is required for devices storing confidential or restricted data
- Physical access to office premises is controlled appropriately
- Clear desk and clear screen practices are encouraged

## Email and Communications

- Phishing awareness and verification of unusual requests
- Encryption for transmission of sensitive information where appropriate
- Approved channels for sharing confidential client data — not personal email for restricted data

## Third-Party Security

Suppliers and subprocessors with access to Aurexus or client data are assessed for security capability before engagement. Contracts include confidentiality, security and breach notification requirements.

We maintain awareness of our supply chain and limit data sharing to what is necessary.

## Incident Response

We maintain procedures to:

1. **Detect** — monitoring, alerts and user reporting
2. **Contain** — isolate affected systems, revoke compromised credentials
3. **Investigate** — determine scope, cause and impact
4. **Notify** — inform affected parties, clients, ICO and others as required by law and contract
5. **Recover** — restore services, implement fixes
6. **Learn** — post-incident review and control improvements

Security incidents and suspected breaches must be reported immediately to admin@bioaegix.com with subject line "Security Incident".

See our [Vulnerability Disclosure Policy](/legal/vulnerability-disclosure) for external reporting.

## Business Continuity

We maintain backup and recovery capabilities proportionate to our operations. Business continuity and disaster recovery plans are developed and tested as our client deployments mature.

## Personnel Security

- Background checks proportionate to role and data access (where lawful and practicable)
- Security awareness during onboarding and periodically thereafter
- Confidentiality obligations in employment and contractor agreements
- Prompt access revocation on termination

## Compliance

This policy supports compliance with:

- UK GDPR and Data Protection Act 2018
- Contractual security requirements with clients and partners
- Sector-specific standards applicable to healthcare and pharmaceutical deployments (including NHS DSPT principles where relevant to client engagements)

We align with recognised frameworks such as ISO/IEC 27001 principles as we mature, without claiming certification unless formally achieved.

## Policy Review

This policy is reviewed at least annually and following significant security incidents or changes to our technology landscape.

## Reporting Vulnerabilities

External security researchers should report vulnerabilities through our [Vulnerability Disclosure Policy](/legal/vulnerability-disclosure). We do not pursue legal action against good-faith researchers who comply with that policy.

## Contact

**Security enquiries:** admin@bioaegix.com  
**Subject line:** Information Security  
**Post:** Aurexus Group Ltd, Unit A, 82 James Carter Road, Mildenhall, Bury St. Edmunds, Suffolk, England, IP28 7DE

**Governing law:** England and Wales
