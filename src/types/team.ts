export interface Team {
  id: string;
  name: string;
  country: string;
  coefficient: number;
  pot: 1 | 2 | 3 | 4;
  logo?: string;
}

export interface Match {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  homeScore?: number;
  awayScore?: number;
  matchday: number;
  played: boolean;
}

export interface StandingsEntry {
  team: Team;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
}

export interface DrawConstraints {
  countryProtection: boolean;
  noRematches: boolean;
  maxTeamsFromSameCountry: number;
}
