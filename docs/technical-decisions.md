# Technical Decisions

## Microsoft Forms for intake

Microsoft Forms provides the applicant and line manager with structured entry points. Power Automate transfers their responses into the request workflow. This requires careful mapping of choice fields, text, and supporting evidence.

## Dataverse as the request record

Dataverse holds the application and its changing status so that the Power Apps interface, flows, and reporting can work from the same record.

## Separate approval stages

Line manager and panel decisions are handled as distinct stages. Each decision updates the request and triggers the relevant applicant communication.

## Procurement routes

Purchase orders and card payments follow different steps and need different status updates. The workflow records progress while people complete the financial actions.

## Reporting

The Power Apps dashboard supports day-to-day request monitoring. Power BI provides a separate view of application volumes, funding, hours, and outcomes. Consistent field and status definitions are needed across both.

## Current limitations

The portfolio documents the process and selected redacted visuals; it does not contain a deployable copy of the organisation's solution.
