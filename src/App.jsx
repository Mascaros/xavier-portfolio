import { useState, useEffect, useCallback, useRef } from "react";

const A = "#FF4D00";
const A2 = "#FFD166";

// ─── DATA ─────────────────────────────────────────────────────────────────────

const cases = [
  {
    num: "01", label: "Fintech · Web3", bg: "#0f1a3d",
    title: "Accelerated Payment Gateway",
    metrics: [{ v: "−50%", k: "Exchange Fees" }, { v: "3×", k: "Settlement Speed" }, { v: "<1%", k: "Audit Target" }],
    problem: "US e-commerce losing payment visibility on international transactions, absorbing high exchange fees, stuck on-prem with no auditor transparency.",
    bullets: [
      "Phase 1: Infrastructure, security server, OpenSearch activity logs, data migration backup.",
      "Phase 2: Web3 P2P (USDC/DOT/Chainlink), agnostic payment gateway API, DevOps CI/CD.",
      "Phase 3: AWS AI dynamic routing, fraud detection, real-time exchange rate API, DynamoDB migration.",
      "MVP: Web3 middleware, BI metrics tool, IP whitelisting, originator/destination routing table.",
    ],
    tags: ["AWS", "Web3/USDC", "Chainlink", "DynamoDB", "REST API", "AI Routing"],
  },
  {
    num: "02", label: "HealthTech · AI/ML", bg: "#002a14",
    title: "Intelligent Healthcare & Financial Monitoring Platform",
    metrics: [{ v: "50%", k: "Faster Reporting" }, { v: "35%", k: "Decision Speed" }, { v: "99.5%", k: "Uptime Target" }],
    problem: "Healthcare operators had disconnected systems — no unified layer across operational, financial, and patient risk data. Reporting was manual; proactive risk management near-impossible.",
    bullets: [
      "7 patient data points: Demographics, Enrollment, Utilization, Medical Condition, Labs, Costs, Risk Extract.",
      "Trainable weighted scoring model with configurable data clustering and flexible scheduling.",
      "Label generation (risk 1–5) → score change alerts → reports → external BI push → recommended actions.",
      "Role-based dashboards for Admin, Finance, Ops, Clinician, Executive, Analyst + Amazon Q AI assistant.",
    ],
    tags: ["React", "FastAPI", "PostgreSQL", "AWS Lambda", "TensorFlow", "Amazon Q", "HIPAA", "RBAC"],
    pdfUrl: "/docs/ai-model-flow.pdf",
    pdfLabel: "AI Model Flow Diagram",
  },
  {
    num: "03", label: "E-Commerce · API", bg: "#2d1200",
    title: "2Checkout Subscription & Marketo Integration",
    metrics: [{ v: "0", k: "Redirects" }, { v: "3", k: "Marketo Stories" }, { v: "Multi", k: "Region/Currency" }],
    problem: "High cart abandonment on 2Checkout due to broken brand experience, forced pre-checkout login, and no Marketo campaign or regional payment awareness.",
    bullets: [
      "Embedded login inside billing step — never a pre-checkout blocker.",
      "US1: Query Marketo REST/Leads DB on checkout start to apply qualifying discounts.",
      "US2: Inherit campaign assets (logos, landing pages, custom items) from Marketo Campaign Controller.",
      "US3: Detect shopper region → render correct currency, language, and available payment methods.",
    ],
    tags: ["REST API", "Marketo REST/SOAP", "IPN/LCN Webhooks", "Subscription Billing", "Localization"],
  },
  {
    num: "04", label: "Operations · Rollout", bg: "#1a0025",
    title: "rPOS Global Franchise Rollout — 500+ Stores/Week",
    metrics: [{ v: "500+", k: "Stores/Week" }, { v: "2", k: "Working Groups" }, { v: "3", k: "Risk Phases" }],
    problem: "Incompatible rollout risk profiles — large chains needed deep custom config; small franchisees needed fast MVP deployment. One process would cause bottlenecks and timeline failures.",
    bullets: [
      "WG1 (Large): Dedicated environments, custom features, pilot store parallel POS operation, ledger reconciliation, then mass rollout.",
      "WG2 (Small/Regional): Regional environment groupings, core MVP features, mass rollout with transaction monitoring and triage.",
      "3 risk phases: Sales (scope/pricing), Config (requirements accuracy, training), Install (downtime, data reconciliation).",
      "Post-implementation: CRM per environment, cyclic audits, dedicated support channel.",
    ],
    tags: ["Rollout Strategy", "Risk Management", "POS Systems", "QA Planning", "CRM", "Data Reconciliation"],
  },
  {
    num: "05", label: "AI/ML · PRD", bg: "#0d1526",
    title: "Agentic AI Platforms — Production PRD",
    metrics: [{ v: "−30%", k: "Driver Dwell Time" }, { v: ">85%", k: "Dock Utilization" }, { v: "+20%", k: "Booking Conversion" }],
    problem: "No production-grade agentic AI blueprint existed for high-frequency operational verticals. Authored two complete PRDs — autonomous warehouse dock scheduling and B2C travel dynamic packaging — with full capability matrices, technical constraints, system flows, and engine architecture.",
    bullets: [
      "Warehouse Agent: autonomous carrier booking via email/SMS/portal, dynamic slot re-optimization on real-time events, −80% manual scheduling tasks.",
      "Travel Agent: conversational NLP concierge, multi-GDS/bedbank dynamic packaging, opaque margin optimization, +20% booking conversion.",
      "System flow diagrams for both agents: tool calls, API integrations, confirmation loops, external system updates.",
      "Engine build strategy: evaluated fully custom, PaaS (AWS Bedrock/Vertex AI), and hybrid — recommended LangGraph/AutoGen orchestration.",
    ],
    tags: ["Agentic AI", "LLMs", "WMS/TMS APIs", "GDS/Bedbanks", "LangGraph", "PRD Authorship"],
    pdfUrl: "/docs/agentic-ai-prd.pdf",
    pdfLabel: "Full PRD",
  },
  {
    num: "06", label: "Creative · PM Artifact", bg: "#0f0a1a",
    title: "Quantum Sleep — AI-Assisted Album PRD",
    metrics: [{ v: "6-Phase", k: "Launch Strategy" }, { v: "5", k: "Experiments" }, { v: "3", k: "Audiences" }],
    problem: "Musicians without traditional production skills have no clear path from lyric to album. Built a full product strategy for Quantum Sleep — a real AI-assisted music project shipping to Spotify, Apple Music, and YouTube Music — doubling as a PM artifact demonstrating ethical AI positioning, GTM design, and experimentation frameworks.",
    bullets: [
      "Human-written lyrics + AI-generated music/vocals via Aimusicgen.ai — transparent authorship model and trust framework as core product narrative.",
      "6-phase launch: album release → public PRD → social promotion → AI engine comparison content → Spanglish bilingual album → creator playbook.",
      "Analytics plan across 7 metric areas; 5-experiment A/B roadmap covering thumbnail design, AI framing, and bilingual audience positioning.",
      "GTM spanning Spotify, YouTube Music, Apple Music, LinkedIn PM coified AI vision.",
    ],
    tags: ["LLMs", "Generative AI", "OKRs", "API-First"],
    current: true,
  },
  {
    role: "Senior PO / PM – Platform", co: "Accelya Group · Miami, FL", period: "Dec 2022–Jun 2025",
    bullets: [
      "Grew enterprise customer base by 3 net-new accounts via platform gap analysis and Sales partnership.",
      "Sustained 8+ features/release in SAFe program; introduced data-driven KPI frameworks for 2 consecutive quarters.",
      "Defined ML feature requirements bridging data science and airline distribution use cases.",
    ],
    tags: ["SAFe", "ML Lifecycle", "Enterprise SaaS", "APIs"],
  },
  {
    role: "Product Ops Manager – AI/ML", co: "Twitter · Miami, FL", period: "May–Dec 2022",
    bullets: [
      "Shipped ML Trust & Safety systems on AWS: content moderation, spam detection, safety classifiers at platform scale.",
      "Established production ML monitoring benchmarks for model drift early-warning signals.",
    ],
    tags: ["Trust & Safety", "AWS", "Content Moderation", "Model Monitoring"],
  },
  {
    role: "Product Manager – API Integration", co: "UKG · Miami, FL", period: "Sept 2020–May 2022",
    bullets: [
      "Delivered 10+ enterprise HR implementations on time with repeatable onboarding playbooks.",
      "Resolved critical SAML/SSO integration blockers that had stalled enterprise deals.",
    ],
    tags: ["API Integration", "SAML/SSO", "Enterprise HR"],
  },
  {
    role: "Product Manager – Customer Roadmap", co: "Accelya Group · Miami, FL", period: "2019–2022",
    bullets: [
      "Owned airline distribution roadmap for API engines serving global GDS agencies and e-commerce platforms.",
      "Launched MFA, partner portal, and conditional pricing logic enabling dynamic context-aware fares.",
    ],
    tags: ["Airline Distrib.", "Pricing Logic", "Partner Portals"],
  },
];

