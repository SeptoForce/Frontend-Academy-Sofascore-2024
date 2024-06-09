import { fetchTournamentsFromTeam, fetchTournamentStandings } from '@/api/api'
import { getExampleStandings } from '@/api/exampleObjects'
import { TournamentStandings, TournamentStandingsRow } from '@/utils/types'
import { Box, VStack, HStack, Grid, Flex, Link, Spacer } from '@kuma-ui/core'
import { useEffect, useState } from 'react'

export function Standings(props: { objectId: number; objectType: 'tournament' | 'team' }) {
  const [standings, setStandings] = useState<TournamentStandings>()
  const [standingsTotal, setStandingsTotal] = useState<TournamentStandingsRow[]>()

  useEffect(() => {
    if (props.objectType === 'tournament') {
      fetchTournamentStandings(props.objectId)
        .then(data => setStandings(data))
        .catch(error => console.error(error))
    }

    if (props.objectType === 'team') {
      fetchTournamentsFromTeam(props.objectId)
        .then(tournaments =>
          fetchTournamentStandings(tournaments[0].id)
            .then(data => setStandings(data))
            .catch(error => console.error(error))
        )
        .catch(error => console.error(error))
    }
  }, [props.objectId, props.objectType])

  useEffect(() => {
    let _standings = standings?.filter(standing => standing.type === 'total')[0].sortedStandingsRows

    if (_standings) {
      setStandingsTotal(_standings)
    }
  }, [standings])

  return (
    <VStack
      h={`fit-content`}
      w={`100%`}
      bg={'colors.surface1'}
      boxShadow={`0 1px 4px 0 rgba(0, 0, 0, 0.08)`}
      borderRadius={`16px`}
      pb={`16px`}
    >
      <VStack minH={`40px`}>
        <HStack h={`48px`} gap={`8px`} alignItems={'center'}>
          <Flex w={`24px`} mx={`8px`} flexShrink={0} justifyContent={'center'}>
            #
          </Flex>
          <Flex w={[`104px`, `150px`]} flexShrink={0}>
            Team
          </Flex>
          <Spacer w={`100%`} />
          <Flex w={`100%`} minW={`24px`} justifyContent={'center'}>
            P
          </Flex>
          <Flex w={`100%`} minW={`24px`} justifyContent={'center'}>
            W
          </Flex>
          <Flex w={`100%`} minW={`24px`} justifyContent={'center'}>
            D
          </Flex>
          <Flex w={`100%`} minW={`24px`} justifyContent={'center'}>
            L
          </Flex>
          <Flex w={`100%`} minW={`32px`} justifyContent={'center'}>
            Goals
          </Flex>
          <Flex w={`100%`} minW={`32px`} justifyContent={'center'}>
            PTS
          </Flex>
        </HStack>
        {standingsTotal?.map((standingsRow, index) => (
          <HStack
            h={`48px`}
            gap={`8px`}
            alignItems={'center'}
            key={index}
            bg={
              props.objectType === `team` && standingsRow.team.id === props.objectId
                ? `var(--color-primary-highlight)`
                : ``
            }
          >
            <NumberCell
              value={index + 1}
              active={props.objectType === `team` && standingsRow.team.id === props.objectId ? true : false}
            />
            <Link
              w={[`104px`, `150px`]}
              flexShrink={0}
              href={`/team/${standingsRow.team.id}`}
              borderRadius={`8px`}
              color={`colors.onSurfaceLv1`}
            >
              {standingsRow.team.name}
            </Link>
            <Spacer w={`100%`} />
            <Flex w={`100%`} minW={`24px`} justifyContent={'center'}>
              {standingsRow.played}
            </Flex>
            <Flex w={`100%`} minW={`24px`} justifyContent={'center'}>
              {standingsRow.wins}
            </Flex>
            <Flex w={`100%`} minW={`24px`} justifyContent={'center'}>
              {standingsRow.draws}
            </Flex>
            <Flex w={`100%`} minW={`24px`} justifyContent={'center'}>
              {standingsRow.losses}
            </Flex>
            <Flex w={`100%`} minW={`32px`} justifyContent={'center'}>
              {`${standingsRow.scoresFor}:${standingsRow.scoresAgainst}`}
            </Flex>
            <Flex w={`100%`} minW={`32px`} justifyContent={'center'}>
              {standingsRow.points}
            </Flex>
          </HStack>
        ))}
      </VStack>
    </VStack>
  )
}

function NumberCell(props: { value: number; active?: boolean }) {
  return (
    <Flex
      justifyContent={'center'}
      alignItems={'center'}
      borderRadius={999}
      h={`24px`}
      aspectRatio={1}
      bg={props.active ? `colors.surface1` : `colors.secondaryDefault`}
      mx={`8px`}
    >
      {props.value}
    </Flex>
  )
}

export default Standings