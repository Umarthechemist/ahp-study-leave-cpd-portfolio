/**
 * Portfolio adaptation of an AHP study leave dashboard.
 * All records and amounts below are fictional. No live data or organisation
 * environment connection is included. This is not the deployed Power Apps page.
 */
import React, { useMemo, useState } from "react";

type Decision = "Awaiting manager" | "Awaiting panel" | "Approved" | "Declined" | "Cancelled" | "Completed";
type Funding = "CPD funding" | "No cost" | "Self-funded" | "Other source";
type Request = {
  id: string;
  profession: string;
  submitted: string;
  status: Decision;
  funding: Funding;
  courseCost: number | null;
  workingHours: number | null;
};

// Fictional records used only to demonstrate filters and calculations.
const SAMPLE_REQUESTS: Request[] = [
  { id: "DEMO-001", profession: "Physiotherapist", submitted: "2026-04-14", status: "Completed", funding: "CPD funding", courseCost: 180, workingHours: 7 },
  { id: "DEMO-002", profession: "Dietitian", submitted: "2026-05-03", status: "Awaiting panel", funding: "CPD funding", courseCost: 240, workingHours: 14 },
  { id: "DEMO-003", profession: "Occupational therapist", submitted: "2026-05-21", status: "Approved", funding: "No cost", courseCost: 0, workingHours: 3 },
  { id: "DEMO-004", profession: "Speech and language therapist", submitted: "2026-06-11", status: "Declined", funding: "CPD funding", courseCost: 120, workingHours: 6 },
  { id: "DEMO-005", profession: "Physiotherapist", submitted: "2026-07-09", status: "Awaiting manager", funding: "Self-funded", courseCost: 75, workingHours: null },
  { id: "DEMO-006", profession: "Dietitian", submitted: "2026-07-25", status: "Cancelled", funding: "Other source", courseCost: 95, workingHours: 2 },
];

const approved = (request: Request) => request.status === "Approved" || request.status === "Completed";
const validAmount = (value: number | null) => typeof value === "number" && Number.isFinite(value) && value >= 0 ? value : 0;
const pounds = (value: number) => new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(value);

function summarise(requests: Request[]) {
  const approvedRequests = requests.filter(approved);
  return {
    total: requests.length,
    completed: requests.filter(r => r.status === "Completed").length,
    approved: approvedRequests.length,
    declined: requests.filter(r => r.status === "Declined").length,
    awaitingManager: requests.filter(r => r.status === "Awaiting manager").length,
    awaitingPanel: requests.filter(r => r.status === "Awaiting panel").length,
    cpdRequested: requests.filter(r => r.funding === "CPD funding").reduce((sum, r) => sum + validAmount(r.courseCost), 0),
    cpdApproved: approvedRequests.filter(r => r.funding === "CPD funding").reduce((sum, r) => sum + validAmount(r.courseCost), 0),
    approvedWorkingHours: approvedRequests.reduce((sum, r) => sum + validAmount(r.workingHours), 0),
  };
}

