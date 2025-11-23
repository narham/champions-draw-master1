import { Match, StandingsEntry, Team } from "@/types/team";

export const calculateStandings = (teams: Team[], matches: Match[]): StandingsEntry[] => {
  const standings: Map<string, StandingsEntry> = new Map();
  
  // Initialize standings
  teams.forEach(team => {
    standings.set(team.id, {
      team,
      played: 0,
      won: 0,
      drawn: 0,
      lost: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      goalDifference: 0,
      points: 0,
    });
  });
  
  // Process matches
  matches
    .filter(m => m.played && m.homeScore !== undefined && m.awayScore !== undefined)
    .forEach(match => {
      const homeEntry = standings.get(match.homeTeam.id)!;
      const awayEntry = standings.get(match.awayTeam.id)!;
      
      homeEntry.played++;
      awayEntry.played++;
      
      homeEntry.goalsFor += match.homeScore!;
      homeEntry.goalsAgainst += match.awayScore!;
      awayEntry.goalsFor += match.awayScore!;
      awayEntry.goalsAgainst += match.homeScore!;
      
      if (match.homeScore! > match.awayScore!) {
        homeEntry.won++;
        homeEntry.points += 3;
        awayEntry.lost++;
      } else if (match.homeScore! < match.awayScore!) {
        awayEntry.won++;
        awayEntry.points += 3;
        homeEntry.lost++;
      } else {
        homeEntry.drawn++;
        awayEntry.drawn++;
        homeEntry.points += 1;
        awayEntry.points += 1;
      }
      
      homeEntry.goalDifference = homeEntry.goalsFor - homeEntry.goalsAgainst;
      awayEntry.goalDifference = awayEntry.goalsFor - awayEntry.goalsAgainst;
    });
  
  // Sort standings with tie-breakers
  const standingsArray = Array.from(standings.values());
  standingsArray.sort((a, b) => {
    // 1. Points
    if (b.points !== a.points) return b.points - a.points;
    
    // 2. Goal difference
    if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
    
    // 3. Goals scored
    if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor;
    
    // 4. Away goals (simplified)
    // 5. Wins
    if (b.won !== a.won) return b.won - a.won;
    
    // 6. UEFA coefficient
    return b.team.coefficient - a.team.coefficient;
  });
  
  return standingsArray;
};
