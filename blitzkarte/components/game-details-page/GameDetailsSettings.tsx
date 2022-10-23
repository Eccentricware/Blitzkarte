import { TextField, Select, SelectChangeEvent, MenuItem, Button } from "@mui/material";
import assert from "assert";
import { useRouter } from "next/router";
import { FC, useState, useContext, useEffect } from "react";
import { GameStatus } from "../../models/enumeration/game-status-enum";
import { GameDataObject } from "../../models/GameDataObject";
import { GameRequestService } from "../../services/request-services/game-request-service";
import { SchedulerService } from "../../services/scheduler-service";
import Blitzkontext from "../../utils/Blitzkontext";
import { erzahler } from "../../utils/general/erzahler";
import { DailyDeadlines } from "../omni-box/DailyDeadlines";
import { IntervalDeadlines } from "../omni-box/IntervalDeadlines";
import { WeeklyDeadlines } from "../omni-box/WeeklyDeadlines";
import { GameSettings } from "./GameSettings";

interface GameDetailsSettingsProps {
  gameData: GameDataObject;
}

export const GameDetailsSettings: FC<GameDetailsSettingsProps> = ({gameData}: GameDetailsSettingsProps) => {
  const gameRequestService = new GameRequestService();
  const router = useRouter();
  const [gameName, setGameName] = useState(gameData.gameName);
  const [gameNameAvailable, setGameNameAvailable] = useState(true);
  const [deadlineType, setDeadlineType] = useState(gameData.deadlineType);
  const [timeZone, setTimeZone] = useState(gameData.gameTimeZone);
  const [observeDst, setObserveDst] = useState(gameData.observeDst);
  const [gameStart, setGameStart] = useState<Date | null>(new Date());
  const [firstTurnDeadline, setFirstTurnDeadline] = useState<Date | null>(new Date());

  const [ordersDay, setOrdersDay] = useState(gameData.ordersDay);
  const [ordersTime, setOrdersTime] = useState(new Date(`2000 01 01 ${gameData.ordersTime.split('-')[0]}`));
  const [retreatsDay, setRetreatsDay] = useState(gameData.retreatsDay);
  const [retreatsTime, setRetreatsTime] = useState(new Date(`2000 01 01 ${gameData.retreatsTime.split('-')[0]}`));
  const [adjustmentsDay, setAdjustmentsDay] = useState(gameData.adjustmentsDay);
  const [adjustmentsTime, setAdjustmentsTime] = useState(new Date(`2000 01 01 ${gameData.adjustmentsTime.split('-')[0]}`));
  const [nominationsDay, setNominationsDay] = useState(gameData.nominationsDay);
  const [nominationsTime, setNominationsTime] = useState(new Date(`2000 01 01 ${gameData.nominationsTime.split('-')[0]}`));
  const [votesDay, setVotesDay] = useState(gameData.votesDay);
  const [votesTime, setVotesTime] = useState(new Date(`2000 01 01 ${gameData.votesTime.split('-')[0]}`));
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
  const [nominateDuringAdjustments, setNominateDuringAdjustments] = useState(
    gameData.adjustmentsDay === gameData.nominationsDay &&
    gameData.adjustmentsTime === gameData.nominationsTime
  );
  const [voteDuringOrders, setVoteDuringOrders] = useState(
    gameData.ordersDay === gameData.votesDay &&
    gameData.ordersTime === gameData.votesTime
  );

  const [stylizedStartYear, setStylizedStartYear] = useState(gameData.stylizedStartYear);
  const [turn1Timing, setTurn1Timing] = useState(gameData.turn1Timing);
  const [nominationTiming, setNominationTiming] = useState(gameData.nominationTiming);
  const [nominationYear, setNominationYear] = useState(gameData.nominationYear);
  const [concurrentGamesLimit, setConcurrentGamesLimit] = useState(gameData.concurrentGamesLimit);
  const [automaticAssignments, setAutomaticAssignments] = useState(gameData.automaticAssignments);
  const [ratingLimits, setRatingLimits] = useState(gameData.ratingLimitsEnabled);
  const [funRange, setFunRange] = useState([gameData.funMin, gameData.funMax]);
  const [skillRange, setSkillRange] = useState([gameData.skillMin, gameData.skillMax]);
  const [nmrTolerance, setNmrTolerance] = useState(gameData.nmrToleranceTotal);
  const [blindCreator, setBlindCreator] = useState(gameData.blindAdministrators);
  const [untfRuleEnabled, setUntfRuleEnabled] = useState(false);
  const [madOrdersRule, setMadOrdersRule] = useState(false);
  const [voteDeadlineExtension, setVoteDeadlineExtension] = useState(gameData.voteDelayEnabled);
  const [finalReadinessCheck, setFinalReadinessCheck] = useState(gameData.finalReadinessCheck);
  const [partialRosterStart, setPartialRosterStart] = useState(gameData.partialRosterStart);

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
    setVotesTimeType: setVotesTimeType,
    displayAsAdmin: gameData.displayAsAdmin,
    gameStatus: gameData.gameStatus
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
    setPartialRosterStart: setPartialRosterStart,
    displayAsAdmin: gameData.displayAsAdmin,
    gameStatus: gameData.gameStatus
  };

  const handleGameNameChange = (name: string) => {
    setGameName(name);
    checkGameNameAvailable(name)
      .then((gameNameAvailable: boolean) => {
        validateGameName(name, gameNameAvailable);
      });
  }

  const validateGameName = (gameName: string, gameNameAvailable: boolean) => {
    if (!gameNameAvailable && gameName.length > 0 && gameName !== gameData.gameName) {
      setGameNameAvailable(false);
    } else {
      setGameNameAvailable(true);
    }
  }

  const checkGameNameAvailable = (gameName: string): any => {
    if (gameName.length === 0) {
      gameName = '-';
    }

    return gameRequestService.checkAvailability(gameName);
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

  const handleUpdateGameClick = (): void => {
    const idToken: Promise<string> | undefined = bkCtx.user.user?.getIdToken();
    idToken?.then((token: any) => {
      const updateData = {
        gameId: gameData.gameId,
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

      gameRequestService.update(updateData)
        .then((result: any) => {
          console.log('Chained .then result:', result);
          if (result.success) {
            router.reload();
          } else {
            // result.errors.forEach((error: string) => console.log(error));
          }
        })
        .catch((error: Error) => {
          console.log('Update Game Error: ' + error.message);
        });


      // fetch(`${erzahler.url}:${erzahler.port}/update-game`, {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     idToken: token
      //   },
      //   body: JSON.stringify({
      //     gameData: gameData,
      //     idToken: token
      //   })
      // })
      // .then((response: any) => {
      //   return response.json();
      // })
      // .then((result: any) => {
      //   if (result.success) {
      //     router.reload();
      //   } else {
      //     result.errors.forEach((error: string) => console.log(error));
      //   }
      // })
      // .catch((error: Error) => {
      //   console.log('Update Game Error: ' + error.message);
      // });
    });
  }

  const handleCancelCreateGameClick = () => {
    router.push('/');
  }

  return (
    <div style={{width: 400}}>
      <div>
        <TextField id="outlined-basic"
          label="Game Name"
          required
          variant="outlined"
          value={gameName}
          fullWidth
          error={!gameNameAvailable}
          helperText={!gameNameAvailable ? 'Game Name Unavailable' : ''}
          disabled={!gameData.displayAsAdmin || gameData.gameStatus !== GameStatus.REGISTRATION}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>): void => {
            handleGameNameChange(event.target.value);
          }}
        />
      </div>
      <div>
        <Select id="first-turn-timing"
          value={turn1Timing}
          label="When players are ready:"
          disabled={!gameData.displayAsAdmin || gameData.gameStatus !== GameStatus.REGISTRATION}
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
          disabled={!gameData.displayAsAdmin || gameData.gameStatus !== GameStatus.REGISTRATION}
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
        <GameSettings settings={settings}/>
      </div>
      {
        gameData.displayAsAdmin &&
        <div>
          <Button
            color="inherit"
            variant="contained"
            onClick={handleUpdateGameClick}
          >
            Save Game
          </Button>
          <Button
            color="inherit"
            variant="contained"
            onClick={handleCancelCreateGameClick}
          >
            Cancel
          </Button>
        </div>
      }
    </div>
  )
}