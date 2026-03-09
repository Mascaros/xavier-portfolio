import { useState } from "react";

const A = "#FF4D00";
const A2 = "#FFD166";

const cases = [
  {
    num:"01", label:"Fintech · Web3", bg:"#0f1a3d",
    title:"Accelerated Payment Gateway",
    metrics:[{v:"−50%",k:"Exchange Fees"},{v:"3×",k:"Settlement Speed"},{v:"<1%",k:"Audit Target"}],
    problem:"US e-commerce losing payment visibility on international transactions, absorbing high exchange fees, stuck on-prem with no auditor transparency.",
    bullets:["Phase 1: Infrastructure, security server, OpenSearch activity logs, data migration backup.","Phase 2: Web3 P2P (USDC/DOT/Chainlink), agnostic payment gateway API, DevOps CI/CD.","Phase 3: AWS AI dynamic routing, fraud detection, real-time exchange rate API, DynamoDB migration.","MVP: Web3 middleware, BI metrics tool, IP whitelisting, originator/destination routing table."],
    tags:["AWS","Web3/USDC","Chainlink","DynamoDB","REST API","AI Routing"]
  },
  {
    num:"02", label:"HealthTech · AI/ML", bg:"#002a14",
    title:"Intelligent Healthcare & Financial Monitoring Platform",
    metrics:[{v:"50%",k:"Faster Reporting"},{v:"35%",k:"Decision Speed"},{v:"99.5%",k:"Uptime Target"}],
    problem:"Healthcare operators had disconnected systems — no unified layer across operational, financial, and patient risk data. Reporting was manual; proactive risk management near-impossible.",
    bullets:["7 patient data points: Demographics, Enrollment, Utilization, Medical Condition, Labs, Costs, Risk Extract.","Trainable weighted scoring model with configurable data clustering and flexible scheduling.","Label generation (risk 1–5) → score change alerts → reports → external BI push → recommended actions.","Role-based dashboards for Admin, Finance, Ops, Clinician, Executive, Analyst + Amazon Q AI assistant."],
    tags:["React","FastAPI","PostgreSQL","AWS Lambda","TensorFlow","Amazon Q","HIPAA","RBAC"]
  },
  {
    num:"03", label:"E-Commerce · API", bg:"#2d1200",
    title:"2Checkout Subscription & Marketo Integration",
    metrics:[{v:"0",k:"Redirects"},{v:"3",k:"Marketo Stories"},{v:"Multi",k:"Region/Currency"}],
    problem:"High cart abandonment on 2Checkout due to broken brand experience, forced pre-checkout login, and no Marketo campaign or regional payment awareness.",
    bullets:["Embedded login inside billing step — never a pre-checkout blocker.","US1: Query Marketo REST/Leads DB on checkout start to apply qualifying discounts.","US2: Inherit campaign assets (logos, landing pages, custom items) from Marketo Campaign Controller.","US3: Detect shopper region → render correct currency, language, and available payment methods."],
    tags:["REST API","Marketo REST/SOAP","IPN/LCN Webhooks","Subscription Billing","Localization"]
  },
  {
    num:"04", label:"Operations · Rollout", bg:"#1a0025",
    title:"rPOS Global Franchise Rollout — 500+ Stores/Week",
    metrics:[{v:"500+",k:"Stores/Week"},{v:"2",k:"Working Groups"},{v:"3",k:"Risk Phases"}],
    problem:"Incompatible rollout risk profiles — large chains needed deep custom config; small franchisees needed fast MVP deployment. One process would cause bottlenecks and timeline failures.",
    bullets:["WG1 (Large): Dedicated environments, custom features, pilot store parallel POS operation, ledger reconciliation, then mass rollout.","WG2 (Small/Regional): Regional environment groupings, core MVP features, mass rollout with transaction monitoring and triage.","3 risk phases: Sales (scope/pricing), Config (requirements accuracy, training), Install (downtime, data reconciliation).","Post-implementation: CRM per environment, cyclic audits, dedicated support channel."],
    tags:["Rollout Strategy","Risk Management","POS Systems","QA Planning","CRM","Data Reconciliation"]
  }
];