// ─── SLIDES CONFIG ────────────────────────────────────────────────────────────

const SLIDES = [
  { id: "hero", type: "hero", label: "Home" },
  { id: "experience", type: "experience", label: "Experience" },
  ...cases.map(c => ({ id: `case-${c.num}`, type: "case", data: c, label: `Case ${c.num}` })),
  { id: "skills", type: "skills", label: "Skills" },
  { id: "contact", type: "contact", label: "Contact" },
];

// ─── GLOBAL CSS ───────────────────────────────────────────────────────────────

const CSS = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  @keyframes slideInUp {
    from { opacity: 0; transform: translateY(48px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes slideOutUp {
    from { opacity: 1; transform: translateY(0); }
    to   { opacity: 0; transform: translateY(-48px); }
  }
  @keyframes slideInDown {
    from { opacity: 0; transform: translateY(-48px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes slideOutDown {
    from { opacity: 1; transform: translateY(0); }
    to   { opacity: 0; transform: translateY(48px); }
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }
  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(6px); }
  }

  .anim-slide-in-up   { animation: slideInUp   0.52s cubic-bezier(0.22,0.61,0.36,1) forwards; }
  .anim-slide-out-up  { animation: slideOutUp  0.52s cubic-bezier(0.22,0.61,0.36,1) forwards; }
  .anim-slide-in-down { animation: slideInDown 0.52s cubic-bezier(0.22,0.61,0.36,1) forwards; }
  .anim-slide-out-down{ animation: slideOutDown 0.52s cubic-bezier(0.22,0.61,0.36,1) forwards; }

  .stagger > * { animation: fadeIn 0.5s ease both; }
  .stagger > *:nth-child(1) { animation-delay: 0.05s; }
  .stagger > *:nth-child(2) { animation-delay: 0.12s; }
  .stagger > *:nth-child(3) { animation-delay: 0.19s; }
  .stagger > *:nth-child(4) { animation-delay: 0.26s; }
  .stagger > *:nth-child(5) { animation-delay: 0.33s; }
  .stagger > *:nth-child(6) { animation-delay: 0.40s; }

  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: rgba(255,77,0,0.25); border-radius: 2px; }

  .pdfbtn:hover { background: rgba(255,209,102,0.16) !important; }
  .navbtn:hover { color: #fff !important; }
  .dotbtn:hover { background: rgba(255,255,255,0.45) !important; }
  .cta-outline:hover { background: rgba(255,255,255,0.06) !important; }
  .exp-card:hover { border-color: rgba(255,77,0,0.25) !important; }
`;

// ─── CHIP ─────────────────────────────────────────────────────────────────────

function Chip({ label, orange, large }) {
  return (
    <span style={{
      fontSize: large ? 12 : 11,
      padding: large ? "4px 12px" : "3px 9px",
      borderRadius: 2,
      background: orange ? "rgba(255,77,0,0.12)" : "rgba(255,255,255,0.07)",
      border: `1px solid ${orange ? "rgba(255,77,0,0.3)" : "rgba(255,255,255,0.12)"}`,
      color: orange ? A : "#bbb",
      whiteSpace: "nowrap",
      display: "inline-block",
    }}>{label}</span>
  );
}

// ─── HERO SLIDE ───────────────────────────────────────────────────────────────

function HeroSlide({ goTo }) {
  return (
    <div style={{
      height: "100%",
      background: "radial-gradient(ellipse 80% 60% at 10% 50%, rgba(255,77,0,0.07) 0%, transparent 70%), #0a0a0a",
      display: "flex", alignItems: "center",
      padding: "0 10%",
      position: "relative", overflow: "hidden",
    }}>
      {/* watermark */}
      <div style={{
        position: "absolute", right: "-2%", top: "50%", transform: "translateY(-52%)",
        fontSize: "38vw", fontWeight: 900, color: "rgba(255,255,255,0.018)",
        lineHeight: 1, userSelect: "none", letterSpacing: "-0.06em", pointerEvents: "none",
      }}>PM</div>

      {/* accent line */}
      <div style={{
        position: "absolute", left: 0, top: "15%", bottom: "15%",
        width: 3, background: `linear-gradient(to bottom, transparent, ${A}, transparent)`,
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 720 }} className="stagger">
        {/* badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: "rgba(255,77,0,0.09)", color: A,
          padding: "5px 14px", borderRadius: 2,
          fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase",
          fontWeight: 700, border: "1px solid rgba(255,77,0,0.22)",
        }}>
          <span style={{ width: 6, height: 6, background: A, borderRadius: "50%", display: "inline-block", animation: "pulse 2s infinite" }} />
          Available for New Roles · Miami, FL
        </div>

        {/* headline */}
        <h1 style={{
          fontWeight: 900, fontSize: "clamp(52px, 6vw, 80px)",
          lineHeight: 1.0, letterSpacing: "-0.04em",
          color: "#f0ede8", marginTop: 22,
        }}>
          Senior <span style={{ color: A }}>AI</span> Product<br />Manager
        </h1>

        {/* sub */}
        <p style={{ fontSize: 15, color: "#666", lineHeight: 1.85, maxWidth: 540, marginTop: 18 }}>
          10+ years owning the full product lifecycle — from zero-to-one AI roadmaps to scaled platform growth across AI/ML platforms, API ecosystems, and enterprise SaaS.
        </p>

        {/* creds row */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 18 }}>
          {["MSc Telecom Engineering", "CSM · SAFe POPM", "English / Spanish Bilingual"].map(b => <Chip key={b} label={b} />)}
        </div>

        {/* stats */}
        <div style={{ display: "flex", gap: 14, marginTop: 32, flexWrap: "wrap" }}>
          {[["10+", "Years Exp"], ["25%", "Revenue Growth"], ["3+", "Enterprise Accounts"], ["8+", "Features/Release"]].map(([n, l]) => (
            <div key={l} style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderLeft: `3px solid ${A}`,
              padding: "16px 20px", borderRadius: 4, minWidth: 110,
            }}>
              <div style={{ fontWeight: 800, fontSize: 30, lineHeight: 1, color: "#f0ede8" }}>
                {n.slice(0, -1)}<span style={{ color: A }}>{n.slice(-1)}</span>
              </div>
              <div style={{ fontSize: 10, color: "#444", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 5 }}>{l}</div>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div style={{ display: "flex", gap: 12, alignItems: "center", marginTop: 36, flexWrap: "wrap" }}>
          <button
            onClick={() => goTo(SLIDES.findIndex(s => s.id === "case-01"))}
            style={{
              background: A, color: "#fff", border: "none",
              padding: "13px 30px", borderRadius: 2,
              fontWeight: 700, fontSize: 13, cursor: "pointer", letterSpacing: "0.06em",
            }}
          >View Case Studies →</button>
          <a
            href="/docs/resume.pdf" target="_blank" rel="noopener noreferrer"
            className="cta-outline"
            style={{
              color: "#888", fontSize: 12, fontWeight: 700, letterSpacing: "0.08em",
              textTransform: "uppercase", textDecoration: "none",
              border: "1px solid rgba(255,255,255,0.12)",
              padding: "12px 22px", borderRadius: 2,
              background: "transparent", transition: "background 0.2s",
            }}
          >Resume ↓</a>
        </div>
      </div>

      {/* scroll hint */}
      <div style={{
        position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)",
        fontSize: 10, color: "rgba(255,255,255,0.18)", fontWeight: 700,
        letterSpacing: "0.18em", textTransform: "uppercase",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
      }}>
        <span>scroll or arrow keys</span>
        <span style={{ fontSize: 18, animation: "bounce 1.8s ease-in-out infinite" }}>↓</span>
      </div>
    </div>
  );
}

// ─── EXPERIENCE SLIDE ─────────────────────────────────────────────────────────

function ExperienceSlide() {
  return (
    <div style={{
      height: "100%",
      background: "#0a0a0a",
      display: "flex", flexDirection: "column",
      padding: "0 10%",
    }}>
      {/* header */}
      <div style={{ paddingTop: 36, paddingBottom: 20, flexShrink: 0 }}>
        <div style={{ fontSize: 10, color: A, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 8 }}>CAREER</div>
        <h2 style={{ fontWeight: 900, fontSize: "clamp(32px, 4vw, 48px)", letterSpacing: "-0.03em", color: "#f0ede8" }}>
          Work <span style={{ color: A }}>Experience</span>
        </h2>
      </div>

      {/* scrollable grid */}
      <div
        data-scrollable="true"
        style={{ flex: 1, overflowY: "auto", paddingBottom: 32 }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }} className="stagger">
          {experiences.map((e, i) => (
            <div
              key={i}
              className="exp-card"
              style={{
                background: "rgba(255,255,255,0.025)",
                border: `1px solid ${e.current ? "rgba(255,77,0,0.3)" : "rgba(255,255,255,0.07)"}`,
                borderLeft: `3px solid ${e.current ? A : "rgba(255,255,255,0.1)"}`,
                borderRadius: 6, padding: "22px 24px",
                transition: "border-color 0.2s",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8, marginBottom: 4 }}>
                <span style={{ fontWeight: 700, fontSize: 13, color: "#f0ede8" }}>{e.role}</span>
                <span style={{
                  fontSize: 10, color: e.current ? A : "#666",
                  background: e.current ? "rgba(255,77,0,0.1)" : "rgba(255,255,255,0.05)",
                  padding: "2px 8px", borderRadius: 2, flexShrink: 0,
                }}>{e.period}</span>
              </div>
              <div style={{ color: "#444", fontSize: 11, marginBottom: 12 }}>{e.co}</div>
              <ul style={{ paddingLeft: 15, marginBottom: 12 }}>
                {e.bullets.map((b, j) => (
                  <li key={j} style={{ fontSize: 12, color: "#777", lineHeight: 1.75, marginBottom: 3 }}>{b}</li>
                ))}
              </ul>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                {e.tags.map(t => <Chip key={t} label={t} />)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── CASE STUDY SLIDE ─────────────────────────────────────────────────────────

function CaseSlide({ c }) {
  return (
    <div style={{
      height: "100%",
      background: c.bg,
      position: "relative",
      overflow: "hidden",
      display: "flex",
      alignItems: "stretch",
    }}>
      {/* rich bg gradient */}
      <div style={{
        position: "absolute", inset: 0,
        background: `linear-gradient(125deg, ${c.bg} 0%, rgba(0,0,0,0.92) 55%, rgba(0,0,0,0.98) 100%)`,
      }} />
      {/* subtle top highlight */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1,
        background: `linear-gradient(90deg, transparent, ${A}44, transparent)`,
      }} />

      {/* watermark */}
      <div style={{
        position: "absolute", right: "-1%", bottom: "-8%",
        fontSize: "52vw", fontWeight: 900,
        color: "rgba(255,255,255,0.022)",
        lineHeight: 1, userSelect: "none",
        letterSpacing: "-0.06em", pointerEvents: "none",
      }}>{c.num}</div>

      {/* content */}
      <div style={{
        position: "relative", zIndex: 1,
        display: "flex", width: "100%",
        padding: "0 10%", gap: "5%", alignItems: "center",
      }}>
        {/* ── LEFT ── */}
        <div style={{ flex: "0 0 38%", paddingTop: 8 }} className="stagger">
          {/* badges */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 22 }}>
            <span style={{
              fontSize: 10, color: A, background: "rgba(255,77,0,0.14)",
              padding: "4px 12px", borderRadius: 2,
              border: "1px solid rgba(255,77,0,0.28)",
              fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase",
            }}>{c.label}</span>
            {c.pdfUrl && (
              <span style={{
                fontSize: 10, color: A2, background: "rgba(255,209,102,0.1)",
                padding: "4px 12px", borderRadius: 2,
                border: "1px solid rgba(255,209,102,0.28)",
                fontWeight: 700, letterSpacing: "0.08em",
              }}>📄 LIVE SAMPLE</span>
            )}
          </div>

          {/* title */}
          <h2 style={{
            fontWeight: 900,
            fontSize: "clamp(24px, 2.8vw, 38px)",
            lineHeight: 1.15, letterSpacing: "-0.025em",
            color: "#f0ede8", marginBottom: 36,
          }}>{c.title}</h2>

          {/* metrics */}
          <div style={{ display: "flex", gap: 32, marginBottom: 36, flexWrap: "wrap" }}>
            {c.metrics.map(m => (
              <div key={m.k}>
                <div style={{ fontWeight: 900, fontSize: "clamp(28px, 3vw, 40px)", color: A2, lineHeight: 1, marginBottom: 5 }}>{m.v}</div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.1em" }}>{m.k}</div>
              </div>
            ))}
          </div>

          {/* tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {c.tags.map(t => <Chip key={t} label={t} orange />)}
          </div>
        </div>

        {/* divider */}
        <div style={{
          width: 1, alignSelf: "stretch",
          marginTop: 60, marginBottom: 60, flexShrink: 0,
          background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.1) 20%, rgba(255,255,255,0.1) 80%, transparent)",
        }} />

        {/* ── RIGHT ── */}
        <div
          data-scrollable="true"
          style={{ flex: 1, overflowY: "auto", maxHeight: "calc(100vh - 110px)", paddingRight: 6 }}
        >
          <div className="stagger">
            <div style={{ fontSize: 9, color: A, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 10 }}>THE CHALLENGE</div>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.85, marginBottom: 30 }}>{c.problem}</p>

            <div style={{ fontSize: 9, color: A, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12 }}>WHAT I BUILT</div>
            <ul style={{ paddingLeft: 16, marginBottom: 32, listStyle: "none" }}>
              {c.bullets.map((b, i) => (
                <li key={i} style={{ display: "flex", gap: 10, fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.8, marginBottom: 8 }}>
                  <span style={{ color: A, flexShrink: 0, marginTop: 2 }}>›</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            {c.pdfUrl && (
              <a
                href={c.pdfUrl} target="_blank" rel="noopener noreferrer"
                className="pdfbtn"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "11px 22px", borderRadius: 2,
                  background: "rgba(255,209,102,0.07)",
                  border: "1px solid rgba(255,209,102,0.3)",
                  color: A2, fontSize: 12, fontWeight: 700,
                  letterSpacing: "0.08em", textTransform: "uppercase",
                  textDecoration: "none", transition: "background 0.2s",
                }}
              >📄 {c.pdfLabel} ↗</a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── SKILLS SLIDE ─────────────────────────────────────────────────────────────

function SkillsSlide() {
  const competencies = [
    ["AI/ML Product Strategy", 98],
    ["0-to-1 & Platform Scaling", 95],
    ["API Platform Development", 92],
    ["Data-Driven Roadmapping", 94],
    ["Cross-Functional Leadership", 96],
    ["ML Model Lifecycle", 90],
    ["Go-to-Market Execution", 91],
  ];

  return (
    <div style={{
      height: "100%",
      background: "#0a0a0a",
      display: "flex", flexDirection: "column",
      padding: "0 10%",
    }}>
      <div style={{ paddingTop: 36, paddingBottom: 20, flexShrink: 0 }}>
        <div style={{ fontSize: 10, color: A, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 8 }}>CAPABILITIES</div>
        <h2 style={{ fontWeight: 900, fontSize: "clamp(32px, 4vw, 48px)", letterSpacing: "-0.03em", color: "#f0ede8" }}>
          Skills & <span style={{ color: A }}>Tools</span>
        </h2>
      </div>

      <div
        data-scrollable="true"
        style={{ flex: 1, overflowY: "auto", paddingBottom: 32 }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 52 }} className="stagger">
          {/* Core competencies */}
          <div>
            <div style={{ fontSize: 10, color: A, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 18, paddingBottom: 10, borderBottom: "1px solid rgba(255,77,0,0.12)" }}>
              Core Competencies
            </div>
            {competencies.map(([n, p]) => (
              <div key={n} style={{ marginBottom: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#ccc", marginBottom: 6 }}>
                  <span>{n}</span>
                  <span style={{ color: A, fontWeight: 700 }}>{p}%</span>
                </div>
                <div style={{ height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 2 }}>
                  <div style={{
                    width: `${p}%`, height: "100%",
                    background: `linear-gradient(90deg, ${A}, ${A2})`,
                    borderRadius: 2,
                  }} />
                </div>
              </div>
            ))}
          </div>

          {/* Tag clouds */}
          <div>
            {[
              ["AI / ML", ["Generative AI", "LLMs", "Agentic AI", "ML Model Lifecycle", "Trust & Safety ML", "Predictive Analytics", "Model Evaluation", "Amazon Q"]],
              ["Platforms & Tools", ["Jira", "Confluence", "Figma", "AWS", "SAFe", "OKRs", "SAML/SSO", "Marketo", "Web3/Blockchain", "Amplitude", "Looker", "OpenSearch"]],
              ["Credentials", ["CSM", "SAFe POPM", "MSc Telecom Engineering", "EN/ES Bilingual"]],
            ].map(([lbl, items]) => (
              <div key={lbl} style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 10, color: A, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 12, paddingBottom: 8, borderBottom: "1px solid rgba(255,77,0,0.12)" }}>{lbl}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {items.map(t => <Chip key={t} label={t} />)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── CONTACT SLIDE ────────────────────────────────────────────────────────────
             <div style={{ fontSize: 10, color: A, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 12, paddingBottom: 8, borderBottom: "1px solid rgba(255,77,0,0.12)" }}>{lbl}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {items.map(t => <Chip key={t} label={t} />)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── CONTACT SLIDE ────────────────────────────────────────────────────────────

function ContactSlide() {
  const [sent, setSent] = useState(false);

  return (
    <div style={{
      height: "100%",
      background: "radial-gradient(ellipse 60% 60% at 90% 50%, rgba(255,77,0,0.05) 0%, transparent 70%), #0a0a0a",
      display: "flex", alignItems: "center",
      padding: "0 10%",
    }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "8%", width: "100%", maxWidth: 900, margin: "0 auto" }} className="stagger">
        {/* Info */}
        <div>
          <div style={{ fontSize: 10, color: A, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 14 }}>GET IN TOUCH</div>
          <h2 style={{ fontWeight: 900, fontSize: "clamp(32px, 4vw, 48px)", letterSpacing: "-0.03em", color: "#f0ede8", marginBottom: 20 }}>
            Let's <span style={{ color: A }}>Work<br />Together</span>
          </h2>
          <p style={{ color: "#666", lineHeight: 1.85, fontSize: 14, marginBottom: 32 }}>
            Open to Senior AI PM roles, fractional product leadership, and advisory engagements in AI/ML platforms, enterprise SaaS, fintech, and API-first products.
          </p>
          {[["📧", "x.mascaros@gmail.com"], ["💼", "LinkedIn Profile"], ["📍", "Miami, FL · Open to Remote"]].map(([icon, val]) => (
            <div key={val} style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
              <div style={{
                width: 36, height: 36, background: "rgba(255,77,0,0.08)",
                border: "1px solid rgba(255,77,0,0.18)", borderRadius: 2,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 15, flexShrink: 0,
              }}>{icon}</div>
              <span style={{ fontSize: 13, color: "#aaa" }}>{val}</span>
            </div>
          ))}
        </div>

        {/* Form */}
        <div>
          {sent ? (
            <div style={{
              background: "rgba(255,77,0,0.06)", border: `1px solid ${A}`,
              borderRadius: 6, padding: "48px 32px", textAlign: "center",
            }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>✓</div>
              <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>Message sent!</div>
              <div style={{ color: "#666", fontSize: 14 }}>Xavier will be in touch shortly.</div>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                {[["Name", "Jane Smith"], ["Email", "jane@company.com"]].map(([l, p]) => (
                  <div key={l}>
                    <div style={{ fontSize: 10, color: "#444", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 5 }}>{l}</div>
                    <input
                      placeholder={p}
                      style={{
                        width: "100%", background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.08)", color: "#f0ede8",
                        padding: "10px 14px", borderRadius: 2, fontSize: 13,
                        outline: "none", fontFamily: "inherit",
                      }}
                    />
                  </div>
                ))}
              </div>
              <div>
                <div style={{ fontSize: 10, color: "#444", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 5 }}>Message</div>
                <textarea
                  rows={4}
                  placeholder="Tell me about the role or project..."
                  style={{
                    width: "100%", background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)", color: "#f0ede8",
                    padding: "10px 14px", borderRadius: 2, fontSize: 13,
                    outline: "none", fontFamily: "inherit", resize: "vertical",
                  }}
                />
              </div>
              <button
                onClick={() => setSent(true)}
                style={{
                  background: A, color: "#fff", border: "none",
                  padding: "13px 28px", borderRadius: 2,
                  fontWeight: 700, fontSize: 13, cursor: "pointer",
                  letterSpacing: "0.06em", alignSelf: "flex-start",
                }}
              >Send Message →</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── RENDER SLIDE ─────────────────────────────────────────────────────────────

function SlideContent({ slide, goTo }) {
  if (slide.type === "hero")       return <HeroSlide goTo={goTo} />;
  if (slide.type === "experience") return <ExperienceSlide />;
  if (slide.type === "case")       return <CaseSlide c={slide.data} />;
  if (slide.type === "skills")     return <SkillsSlide />;
  if (slide.type === "contact")    return <ContactSlide />;
  return null;
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────

export default function Portfolio() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev]       = useState(null);
  const [dir, setDir]         = useState(1);
  const [busy, setBusy]       = useState(false);
  const lastWheel             = useRef(0);

  // navigate to slide index
  const goTo = useCallback((idx) => {
    if (busy || idx === current || idx < 0 || idx >= SLIDES.length) return;
    setDir(idx > current ? 1 : -1);
    setPrev(current);
    setCurrent(idx);
    setBusy(true);
    setTimeout(() => { setPrev(null); setBusy(false); }, 560);
  }, [busy, current]);

  const nav = useCallback((delta) => goTo(current + delta), [current, goTo]);

  // keyboard
  useEffect(() => {
    const fn = (e) => {
      if (e.key === "ArrowDown" || e.key === "PageDown") { e.preventDefault(); nav(1); }
      if (e.key === "ArrowUp"   || e.key === "PageUp")   { e.preventDefault(); nav(-1); }
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [nav]);

  // wheel (skip if target is inside a scrollable container that hasn't hit its limit)
  useEffect(() => {
    const fn = (e) => {
      let el = e.target;
      while (el && el !== document.body) {
        if (el.dataset && el.dataset.scrollable) {
          const atTop    = el.scrollTop === 0;
          const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 2;
          if ((e.deltaY > 0 && !atBottom) || (e.deltaY < 0 && !atTop)) return;
          break;
        }
        el = el.parentElement;
      }
      e.preventDefault();
      const now = Date.now();
      if (now - lastWheel.current < 750) return;
      lastWheel.current = now;
      nav(e.deltaY > 0 ? 1 : -1);
    };
    window.addEventListener("wheel", fn, { passive: false });
    return () => window.removeEventListener("wheel", fn);
  }, [nav]);

  // lock body scroll
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  const inCls  = dir > 0 ? "anim-slide-in-up"    : "anim-slide-in-down";
  const outCls = dir > 0 ? "anim-slide-out-up"   : "anim-slide-out-down";

  return (
    <div style={{ background: "#0a0a0a", height: "100vh", overflow: "hidden", fontFamily: "system-ui,-apple-system,sans-serif", color: "#f0ede8" }}>
      <style>{CSS}</style>

      {/* ── NAV BAR ── */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, height: 60, zIndex: 200,
        background: "rgba(10,10,10,0.88)", backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "0 10%",
      }}>
        <button onClick={() => goTo(0)} style={{ background: "none", border: "none", cursor: "pointer", fontWeight: 900, fontSize: 15, color: "#f0ede8", padding: 0, letterSpacing: "-0.01em" }}>
          <span style={{ color: A }}>X</span>avier Mascaros
        </button>
        <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
          {[["experience", "Experience"], ["case-01", "Cases"], ["skills", "Skills"], ["contact", "Contact"]].map(([id, lbl]) => (
            <button
              key={id} onClick={() => goTo(SLIDES.findIndex(s => s.id === id))}
              className="navbtn"
              style={{ background: "none", border: "none", cursor: "pointer", color: "#555", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: 0, transition: "color 0.2s" }}
            >{lbl}</button>
          ))}
          <a href="/docs/resume.pdf" target="_blank" rel="noopener noreferrer" style={{
            color: "#666", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em",
            textTransform: "uppercase", textDecoration: "none",
            border: "1px solid rgba(255,255,255,0.1)", padding: "6px 14px", borderRadius: 2,
          }}>Resume ↓</a>
          <button
            onClick={() => goTo(SLIDES.findIndex(s => s.id === "contact"))}
            style={{ background: A, color: "#fff", border: "none", padding: "7px 18px", borderRadius: 2, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", cursor: "pointer" }}
          >Hire Me</button>
        </div>
      </div>

      {/* ── SLIDE AREA ── */}
      <div style={{ position: "fixed", top: 60, left: 0, right: 0, bottom: 0, zIndex: 1 }}>
        {/* entering */}
        <div key={`in-${current}`} className={prev !== null ? inCls : ""} style={{ position: "absolute", inset: 0, zIndex: 20 }}>
          <SlideContent slide={SLIDES[current]} goTo={goTo} />
        </div>
        {/* leaving */}
        {prev !== null && (
          <div key={`out-${prev}`} className={outCls} style={{ position: "absolute", inset: 0, zIndex: 10, pointerEvents: "none" }}>
            <SlideContent slide={SLIDES[prev]} goTo={goTo} />
          </div>
        )}
      </div>

      {/* ── SIDE DOTS ── */}
      <div style={{
        position: "fixed", right: 22, top: "50%", transform: "translateY(-50%)",
        zIndex: 300, display: "flex", flexDirection: "column", gap: 7, alignItems: "center",
      }}>
        {SLIDES.map((s, i) => (
          <button
            key={s.id} onClick={() => goTo(i)} title={s.label}
            className={i === current ? "" : "dotbtn"}
            style={{
              width: i === current ? 22 : 7, height: 7,
              border: "none", cursor: "pointer", borderRadius: 4, padding: 0,
              background: i === current ? A : "rgba(255,255,255,0.18)",
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </div>

      {/* ── SLIDE COUNTER ── */}
      <div style={{
        position: "fixed", bottom: 22, right: "10%", zIndex: 300,
        fontSize: 11, color: "rgba(255,255,255,0.18)",
        fontWeight: 700, letterSpacing: "0.12em",
      }}>
        {String(current + 1).padStart(2, "0")} <span style={{ color: "rgba(255,255,255,0.1)" }}>/</span> {String(SLIDES.length).padStart(2, "0")}
      </div>

      {/* ── PROGRESS BAR ── */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, height: 2, zIndex: 300, background: "rgba(255,255,255,0.04)" }}>
        <div style={{
          height: "100%", background: A,
          width: `${((current + 1) / SLIDES.length) * 100}%`,
          transition: "width 0.52s cubic-bezier(0.22,0.61,0.36,1)",
        }} />
      </div>
    </div>
  );
}
 
