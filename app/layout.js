import './globals.css';

export const metadata = {
  title: 'Nema — Autonomous AI Agent Orchestration',
  description: 'Nema is the operating system for autonomous AI agents. Deploy, orchestrate, and scale intelligent agents that collaborate to solve complex problems.',
  openGraph: {
    title: 'Nema — Autonomous AI Agent Orchestration',
    description: 'The operating system for autonomous AI agents.',
    url: 'https://nema.vercel.app',
    siteName: 'Nema',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nema — Autonomous AI Agent Orchestration',
    description: 'The operating system for autonomous AI agents.',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body style={{ fontFamily: "'Inter', sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
