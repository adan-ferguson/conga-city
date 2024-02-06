export type Team = 'player' | 'invader'

export const TeamTypes: Team[] = ['player','invader']

export function otherTeam(team: Team): Team{
  return team === 'player' ? 'invader' : 'player'
}