const experiences = [
  {role:"Senior PM – AI Platform", co:"CargoSprint · Miami, FL", period:"July 2025–Present", bullets:["Led company-wide AI transformation targeting 25% revenue growth — LLM-powered cargo network, intelligent routing, predictive analytics.","Built AI roadmap from scratch, set org-wide model KPIs, evaluation criteria, production monitoring standards.","Aligned engineering, data science, and C-suite around unified AI vision."], tags:["LLMs","Generative AI","OKRs","API-First"]},
  {role:"Senior PO / PM – Platform", co:"Accelya Group · Miami, FL", period:"Dec 2022–Jun 2025", bullets:["Grew enterprise customer base by 3 net-new accounts via platform gap analysis and Sales partnership.","Sustained 8+ features/release in SAFe program; introduced data-driven KPI frameworks for 2 consecutive quarters.","Defined ML feature requirements bridging data science and airline distribution use cases."], tags:["SAFe","ML Lifecycle","Enterprise SaaS","APIs"]},
  {role:"Product Ops Manager – AI/ML", co:"Twitter · Miami, FL", period:"May–Dec 2022", bullets:["Shipped ML Trust & Safety systems on AWS: content moderation, spam detection, safety classifiers at platform scale.","Established production ML monitoring benchmarks for model drift early-warning signals."], tags:["Trust & Safety","AWS","Content Moderation","Model Monitoring"]},
  {role:"Product Manager – API Integration", co:"UKG · Miami, FL", period:"Sept 2020–May 2022", bullets:["Delivered 10+ enterprise HR implementations on time with repeatable onboarding playbooks.","Resolved critical SAML/SSO integration blockers that had stalled enterprise deals."], tags:["API Integration","SAML/SSO","Enterprise HR"]},
  {role:"Product Manager – Customer Roadmap", co:"Accelya Group · Miami, FL", period:"2019–2022", bullets:["Owned airline distribution roadmap for API engines serving global GDS agencies and e-commerce platforms.","Launched MFA, partner portal, and conditional pricing logic enabling dynamic context-aware fares."], tags:["Airline Distrib.","Pricing Logic","Partner Portals"]},
];

function Chip({ label, orange }) {
  return (
    <span style={{
      fontSize: 11, padding: "3px 9px", borderRadius: 2,
      background: orange ? "rgba(255,77,0,0.12)" : "rgba(255,255,255,0.06)",
      border: `1px solid ${orange ? "rgba(255,77,0,0.3)" : "rgba(255,255,255,0.1)"}`,
      color: orange ? A : "#bbb", whiteSpace: "nowrap"
    }}>{label}</span>
  );
}

