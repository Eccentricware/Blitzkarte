import React, { FC, useContext, useEffect, useState } from 'react';
import {  MenuItem, Select, SelectChangeEvent, TextField, Button } from '@mui/material';
import { WeeklyDeadlines } from './WeeklyDeadlines';
import { IntervalDeadlines } from './IntervalDeadlines';
import { DailyDeadlines } from './DailyDeadlines';
import { NewGameSettings } from './NewGameSettings';
import { useRouter } from 'next/router';
import Blitzkontext from '../../utils/Blitzkontext';
import { erzahler } from '../../utils/general/erzahler';
import { SchedulerService } from '../../services/scheduler-service';

interface InputProps {
  input: any;
  debug: any;
}

export const InputTab: FC<InputProps> = ({input, debug}: InputProps) => {
  const [gameName, setGameName] = useState('');
  const [gameNameAvailable, setGameNameAvailable] = useState(true);
  const [deadlineType, setDeadlineType] = useState('weekly');
  const [timeZone, setTimeZone] = useState('America/Los_Angeles');
  const [observeDst, setObserveDst] = useState(true);
  const [gameStart, setGameStart] = useState<Date | null>(new Date());
  const [firstTurnDeadline, setFirstTurnDeadline] = useState<Date | null>(new Date());

  const [ordersDay, setOrdersDay] = useState('Monday');
  const [ordersTime, setOrdersTime] = useState(new Date('2000-01-01 12:00:00'));
  const [retreatsDay, setRetreatsDay] = useState('Tuesday');
  const [retreatsTime, setRetreatsTime] = useState(new Date('2000-01-01 12:00:00'));
  const [adjustmentsDay, setAdjustmentsDay] = useState('Wednesday');
  const [adjustmentsTime, setAdjustmentsTime] = useState(new Date('2000-01-01 12:00:00'));
  const [nominationsDay, setNominationsDay] = useState('Thursday');
  const [nominationsTime, setNominationsTime] = useState(new Date('2000-01-01 12:00:00'));
  const [votesDay, setVotesDay] = useState('Friday');
  const [votesTime, setVotesTime] = useState(new Date('2000-01-01 12:00:00'));
  const [firstOrdersTimeSpan, setFirstOrdersTimeSpan] = useState(3);
  const [firstOrdersTimeType, setFirstOrdersTimeType] = useState('days');
  const [ordersTimeSpan, setOrdersTimeSpan] = useState(3);
  const [ordersTimeType, setOrdersTimeType] = useState('days');
  const [retreatsTimeSpan, setRetreatsTimeSpan] = useState(3);
  const [retreatsTimeType, setRetreatsTimeType] = useState('hours');
  const [adjustmentsTimeSpan, setAdjustmentsTimeSpan] = useState(1);
  const [adjustmentsTimeType, setAdjustmentsTimeType] = useState('days');
  const [nominationsTimeSpan, setNominationsTimeSpan] = useState(1);
  const [nominationsTimeType, setNominationsTimeType] = useState('days');
  const [votesTimeSpan, setVotesTimeSpan] = useState(1);
  const [votesTimeType, setVotesTimeType] = useState('days');
  const [nominateDuringAdjustments, setNominateDuringAdjustments] = useState(true);
  const [voteDuringOrders, setVoteDuringOrders] = useState(true);

  const [stylizedStartYear, setStylizedStartYear] = useState(2000);
  const [turn1Timing, setTurn1Timing] = useState('standard');
  const [nominationTiming, setNominationTiming] = useState('set');
  const [nominationYear, setNominationYear] = useState(8);
  const [concurrentGamesLimit, setConcurrentGamesLimit] = useState(0);
  const [automaticAssignments, setAutomaticAssignments] = useState(false);
  const [ratingLimits, setRatingLimits] = useState(true);
  const [funRange, setFunRange] = useState([0, 100]);
  const [skillRange, setSkillRange] = useState([0, 100]);
  const [nmrTolerance, setNmrTolerance] = useState(3);
  const [blindCreator, setBlindCreator] = useState(false);
  const [untfRuleEnabled, setUntfRuleEnabled] = useState(false);
  const [madOrdersRule, setMadOrdersRule] = useState(false);
  const [voteDeadlineExtension, setVoteDeadlineExtension] = useState(false);
  const [finalReadinessCheck, setFinalReadinessCheck] = useState(true);
  const [partialRosterStart, setPartialRosterStart] = useState(false);

  const gameRules: any[] = [
    {
      key: 'untf',
      enabled: untfRuleEnabled
    },
    {
      key: 'madOrders',
      enabled: madOrdersRule
    }
  ]

  const router = useRouter();
  let bkCtx = useContext(Blitzkontext);
  const schedulerService = new SchedulerService();

  useEffect(() => {
    schedulerService.setStartScheduling(deadlineOps);
  }, [
    turn1Timing,
    deadlineType,
    ordersDay,
    ordersTime,
    firstOrdersTimeSpan,
    firstOrdersTimeType
  ]);

  const deadlineOps: any = {
    gameStart: gameStart,
    setGameStart: setGameStart,
    deadlineType: deadlineType,
    turn1Timing: turn1Timing,
    firstTurnDeadline: firstTurnDeadline,
    setFirstTurnDeadline: setFirstTurnDeadline,
    ordersDay: ordersDay,
    setOrdersDay: setOrdersDay,
    ordersTime: ordersTime,
    setOrdersTime: setOrdersTime,
    retreatsDay: retreatsDay,
    setRetreatsDay: setRetreatsDay,
    retreatsTime: retreatsTime,
    setRetreatsTime: setRetreatsTime,
    adjustmentsDay: adjustmentsDay,
    setAdjustmentsDay: setAdjustmentsDay,
    adjustmentsTime: adjustmentsTime,
    setAdjustmentsTime: setAdjustmentsTime,
    nominationsDay: nominationsDay,
    setNominationsDay: setNominationsDay,
    nominationsTime: nominationsTime,
    setNominationsTime: setNominationsTime,
    votesDay: votesDay,
    setVotesDay: setVotesDay,
    votesTime: votesTime,
    setVotesTime: setVotesTime,
    nominateDuringAdjustments: nominateDuringAdjustments,
    setNominateDuringAdjustments: setNominateDuringAdjustments,
    voteDuringOrders: voteDuringOrders,
    setVoteDuringOrders: setVoteDuringOrders,
    firstOrdersTimeSpan: firstOrdersTimeSpan,
    setFirstOrdersTimeSpan: setFirstOrdersTimeSpan,
    firstOrdersTimeType: firstOrdersTimeType,
    setFirstOrdersTimeType: setFirstOrdersTimeType,
    ordersTimeSpan: ordersTimeSpan,
    setOrdersTimeSpan: setOrdersTimeSpan,
    ordersTimeType: ordersTimeType,
    setOrdersTimeType: setOrdersTimeType,
    retreatsTimeSpan: retreatsTimeSpan,
    setRetreatsTimeSpan: setRetreatsTimeSpan,
    retreatsTimeType: retreatsTimeType,
    setRetreatsTimeType: setRetreatsTimeType,
    adjustmentsTimeSpan: adjustmentsTimeSpan,
    setAdjustmentsTimeSpan: setAdjustmentsTimeSpan,
    adjustmentsTimeType: adjustmentsTimeType,
    setAdjustmentsTimeType: setAdjustmentsTimeType,
    nominationsTimeSpan: nominationsTimeSpan,
    setNominationsTimeSpan: setNominationsTimeSpan,
    nominationsTimeType: nominationsTimeType,
    setNominationsTimeType: setNominationsTimeType,
    votesTimeSpan: votesTimeSpan,
    setVotesTimeSpan: setVotesTimeSpan,
    votesTimeType: votesTimeType,
    setVotesTimeType: setVotesTimeType
  }

  const settings: any = {
    stylizedStartYear: stylizedStartYear,
    setStylizedStartYear: setStylizedStartYear,
    timeZone: timeZone,
    setTimeZone: setTimeZone,
    observeDst: observeDst,
    setObserveDst: setObserveDst,
    turn1Timing: turn1Timing,
    setTurn1Timing: setTurn1Timing,
    nominationTiming: nominationTiming,
    setNominationTiming: setNominationTiming,
    nominationYear: nominationYear,
    setNominationYear: setNominationYear,
    concurrentGamesLimit: concurrentGamesLimit,
    setConcurrentGamesLimit: setConcurrentGamesLimit,
    automaticAssignments: automaticAssignments,
    setAutomaticAssignments: setAutomaticAssignments,
    ratingLimits: ratingLimits,
    setRatingLimits: setRatingLimits,
    funRange: funRange,
    setFunRange: setFunRange,
    skillRange: skillRange,
    setSkillRange: setSkillRange,
    nmrTolerance: nmrTolerance,
    setNmrTolerance: setNmrTolerance,
    blindCreator: blindCreator,
    setBlindCreator: setBlindCreator,
    untfRuleEnabled: untfRuleEnabled,
    setUntfRuleEnabled: setUntfRuleEnabled,
    madOrdersRule: madOrdersRule,
    setMadOrdersRule: setMadOrdersRule,
    voteDeadlineExtension: voteDeadlineExtension,
    setVoteDeadlineExtension: setVoteDeadlineExtension,
    finalReadinessCheck: finalReadinessCheck,
    setFinalReadinessCheck: setFinalReadinessCheck,
    partialRosterStart: partialRosterStart,
    setPartialRosterStart: setPartialRosterStart
  };

  const handleDataInput = (fileString: string) => {
    input.functions.triggerParse(fileString);
  }

  const handleGameNameChange = (name: string) => {
    setGameName(name);
    checkGameNameAvailable(name)
      .then((gameNameAvailable: boolean) => {
        validateGameName(name, gameNameAvailable);
      });
  }

  const validateGameName = (gameName: string, gameNameAvailable: boolean) => {
    if (!gameNameAvailable && gameName.length > 0) {
      setGameNameAvailable(false);
    } else {
      setGameNameAvailable(true);
    }
  }

  const checkGameNameAvailable = (gameName: string): any => {
    if (gameName.length === 0) {
      gameName = '-';
    }

    return fetch(`${erzahler.url}:${erzahler.port}/check-game-name/${gameName}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((result: any) => {
      return result.json();
    })
    .then((available: any) => {
      return available;
    })
    .catch((error: Error) => {
      console.log('Error checking game name availability:', error.message);
    });
  }

  const handleGameStartChange = (date: Date | null) => {
    setGameStart(date);
  }

  const handleDeadlineTypeChange = (type: string) => {
    setDeadlineType(type);
  }

  const handleTurnOneTimingChange = (rule: string) => {
    setTurn1Timing(rule);
  }

  const handleCreateGameClick = (): void => {
    if (bkCtx.newGame.dbRows.terrain.length > 0 && gameNameAvailable
    && debug.errors.length === 0 && debug.criticals.length === 0) {
      const idToken: Promise<string> | undefined = bkCtx.user.user?.getIdToken();
      idToken?.then((token: any) => {
        const gameData = {
          gameName: gameName,
          assignmentMethod: 'manual',
          stylizedStartYear: stylizedStartYear,
          deadlineType: deadlineType,
          timeZone: timeZone,
          observeDst: observeDst,
          gameStart: gameStart,
          firstTurnDeadline: firstTurnDeadline,
          ordersDay: ordersDay,
          ordersTime: ordersTime,
          retreatsDay: retreatsDay,
          retreatsTime: retreatsTime,
          adjustmentsDay: adjustmentsDay,
          adjustmentsTime: adjustmentsTime,
          nominationsDay: nominationsDay,
          nominationsTime: nominationsTime,
          votesDay: votesDay,
          votesTime: votesTime,
          firstOrdersTimeSpan: firstOrdersTimeSpan,
          firstOrdersTimeType: firstOrdersTimeType,
          ordersTimeSpan: ordersTimeSpan,
          ordersTimeType: ordersTimeType,
          retreatsTimeSpan: retreatsTimeSpan,
          retreatsTimeType: retreatsTimeType,
          adjustmentsTimeSpan: adjustmentsTimeSpan,
          adjustmentsTimeType: adjustmentsTimeType,
          nominationsTimeSpan: nominationsTimeSpan,
          nominationsTimeType: nominationsTimeType,
          votesTimeSpan: votesTimeSpan,
          votesTimeType: votesTimeType,
          nominateDuringAdjustments: nominateDuringAdjustments,
          voteDuringOrders: voteDuringOrders,
          turn1Timing: turn1Timing,
          nominationTiming: nominationTiming,
          nominationYear: nominationYear,
          concurrentGamesLimit: concurrentGamesLimit,
          automaticAssignments: automaticAssignments,
          ratingLimits: ratingLimits,
          funRange: funRange,
          skillRange: skillRange,
          nmrTolerance: nmrTolerance,
          finalReadinessCheck: finalReadinessCheck,
          rules: gameRules,
          voteDeadlineExtension: voteDeadlineExtension,
          blindCreator: blindCreator,
          partialRosterStart: partialRosterStart,
          dbRows: bkCtx.newGame.dbRows
        };

        fetch(`${erzahler.url}:${erzahler.port}/new-game`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            idToken: token
          },
          body: JSON.stringify({
            gameData: gameData,
            idToken: token
          })
        })
        .then((response: any) => {
          return response.json();
        })
        .then((result: any) => {
          if (result.success) {
            console.log('New Game Result:', result);
            bkCtx.currentGame.id = result.gameId;
            router.push('/game-details');
          } else {
            result.errors.forEach((error: string) => console.log(error));
          }
        })
        .catch((error: Error) => {
          console.log(error.message);
        });
      });
    } else {
      console.log('Yay I can tell there is no map');
    }
  }

  const handleCancelCreateGameClick = () => {
    router.push('/');
  }

  return (
    <div style={{width: 400}}>
      <label>SVG Input</label>
      <textarea placeholder="Paste SVG Formatted File"
        value={input.data.fileString}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>): void => {
          handleDataInput(e.target.value);
        }}
      />
      <div>
        <TextField id="outlined-basic"
          label="Game Name"
          required
          variant="outlined"
          value={gameName}
          fullWidth
          error={!gameNameAvailable}
          helperText={!gameNameAvailable ? 'Game Name Unavailable' : ''}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>): void => {
            handleGameNameChange(event.target.value);
          }}
        />
      </div>
      <div>
        <Select id="first-turn-timing"
          value={turn1Timing}
          label="When players are ready:"
          onChange={(event: SelectChangeEvent<string>) => {
            handleTurnOneTimingChange(event.target.value)
          }}
        >
          <MenuItem value="immediate">Start Immediately, Partial Turn</MenuItem>
          <MenuItem value="standard">Delay Start, Precisely 1 Full Turn </MenuItem>
          <MenuItem value="remainder">Start Immediately, Full Turn With Remainder</MenuItem>
          <MenuItem value="double">Delay Start, Precisely 2 Full Turns</MenuItem>
          <MenuItem value="extended">Start Immedialy, 2 full turns and remainder</MenuItem>
          <MenuItem value="scheduled" disabled>Manually Set Start and First Deadline</MenuItem>
        </Select>
      </div>
      <div>Game Start: {gameStart !== null && `${gameStart?.toDateString()} | ${gameStart?.toLocaleTimeString()}`}</div>
      <div>First Turn: {firstTurnDeadline !== null && `${firstTurnDeadline.toDateString()} | ${firstTurnDeadline.toLocaleTimeString()}`}</div>
      <div>
        <Select
          id='deadline-type-select'
          value={deadlineType}
          label="Deadline Type"
          fullWidth
          onChange={(event: SelectChangeEvent<string>): void => {
            handleDeadlineTypeChange(event.target.value);
          }}
        >
          <MenuItem value={"weekly"}>Automatic Weekly Deadlines</MenuItem>
          <MenuItem value={"daily"}>Automatic Daily Deadlines</MenuItem>
          <MenuItem value={"interval"} disabled>Automatic Interval Deadlines</MenuItem>
          <MenuItem value={"manual"} disabled>Manually Set Deadlines</MenuItem>
        </Select>
      </div>

      <div>
        {
          (deadlineType === 'weekly') &&
          <WeeklyDeadlines deadlineOps={deadlineOps} />
        }
        {
          (deadlineType === 'daily') &&
          <DailyDeadlines deadlineOps={deadlineOps} />
        }
        {
          (deadlineType === 'interval') &&
          <IntervalDeadlines deadlineOps={deadlineOps} />
        }
      </div>
      <div>
        <NewGameSettings settings={settings}/>
      </div>
      <div>
        <Button
          color="inherit"
          variant="contained"
          onClick={handleCreateGameClick}
        >
          Create Game
        </Button>
        <Button
          color="inherit"
          variant="contained"
          onClick={handleCancelCreateGameClick}
        >
          Cancel
        </Button>
      </div>
    </div>
  )
}