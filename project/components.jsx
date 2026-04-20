// Small icon set (lucide-style stroke SVGs). Unique names to avoid collisions.
const Icon = {
  TrendUp: (p) => (
    <svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 17l6-6 4 4 8-8"/><path d="M14 7h7v7"/>
    </svg>
  ),
  TrendDown: (p) => (
    <svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7l6 6 4-4 8 8"/><path d="M14 17h7v-7"/>
    </svg>
  ),
  Bell: (p) => (
    <svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill={p.fill||"none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
    </svg>
  ),
  Search: (p) => (
    <svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
    </svg>
  ),
  Activity: (p) => (
    <svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
    </svg>
  ),
  LayoutGrid: (p) => (
    <svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
    </svg>
  ),
  AlertCircle: (p) => (
    <svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
  ),
  Settings: (p) => (
    <svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>
    </svg>
  ),
  Trash: (p) => (
    <svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6"/><path d="M19 6l-2 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
    </svg>
  ),
  Edit: (p) => (
    <svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
  ),
  Plus: (p) => (
    <svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  ),
  X: (p) => (
    <svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),
  ChevronDown: (p) => (
    <svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 9 6 6 6-6"/>
    </svg>
  ),
  ChevronRight: (p) => (
    <svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m9 18 6-6-6-6"/>
    </svg>
  ),
  Mail: (p) => (
    <svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 5L2 7"/>
    </svg>
  ),
  Slack: (p) => (
    <svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="13" y="2" width="3" height="8" rx="1.5"/><rect x="8" y="14" width="3" height="8" rx="1.5"/><rect x="2" y="8" width="8" height="3" rx="1.5"/><rect x="14" y="13" width="8" height="3" rx="1.5"/>
    </svg>
  ),
};

function Badge({ children, variant = "gray" }) {
  return <span className={`badge ${variant}`}>{children}</span>;
}

function Trend({ value, suffix = "%" }) {
  const n = Number(value);
  if (!Number.isFinite(n) || n === 0) return <span className="trend neutral mono tnum">0{suffix}</span>;
  const cls = n > 0 ? "up" : "down";
  return (
    <span className={`trend ${cls} mono tnum`}>
      {n > 0 ? <Icon.TrendUp size={12}/> : <Icon.TrendDown size={12}/>}
      {n > 0 ? "+" : ""}{n}{suffix}
    </span>
  );
}

function ZCell({ value }) {
  const n = Number(value);
  const cls = Math.abs(n) >= 3 ? (n > 0 ? "up" : "down") : "neutral";
  return <span className={`trend ${cls} mono tnum`}>{n.toFixed(1)}</span>;
}

function fmt$(n) {
  return "$" + Number(n).toLocaleString("en-US");
}

function LineChart({ data, width = 420, height = 200 }) {
  const pad = { l: 32, r: 12, t: 16, b: 22 };
  const w = width - pad.l - pad.r;
  const h = height - pad.t - pad.b;
  const max = Math.max(...data.map(d => d.value)) * 1.1;
  const min = 0;
  const x = (i) => pad.l + (i / (data.length - 1)) * w;
  const y = (v) => pad.t + h - ((v - min) / (max - min)) * h;
  const path = data.map((d, i) => `${i === 0 ? "M" : "L"}${x(i)},${y(d.value)}`).join(" ");
  const areaPath = `${path} L${x(data.length-1)},${pad.t + h} L${x(0)},${pad.t + h} Z`;

  const yTicks = [0, 15, 30, 45, 60];
  return (
    <svg width={width} height={height} style={{display:'block', maxWidth:'100%'}}>
      <defs>
        <linearGradient id="chartGrad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="hsl(221 83% 53%)" stopOpacity="0.18"/>
          <stop offset="100%" stopColor="hsl(221 83% 53%)" stopOpacity="0"/>
        </linearGradient>
      </defs>
      {yTicks.map(t => (
        <g key={t}>
          <line x1={pad.l} x2={width-pad.r} y1={y(t)} y2={y(t)} stroke="hsl(220 13% 93%)"/>
          <text x={pad.l-6} y={y(t)+3} fontSize="10" textAnchor="end" fill="hsl(220 9% 46%)" className="mono">{t}</text>
        </g>
      ))}
      <path d={areaPath} fill="url(#chartGrad)"/>
      <path d={path} stroke="hsl(221 83% 53%)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      {data.map((d, i) => (
        <circle key={i} cx={x(i)} cy={y(d.value)} r="3" fill="hsl(221 83% 53%)" stroke="white" strokeWidth="1.5"/>
      ))}
      {data.map((d, i) => (
        <text key={`l${i}`} x={x(i)} y={height-6} fontSize="10" textAnchor="middle" fill="hsl(220 9% 46%)" className="mono">
          {d.date}
        </text>
      ))}
      <text x={6} y={12} fontSize="10" fill="hsl(220 9% 46%)" className="mono">$ Volume</text>
    </svg>
  );
}

function Dialog({ open, onClose, children }) {
  if (!open) return null;
  return (
    <div className="overlay" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="dialog" onMouseDown={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

function Drawer({ open, onClose, children }) {
  if (!open) return null;
  return (
    <>
      <div className="overlay" onMouseDown={onClose} style={{background: "rgba(15,23,42,0.2)"}}/>
      <div className="drawer">{children}</div>
    </>
  );
}

Object.assign(window, { Icon, Badge, Trend, ZCell, fmt$, LineChart, Dialog, Drawer });
