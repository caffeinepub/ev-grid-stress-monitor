import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertTriangle,
  ArrowRight,
  Clock,
  MapPin,
  TrendingUp,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { STATES } from "../data/stateData";

type Duration = "6" | "12" | "24";

const DURATION_CARDS = [
  {
    value: "6" as Duration,
    label: "6 Hours",
    sublabel: "Short Term Stress",
    icon: Zap,
    desc: "Peak demand window analysis — captures morning or evening surge",
    color: "from-amber-500/20 to-orange-600/10",
    border: "border-amber-500/50",
    glow: "shadow-amber-500/20",
    textColor: "text-amber-400",
    tag: "Peak",
  },
  {
    value: "12" as Duration,
    label: "12 Hours",
    sublabel: "Medium Forecast",
    icon: TrendingUp,
    desc: "Half-day load prediction — balances peak and off-peak demand",
    color: "from-cyan-500/20 to-blue-600/10",
    border: "border-cyan-500/50",
    glow: "shadow-cyan-500/20",
    textColor: "text-cyan-400",
    tag: "Balanced",
  },
  {
    value: "24" as Duration,
    label: "24 Hours",
    sublabel: "Full Day Prediction",
    icon: Clock,
    desc: "Complete daily stress profile — full-day average load analysis",
    color: "from-violet-500/20 to-purple-600/10",
    border: "border-violet-500/50",
    glow: "shadow-violet-500/20",
    textColor: "text-violet-400",
    tag: "Full Day",
  },
];

interface Props {
  onStart: (state: string, duration: Duration) => void;
}

export default function StressAssessment({ onStart }: Props) {
  const [selectedState, setSelectedState] = useState("");
  const [duration, setDuration] = useState<Duration | null>(null);

  const canProceed = selectedState !== "" && duration !== null;

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-start py-8 px-4">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10 max-w-2xl"
      >
        <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-4 py-1.5 mb-4">
          <Zap className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-xs font-semibold text-cyan-400 tracking-wider uppercase">
            Powered by Random Forest ML
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-3">
          <span className="text-foreground">EV Grid </span>
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Stress Assessment
          </span>
        </h1>
        <p className="text-muted-foreground text-lg">
          Select your state and monitoring window to predict transformer
          overload risk across India's EV charging infrastructure.
        </p>
      </motion.div>

      <div className="w-full max-w-3xl space-y-8">
        {/* State Selector */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="space-y-3"
        >
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-cyan-400" />
            <span className="font-semibold text-sm text-foreground">
              Select State
            </span>
          </div>
          <Select
            onValueChange={setSelectedState}
            data-ocid="assessment.select"
          >
            <SelectTrigger
              className="h-14 text-base border-border/60 bg-card/60 backdrop-blur hover:border-cyan-500/50 transition-colors"
              data-ocid="assessment.select"
            >
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground shrink-0" />
                <SelectValue placeholder="Choose an Indian state..." />
              </div>
            </SelectTrigger>
            <SelectContent className="max-h-72">
              {STATES.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </motion.div>

        {/* Duration Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.4 }}
          className="space-y-3"
        >
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyan-400" />
            <span className="font-semibold text-sm text-foreground">
              Monitoring Duration
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {DURATION_CARDS.map((card, i) => {
              const Icon = card.icon;
              const isSelected = duration === card.value;
              return (
                <motion.button
                  key={card.value}
                  type="button"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  onClick={() => setDuration(card.value)}
                  data-ocid={`assessment.duration.${card.value}.toggle`}
                  className={`relative text-left p-5 rounded-2xl border-2 transition-all duration-200 ${
                    isSelected
                      ? `${card.border} bg-gradient-to-br ${card.color} shadow-lg ${card.glow}`
                      : "border-border/40 bg-card/40 hover:border-border hover:bg-card/70"
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="durationGlow"
                      className="absolute inset-0 rounded-2xl"
                    />
                  )}
                  <div className="flex items-start justify-between mb-3">
                    <Icon
                      className={`w-5 h-5 ${
                        isSelected ? card.textColor : "text-muted-foreground"
                      }`}
                    />
                    <Badge
                      className={`text-xs px-2 py-0.5 ${
                        isSelected
                          ? `bg-white/10 ${card.textColor} border-0`
                          : "bg-muted/40 text-muted-foreground border-0"
                      }`}
                    >
                      {card.tag}
                    </Badge>
                  </div>
                  <p
                    className={`text-2xl font-bold mb-0.5 ${
                      isSelected ? card.textColor : "text-foreground"
                    }`}
                  >
                    {card.label}
                  </p>
                  <p
                    className={`text-sm font-medium mb-2 ${
                      isSelected ? card.textColor : "text-muted-foreground"
                    }`}
                  >
                    {card.sublabel}
                  </p>
                  <p className="text-xs text-muted-foreground leading-snug">
                    {card.desc}
                  </p>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            animate={canProceed ? { scale: [1, 1.01, 1] } : {}}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
          >
            <Button
              size="lg"
              disabled={!canProceed}
              onClick={() => onStart(selectedState, duration as Duration)}
              data-ocid="assessment.primary_button"
              className="w-full h-14 text-base font-bold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white disabled:opacity-40 disabled:cursor-not-allowed rounded-xl shadow-lg shadow-cyan-500/20 transition-all"
            >
              {canProceed ? (
                <>
                  Show Assessment
                  <ArrowRight className="ml-2 w-5 h-5" />
                </>
              ) : (
                <>
                  <AlertTriangle className="mr-2 w-4 h-4" />
                  Select State &amp; Duration to Continue
                </>
              )}
            </Button>
          </motion.div>

          {canProceed && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-xs text-muted-foreground mt-2"
            >
              You'll be able to fine-tune all 7 parameters with sliders on the
              next page.
            </motion.p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
