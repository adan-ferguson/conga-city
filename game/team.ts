const teams = {
  player: true,
  invader: true,
} as const

export type Team = keyof typeof teams

// @ts-expect-error -- It's fine
const names: Team[] = Object.keys(teams)

function otherTeam(team: Team): Team{
  return team === 'player' ? 'invader' : 'player'
}

export const gameTeam = {
  otherTeam,
  names,
}