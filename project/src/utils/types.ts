export interface TournamentImage {
  imageUrl: string
}

export type Event = {
  id: number
  slug: string
  tournament: {
    id: number
    name: string
    slug: string
    sport: {
      id: number
      name: string
      slug: string
    }
    country: {
      id: number
      name: string
    }
  }
  homeTeam: {
    id: number
    name: string
    country: {
      id: number
      name: string
    }
  }
  awayTeam: {
    id: number
    name: string
    country: {
      id: number
      name: string
    }
  }
  status: 'notstarted' | 'inprogress' | 'finished'
  startDate: string
  homeScore: {
    total?: number
    period1?: number
    period2?: number
    period3?: number
    period4?: number
    overtime?: number
  }
  awayScore: {
    total?: number
    period1?: number
    period2?: number
    period3?: number
    period4?: number
    overtime?: number
  }
  winnerCode: string
  round: number
}

export type Tournament = {
  id: number
  name: string
  slug: string
  sport: {
    id: number
    name: string
    slug: string
  }
  country: {
    id: number
    name: string
  }
  numberOfCompetitors: number
  headToHeadCount: number
}

export type Player = {
  id: number
  name: string
  slug: string
  sport: {
    id: number
    name: string
    slug: string
  }
  team: {
    id: number
    name: string
    country: {
      id: number
      name: string
    }
  }
  country: {
    id: number
    name: string
  }
  position: string
  dateOfBirth: string
}

export type Team = {
  id: number
  name: string
  country: {
    id: number
    name: string
  }
  managerName: string
  venue: string
}

export type TournamentStandings = {
  id: number
  tournament: {
    id: number
    name: string
    slug: string
    sport: {
      id: number
      name: string
      slug: string
    }
    country: {
      id: number
      name: string
    }
  }
  type: 'total' | 'home' | 'away'
  sortedStandingsRows: {
    id: number
    team: {
      id: number
      name: string
      country: {
        id: number
        name: string
      }
    }
    points: number
    scoresFor: number
    scoresAgainst: number
    played: number
    wins: number
    draws: number
    losses: number
    percentage?: number
  }[]
}[]

export type EventIncidents = {
  player?: {
    id: number
    name: string
    slug: string
    country: {
      id: number
      name: string
    }
    position: string
  }
  scoringTeam?: 'home' | 'away'
  homeScore?: number
  awayScore?: number
  goalType?:
    | 'regular'
    | 'owngoal'
    | 'penalty'
    | 'onepoint'
    | 'twopoint'
    | 'threepoint'
    | 'touchdown'
    | 'safety'
    | 'fieldgoal'
    | 'extrapoint'
  teamSide?: 'home' | 'away'
  color?: 'yellow' | 'red' | 'yellowred'
  text?: string
  id: number
  time: number
  type: 'card' | 'goal' | 'period'
}[]