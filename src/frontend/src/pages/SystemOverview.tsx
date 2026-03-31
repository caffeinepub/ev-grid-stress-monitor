import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, AlertTriangle, Database, Zap } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  HOURLY_GRID_LOAD,
  RISK_DISTRIBUTION,
  TOP_STATES_RISK,
} from "../data/stateData";

const KPI_CARDS = [
  {
    label: "Total States",
    value: "28",
    icon: Database,
    color: "text-cyan-400",
    bg: "bg-cyan-400/10 border-cyan-400/30",
  },
  {
    label: "High Risk Hours",
    value: "94",
    sub: "1.07% of 8,760",
    icon: AlertTriangle,
    color: "text-red-400",
    bg: "bg-red-400/10 border-red-400/30",
  },
  {
    label: "Avg Transformer Load",
    value: "50.9%",
    icon: Zap,
    color: "text-amber-400",
    bg: "bg-amber-400/10 border-amber-400/30",
  },
  {
    label: "Total Data Records",
    value: "8,760",
    sub: "1 full year",
    icon: Activity,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10 border-emerald-400/30",
  },
];

export default function SystemOverview() {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {KPI_CARDS.map((k) => (
          <Card
            key={k.label}
            className={`border ${k.bg}`}
            data-ocid="overview.card"
          >
            <CardContent className="p-4 flex items-start gap-3">
              <div className={`p-2 rounded-lg ${k.bg}`}>
                <k.icon className={`w-5 h-5 ${k.color}`} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{k.label}</p>
                <p className={`text-xl font-bold ${k.color}`}>{k.value}</p>
                {k.sub && (
                  <p className="text-xs text-muted-foreground">{k.sub}</p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Distribution Pie */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-sm font-semibold text-foreground">
              Risk Level Distribution (8,760 hrs)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={RISK_DISTRIBUTION}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={3}
                  dataKey="value"
                  label={({ name, pct }: { name: string; pct: number }) =>
                    `${name} ${pct}%`
                  }
                  labelLine={{ stroke: "#6b7280" }}
                >
                  {RISK_DISTRIBUTION.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val: number, name: string) => [
                    `${val} hrs`,
                    name,
                  ]}
                  contentStyle={{
                    background: "#1e293b",
                    border: "1px solid #334155",
                    borderRadius: 8,
                  }}
                  labelStyle={{ color: "#e2e8f0" }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top 15 States Risk Ranking */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-sm font-semibold text-foreground">
              Top 15 States — Overloaded Risk Ranking
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart
                data={TOP_STATES_RISK}
                layout="vertical"
                margin={{ left: 90, right: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis
                  type="number"
                  domain={[0, 20]}
                  tick={{ fill: "#94a3b8", fontSize: 11 }}
                />
                <YAxis
                  dataKey="state"
                  type="category"
                  tick={{ fill: "#94a3b8", fontSize: 10 }}
                  width={90}
                />
                <Tooltip
                  contentStyle={{
                    background: "#1e293b",
                    border: "1px solid #334155",
                    borderRadius: 8,
                  }}
                  labelStyle={{ color: "#e2e8f0" }}
                />
                <Bar dataKey="score" name="Risk Score" radius={[0, 4, 4, 0]}>
                  {TOP_STATES_RISK.map((entry) => (
                    <Cell
                      key={entry.state}
                      fill={
                        entry.score === 19
                          ? "#ef4444"
                          : entry.score === 18
                            ? "#f59e0b"
                            : "#3b82f6"
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Hourly Grid Load */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-sm font-semibold text-foreground">
            24-Hour Average Grid Load Trend (MW)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={HOURLY_GRID_LOAD} margin={{ left: 10, right: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="hour" tick={{ fill: "#94a3b8", fontSize: 11 }} />
              <YAxis
                domain={[6400, 7400]}
                tick={{ fill: "#94a3b8", fontSize: 11 }}
              />
              <Tooltip
                formatter={(val: number) => [
                  `${val.toFixed(1)} MW`,
                  "Grid Load",
                ]}
                contentStyle={{
                  background: "#1e293b",
                  border: "1px solid #334155",
                  borderRadius: 8,
                }}
                labelStyle={{ color: "#e2e8f0" }}
              />
              <Line
                type="monotone"
                dataKey="load"
                stroke="#06b6d4"
                strokeWidth={2.5}
                dot={{ fill: "#06b6d4", r: 3 }}
                activeDot={{ r: 5, fill: "#22d3ee" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
