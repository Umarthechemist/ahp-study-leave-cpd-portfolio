# Data Model Overview

## Central application record

A Dataverse application record brings together the information needed to track a study leave or CPD request from submission through decision and completion. This is a conceptual overview, not an export of the production schema.

| Information group | Examples of information held |
|---|---|
| Request identity | Request ID and current status |
| Applicant and activity | Profession, course or activity, dates and requested hours |
| Funding | Funding source, requested cost and approved funding |
| Review | Line manager response, panel decision and outcome |
| Administration | Supplier, procurement or payment progress where applicable |
| Follow-up | Completion and attendance confirmation |

## How information changes

1. Microsoft Forms captures the initial request.
2. Power Automate creates the Dataverse application record.
3. Later responses and decisions update the same request.
4. Administrators review and update progress through the model-driven app.
5. Power BI uses application data to report on requests, outcomes, funding and hours.

The application record provides a shared reference across these stages. Status and decision fields help distinguish requests awaiting review, approved requests needing further administration, declined requests and completed requests.

## Portfolio scope

The groups above illustrate the design without publishing actual application records, personal details, internal identifiers, connection settings or a solution export. They should not be treated as a complete field list or a production database diagram.
