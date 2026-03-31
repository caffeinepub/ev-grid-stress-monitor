import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart2, Battery, Car, Gauge, TrendingUp, Zap } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { TRANSFORMER_LOAD_DIST } from "../data/stateData";

const STATS = [
  {
    label: "Avg Battery SOC",
    value: "55.6%",
    icon: Battery,
    color: "text-cyan-400",
    bg: "bg-cyan-400/10 border-cyan-400/30",
  },
  {
    label: "Avg Charging Power",
    value: "12.5 kW",
    icon: Zap,
    color: "text-amber-400",
    bg: "bg-amber-400/10 border-amber-400/30",
  },
  {
    label: "V2G Enabled EVs",
    value: "49%",
    sub: "490 / 1,000",
    icon: Car,
    color: "text-purple-400",
    bg: "bg-purple-400/10 border-purple-400/30",
  },
  {
    label: "Total EV Records",
    value: "1,000",
    icon: BarChart2,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10 border-emerald-400/30",
  },
];

const RELIABILITY = [
  {
    label: "Avg LOLE",
    value: "4.95 hr",
    desc: "Loss of Load Expectation",
    icon: Gauge,
    color: "text-rose-400",
    bg: "bg-rose-400/10 border-rose-400/30",
  },
  {
    label: "Avg EENS",
    value: "49.97 MWh",
    desc: "Expected Energy Not Served",
    icon: TrendingUp,
    color: "text-orange-400",
    bg: "bg-orange-400/10 border-orange-400/30",
  },
  {
    label: "Avg Reliability Index",
    value: "0.228",
    desc: "From 1,400 capacity records",
    icon: BarChart2,
    color: "text-sky-400",
    bg: "bg-sky-400/10 border-sky-400/30",
  },
];

const BAR_COLORS = [
  "#22c55e",
  "#06b6d4",
  "#3b82f6",
  "#f59e0b",
  "#ef4444",
  "#6b7280",
];

const STATION_DIST = [
  { name: "Public DC Fast", value: 38, color: "#22c55e" },
  { name: "Public AC Level 2", value: 27, color: "#06b6d4" },
  { name: "Private/Residential", value: 22, color: "#3b82f6" },
  { name: "Fleet/Commercial", value: 13, color: "#f59e0b" },
];

const GRID_VS_STATIONS = [
  { state: "Maharashtra", gridLoad: 7842, stations: 2250 },
  { state: "Tamil Nadu", gridLoad: 7124, stations: 1980 },
  { state: "Gujarat", gridLoad: 6832, stations: 1820 },
  { state: "Karnataka", gridLoad: 6543, stations: 1650 },
  { state: "Rajasthan", gridLoad: 6123, stations: 1480 },
  { state: "Uttar Pradesh", gridLoad: 5987, stations: 1320 },
  { state: "Telangana", gridLoad: 5654, stations: 1210 },
  { state: "Delhi", gridLoad: 5423, stations: 1150 },
  { state: "Andhra Pradesh", gridLoad: 5187, stations: 980 },
  { state: "Madhya Pradesh", gridLoad: 4876, stations: 870 },
  { state: "West Bengal", gridLoad: 4654, stations: 820 },
  { state: "Kerala", gridLoad: 4321, stations: 760 },
  { state: "Punjab", gridLoad: 4102, stations: 690 },
  { state: "Haryana", gridLoad: 3987, stations: 640 },
  { state: "Odisha", gridLoad: 3754, stations: 580 },
  { state: "Bihar", gridLoad: 3521, stations: 510 },
  { state: "Jharkhand", gridLoad: 3298, stations: 460 },
  { state: "Chhattisgarh", gridLoad: 3087, stations: 420 },
  { state: "Assam", gridLoad: 2876, stations: 370 },
  { state: "Uttarakhand", gridLoad: 2654, stations: 340 },
  { state: "Himachal Pradesh", gridLoad: 2432, stations: 290 },
  { state: "Goa", gridLoad: 2187, stations: 260 },
  { state: "Tripura", gridLoad: 1965, stations: 210 },
  { state: "Meghalaya", gridLoad: 1743, stations: 175 },
  { state: "Manipur", gridLoad: 1521, stations: 145 },
  { state: "Nagaland", gridLoad: 1298, stations: 120 },
  { state: "Arunachal Pradesh", gridLoad: 1076, stations: 95 },
  { state: "Sikkim", gridLoad: 854, stations: 70 },
];

