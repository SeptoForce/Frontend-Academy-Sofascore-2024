import { Box, Flex, Link, Spacer, Text, Button, VStack, Image, HStack } from '@kuma-ui/core'
import { CardColor, EventMatch, EventIncident, EventStatus, GoalType, IncidentType, TeamSide } from '@/utils/types'
import { useRouter } from 'next/router'
import { fetchEventIncidents, getTeamImageLink } from '@/api/api'
import IconClose from '../svg/IconClose'
import IconChevronRight from '../svg/IconChevronRight'
import IconCardRed from '../svg/IconCardRed'
import IconBallFootball from '../svg/IconBallFootball'
import IconCardYellow from '../svg/IconCardYellow'
import IconAutogoal from '../svg/IconAutogoal'
import IconPenaltyScored from '../svg/IconPenaltyScored'
import IconExtraPoint from '../svg/IconExtraPoint'
import IconFieldGoal from '../svg/IconFieldGoal'
import IconTouchdown from '../svg/IconTouchdown'
import IconRogue from '../svg/IconRogue'
import IconTwoPointConversion from '../svg/IconTwoPointConversion'
import IconRugbyPoint1 from '../svg/IconRugbyPoint1'
import IconBasketballIncident1 from '../svg/IconBasketballIncident1'
import IconRugbyPoint3 from '../svg/IconRugbyPoint3'
import IconBasketballIncident3 from '../svg/IconBasketballIncident3'
import { useEffect, useState } from 'react'
import IconBasketballIncident2 from '../svg/IconBasketballIncident2'
import { format } from 'date-fns'
import { useAppContext } from '@/context/AppContext'
import BookmarkButton from '../util/BookmarkButton'
import { t } from 'i18next'

export function EventDetailsSection(props: { event: EventMatch; noHeader?: boolean }) {
  return (
    <Box
      w={`100%`}
      h={`fit-content`}
      bg={`colors.surface1`}
      borderRadius={`16px`}
      overflow={'hidden'}
      boxShadow={`0 1px 4px 0 rgba(0, 0, 0, 0.08)`}
    >
      {props.noHeader ? <BookmarkHeader event={props.event} /> : <Actions event={props.event} />}
      <Hero event={props.event} />
      <Spacer borderBottom={`1px solid var(--on-surface-on-surface-lv-4)`} w={`100%`} />
      {props.event.status === EventStatus.UPCOMING ? (
        <VStack h={`148px`} p={`8px`} mt={`8px`} gap={`16px`} alignItems={'center'}>
          <Flex
            h={`52px`}
            w={`100%`}
            bg={'colors.surface2'}
            borderRadius={`8px`}
            alignItems={'center'}
            justifyContent={'center'}
          >
            <Text color={'colors.onSurfaceLv2'}>{t('noResultsYet') + '.'}</Text>
          </Flex>
          <Link href={`/tournament/${props.event.tournament.id}`} color={`colors.primaryDefault`}>
            <Box
              p={`8px`}
              px={`16px`}
              borderRadius={`2px`}
              border={`2px solid var(--color-primary-default)`}
              w={'fit-content'}
              h={'fit-content'}
              className="Action"
              _hover={{ bg: 'var(--color-primary-default)', color: 'white' }}
            >
              {t('viewTournamentDetails')}
            </Box>
          </Link>
        </VStack>
      ) : (
        <IncidentSection event={props.event} />
      )}
    </Box>
  )
}

function IncidentSection(props: { event: EventMatch }) {
  const [eventIncidents, setEventIncidents] = useState<EventIncident[]>([])
  useEffect(() => {
    fetchEventIncidents(props.event.id)
      .then(data => setEventIncidents(data))
      .catch(error => console.error(error))
  }, [props.event])

  return (
    <VStack w={`100%`} flexDir={'column-reverse'} alignItems={'flex-end'} pb={`16px`} justifyContent={'space-between'}>
      {eventIncidents.map((incident, index) => {
        const _incident = incident as EventIncident
        if (_incident.type === IncidentType.PERIOD) {
          return <PeriodCell key={_incident.id} incident={_incident} live={props.event.status === EventStatus.LIVE} />
        } else {
          return (
            <IncidentCell
              sport={props.event.tournament.sport.slug}
              key={_incident.id}
              incident={_incident}
              flipped={_incident.teamSide === TeamSide.AWAY || _incident.scoringTeam === TeamSide.AWAY}
            />
          )
        }
      })}
    </VStack>
  )
}

