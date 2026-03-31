import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Trophy } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ML_MODELS } from "../data/stateData";

const MODEL_COLORS = ["#22c55e", "#06b6d4", "#3b82f6", "#f59e0b", "#a78bfa"];

const RADAR_DATA = [
  {
    metric: "Accuracy",
    ...Object.fromEntries(ML_MODELS.map((m) => [m.name, m.accuracy * 100])),
  },
  {
    metric: "Precision",
    ...Object.fromEntries(ML_MODELS.map((m) => [m.name, m.precision * 100])),
  },
  {
    metric: "Recall",
    ...Object.fromEntries(ML_MODELS.map((m) => [m.name, m.recall * 100])),
  },
  {
    metric: "F1",
    ...Object.fromEntries(ML_MODELS.map((m) => [m.name, m.f1 * 100])),
  },
];

export default function MLModels() {
  return (
    <div className="space-y-6">
      {/* Best model callout */}
      <Card className="border-emerald-400/40 bg-emerald-400/5">
        <CardContent className="p-4 flex items-start gap-4">
          <div className="p-3 bg-emerald-400/20 rounded-xl">
            <Trophy className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <p className="font-bold text-emerald-400 text-lg">
                Random Forest — Best Model
              </p>
              <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/40">
                Accuracy: 100%
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Achieves perfect accuracy (1.00) and F1 score (1.00) on the EV
              grid stress dataset using Grid Search hyperparameter tuning.
              Selected as the primary model for the Stress Assessment module.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Model Performance Table */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-sm font-semibold">
            Model Performance Comparison
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/50">
                  {["Model", "Accuracy", "Precision", "Recall", "F1 Score"].map(
                    (h) => (
                      <th
                        key={h}
                        className="text-left py-2 px-3 text-muted-foreground font-medium text-xs uppercase tracking-wide"
                      >
                        {h}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {ML_MODELS.map((m) => (
                  <tr
                    key={m.name}
                    className={`border-b border-border/20 ${m.best ? "bg-emerald-400/5" : ""}`}
                  >
                    <td className="py-2.5 px-3 font-medium">
                      <div className="flex items-center gap-2">
                        {m.best && (
                          <Star className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                        )}
                        <span
                          className={
                            m.best ? "text-emerald-300" : "text-foreground"
                          }
                        >
                          {m.name}
                        </span>
                      </div>
                    </td>
                    {(["accuracy", "precision", "recall", "f1"] as const).map(
                      (key) => (
                        <td key={key} className="py-2.5 px-3">
                          <span
                            className={`font-mono text-sm ${m.best ? "text-emerald-400 font-bold" : "text-foreground"}`}
                          >
                            {(m[key] * 100).toFixed(1)}%
                          </span>
                        </td>
                      ),
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Accuracy Comparison Bar */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-sm font-semibold">
              Accuracy Comparison
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart
                data={ML_MODELS}
                layout="vertical"
                margin={{ left: 110, right: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis
                  type="number"
                  domain={[0.8, 1.02]}
                  tick={{ fill: "#94a3b8", fontSize: 11 }}
                  tickFormatter={(v) => `${(v * 100).toFixed(0)}%`}
                />
                <YAxis
                  dataKey="name"
                  type="category"
                  tick={{ fill: "#94a3b8", fontSize: 10 }}
                  width={110}
                />
                <Tooltip
                  formatter={(val: number) => [
                    `${(val * 100).toFixed(1)}%`,
                    "Accuracy",
                  ]}
                  contentStyle={{
                    background: "#1e293b",
                    border: "1px solid #334155",
                    borderRadius: 8,
                  }}
                  labelStyle={{ color: "#e2e8f0" }}
                />
                <Bar dataKey="accuracy" radius={[0, 4, 4, 0]}>
                  {ML_MODELS.map((_, i) => (
                    <Cell key={ML_MODELS[i].name} fill={MODEL_COLORS[i]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Radar Chart */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-sm font-semibold">
              All Metrics Comparison (Radar)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <RadarChart data={RADAR_DATA}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis
                  dataKey="metric"
                  tick={{ fill: "#94a3b8", fontSize: 11 }}
                />
                <PolarRadiusAxis
                  domain={[80, 100]}
                  tick={{ fill: "#64748b", fontSize: 9 }}
                />
                {ML_MODELS.map((m, i) => (
                  <Radar
                    key={m.name}
                    name={m.name}
                    dataKey={m.name}
                    stroke={MODEL_COLORS[i]}
                    fill={MODEL_COLORS[i]}
                    fillOpacity={0.1}
                    strokeWidth={m.best ? 2.5 : 1.5}
                  />
                ))}
                <Legend iconSize={8} wrapperStyle={{ fontSize: 10 }} />
                <Tooltip
                  contentStyle={{
                    background: "#1e293b",
                    border: "1px solid #334155",
                    borderRadius: 8,
                  }}
                  formatter={(v: number) => [`${v.toFixed(1)}%`]}
                />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
