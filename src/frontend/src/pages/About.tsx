import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, BookOpen, GraduationCap, Mail, TrendingUp } from "lucide-react";

const FACTS = [
  {
    label: "Hourly Records",
    value: "8,760",
    sub: "1 full year",
    color: "text-cyan-400",
    bg: "bg-cyan-400/10 border-cyan-400/30",
  },
  {
    label: "Indian States",
    value: "28",
    sub: "nationwide coverage",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10 border-emerald-400/30",
  },
  {
    label: "Engineered Features",
    value: "35",
    sub: "7 core + 28 derived",
    color: "text-purple-400",
    bg: "bg-purple-400/10 border-purple-400/30",
  },
  {
    label: "Best Model Accuracy",
    value: "100%",
    sub: "Random Forest",
    color: "text-amber-400",
    bg: "bg-amber-400/10 border-amber-400/30",
  },
];

const TEAM = [
  {
    name: "RANJITA KUMARI DASH",
    role: "Project Guide",
    email: "ranjita.dashfcs@kiit.ac.in",
    isGuide: true,
    initials: "RD",
    color: "from-cyan-500 to-blue-600",
  },
  {
    name: "SHRAY DAS",
    role: "Team Member",
    email: "shraydas8@gmail.com",
    isGuide: false,
    initials: "SD",
    color: "from-purple-500 to-indigo-600",
  },
  {
    name: "SWAGAT PRADHAN",
    role: "Team Member",
    email: "swagatpradhan2005@gmail.com",
    isGuide: false,
    initials: "SP",
    color: "from-emerald-500 to-teal-600",
  },
  {
    name: "SIDHARTH SATAPATHY",
    role: "Team Member",
    email: "satapathy.3004@gmail.com",
    isGuide: false,
    initials: "SS",
    color: "from-amber-500 to-orange-600",
  },
  {
    name: "TUMULU MIHIKA",
    role: "Team Member",
    email: "tmihika17@gmail.com",
    isGuide: false,
    initials: "TM",
    color: "from-pink-500 to-rose-600",
  },
  {
    name: "BISWARANJAN PANDA",
    role: "Team Member",
    email: "biswapanda2006@gmail.com",
    isGuide: false,
    initials: "BP",
    color: "from-sky-500 to-cyan-600",
  },
];

export default function About() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Abstract */}
      <Card className="border-border/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-cyan-400" />
            <CardTitle className="text-cyan-400">Abstract</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed text-sm">
            With the increasing acceptance of electric vehicles, the power
            distribution infrastructure is facing immense pressure in different
            forms like transformer overloads, voltage instability and power
            outages. This occurs due to the clustering of charging demands. In
            this paper, an{" "}
            <strong className="text-foreground">
              EV Grid Stress Monitoring and Prediction System
            </strong>{" "}
            is proposed using machine learning techniques to identify the risk
            of transformer overloads using a dataset of
            <strong className="text-foreground"> 8,760 hours</strong> covering{" "}
            <strong className="text-foreground">28 states in India</strong> over
            one year. The study employs Random Forest, XGBoost, Gradient
            Boosting, Support Vector Classifier, and Logistic Regression models
            using the Grid Search technique, where the{" "}
            <strong className="text-foreground">
              Random Forest classifier achieves the highest accuracy of 1.00
            </strong>{" "}
            with an F1 score of 1.00. It is also observed that{" "}
            <strong className="text-foreground">
              31.15 percent of the data is prone to overload risk
            </strong>{" "}
            with transformer loading emerging as the most significant factor.
            The results demonstrate the effectiveness of a data-driven
            predictive approach compared to conventional reactive methods.
          </p>
        </CardContent>
      </Card>

      {/* Dataset Stats */}
      <div>
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Dataset Facts
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {FACTS.map((f) => (
            <Card key={f.label} className={`border ${f.bg}`}>
              <CardContent className="p-4 text-center">
                <p className={`text-2xl font-bold ${f.color}`}>{f.value}</p>
                <p className="text-xs text-muted-foreground font-medium mt-0.5">
                  {f.label}
                </p>
                <p className="text-xs text-muted-foreground">{f.sub}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Team */}
      <div>
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Project Team
        </h3>

        {/* Guide */}
        {TEAM.filter((m) => m.isGuide).map((m) => (
          <Card key={m.name} className="border-cyan-400/40 bg-cyan-400/5 mb-4">
            <CardContent className="p-5 flex items-center gap-5">
              <div
                className={`w-14 h-14 rounded-full bg-gradient-to-br ${m.color} flex items-center justify-center flex-shrink-0`}
              >
                <span className="text-lg font-bold text-white">
                  {m.initials}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Award className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs text-cyan-400 font-semibold uppercase tracking-wide">
                    Project Guide
                  </span>
                </div>
                <p className="font-bold text-foreground">{m.name}</p>
                <a
                  href={`mailto:${m.email}`}
                  className="text-sm text-muted-foreground hover:text-cyan-400 transition-colors flex items-center gap-1 mt-0.5"
                >
                  <Mail className="w-3.5 h-3.5" />
                  {m.email}
                </a>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Members */}
        <div className="flex items-center gap-2 mb-3">
          <GraduationCap className="w-4 h-4 text-muted-foreground" />
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Team Members
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {TEAM.filter((m) => !m.isGuide).map((m) => (
            <Card
              key={m.name}
              className="border-border/50 hover:border-border transition-colors"
            >
              <CardContent className="p-4 flex items-center gap-4">
                <div
                  className={`w-11 h-11 rounded-full bg-gradient-to-br ${m.color} flex items-center justify-center flex-shrink-0`}
                >
                  <span className="text-sm font-bold text-white">
                    {m.initials}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground text-sm">
                    {m.name}
                  </p>
                  <a
                    href={`mailto:${m.email}`}
                    className="text-xs text-muted-foreground hover:text-cyan-400 transition-colors flex items-center gap-1 mt-0.5"
                  >
                    <Mail className="w-3 h-3" />
                    {m.email}
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Project Type */}
      <Card className="border-cyan-400/20 bg-cyan-400/5">
        <CardContent className="p-4 flex items-start gap-3">
          <TrendingUp className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-cyan-300">
              Mini Project — Machine Learning
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              This is an academic mini project focused on training and testing
              machine learning models for predicting EV grid stress. The system
              demonstrates a data-driven approach that outperforms conventional
              reactive grid management methods.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
