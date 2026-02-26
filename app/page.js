'use client';
import { useState, useEffect, useRef } from 'react';

// ─── Animated Counter ───
function Counter({ end, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [visible, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// ─── Particle Field ───
function ParticleField() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(40)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-purple-500/20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float ${4 + Math.random() * 6}s ease-in-out ${Math.random() * 4}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

// ─── Agent Node Visualization ───
function AgentGraph() {
  const nodes = [
    { x: 200, y: 120, label: 'Planner', color: '#7c3aed' },
    { x: 400, y: 80, label: 'Researcher', color: '#3b82f6' },
    { x: 350, y: 240, label: 'Executor', color: '#06b6d4' },
    { x: 150, y: 260, label: 'Validator', color: '#8b5cf6' },
    { x: 500, y: 200, label: 'Reporter', color: '#0ea5e9' },
  ];

  const edges = [
    [0, 1], [0, 3], [1, 2], [1, 4], [2, 3], [2, 4], [3, 0],
  ];

  return (
    <svg viewBox="0 0 600 360" className="w-full max-w-xl mx-auto">
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].x} y1={nodes[a].y}
          x2={nodes[b].x} y2={nodes[b].y}
          stroke="rgba(124, 58, 237, 0.15)"
          strokeWidth="1.5"
          strokeDasharray="6 4"
        >
          <animate attributeName="stroke-opacity" values="0.1;0.3;0.1" dur={`${3 + i * 0.5}s`} repeatCount="indefinite" />
        </line>
      ))}
      {nodes.map((node, i) => (
        <g key={i}>
          <circle cx={node.x} cy={node.y} r="28" fill={node.color} opacity="0.08" />
          <circle cx={node.x} cy={node.y} r="18" fill={node.color} opacity="0.15">
            <animate attributeName="r" values="18;22;18" dur="4s" begin={`${i * 0.8}s`} repeatCount="indefinite" />
          </circle>
          <circle cx={node.x} cy={node.y} r="6" fill={node.color} opacity="0.9">
            <animate attributeName="opacity" values="0.6;1;0.6" dur="3s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
          </circle>
          <text x={node.x} y={node.y + 40} textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="'JetBrains Mono', monospace">
            {node.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

// ─── Code Block ───
function CodeDemo() {
  const code = `import nema

# Define your agent swarm
swarm = nema.Swarm("research-team")

# Add specialized agents
swarm.add(nema.Agent(
    role="researcher",
    model="claude-opus-4",
    tools=["web_search", "arxiv", "pdf_parse"],
    instructions="Find cutting-edge papers on the topic"
))

swarm.add(nema.Agent(
    role="synthesizer",
    model="gpt-4o",
    instructions="Combine findings into actionable insights"
))

swarm.add(nema.Agent(
    role="critic",
    model="claude-sonnet-4",
    instructions="Challenge assumptions, find gaps"
))

# Launch — agents collaborate autonomously
result = await swarm.run(
    "Analyze the state of AI agent architectures in 2026"
)

print(result.summary)    # Synthesized report
print(result.citations)  # 47 papers analyzed
print(result.cost)       # $0.23 total`;

  return (
    <div className="glass rounded-xl overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
        <div className="w-3 h-3 rounded-full bg-red-500/60" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
        <div className="w-3 h-3 rounded-full bg-green-500/60" />
        <span className="ml-3 text-xs text-gray-500 font-mono">swarm.py</span>
      </div>
      <pre className="p-6 text-sm leading-relaxed overflow-x-auto" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
        <code className="text-gray-300">{code}</code>
      </pre>
    </div>
  );
}

// ─── Main Page ───
export default function Home() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const features = [
    {
      icon: '🧠',
      title: 'Multi-Model Orchestration',
      desc: 'Run Claude, GPT-4, Gemini, and open-source models in the same swarm. Each agent picks the best model for its role.',
    },
    {
      icon: '🔄',
      title: 'Autonomous Collaboration',
      desc: 'Agents communicate, delegate, and resolve conflicts without human intervention. Built-in consensus protocols.',
    },
    {
      icon: '🛡️',
      title: 'Guardrails by Default',
      desc: 'Every agent runs inside a sandboxed environment with configurable permissions, budget limits, and kill switches.',
    },
    {
      icon: '📊',
      title: 'Observable & Debuggable',
      desc: 'Full execution traces, token-level cost tracking, and real-time dashboards. Know exactly what your agents are doing.',
    },
    {
      icon: '🔌',
      title: 'Tool Ecosystem',
      desc: '200+ pre-built tool integrations — from web search to code execution, database queries to API calls.',
    },
    {
      icon: '⚡',
      title: 'Scale to Zero',
      desc: 'Pay only for compute you use. Agents spin up on demand and hibernate when idle. No idle infrastructure costs.',
    },
  ];

  const useCases = [
    { 
      title: 'Research & Analysis',
      desc: 'Deploy agent teams that read papers, analyze data, and synthesize reports — 100x faster than manual research.',
      metric: '47 papers analyzed in 3 minutes',
    },
    { 
      title: 'Code Generation & Review',
      desc: 'Architect, implement, test, and review code with specialized agents that understand your entire codebase.',
      metric: '12x faster PR turnaround',
    },
    { 
      title: 'Customer Operations',
      desc: 'Intelligent agents that handle support tickets, route issues, and resolve problems autonomously.',
      metric: '89% resolution without human escalation',
    },
    { 
      title: 'Data Pipeline Automation',
      desc: 'Agents that ingest, clean, transform, and analyze data across your entire stack.',
      metric: 'From raw data to insight in minutes',
    },
  ];

  return (
    <div className="relative min-h-screen grid-bg">
      <ParticleField />

      {/* Orbs */}
      <div className="orb w-96 h-96 bg-purple-600 top-20 -left-48" />
      <div className="orb w-80 h-80 bg-blue-600 top-96 right-0" />
      <div className="orb w-64 h-64 bg-cyan-600 bottom-96 left-1/3" />

      {/* ─── Nav ─── */}
      <nav className="relative z-50 flex items-center justify-between px-6 lg:px-16 py-5 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg">N</div>
          <span className="text-xl font-bold tracking-tight">nema</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-gray-400">
          <a href="#features" className="hover:text-white transition">Features</a>
          <a href="#how-it-works" className="hover:text-white transition">How It Works</a>
          <a href="#use-cases" className="hover:text-white transition">Use Cases</a>
          <a href="https://docs.nema.ai" className="hover:text-white transition">Docs</a>
        </div>
        <div className="flex items-center gap-3">
          <a href="#waitlist" className="btn-primary px-5 py-2.5 rounded-lg text-sm font-medium text-white">Get Early Access</a>
        </div>
      </nav>

      {/* ─── Hero ─── */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-32 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs text-purple-300 mb-8">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Now in Private Beta
        </div>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95] mb-8">
          <span className="text-gradient">The Operating System</span>
          <br />
          <span className="text-white">for AI Agents</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
          Deploy swarms of autonomous agents that collaborate, reason, and execute.
          Multi-model. Observable. Production-ready.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#waitlist" className="btn-primary px-8 py-4 rounded-xl text-base font-semibold text-white">
            Request Access →
          </a>
          <a href="#how-it-works" className="px-8 py-4 rounded-xl text-base font-medium text-gray-300 glass hover:text-white transition">
            See How It Works
          </a>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-12 mt-20">
          {[
            { value: 47, suffix: 'ms', label: 'Avg Agent Spawn' },
            { value: 200, suffix: '+', label: 'Tool Integrations' },
            { value: 99, suffix: '.9%', label: 'Uptime SLA' },
            { value: 10, suffix: 'x', label: 'Faster Than Manual' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white">
                <Counter end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Agent Visualization ─── */}
      <section id="how-it-works" className="relative z-10 max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Agents that think <span className="text-gradient">together</span></h2>
          <p className="text-gray-400 max-w-xl mx-auto">Each agent has a specialized role. They communicate through structured message passing, share context, and converge on solutions autonomously.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <AgentGraph />
          <CodeDemo />
        </div>
      </section>

      {/* ─── Features ─── */}
      <section id="features" className="relative z-10 max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Built for <span className="text-gradient">production</span></h2>
          <p className="text-gray-400 max-w-xl mx-auto">Not a toy. Not a demo. A real platform for deploying AI agent systems at scale.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div key={i} className="glass glass-hover rounded-xl p-8 transition-all duration-300">
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="text-lg font-semibold text-white mb-2">{f.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Use Cases ─── */}
      <section id="use-cases" className="relative z-10 max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">What teams build with <span className="text-gradient">Nema</span></h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {useCases.map((uc, i) => (
            <div key={i} className="glass glass-hover rounded-xl p-8 transition-all duration-300">
              <h3 className="text-xl font-semibold text-white mb-3">{uc.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">{uc.desc}</p>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 text-purple-300 text-xs font-mono">
                {uc.metric}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Pricing Teaser ─── */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 py-24 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Simple, transparent <span className="text-gradient">pricing</span></h2>
        <p className="text-gray-400 mb-12">Pay for what you use. No hidden fees. No lock-in.</p>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: 'Starter', price: 'Free', desc: '5 agents, 10K executions/mo', cta: 'Get Started' },
            { name: 'Pro', price: '$49/mo', desc: 'Unlimited agents, 500K executions/mo', cta: 'Start Trial', featured: true },
            { name: 'Enterprise', price: 'Custom', desc: 'Dedicated infrastructure, SLA, SSO', cta: 'Contact Sales' },
          ].map((plan, i) => (
            <div key={i} className={`rounded-xl p-8 transition-all duration-300 ${plan.featured ? 'bg-gradient-to-b from-purple-500/10 to-blue-500/5 border border-purple-500/20' : 'glass glass-hover'}`}>
              <div className="text-sm text-gray-400 mb-2">{plan.name}</div>
              <div className="text-3xl font-bold text-white mb-3">{plan.price}</div>
              <div className="text-sm text-gray-400 mb-6">{plan.desc}</div>
              <a href="#waitlist" className={`block w-full py-3 rounded-lg text-sm font-medium text-center transition ${plan.featured ? 'btn-primary text-white' : 'glass text-gray-300 hover:text-white'}`}>
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Backed By ─── */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Backed by <span className="text-gradient">visionaries</span></h2>
          <p className="text-gray-400 max-w-xl mx-auto">World-class investors who believe in the future of autonomous AI.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            {
              name: 'Sarah Chen',
              title: 'Partner, Sequoia Capital',
              img: '/sarah-chen.png',
              quote: '"Nema is the infrastructure layer AI has been missing."',
            },
            {
              name: 'joeVC',
              title: 'Managing Partner, Disruption Ventures',
              img: '/joevc-generated.png',
              quote: '"I wrote my first check after the demo crashed 3 times. That\'s conviction."',
              featured: true,
            },
            {
              name: 'Priya Patel',
              title: 'GP, Andreessen Horowitz',
              img: '/priya-patel.png',
              quote: '"The agent coordination protocol is genuinely novel."',
            },
          ].map((investor, i) => (
            <div key={i} className={`rounded-xl p-8 text-center transition-all duration-300 ${investor.featured ? 'bg-gradient-to-b from-yellow-500/10 to-orange-500/5 border-2 border-yellow-500/30 scale-105' : 'glass glass-hover'}`}>
              {investor.featured && (
                <div className="text-xs font-bold text-yellow-400 uppercase tracking-widest mb-3 animate-pulse">⭐ Lead Investor ⭐</div>
              )}
              <div className="w-28 h-28 mx-auto mb-4 rounded-full overflow-hidden border-2 border-white/10" style={investor.featured ? { borderColor: 'rgba(234, 179, 8, 0.5)', boxShadow: '0 0 30px rgba(234, 179, 8, 0.2)' } : {}}>
                <img src={investor.img} alt={investor.name} className="w-full h-full object-cover" />
              </div>
              <h3 className={`text-lg font-bold mb-1 ${investor.featured ? 'text-yellow-300' : 'text-white'}`}>{investor.name}</h3>
              <p className="text-sm text-gray-400 mb-4">{investor.title}</p>
              <p className="text-sm text-gray-300 italic leading-relaxed">{investor.quote}</p>
              {investor.featured && (
                <div className="mt-4 text-xs text-yellow-500/60 font-mono">Investment size: undisclosed (but he won&apos;t stop talking about it)</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ─── Waitlist ─── */}
      <section id="waitlist" className="relative z-10 max-w-2xl mx-auto px-6 py-24 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Ready to <span className="text-gradient">orchestrate</span>?</h2>
        <p className="text-gray-400 mb-8">Join the waitlist for early access. We're onboarding teams weekly.</p>
        {submitted ? (
          <div className="glass rounded-xl p-8 animate-fade-up">
            <div className="text-4xl mb-4">🎉</div>
            <h3 className="text-xl font-semibold text-white mb-2">You&apos;re on the list!</h3>
            <p className="text-gray-400">We&apos;ll reach out when your spot is ready.</p>
          </div>
        ) : (
          <form
            onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              required
              className="flex-1 px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition"
            />
            <button type="submit" className="btn-primary px-8 py-4 rounded-xl text-sm font-semibold text-white whitespace-nowrap">
              Join Waitlist
            </button>
          </form>
        )}
      </section>

      {/* ─── Footer ─── */}
      <footer className="relative z-10 border-t border-white/5 px-6 lg:px-16 py-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold">N</div>
            <span className="font-semibold">nema</span>
          </div>
          <div className="flex items-center gap-8 text-sm text-gray-500">
            <a href="#" className="hover:text-gray-300 transition">Twitter</a>
            <a href="#" className="hover:text-gray-300 transition">GitHub</a>
            <a href="#" className="hover:text-gray-300 transition">Discord</a>
            <a href="mailto:hello@nema.ai" className="hover:text-gray-300 transition">Contact</a>
          </div>
          <div className="text-sm text-gray-600">© 2026 Nema AI. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
