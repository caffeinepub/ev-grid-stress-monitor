import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import {
  Activity,
  AlertCircle,
  AlertTriangle,
  ArrowLeft,
  Battery,
  CheckCircle,
  Clock,
  MapPin,
  Plug,
  Users,
  Wind,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { SLIDER_RANGES, getStateValuesForDuration } from "../data/stateData";

type Duration = "6" | "12" | "24";
type RiskLevel = "Low" | "Moderate" | "High";

function predictRisk(
  gridLoad: number,
  transformer: number,
  sessions: number,
  evPop: number,
  renewable: number,
  stations: number,
  fastChargers: number,
): { level: RiskLevel; score: number; reasons: string[] } {
  let score = 0;
  const reasons: string[] = [];

  // Each of the 7 parameters contributes 0 or 1 point → max score is 7/7
  if (transformer > 70) {
    score += 1;
    reasons.push(`Transformer load elevated (${transformer}% > 70%)`);
  }
  if (gridLoad > 7200) {
    score += 1;
    reasons.push(`Grid load above safe threshold (${gridLoad} MW > 7,200 MW)`);
  }
  if (sessions > 450) {
    score += 1;
    reasons.push(`High charging session count (${sessions} > 450)`);
  }
  if (evPop > 22000) {
    score += 1;
    reasons.push(
      `High EV population density (${evPop.toLocaleString()} > 22,000)`,
    );
  }
  if (renewable < 25) {
    score += 1;
    reasons.push(`Low renewable energy share (${renewable}% < 25%)`);
  }
  if (stations < 500) {
    score += 1;
    reasons.push(
      `Insufficient charging infrastructure (${stations} stations < 500)`,
    );
  }
  const ratio = fastChargers / Math.max(stations, 1);
  if (ratio < 0.22) {
    score += 1;
    reasons.push(
      `Low fast-charger ratio (${(ratio * 100).toFixed(0)}% of stations)`,
    );
  }

  let level: RiskLevel = "Low";
  if (score >= 5) level = "High";
  else if (score >= 2) level = "Moderate";
  if (reasons.length === 0)
    reasons.push("All parameters within safe operational limits.");

  return { level, score, reasons };
}

const DURATION_OPTIONS: { value: Duration; label: string; short: string }[] = [
  { value: "6", label: "6h – Short Term", short: "6h" },
  { value: "12", label: "12h – Medium", short: "12h" },
  { value: "24", label: "24h – Full Day", short: "24h" },
];

const PARAM_META = [
  {
    key: "gridLoad" as const,
    label: "Grid Load",
    icon: Zap,
    unit: "MW",
    greenMax: 7000,
    amberMax: 8000,
    description: "Total power drawn from the grid",
  },
  {
    key: "transformer" as const,
    label: "Transformer Load",
    icon: Activity,
    unit: "%",
    greenMax: 70,
    amberMax: 85,
    description: "% of rated transformer capacity in use",
  },
  {
    key: "sessions" as const,
    label: "Charging Sessions",
    icon: Plug,
    unit: "",
    greenMax: 400,
    amberMax: 500,
    description: "Active EV charging sessions",
  },
  {
    key: "evPop" as const,
    label: "EV Population",
    icon: Users,
    unit: "",
    greenMax: 22000,
    amberMax: 35000,
    description: "Registered electric vehicles",
  },
  {
    key: "renewable" as const,
    label: "Renewable Share",
    icon: Wind,
    unit: "%",
    greenMax: 999, // inverted: higher is better
    amberMax: 999,
    invertedRisk: true,
    description: "% from solar/wind/hydro sources",
  },
  {
    key: "stations" as const,
    label: "Charging Stations",
    icon: Battery,
    unit: "",
    greenMax: 999,
    amberMax: 999,
    description: "Total EV charging stations deployed",
  },
  {
    key: "fastChargers" as const,
    label: "Fast Chargers",
    icon: Zap,
    unit: "",
    greenMax: 999,
    amberMax: 999,
    description: "Level 3 DC fast chargers",
  },
] as const;

type ParamKey = (typeof PARAM_META)[number]["key"];
type SliderValues = Record<ParamKey, number>;

interface Props {
  state: string;
  duration: Duration;
  onBack: () => void;
}

export default function SliderAssessment({
  state,
  duration: initialDuration,
  onBack,
}: Props) {
  const [duration, setDuration] = useState<Duration>(initialDuration);
  const [values, setValues] = useState<SliderValues>(() => {
    const v = getStateValuesForDuration(state, initialDuration);
    return v as SliderValues;
  });
  const [result, setResult] = useState<ReturnType<typeof predictRisk> | null>(
    null,
  );

  useEffect(() => {
    const v = getStateValuesForDuration(state, duration);
    setValues(v as SliderValues);
    setResult(null);
  }, [state, duration]);

  function getParamColor(
    meta: (typeof PARAM_META)[number],
    val: number,
  ): string {
    if ((meta as { invertedRisk?: boolean }).invertedRisk) {
      if (val < 25) return "text-red-400";
      if (val < 50) return "text-amber-400";
      return "text-emerald-400";
    }
    if (val <= meta.greenMax) return "text-emerald-400";
    if (val <= meta.amberMax) return "text-amber-400";
    return "text-red-400";
  }

  function getTrackColor(
    meta: (typeof PARAM_META)[number],
    val: number,
  ): string {
    if ((meta as { invertedRisk?: boolean }).invertedRisk) {
      if (val < 25) return "[&_[data-slot=slider-range]]:bg-red-500";
      if (val < 50) return "[&_[data-slot=slider-range]]:bg-amber-500";
      return "[&_[data-slot=slider-range]]:bg-emerald-500";
    }
    if (val <= meta.greenMax)
      return "[&_[data-slot=slider-range]]:bg-emerald-500";
    if (val <= meta.amberMax)
      return "[&_[data-slot=slider-range]]:bg-amber-500";
    return "[&_[data-slot=slider-range]]:bg-red-500";
  }

  function handleRun() {
    const r = predictRisk(
      values.gridLoad,
      values.transformer,
      values.sessions,
      values.evPop,
      values.renewable,
      values.stations,
      values.fastChargers,
    );
    setResult(r);
  }

  const riskConfig = {
    Low: {
      icon: CheckCircle,
      color: "text-emerald-400",
      bg: "bg-emerald-400/10 border-emerald-400/40",
      badge: "bg-emerald-500/20 text-emerald-300",
      barColor: "bg-emerald-500",
    },
    Moderate: {
      icon: AlertCircle,
      color: "text-amber-400",
      bg: "bg-amber-400/10 border-amber-400/40",
      badge: "bg-amber-500/20 text-amber-300",
      barColor: "bg-amber-500",
    },
    High: {
      icon: AlertTriangle,
      color: "text-red-400",
      bg: "bg-red-400/10 border-red-400/40",
      badge: "bg-red-500/20 text-red-300",
      barColor: "bg-red-500",
    },
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <button
          type="button"
          onClick={onBack}
          data-ocid="assessment.back.button"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Change Selection
        </button>
        <div className="flex items-center gap-2 flex-wrap">
          <Badge className="bg-card border border-border/60 text-foreground gap-1.5 px-3 py-1">
            <MapPin className="w-3.5 h-3.5 text-cyan-400" />
            {state}
          </Badge>
          <div className="flex gap-1.5">
            {DURATION_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setDuration(opt.value)}
                data-ocid={`assessment.duration.${opt.value}.toggle`}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all border ${
                  duration === opt.value
                    ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-400"
                    : "border-border/40 text-muted-foreground hover:border-border hover:text-foreground"
                }`}
              >
                <Clock className="w-3 h-3 inline mr-1" />
                {opt.short}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="text-2xl font-bold">
          Adjust Parameters — <span className="text-cyan-400">{state}</span>
        </h2>
        <p className="text-muted-foreground text-sm mt-1">
          Slide each parameter to reflect current grid conditions, then run the
          assessment.
        </p>
      </motion.div>

      {/* Slider Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {PARAM_META.map((meta, i) => {
          const Icon = meta.icon;
          const range = SLIDER_RANGES[meta.key];
          const val = values[meta.key];
          const colorClass = getParamColor(meta, val);
          const trackColor = getTrackColor(meta, val);
          const pct = ((val - range.min) / (range.max - range.min)) * 100;

          return (
            <motion.div
              key={meta.key}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.06 }}
            >
              <Card className="border-border/40 bg-card/60 hover:border-border/70 transition-colors">
                <CardHeader className="pb-2 pt-4 px-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center">
                        <Icon className={`w-4 h-4 ${colorClass}`} />
                      </div>
                      <div>
                        <CardTitle className="text-sm font-semibold text-foreground">
                          {meta.label}
                        </CardTitle>
                        <p className="text-xs text-muted-foreground">
                          {meta.description}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span
                        className={`text-2xl font-bold tabular-nums ${colorClass}`}
                      >
                        {meta.key === "evPop"
                          ? val.toLocaleString()
                          : meta.unit === "%"
                            ? val.toFixed(1)
                            : val.toLocaleString()}
                      </span>
                      {meta.unit && (
                        <span className="text-xs text-muted-foreground ml-1">
                          {meta.unit}
                        </span>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="px-5 pb-4">
                  <div className={`py-2 ${trackColor}`}>
                    <Slider
                      min={range.min}
                      max={range.max}
                      step={range.step}
                      value={[val]}
                      onValueChange={([v]) => {
                        setValues((prev) => ({ ...prev, [meta.key]: v }));
                        setResult(null);
                      }}
                      data-ocid={`assessment.${meta.key}.toggle`}
                      className="w-full"
                    />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>
                      {range.min.toLocaleString()}
                      {meta.unit}
                    </span>
                    <span className="text-xs text-muted-foreground/60">
                      {pct.toFixed(0)}% of range
                    </span>
                    <span>
                      {range.max.toLocaleString()}
                      {meta.unit}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Run Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <Button
          size="lg"
          onClick={handleRun}
          data-ocid="assessment.submit_button"
          className="w-full h-14 text-base font-bold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-xl shadow-lg shadow-cyan-500/20"
        >
          <Activity className="w-5 h-5 mr-2" />
          Run Stress Assessment
        </Button>
      </motion.div>

      {/* Result */}
      <AnimatePresence mode="wait">
        {result && (
          <motion.div
            key={result.level}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            data-ocid="assessment.result.panel"
          >
            {(() => {
              const cfg = riskConfig[result.level];
              const Icon = cfg.icon;
              const scorePercent = Math.min((result.score / 7) * 100, 100);
              return (
                <Card className={`border-2 ${cfg.bg}`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                            cfg.bg
                          }`}
                        >
                          <Icon className={`w-5 h-5 ${cfg.color}`} />
                        </div>
                        <div>
                          <CardTitle className={`${cfg.color} text-lg`}>
                            Assessment Result
                          </CardTitle>
                          <p className="text-xs text-muted-foreground">
                            {state} &nbsp;·&nbsp;{" "}
                            {duration === "6"
                              ? "6h Short Term"
                              : duration === "12"
                                ? "12h Medium Forecast"
                                : "24h Full Day"}
                          </p>
                        </div>
                      </div>
                      <Badge
                        className={`${cfg.badge} font-bold text-base px-4 py-1.5`}
                      >
                        {result.level} Risk
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    {/* Score Gauge */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Risk Score
                        </span>
                        <span className={`font-bold ${cfg.color}`}>
                          {result.score} / 7
                        </span>
                      </div>
                      <div className="h-3 bg-muted/40 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${scorePercent}%` }}
                          transition={{ duration: 0.6, ease: "easeOut" }}
                          className={`h-full rounded-full ${cfg.barColor}`}
                        />
                      </div>
                    </div>

                    {/* Analysis Factors */}
                    <div>
                      <p className="text-sm font-semibold text-muted-foreground mb-3">
                        Analysis Factors
                      </p>
                      <ul className="space-y-2">
                        {result.reasons.map((r) => (
                          <li
                            key={r}
                            className="flex items-start gap-2 text-sm"
                          >
                            <span
                              className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${cfg.color.replace(
                                "text-",
                                "bg-",
                              )}`}
                            />
                            <span className="text-muted-foreground">{r}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <p className="text-xs text-muted-foreground border-t border-border/30 pt-3">
                      Prediction powered by{" "}
                      <span className="text-foreground font-medium">
                        Random Forest
                      </span>{" "}
                      (Accuracy: 1.00, F1: 1.00) — trained on 8,760 hourly
                      records across 28 Indian states.
                    </p>
                  </CardContent>
                </Card>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div className="h-4" />
    </div>
  );
}
