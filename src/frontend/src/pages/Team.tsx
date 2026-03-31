import { Card, CardContent } from "@/components/ui/card";
import { Award, GraduationCap, Mail } from "lucide-react";

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

export default function Team() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground">Our Team</h2>
        <p className="text-muted-foreground mt-1 text-sm">
          KIIT University — EV Grid Stress Monitoring &amp; Prediction System
        </p>
      </div>

      {/* Guide */}
      <div>
        {TEAM.filter((m) => m.isGuide).map((m) => (
          <Card key={m.name} className="border-cyan-400/40 bg-cyan-400/5 mb-4">
            <CardContent className="p-5 flex items-center gap-5">
              <div
                className={`w-16 h-16 rounded-full bg-gradient-to-br ${m.color} flex items-center justify-center flex-shrink-0`}
              >
                <span className="text-xl font-bold text-white">
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
                <p className="font-bold text-foreground text-lg">{m.name}</p>
                <a
                  href={`mailto:${m.email}`}
                  className="text-sm text-muted-foreground hover:text-cyan-400 transition-colors flex items-center gap-1 mt-0.5"
                  data-ocid="team.link"
                >
                  <Mail className="w-3.5 h-3.5" />
                  {m.email}
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Members */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <GraduationCap className="w-4 h-4 text-muted-foreground" />
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Team Members
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {TEAM.filter((m) => !m.isGuide).map((m, i) => (
            <Card
              key={m.name}
              className="border-border/50 hover:border-border transition-colors"
              data-ocid={`team.item.${i + 1}`}
            >
              <CardContent className="p-4 flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-full bg-gradient-to-br ${m.color} flex items-center justify-center flex-shrink-0`}
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
                    data-ocid="team.link"
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
    </div>
  );
}