function PeriodCell(props: { incident: EventIncident; live?: boolean }) {
  const incident = props.incident

  let incidentText = incident.text || ''
  if (incidentText.startsWith('HT')) {
    incidentText = t('halfTime') + incidentText.slice(2)
  }
  if (incidentText.startsWith('FT')) {
    incidentText = t('fullTime') + incidentText.slice(2)
  }

  return (
    <Flex w={`100%`} h={`40px`} p={`8px`} color={props.live ? `colors.specificLive` : `colors.onSurfaceLv1`}>
      <Flex
        w={`100%`}
        h={`100%`}
        borderRadius={`16px`}
        bg={'colors.secondaryHighlight'}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Text className="Assistive">{`${incidentText}`}</Text>
      </Flex>
    </Flex>
  )
}

function IncidentCell(props: { flipped?: boolean; incident: EventIncident; sport: string }) {
  const incident = props.incident
  const incidentType = incident.type
  let icon = <></>

  switch (incidentType) {
    case IncidentType.CARD:
      switch (incident.color) {
        case CardColor.YELLOW:
          icon = <IconCardYellow />
          break
        case CardColor.RED:
          icon = <IconCardRed />
          break
        case CardColor.YELLOWRED:
          icon = <IconCardRed />
          break
      }
      break
    case IncidentType.GOAL:
      switch (incident.goalType) {
        case GoalType.REGULAR:
          icon = <IconBallFootball />
          break
        case GoalType.OWNGOAL:
          icon = <IconAutogoal />
          break
        case GoalType.PENALTY:
          icon = <IconPenaltyScored />
          break
        case GoalType.EXTRAPOINT:
          icon = <IconExtraPoint />
          break
        case GoalType.FIELDGOAL:
          icon = <IconFieldGoal />
          break
        case GoalType.TOUCHDOWN:
          icon = <IconTouchdown />
          break
        case GoalType.SAFETY:
          icon = <IconRogue />
          break
        case GoalType.ONEPOINT:
          switch (props.sport) {
            case 'american-football':
              icon = <IconRugbyPoint1 />
              break
            case 'basketball':
              icon = <IconBasketballIncident1 />
              break
          }
          break
        case GoalType.TWOPOINT:
          switch (props.sport) {
            case 'american-football':
              icon = <IconTwoPointConversion />
              break
            case 'basketball':
              icon = <IconBasketballIncident2 />
              break
          }
          break
        case GoalType.THREEPOINT:
          switch (props.sport) {
            case 'american-football':
              icon = <IconRugbyPoint3 />
              break
            case 'basketball':
              icon = <IconBasketballIncident3 />
              break
          }
          break
      }
  }

  return (
    <Box
      display={'flex'}
      h={`56px`}
      w={`100%`}
      alignItems={'center'}
      py={`8px`}
      flexDir={props.flipped ? 'row-reverse' : 'row'}
    >
      <Box
        w={`55px`}
        h={`100%`}
        display={'flex'}
        flexDir={'column'}
        justifyContent={'center'}
        alignItems={'center'}
        flexShrink={0}
        borderEnd={props.flipped ? 'none' : '1px solid var(--on-surface-on-surface-lv-4)'}
        borderStart={props.flipped ? '1px solid var(--on-surface-on-surface-lv-4)' : 'none'}
        color={'colors.onSurfaceLv2'}
      >
        {icon}

        <Text className="Micro">{incident.time}'</Text>
      </Box>
      <Box
        h={`100%`}
        alignItems={'center'}
        justifyContent={'center'}
        display={'flex'}
        flexDir={props.flipped ? 'row-reverse' : 'row'}
      >
        <Text
          className="Headline-1"
          flexShrink={0}
          w={`84px`}
          display={incident.type === IncidentType.GOAL ? 'flex' : 'none'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          {`${incident.homeScore}-${incident.awayScore}`}
        </Text>
        <VStack
          h={`100%`}
          w={`100%`}
          mx={incident.type === IncidentType.GOAL ? '0px' : '12px'}
          justifyContent={'center'}
          alignItems={props.flipped ? 'flex-end' : 'flex-start'}
        >
          <Text className="Body" color={`colors.onSurfaceLv1`} flexShrink={0}>
            {incident.player?.name}
          </Text>
          <Text className="Micro" color={`colors.onSurfaceLv2`} flexShrink={0}>
            {incident.type === IncidentType.CARD ? t('foul') : ``}
            {incident.goalType === GoalType.OWNGOAL ? t('ownGoal') : ``}
            {incident.goalType === GoalType.PENALTY ? t('penalty') : ``}
          </Text>
        </VStack>
      </Box>
    </Box>
  )
}

function Actions(props: { event: EventMatch }) {
  const router = useRouter()
  const hideEvent = () => {
    const query = { ...router.query }
    delete query.e
    router.push({ query })
  }

  const viewFullPage = () => {
    router.push(`/event/${router.query.e}`)
  }

  return (
    <Box
      display={[`none`, 'flex']}
      w={`100%`}
      h={`56px`}
      alignItems={'center'}
      justifyContent={'space-between'}
      p={`16px`}
    >
      <HStack>
        <Button onClick={hideEvent}>
          <IconClose color="var(--on-surface-on-surface-lv-1)" size="24" />
        </Button>
        <BookmarkButton event={props.event} />
      </HStack>
      <Link onClick={viewFullPage} className="Action" display={'flex'}>
        <Text>{t('viewFullPage')}</Text>
        <IconChevronRight color="var(--color-primary-default)" />
      </Link>
    </Box>
  )
}

function Hero(props: { event: EventMatch }) {
  const event = props.event

  return (
    <Flex w={`100%`} h={`112px`} alignItems={`flex-end`} justifyContent={'space-between'} p={`16px`}>
      <HeroSectionUnit teamName={event.homeTeam.name} teamId={event.homeTeam.id} />
      <Score event={event} />
      <HeroSectionUnit teamName={event.awayTeam.name} teamId={event.awayTeam.id} />
    </Flex>
  )
}

function HeroSectionUnit(props: { teamName: string; teamId: number }) {
  return (
    <Link href={`/team/${props.teamId}`} color={`colors.onSurfaceLv1`}>
      <VStack h={`80px`} w={`96px`} alignItems={'center'} justifyContent={'space-between'}>
        <Image h={`40px`} flexShrink={0} aspectRatio={1} src={getTeamImageLink(props.teamId)} />
        <Text
          h={`100%`}
          w={`100%`}
          textAlign={'center'}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          className="Assistive"
        >
          {props.teamName}
        </Text>
      </VStack>
    </Link>
  )
}

function Score(props: { event: EventMatch }) {
  const appContext = useAppContext()
  const event = props.event
  const winnerCode = event.status === EventStatus.FINISHED ? event.winnerCode : undefined

  return (
    <VStack
      h={`112px`}
      w={`96px`}
      alignItems={'center'}
      justifyContent={'center'}
      gap={`4px`}
      color={event.status === EventStatus.LIVE ? 'var(--specific-live)' : 'var(--on-surface-on-surface-lv-2)'}
    >
      {event.status === EventStatus.UPCOMING ? (
        <Text className="Micro">{format(event.startDate, appContext.dateFormat)}</Text>
      ) : (
        <Flex
          h={`40px`}
          w={`100%`}
          alignItems={'center'}
          justifyContent={'center'}
          className="Headline-1-Desktop"
          gap={`4px`}
        >
          <Text className="Display" color={winnerCode === `home` ? `var(--on-surface-on-surface-lv-1)` : ``}>
            {event.homeScore.total}
          </Text>
          <Spacer />
          <Text className="Display">-</Text>
          <Spacer />
          <Text className="Display" color={winnerCode === `away` ? `var(--on-surface-on-surface-lv-1)` : ``}>
            {event.awayScore.total}
          </Text>
        </Flex>
      )}

      <Text className="Micro">
        {event.status === EventStatus.UPCOMING ? format(event.startDate, appContext.timeFormat) : ``}
        {event.status === EventStatus.LIVE
          ? `${Math.floor((new Date().getTime() - new Date(event.startDate).getTime()) / (1000 * 60))}'`
          : ``}
        {event.status === EventStatus.FINISHED ? t('fullTime') : ``}
      </Text>
    </VStack>
  )
}

function BookmarkHeader(props: { event: EventMatch }) {
  return (
    <Box display={'flex'} w={`100%`} h={`56px`} alignItems={'center'} justifyContent={'space-between'} p={`16px`}>
      <BookmarkButton event={props.event} />
    </Box>
  )
}

export default EventDetailsSection