export default function PortfolioDashboardDemo() {
  const [profession, setProfession] = useState("");
  const [funding, setFunding] = useState("");
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => SAMPLE_REQUESTS.filter(r =>
    (!profession || r.profession === profession) &&
    (!funding || r.funding === funding) &&
    (!status || r.status === status) &&
    (!search || r.id.toLowerCase().includes(search.trim().toLowerCase()))
  ), [profession, funding, status, search]);
  const metrics = useMemo(() => summarise(filtered), [filtered]);
  const professions = [...new Set(SAMPLE_REQUESTS.map(r => r.profession))].sort();
  const fundingSources = [...new Set(SAMPLE_REQUESTS.map(r => r.funding))];
  const statuses = [...new Set(SAMPLE_REQUESTS.map(r => r.status))];
  const byProfession = professions.map(label => ({ label, count: filtered.filter(r => r.profession === label).length }));
  const maxCount = Math.max(1, ...byProfession.map(item => item.count));

  return <main className="demo-dashboard">
    <style>{`
      .demo-dashboard{font:14px/1.5 system-ui,sans-serif;color:#17304b;background:#f3f6fa;padding:24px;max-width:1200px;margin:auto}
      .demo-dashboard *{box-sizing:border-box}.demo-dashboard h1{margin:0;font-size:26px}.demo-dashboard p{margin:5px 0 18px}
      .demo-banner{background:#fff4d3;border-left:4px solid #a76a00;padding:10px 14px;margin:16px 0}
      .demo-filters,.demo-kpis{display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:12px;margin:18px 0}
      .demo-filters label{display:grid;gap:5px;font-weight:600}.demo-filters input,.demo-filters select{padding:9px;border:1px solid #b9c9da;border-radius:5px;background:white}
      .demo-card,.demo-panel{background:#fff;border:1px solid #d9e2ec;border-radius:8px;padding:16px}
      .demo-card{border-top:3px solid #096bb5}.demo-card strong{display:block;font-size:26px;margin-top:8px}
      .demo-panel{overflow-x:auto;margin-top:18px}.demo-row{display:grid;grid-template-columns:minmax(150px,35%) 1fr 35px;gap:10px;align-items:center;margin:10px 0}
      .demo-track{background:#e7eef6;height:12px;border-radius:6px}.demo-fill{background:#096bb5;height:12px;border-radius:6px}
      .demo-dashboard table{border-collapse:collapse;width:100%;min-width:650px}.demo-dashboard th,.demo-dashboard td{text-align:left;border-bottom:1px solid #d9e2ec;padding:9px}
      .demo-dashboard :is(input,select):focus-visible{outline:3px solid #ffb81c}
    `}</style>
    <h1>Study Leave & CPD Dashboard</h1>
    <p>Illustrative React portfolio example</p>
    <div className="demo-banner">SAMPLE DATA — fictional records and amounts. This component does not connect to Dataverse.</div>

    <section className="demo-filters" aria-label="Filter sample requests">
      <label>Profession<select value={profession} onChange={e => setProfession(e.target.value)}><option value="">All</option>{professions.map(v => <option key={v}>{v}</option>)}</select></label>
      <label>Funding source<select value={funding} onChange={e => setFunding(e.target.value)}><option value="">All</option>{fundingSources.map(v => <option key={v}>{v}</option>)}</select></label>
      <label>Request status<select value={status} onChange={e => setStatus(e.target.value)}><option value="">All</option>{statuses.map(v => <option key={v}>{v}</option>)}</select></label>
      <label>Search demo ID<input value={search} onChange={e => setSearch(e.target.value)} placeholder="DEMO-001" /></label>
    </section>

    <section className="demo-kpis" aria-label="Summary measures">
      {[
        ["Total applications", metrics.total], ["Completed", metrics.completed],
        ["Approved", metrics.approved], ["Declined", metrics.declined],
        ["Awaiting manager", metrics.awaitingManager], ["Awaiting panel", metrics.awaitingPanel],
        ["CPD funding requested", pounds(metrics.cpdRequested)],
        ["CPD funding approved", pounds(metrics.cpdApproved)],
        ["Working hours on approved applications", metrics.approvedWorkingHours],
      ].map(([label, value]) => <div className="demo-card" key={label}><span>{label}</span><strong>{value}</strong></div>)}
    </section>

    <section className="demo-panel"><h2>Applications by profession</h2>
      {byProfession.map(item => <div className="demo-row" key={item.label}>
        <span>{item.label}</span><div className="demo-track" aria-hidden="true"><div className="demo-fill" style={{ width: `${item.count / maxCount * 100}%` }} /></div><strong>{item.count}</strong>
      </div>)}
    </section>

    <section className="demo-panel"><h2>Sample application records</h2><table>
      <thead><tr><th>Demo ID</th><th>Profession</th><th>Submitted</th><th>Funding</th><th>Status</th></tr></thead>
      <tbody>{filtered.map(r => <tr key={r.id}><td>{r.id}</td><td>{r.profession}</td><td>{r.submitted}</td><td>{r.funding}</td><td>{r.status}</td></tr>)}</tbody>
    </table>{filtered.length === 0 && <p>No matching sample requests.</p>}</section>
    <p>Approved funding is the sum of known course costs on approved CPD funded requests; it does not represent paid expenditure.</p>
  </main>;
}
