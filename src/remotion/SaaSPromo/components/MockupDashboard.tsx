import React from "react";
import { interpolate } from "remotion";
import { C } from "../config";

// ─── Shared sub-components ────────────────────────────────────────────────────

const BrowserChrome: React.FC<{ url: string; children: React.ReactNode }> = ({
  url,
  children,
}) => (
  <div
    style={{
      borderRadius: 14,
      overflow: "hidden",
      border: `1px solid ${C.border}`,
      boxShadow:
        "0 40px 80px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.04)",
    }}
  >
    {/* Browser bar */}
    <div
      style={{
        background: "#0D0D22",
        padding: "10px 16px",
        display: "flex",
        alignItems: "center",
        gap: 12,
        borderBottom: `1px solid ${C.border}`,
      }}
    >
      <div style={{ display: "flex", gap: 6 }}>
        {(["#EF4444", "#F59E0B", "#10B981"] as const).map((color) => (
          <div
            key={color}
            style={{ width: 10, height: 10, borderRadius: "50%", background: color }}
          />
        ))}
      </div>
      <div
        style={{
          flex: 1,
          background: "#1A1A38",
          borderRadius: 6,
          padding: "4px 12px",
          fontSize: 11,
          color: C.w40,
          fontFamily: "monospace",
        }}
      >
        {url}
      </div>
    </div>
    {children}
  </div>
);

// ─── Dashboard mockup ─────────────────────────────────────────────────────────

interface KPICardProps {
  label: string;
  value: string;
  change: string;
  positive: boolean;
  opacity: number;
}

const KPICard: React.FC<KPICardProps> = ({ label, value, change, positive, opacity }) => (
  <div
    style={{
      opacity,
      background: C.card,
      border: `1px solid ${C.border}`,
      borderRadius: 10,
      padding: "14px 16px",
    }}
  >
    <div style={{ fontSize: 11, color: C.w40, fontWeight: 500, marginBottom: 6 }}>
      {label}
    </div>
    <div style={{ fontSize: 22, fontWeight: 700, color: C.w, marginBottom: 4 }}>
      {value}
    </div>
    <div style={{ fontSize: 12, color: positive ? C.g : C.r, fontWeight: 600 }}>
      {change}
    </div>
  </div>
);

