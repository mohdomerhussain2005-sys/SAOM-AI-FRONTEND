// Copy and mock data for the SAOM-AI landing page (v2).
// Kept separate from components so it can later be swapped for
// live API data without touching layout or animation code.

export const navLinks = [
  { label: "Platform", href: "#pipeline" },
  { label: "Autonomy", href: "#autonomy" },
  { label: "Visibility", href: "#visibility" },
  { label: "Company", href: "#contact" },
];

export const pipelineStages = [
  {
    id: "detect",
    index: "01",
    label: "Detect",
    heading: "Every signal, observed.",
    body: "SAOM-AI continuously watches endpoints, identities, and network flow — surfacing anomalies the moment they diverge from baseline.",
    annotation: "Anomaly flagged — auth pattern deviation",
    tone: "detect",
  },
  {
    id: "analyze",
    index: "02",
    label: "Analyze",
    heading: "Signal becomes understanding.",
    body: "Related events are correlated in real time. The model reconstructs intent, not just individual alerts.",
    annotation: "Correlated with 3 related events",
    tone: "analyze",
  },
  {
    id: "orchestrate",
    index: "03",
    label: "Orchestrate",
    heading: "A plan, formed instantly.",
    body: "SAOM-AI weighs response options against business impact and confidence, then prepares the safest effective action.",
    annotation: "Containment path selected — host isolation",
    tone: "orchestrate",
  },
  {
    id: "respond",
    index: "04",
    label: "Respond",
    heading: "Action, coordinated.",
    body: "The response executes across your stack in seconds, with a full record for the humans who stay in control.",
    annotation: "Threat contained in 2.8s",
    tone: "respond",
  },
];

export const autonomySpectrum = [
  {
    id: "human-led",
    label: "Human-led",
    description: "Analysts triage every alert manually. Coverage depends on headcount and hours in the day.",
  },
  {
    id: "ai-assisted",
    label: "AI-assisted",
    description: "SAOM-AI surfaces ranked findings and recommended actions. People decide, faster.",
  },
  {
    id: "ai-orchestrated",
    label: "AI-orchestrated",
    description: "Low-risk responses execute autonomously within policy. Analysts govern the exceptions.",
  },
];

export const visibilityMetrics = [
  { id: "assets", value: 48200, suffix: "+", label: "Assets continuously monitored" },
  { id: "accuracy", value: 99.9, suffix: "%", label: "Detection accuracy", decimals: 1 },
  { id: "response", value: 2.8, suffix: "s", label: "Median containment time", decimals: 1 },
  { id: "coverage", value: 24, suffix: "/7", label: "Autonomous coverage" },
];

export const heroCopy = {
  eyebrow: "Autonomous Security Operations",
  headlineLines: ["Security that", "thinks ahead."],
  description:
    "SAOM-AI observes, reasons, and acts across your environment — an autonomous operations layer built for threats that no longer wait for business hours.",
  primaryCta: "Request Access",
  secondaryCta: "See how it works",
};
