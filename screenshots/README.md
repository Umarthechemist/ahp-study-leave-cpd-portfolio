# AHP study leave and CPD: visual walkthrough

This selected set illustrates a test application moving from submission through approvals and procurement to reporting. The screenshots document the user journey; they are not a live demo or a complete record of every possible route.

> Personal details, record identifiers, operational figures, internal learning terms, and the manager review question have been covered. The organisation name in the learning outcomes form has been generalised. Some images were recreated during redaction and are illustrative rather than exact copies of the live interface. The original system and its data are not included in this repository.

## 1. Applicant submits a request

The applicant accepts the learning terms and enters their details in the request form. The terms and additional learning question are covered in this portfolio image. The form then collects the manager, course dates, funding source, supporting evidence, and expected learning outcomes.

- [Request form with internal terms covered](A1.png)
- [Manager and course dates](A3.png)
- [Funding and course evidence](A5.png)
- [Learning outcomes and submission](A7.png)

## 2. Line manager reviews the request

The line manager answers an internal review question and selects a decision in the review form. The question and its answers are covered in this portfolio image. In this test journey, the decision is approved and the applicant receives an update that the request is awaiting panel review.

- [Line manager review form](F1.png)
- [Manager decision email](E2.png)

## 3. Panel decision and procurement

The panel approval moves the request to procurement. The Power Apps process view records the payment route and related procurement fields. A later email confirms that a purchase order has been generated for the test course.

- [Panel approval email](E3.png)
- [Procurement stage in Power Apps](P2.png)
- [Purchase order update email](E1.png)
- [Completed applications view](P3.png)

## 4. Reporting

The overview summarises request statuses, funding, hours, and applications by profession. The application details page provides a filtered record view. Values and rows are covered in these portfolio images.

- [Overview dashboard](D2-O.png)
- [Application details dashboard](D5-A.png)

## 5. Power BI report

These illustrative redactions show the three Power BI report pages. All figures and chart values are concealed.

- [Overview](BI1-O.png)
- [Funding & Hours](BI2-F.png)
- [Application Details](BI3-A.png)

## 6. Power Automate example

[Applicant submission flow](PA1.png) shows one example of the automation: it retrieves a form response, checks supporting evidence, creates a Dataverse request record, and routes notifications. A policy-specific timing label has been generalised in this illustrative image. Other flows handle manager and panel decisions, procurement, and attendance.
