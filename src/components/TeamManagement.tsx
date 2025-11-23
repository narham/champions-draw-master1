import { Team } from "@/types/team";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy } from "lucide-react";

interface TeamManagementProps {
  teams: Team[];
}

const TeamManagement = ({ teams }: TeamManagementProps) => {
  const teamsByPot = {
    1: teams.filter(t => t.pot === 1),
    2: teams.filter(t => t.pot === 2),
    3: teams.filter(t => t.pot === 3),
    4: teams.filter(t => t.pot === 4),
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <Trophy className="w-8 h-8 text-accent" />
        <h2 className="text-3xl font-outfit font-bold text-gradient-gold">
          Teams & Seeding
        </h2>
      </div>

      {[1, 2, 3, 4].map(pot => (
        <div key={pot} className="space-y-3">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="bg-card border-accent/30 text-accent px-4 py-1.5 text-lg font-outfit">
              POT {pot}
            </Badge>
            <span className="text-muted-foreground text-sm">
              {teamsByPot[pot as keyof typeof teamsByPot].length} teams
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {teamsByPot[pot as keyof typeof teamsByPot].map((team, index) => (
              <Card 
                key={team.id}
                className="p-4 bg-card border-border hover:border-accent/50 transition-all duration-300 hover:glow-gold"
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-outfit font-semibold text-foreground mb-1">
                      {team.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{team.country}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-accent font-outfit">
                      {team.coefficient}
                    </div>
                    <p className="text-xs text-muted-foreground">UEFA coef.</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TeamManagement;