const DashboardMockup: React.FC<{ frame: number }> = ({ frame }) => {
  const barHeights = [40, 65, 45, 80, 70, 90, 75, 95, 85, 100, 88, 97];
  const barProgress = interpolate(frame, [20, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const kpis = [
    { label: "Total Users", value: "12,847", change: "↑ 23%", positive: true },
    { label: "MRR", value: "$84.2K", change: "↑ 18%", positive: true },
    { label: "Churn", value: "1.2%", change: "↓ 0.3%", positive: true },
    { label: "NPS", value: "72", change: "↑ 8 pts", positive: true },
  ];

  return (
    <BrowserChrome url="app.flowsync.io/dashboard">
      <div style={{ background: "#0A0A1E", display: "flex", height: 400 }}>
        {/* Sidebar */}
        <div
          style={{
            width: 52,
            background: "#08081A",
            borderRight: `1px solid ${C.border}`,
            padding: "16px 0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 14,
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 8,
              background: `linear-gradient(135deg, ${C.p}, ${C.b})`,
              marginBottom: 8,
            }}
          />
          {["▦", "◳", "⊞", "◎"].map((icon, i) => (
            <div
              key={icon}
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: i === 0 ? "rgba(124,58,237,0.2)" : "transparent",
                border: i === 0 ? `1px solid rgba(124,58,237,0.4)` : "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 14,
                color: i === 0 ? C.pLight : C.w40,
              }}
            >
              {icon}
            </div>
          ))}
        </div>

        {/* Content */}
        <div style={{ flex: 1, padding: 20, overflow: "hidden" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: C.w }}>Overview</div>
              <div style={{ fontSize: 11, color: C.w40 }}>Last 30 days</div>
            </div>
            <div
              style={{
                padding: "5px 14px",
                borderRadius: 6,
                background: `linear-gradient(135deg, ${C.p}, ${C.b})`,
                fontSize: 11,
                fontWeight: 600,
                color: C.w,
              }}
            >
              Export
            </div>
          </div>

          {/* KPI grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 8,
              marginBottom: 16,
            }}
          >
            {kpis.map((kpi, i) => (
              <KPICard
                key={kpi.label}
                {...kpi}
                opacity={interpolate(frame, [30 + i * 8, 50 + i * 8], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                })}
              />
            ))}
          </div>

          {/* Bar chart */}
          <div
            style={{
              background: C.card,
              border: `1px solid ${C.border}`,
              borderRadius: 10,
              padding: "12px 14px",
            }}
          >
            <div style={{ fontSize: 11, fontWeight: 600, color: C.w65, marginBottom: 10 }}>
              Revenue trend
            </div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 90 }}>
              {barHeights.map((h, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    height: h * barProgress,
                    background:
                      i === barHeights.length - 1
                        ? `linear-gradient(180deg, ${C.p}, ${C.b})`
                        : "rgba(124,58,237,0.28)",
                    borderRadius: "3px 3px 0 0",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </BrowserChrome>
  );
};

// ─── Automation mockup ────────────────────────────────────────────────────────

const AutomationMockup: React.FC<{ frame: number }> = ({ frame }) => {
  const nodes = [
    { x: 90,  y: 165, label: "Trigger",  color: C.p,  icon: "⚡" },
    { x: 255, y: 105, label: "Filter",   color: C.b,  icon: "⊞" },
    { x: 255, y: 225, label: "Wait",     color: C.y,  icon: "⏱" },
    { x: 420, y: 165, label: "Action",   color: C.g,  icon: "▶" },
    { x: 570, y: 165, label: "Notify",   color: C.pk, icon: "🔔" },
  ];
  const edges = [[0, 1], [0, 2], [1, 3], [2, 3], [3, 4]];
  const connProgress = interpolate(frame, [10, 70], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <BrowserChrome url="app.flowsync.io/workflows">
      <div style={{ background: "#0A0A1E", height: 400 }}>
        <div
          style={{
            padding: "10px 16px",
            borderBottom: `1px solid ${C.border}`,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <span style={{ fontSize: 13, fontWeight: 700, color: C.w }}>Workflow Builder</span>
          <div style={{ flex: 1 }} />
          <div
            style={{
              padding: "4px 14px",
              borderRadius: 6,
              background: `linear-gradient(135deg, ${C.p}, ${C.b})`,
              fontSize: 11,
              fontWeight: 700,
              color: C.w,
            }}
          >
            Deploy
          </div>
        </div>

        <div style={{ position: "relative", height: 352, overflow: "hidden" }}>
          {/* Dot grid canvas */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)`,
              backgroundSize: "24px 24px",
            }}
          />

          {/* Edges */}
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
            {edges.map(([from, to], i) => {
              const a = nodes[from];
              const b = nodes[to];
              const edgeProgress = Math.min(
                1,
                Math.max(0, (connProgress - i * 0.18) / 0.28)
              );
              return (
                <line
                  key={i}
                  x1={a.x + 38}
                  y1={a.y + 16}
                  x2={a.x + 38 + (b.x - a.x) * edgeProgress}
                  y2={a.y + 16 + (b.y - a.y) * edgeProgress}
                  stroke="rgba(124,58,237,0.55)"
                  strokeWidth={1.5}
                  strokeDasharray="5 4"
                />
              );
            })}
          </svg>

          {/* Nodes */}
          {nodes.map((node, i) => {
            const nodeOpacity = interpolate(frame, [i * 7, i * 7 + 18], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            return (
              <div
                key={node.label}
                style={{
                  position: "absolute",
                  left: node.x,
                  top: node.y,
                  opacity: nodeOpacity,
                }}
              >
                <div
                  style={{
                    padding: "7px 14px",
                    borderRadius: 10,
                    background: `${node.color}1A`,
                    border: `1px solid ${node.color}55`,
                    display: "flex",
                    alignItems: "center",
                    gap: 7,
                    whiteSpace: "nowrap",
                  }}
                >
                  <span style={{ fontSize: 13 }}>{node.icon}</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: C.w }}>
                    {node.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </BrowserChrome>
  );
};

// ─── Scale / infra mockup ─────────────────────────────────────────────────────

const ScaleMockup: React.FC<{ frame: number }> = ({ frame }) => {
  const services = [
    { name: "API Gateway",   replicas: 8,  health: 100, region: "us-east-1" },
    { name: "Auth Service",  replicas: 4,  health: 100, region: "eu-west-1"  },
    { name: "Data Pipeline", replicas: 12, health: 99,  region: "ap-south-1" },
    { name: "ML Inference",  replicas: 6,  health: 100, region: "us-west-2"  },
  ];

  return (
    <BrowserChrome url="app.flowsync.io/infrastructure">
      <div style={{ background: "#0A0A1E", height: 400 }}>
        <div
          style={{
            padding: "12px 16px",
            borderBottom: `1px solid ${C.border}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: 13, fontWeight: 700, color: C.w }}>
            Infrastructure · 4 regions
          </span>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <div
              style={{ width: 8, height: 8, borderRadius: "50%", background: C.g }}
            />
            <span style={{ fontSize: 11, color: C.g, fontWeight: 600 }}>
              All systems operational
            </span>
          </div>
        </div>

        <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
          {services.map((svc, i) => {
            const svcOpacity = interpolate(
              frame,
              [10 + i * 14, 30 + i * 14],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );
            const barWidth = interpolate(
              frame,
              [20 + i * 14, 65 + i * 10],
              [0, (svc.replicas / 14) * 100],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );
            return (
              <div
                key={svc.name}
                style={{
                  opacity: svcOpacity,
                  background: C.card,
                  border: `1px solid ${C.border}`,
                  borderRadius: 10,
                  padding: "12px 16px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 8,
                  }}
                >
                  <div>
                    <span style={{ fontSize: 13, fontWeight: 600, color: C.w }}>
                      {svc.name}
                    </span>
                    <span style={{ fontSize: 11, color: C.w40, marginLeft: 8 }}>
                      {svc.region}
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: 14 }}>
                    <span style={{ fontSize: 11, color: C.w65 }}>
                      {svc.replicas} replicas
                    </span>
                    <span style={{ fontSize: 11, color: C.g, fontWeight: 600 }}>
                      {svc.health}% healthy
                    </span>
                  </div>
                </div>
                <div
                  style={{
                    height: 4,
                    borderRadius: 2,
                    background: C.w08,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${barWidth}%`,
                      background: `linear-gradient(90deg, ${C.p}, ${C.b})`,
                      borderRadius: 2,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </BrowserChrome>
  );
};

// ─── Public API ───────────────────────────────────────────────────────────────

export type MockupType = "dashboard" | "automation" | "scale";

interface MockupDashboardProps {
  type: MockupType;
  frame: number;
}

export const MockupDashboard: React.FC<MockupDashboardProps> = ({ type, frame }) => {
  if (type === "automation") return <AutomationMockup frame={frame} />;
  if (type === "scale") return <ScaleMockup frame={frame} />;
  return <DashboardMockup frame={frame} />;
};
