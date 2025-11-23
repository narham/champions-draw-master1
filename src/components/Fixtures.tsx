import { Match } from "@/types/team";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";

interface FixturesProps {
  fixtures: Match[];
}

const Fixtures = ({ fixtures }: FixturesProps) => {
  const fixturesByMatchday = fixtures.reduce((acc, fixture) => {
    if (!acc[fixture.matchday]) {
      acc[fixture.matchday] = [];
    }
    acc[fixture.matchday].push(fixture);
    return acc;
  }, {} as Record<number, Match[]>);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <Calendar className="w-8 h-8 text-accent" />
        <h2 className="text-3xl font-outfit font-bold text-gradient-gold">
          Match Schedule
        </h2>
      </div>

      {Object.entries(fixturesByMatchday)
        .sort(([a], [b]) => Number(a) - Number(b))
        .map(([matchday, matches]) => (
          <div key={matchday} className="space-y-3">
            <Badge className="bg-accent/20 border-accent text-accent px-4 py-1.5 text-base font-outfit">
              Matchday {matchday}
            </Badge>
            
            <div className="grid gap-3">
              {matches.map((match) => (
                <Card 
                  key={match.id}
                  className="p-4 bg-card border-border hover:border-accent/30 transition-all"
                >
                  <div className="grid grid-cols-3 gap-4 items-center">
                    <div className="text-right space-y-1">
                      <div className="font-outfit font-semibold text-foreground">
                        {match.homeTeam.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {match.homeTeam.country}
                      </div>
                    </div>
                    
                    <div className="text-center">
                      {match.played ? (
                        <div className="flex items-center justify-center gap-3">
                          <span className="text-2xl font-bold text-accent font-outfit">
                            {match.homeScore}
                          </span>
                          <span className="text-muted-foreground">-</span>
                          <span className="text-2xl font-bold text-accent font-outfit">
                            {match.awayScore}
                          </span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground font-outfit">vs</span>
                      )}
                    </div>
                    
                    <div className="text-left space-y-1">
                      <div className="font-outfit font-semibold text-foreground">
                        {match.awayTeam.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {match.awayTeam.country}
                      </div>
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

export default Fixtures;