function CaseCard({ c }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ background: "#1a1a1a", border: `1px solid ${open ? "rgba(255,77,0,0.4)" : "rgba(255,255,255,0.08)"}`, borderRadius: 6, overflow: "hidden", transition: "border-color 0.2s" }}>
      <div style={{ height: 100, background: c.bg, position: "relative", display: "flex", alignItems: "flex-end", padding: "0 16px 14px" }}>
        <span style={{ position: "absolute", right: 12, top: 4, fontSize: 60, fontWeight: 800, color: "#fff", opacity: 0.07, lineHeight: 1 }}>{c.num}</span>
        <span style={{ fontSize: 10, color: A, background: "rgba(255,77,0,0.15)", padding: "3px 9px", borderRadius: 2, border: "1px solid rgba(255,77,0,0.3)", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>{c.label}</span>
      </div>
      <div style={{ padding: "16px 18px" }}>
        <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 8, color: "#f0ede8", lineHeight: 1.3 }}>{c.title}</div>
        <div style={{ display: "flex", gap: 14, borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 10, marginBottom: 12, flexWrap: "wrap" }}>
          {c.metrics.map(m => (
            <div key={m.k}>
              <div style={{ fontWeight: 800, fontSize: 17, color: A2 }}>{m.v}</div>
              <div style={{ fontSize: 10, color: "#666", textTransform: "uppercase", letterSpacing: "0.06em" }}>{m.k}</div>
            </div>
          ))}
        </div>
        <button onClick={() => setOpen(!open)} style={{
          width: "100%", background: "none", border: `1px solid ${open ? "rgba(255,77,0,0.35)" : "rgba(255,255,255,0.1)"}`,
          color: open ? "#fff" : "#888", padding: "7px 12px", borderRadius: 2, cursor: "pointer",
          fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
          display: "flex", justifyContent: "space-between", alignItems: "center"
        }}>
          {open ? "Hide Detail" : "View Full Case Study"}
          <span style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.25s", display: "inline-block" }}>▼</span>
        </button>
      </div>
      {open && (
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", padding: "14px 18px", background: "rgba(0,0,0,0.25)" }}>
          <div style={{ fontSize: 9, color: A, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 5 }}>PROBLEM</div>
          <div style={{ fontSize: 12, color: "#aaa", lineHeight: 1.7, marginBottom: 12 }}>{c.problem}</div>
          <div style={{ fontSize: 9, color: A, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 6 }}>APPROACH & OUTCOMES</div>
          <ul style={{ paddingLeft: 14, margin: "0 0 12px" }}>
            {c.bullets.map((b, i) => <li key={i} style={{ fontSize: 12, color: "#aaa", lineHeight: 1.7, marginBottom: 4 }}>{b}</li>)}
          </ul>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {c.tags.map(t => <Chip key={t} label={t} orange />)}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Portfolio() {
  const [sent, setSent] = useState(false);

  return (
    <div style={{ background: "#0a0a0a", color: "#f0ede8", fontFamily: "system-ui, sans-serif", minHeight: "100vh" }}>

      {/* NAV */}
      <div style={{ background: "rgba(10,10,10,0.95)", borderBottom: "1px solid rgba(255,255,255,0.07)", padding: "14px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 50 }}>
        <span style={{ fontWeight: 800, fontSize: 15 }}><span style={{ color: A }}>X</span>avier Mascaros</span>
        <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
          {[["#experience","Experience"],["#cases","Case Studies"],["#skills","Skills"]].map(([href,lbl]) => (
            <a key={href} href={href} style={{ color: "#666", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none" }}>{lbl}</a>
          ))}
          <a href="#contact" style={{ background: A, color: "#fff", padding: "7px 16px", borderRadius: 2, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textDecoration: "none" }}>Hire Me</a>
        </div>
      </div>

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 32px 60px" }}>

        {/* HERO */}
        <div id="home" style={{ padding: "72px 0 60px" }}>
          <div style={{ display: "inline-block", background: "rgba(255,77,0,0.12)", color: A, padding: "4px 12px", borderRadius: 2, fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 700, border: "1px solid rgba(255,77,0,0.3)", marginBottom: 18 }}>
            Available for New Opportunities · Miami, FL
          </div>
          <h1 style={{ fontWeight: 800, fontSize: 46, lineHeight: 1.05, letterSpacing: "-0.03em", margin: "0 0 16px" }}>
            Senior <span style={{ color: A }}>AI Product</span> Manager
          </h1>
          <p style={{ fontSize: 15, color: "#999", lineHeight: 1.8, maxWidth: 560, marginBottom: 20 }}>
            10+ years owning the full product lifecycle — from zero-to-one AI roadmaps to scaled platform growth — across AI/ML platforms, API ecosystems, and enterprise SaaS.
          </p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 28 }}>
            {["MSc Telecom Engineering","CSM · SAFe POPM","English / Spanish Bilingual"].map(b => <Chip key={b} label={b} />)}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, maxWidth: 560 }}>
            {[["10+","Years Exp"],["25%","Revenue Growth"],["3+","Enterprise Accts"],["8+","Features/Release"]].map(([n,l]) => (
              <div key={l} style={{ background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.08)", padding: "16px 14px", borderRadius: 4, borderLeft: `3px solid ${A}` }}>
                <div style={{ fontWeight: 800, fontSize: 22, lineHeight: 1 }}>{n.slice(0,-1)}<span style={{ color: A }}>{n.slice(-1)}</span></div>
                <div style={{ fontSize: 9, color: "#555", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 4 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* EXPERIENCE */}
        <div id="experience" style={{ marginBottom: 60 }}>
          <div style={{ fontSize: 10, color: A, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 6 }}>CAREER</div>
          <h2 style={{ fontWeight: 800, fontSize: 30, letterSpacing: "-0.02em", marginBottom: 32 }}>Work <span style={{ color: A }}>Experience</span></h2>
          <div style={{ borderLeft: "1px solid rgba(255,255,255,0.08)", paddingLeft: 24, marginLeft: 8 }}>
            {experiences.map((e, i) => (
              <div key={i} style={{ marginBottom: 32, position: "relative" }}>
                <div style={{ position: "absolute", left: -31, top: 4, width: 14, height: 14, borderRadius: "50%", background: "#0a0a0a", border: `2px solid ${A}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ width: 5, height: 5, background: A, borderRadius: "50%" }} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 6, marginBottom: 2 }}>
                  <span style={{ fontWeight: 700, fontSize: 14 }}>{e.role}</span>
                  <span style={{ fontSize: 10, color: A, background: "rgba(255,77,0,0.1)", padding: "2px 8px", borderRadius: 2 }}>{e.period}</span>
                </div>
                <div style={{ color: "#555", fontSize: 12, marginBottom: 8 }}>{e.co}</div>
                <ul style={{ paddingLeft: 14, margin: "0 0 10px" }}>
                  {e.bullets.map((b, j) => <li key={j} style={{ fontSize: 13, color: "#999", lineHeight: 1.7, marginBottom: 3 }}>{b}</li>)}
                </ul>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {e.tags.map(t => <Chip key={t} label={t} />)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CASE STUDIES */}
        <div id="cases" style={{ marginBottom: 60 }}>
          <div style={{ fontSize: 10, color: A, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 6 }}>WORK</div>
          <h2 style={{ fontWeight: 800, fontSize: 30, letterSpacing: "-0.02em", marginBottom: 28 }}>Case <span style={{ color: A }}>Studies</span></h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 14 }}>
            {cases.map((c, i) => <CaseCard key={i} c={c} />)}
          </div>
        </div>

        {/* SKILLS */}
        <div id="skills" style={{ marginBottom: 60 }}>
          <div style={{ fontSize: 10, color: A, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 6 }}>CAPABILITIES</div>
          <h2 style={{ fontWeight: 800, fontSize: 30, letterSpacing: "-0.02em", marginBottom: 28 }}>Skills & <span style={{ color: A }}>Tools</span></h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
            <div>
              <div style={{ fontSize: 10, color: A, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 14, paddingBottom: 8, borderBottom: "1px solid rgba(255,77,0,0.15)" }}>Core Competencies</div>
              {[["AI/ML Product Strategy",98],["0-to-1 & Platform Scaling",95],["API Platform Development",92],["Data-Driven Roadmapping",94],["Cross-Functional Leadership",96],["ML Model Lifecycle",90],["Go-to-Market Execution",91]].map(([n,p]) => (
                <div key={n} style={{ marginBottom: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#ccc", marginBottom: 5 }}>
                    <span>{n}</span><span style={{ color: A, fontWeight: 700 }}>{p}%</span>
                  </div>
                  <div style={{ height: 3, background: "rgba(255,255,255,0.07)", borderRadius: 2 }}>
                    <div style={{ width: `${p}%`, height: "100%", background: `linear-gradient(90deg,${A},${A2})`, borderRadius: 2 }} />
                  </div>
                </div>
              ))}
            </div>
            <div>
              {[["AI / ML", ["Generative AI","LLMs","Agentic AI","ML Model Lifecycle","Trust & Safety ML","Predictive Analytics","Model Evaluation","Amazon Q"]],
                ["Tools", ["Jira","Confluence","Figma","AWS","SAFe","OKRs","SAML/SSO","Marketo","Web3/Blockchain","Amplitude","Looker","OpenSearch"]],
                ["Certs", ["CSM","SAFe POPM","MSc Telecom Engineering","EN/ES Bilingual"]]
              ].map(([lbl, items]) => (
                <div key={lbl} style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: 10, color: A, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 10, paddingBottom: 6, borderBottom: "1px solid rgba(255,77,0,0.15)" }}>{lbl}</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{items.map(t => <Chip key={t} label={t} />)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CONTACT */}
        <div id="contact">
          <div style={{ fontSize: 10, color: A, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 6 }}>GET IN TOUCH</div>
          <h2 style={{ fontWeight: 800, fontSize: 30, letterSpacing: "-0.02em", marginBottom: 28 }}>Let's <span style={{ color: A }}>Work Together</span></h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 48 }}>
            <div>
              <p style={{ color: "#999", lineHeight: 1.8, marginBottom: 20, fontSize: 14 }}>Open to Senior AI PM roles, fractional product leadership, and advisory engagements in AI/ML platforms, enterprise SaaS, fintech, and API-first products.</p>
              {[["📧","x.mascaros@gmail.com"],["💼","LinkedIn Profile"],["📍","Miami, FL · Open to Remote"]].map(([icon,val]) => (
                <div key={val} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                  <div style={{ width: 34, height: 34, background: "rgba(255,77,0,0.1)", border: "1px solid rgba(255,77,0,0.2)", borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>{icon}</div>
                  <span style={{ fontSize: 13, color: "#ccc" }}>{val}</span>
                </div>
              ))}
            </div>
            <div>
              {sent ? (
                <div style={{ background: "#1a1a1a", border: `1px solid ${A}`, borderRadius: 4, padding: "36px", textAlign: "center" }}>
                  <div style={{ fontSize: 28, marginBottom: 10 }}>✓</div>
                  <div style={{ fontWeight: 700, fontSize: 16 }}>Message Sent!</div>
                  <div style={{ color: "#888", fontSize: 13, marginTop: 6 }}>Xavier will be in touch soon.</div>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    {[["Name","Jane Smith"],["Email","jane@co.com"]].map(([l,p]) => (
                      <div key={l}>
                        <div style={{ fontSize: 10, color: "#555", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>{l}</div>
                        <input placeholder={p} style={{ width: "100%", background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.09)", color: "#f0ede8", padding: "9px 12px", borderRadius: 2, fontSize: 13, outline: "none", fontFamily: "inherit" }} />
                      </div>
                    ))}
                  </div>
                  <div>
                    <div style={{ fontSize: 10, color: "#555", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>Message</div>
                    <textarea rows={4} placeholder="Tell me about the role or project..." style={{ width: "100%", background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.09)", color: "#f0ede8", padding: "9px 12px", borderRadius: 2, fontSize: 13, outline: "none", fontFamily: "inherit", resize: "vertical" }} />
                  </div>
                  <button onClick={() => setSent(true)} style={{ background: A, color: "#fff", border: "none", padding: "11px 22px", borderRadius: 2, fontWeight: 700, fontSize: 13, cursor: "pointer", alignSelf: "flex-start" }}>
                    Send Message →
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
