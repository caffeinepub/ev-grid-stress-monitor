import { Toaster } from "@/components/ui/sonner";
import {
  BarChart2,
  BrainCircuit,
  FlaskConical,
  Info,
  Menu,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import About from "./pages/About";
import EDAAnalysis from "./pages/EDAAnalysis";
import MLModels from "./pages/MLModels";
import SliderAssessment from "./pages/SliderAssessment";
import StressAssessment from "./pages/StressAssessment";
import SystemOverview from "./pages/SystemOverview";

type Duration = "6" | "12" | "24";

const TABS = [
  { id: "assessment", label: "Stress Assessment", icon: Zap },
  { id: "overview", label: "System Overview", icon: BarChart2 },
  { id: "eda", label: "EDA Analysis", icon: FlaskConical },
  { id: "ml", label: "ML Models", icon: BrainCircuit },
  { id: "about", label: "About", icon: Info },
];

export default function App() {
  const [active, setActive] = useState("assessment");
  const [menuOpen, setMenuOpen] = useState(false);
  const [assessmentState, setAssessmentState] = useState<string | null>(null);
  const [assessmentDuration, setAssessmentDuration] = useState<Duration | null>(
    null,
  );

  function handleTabChange(tabId: string) {
    setActive(tabId);
    if (tabId !== "assessment") {
      setAssessmentState(null);
      setAssessmentDuration(null);
    }
    setMenuOpen(false);
  }

  function renderPage() {
    switch (active) {
      case "overview":
        return <SystemOverview />;
      case "assessment":
        if (assessmentState && assessmentDuration) {
          return (
            <SliderAssessment
              state={assessmentState}
              duration={assessmentDuration}
              onBack={() => {
                setAssessmentState(null);
                setAssessmentDuration(null);
              }}
            />
          );
        }
        return (
          <StressAssessment
            onStart={(s, d) => {
              setAssessmentState(s);
              setAssessmentDuration(d);
            }}
          />
        );
      case "eda":
        return <EDAAnalysis />;
      case "ml":
        return <MLModels />;
      case "about":
        return <About />;
      default:
        return (
          <StressAssessment
            onStart={(s, d) => {
              setAssessmentState(s);
              setAssessmentDuration(d);
            }}
          />
        );
    }
  }

  const pageKey =
    active === "assessment"
      ? assessmentState
        ? "assessment-slider"
        : "assessment-landing"
      : active;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Toaster />

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-bold text-sm leading-tight">
                  EV Grid Stress
                </p>
                <p className="text-xs text-muted-foreground leading-tight">
                  Monitor &amp; Predict
                </p>
              </div>
            </div>

            {/* Desktop Nav */}
            <nav
              className="hidden lg:flex items-center gap-1"
              data-ocid="nav.section"
            >
              {TABS.map((t) => (
                <button
                  type="button"
                  key={t.id}
                  onClick={() => handleTabChange(t.id)}
                  data-ocid={`nav.${t.id}.link`}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    active === t.id
                      ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/40"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                  }`}
                >
                  <t.icon className="w-3.5 h-3.5" />
                  {t.label}
                </button>
              ))}
            </nav>

            {/* Mobile menu toggle */}
            <button
              type="button"
              className="lg:hidden p-2 rounded-lg hover:bg-muted/40 text-muted-foreground"
              onClick={() => setMenuOpen(!menuOpen)}
              data-ocid="nav.menu.toggle"
            >
              {menuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden border-t border-border/40 overflow-hidden"
            >
              <div className="px-4 py-3 flex flex-col gap-1">
                {TABS.map((t) => (
                  <button
                    type="button"
                    key={t.id}
                    onClick={() => handleTabChange(t.id)}
                    data-ocid={`nav.${t.id}.link`}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      active === t.id
                        ? "bg-cyan-500/20 text-cyan-400"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                    }`}
                  >
                    <t.icon className="w-4 h-4" />
                    {t.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Page title bar */}
      <div className="border-b border-border/20 bg-gradient-to-r from-cyan-950/30 via-background to-blue-950/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={pageKey}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.2 }}
            >
              {(() => {
                const tab = TABS.find((t) => t.id === active)!;
                return (
                  <div className="flex items-center gap-2">
                    <tab.icon className="w-5 h-5 text-cyan-400" />
                    <h1 className="text-lg font-bold text-foreground">
                      {tab.label}
                      {active === "assessment" && assessmentState && (
                        <span className="text-muted-foreground font-normal text-base ml-2">
                          — {assessmentState}
                        </span>
                      )}
                    </h1>
                    <span className="text-xs text-muted-foreground border border-border/40 rounded-full px-2 py-0.5 ml-1">
                      EV Grid Stress System
                    </span>
                  </div>
                );
              })()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={pageKey}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/30 py-4 px-6 text-center">
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} EV Grid Stress Monitor — KIIT
          University Mini Project &nbsp;•&nbsp; Built with ❤️ using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-400 transition-colors"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