export default function EDAAnalysis() {
  return (
    <div className="space-y-6">
      {/* EV Dataset Stats */}
      <div>
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          EV Aggregation Dataset (1,000 Records)
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map((s) => (
            <Card key={s.label} className={`border ${s.bg}`}>
              <CardContent className="p-4 flex items-start gap-3">
                <div className={`p-2 rounded-lg ${s.bg}`}>
                  <s.icon className={`w-4 h-4 ${s.color}`} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                  <p className={`text-lg font-bold ${s.color}`}>{s.value}</p>
                  {s.sub && (
                    <p className="text-xs text-muted-foreground">{s.sub}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Transformer Load Distribution + EV Charging Station Distribution — side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-sm font-semibold">
              Transformer Load Distribution (EV Aggregation Dataset)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart
                data={TRANSFORMER_LOAD_DIST}
                margin={{ left: 10, right: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis
                  dataKey="range"
                  tick={{ fill: "#94a3b8", fontSize: 11 }}
                />
                <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} />
                <Tooltip
                  formatter={(val: number) => [val, "Records"]}
                  contentStyle={{
                    background: "#1e293b",
                    border: "1px solid #334155",
                    borderRadius: 8,
                  }}
                  labelStyle={{ color: "#e2e8f0" }}
                />
                <Bar dataKey="count" name="Records" radius={[4, 4, 0, 0]}>
                  {TRANSFORMER_LOAD_DIST.map((entry, i) => (
                    <Cell key={entry.range} fill={BAR_COLORS[i]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-sm font-semibold">
              EV Charging Station Distribution by Type
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={STATION_DIST}
                  cx="50%"
                  cy="45%"
                  innerRadius={55}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {STATION_DIST.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val: number) => [`${val}%`, "Share"]}
                  contentStyle={{
                    background: "#1e293b",
                    border: "1px solid #334155",
                    borderRadius: 8,
                  }}
                  labelStyle={{ color: "#e2e8f0" }}
                />
                <Legend
                  iconType="circle"
                  iconSize={10}
                  formatter={(value) => (
                    <span style={{ color: "#94a3b8", fontSize: 12 }}>
                      {value}
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Grid Load vs Charging Stations — All 28 States */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-sm font-semibold">
            Grid Load vs Charging Stations (All 28 States)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={340}>
            <ScatterChart margin={{ top: 10, right: 30, bottom: 30, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis
                dataKey="stations"
                type="number"
                name="Charging Stations"
                tick={{ fill: "#94a3b8", fontSize: 12 }}
                label={{
                  value: "Charging Stations",
                  position: "insideBottom",
                  offset: -15,
                  fill: "#64748b",
                  fontSize: 12,
                }}
              />
              <YAxis
                dataKey="gridLoad"
                type="number"
                name="Grid Load (MW)"
                tick={{ fill: "#94a3b8", fontSize: 12 }}
                label={{
                  value: "Grid Load (MW)",
                  angle: -90,
                  position: "insideLeft",
                  offset: 10,
                  fill: "#64748b",
                  fontSize: 12,
                }}
              />
              <Tooltip
                cursor={{ strokeDasharray: "3 3" }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const d = payload[0].payload;
                    return (
                      <div
                        style={{
                          background: "#1e293b",
                          border: "1px solid #334155",
                          borderRadius: 8,
                          padding: "8px 12px",
                        }}
                      >
                        <p style={{ color: "#e2e8f0", fontWeight: 600 }}>
                          {d.state}
                        </p>
                        <p style={{ color: "#06b6d4", fontSize: 12 }}>
                          Stations: {d.stations}
                        </p>
                        <p style={{ color: "#22c55e", fontSize: 12 }}>
                          Grid Load: {d.gridLoad} MW
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Scatter data={GRID_VS_STATIONS} fill="#06b6d4" />
            </ScatterChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Reliability Metrics */}
      <div>
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Capacity &amp; Reliability Metrics (1,400 Records)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {RELIABILITY.map((r) => (
            <Card key={r.label} className={`border ${r.bg}`}>
              <CardContent className="p-5 flex items-start gap-3">
                <div className={`p-2 rounded-lg ${r.bg}`}>
                  <r.icon className={`w-5 h-5 ${r.color}`} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{r.label}</p>
                  <p className={`text-xl font-bold ${r.color}`}>{r.value}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {r.desc}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Feature Importance Note */}
      <Card className="border-amber-400/30 bg-amber-400/5">
        <CardContent className="p-4">
          <p className="text-sm text-amber-300 font-semibold mb-1">
            Key Insight from EDA
          </p>
          <p className="text-sm text-muted-foreground">
            Transformer Loading (%) emerged as the{" "}
            <strong className="text-foreground">
              most significant predictive factor
            </strong>{" "}
            for grid stress, followed by Grid Load (MW) and Charging Session
            counts. States with transformer loads exceeding 70% show a 4×
            increase in overload risk probability.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
