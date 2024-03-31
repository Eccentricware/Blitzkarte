import { TextField, Select, SelectChangeEvent, MenuItem, Button } from "@mui/material";
import assert from "assert";
import { useRouter } from "next/router";
import { FC, useState, useContext, useEffect, Fragment, useMemo } from "react";
import { UseQueryResult } from "react-query";
import { GameStatus } from "../../models/enumeration/game-status-enum";
import { GameDataObject } from "../../models/objects/GameDataObject";
import { GameRequestService } from "../../services/request-services/game-request-service";
import { SchedulerService } from "../../services/scheduler-service";
import Blitzkontext from "../../utils/Blitzkontext";
import { erzahler } from "../../utils/general/erzahler";
import { DailyDeadlines } from "../omni-box/DailyDeadlines";
import { IntervalDeadlines } from "../omni-box/IntervalDeadlines";
import { WeeklyDeadlines } from "../omni-box/WeeklyDeadlines";
import { GameSettings } from "./GameSettings";

interface GameDetailsSettingsProps {
  gameDetailsSettings: any;
  assignmentRefetch: Function;
}

export const GameDetailsSettings: FC<GameDetailsSettingsProps> = ({gameDetailsSettings, assignmentRefetch}: GameDetailsSettingsProps) => {
    const gameData = gameDetailsSettings;
    console.log('GameDetailsSettings gameData:', gameData);

    const gameRequestService = new GameRequestService();
    const router = useRouter();
    const [gameName, setGameName] = useState(gameData.gameName);
    const [gameNameAvailable, setGameNameAvailable] = useState(true);
    const [deadlineType, setDeadlineType] = useState(gameData.deadlineType);
    const [meridiemTime, setMeridiemTime] = useState(gameData.meridiemTime);
    const [observeDst, setObserveDst] = useState(gameData.observeDst);
    const [readyTime, setReadyTime] = useState<Date | null>(new Date(gameData.readyTime));
    const [gameStart, setGameStart] = useState<Date | null>(new Date(gameData.startTime));
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

    const [baseRequired, setBaseRequired] = useState(gameData.coalitionSchedule.baseFinal);
    const [penaltyA, setPenaltyA] = useState(gameData.coalitionSchedule.penalties.a);
    const [penaltyB, setPenaltyB] = useState(gameData.coalitionSchedule.penalties.b);
    const [penaltyC, setPenaltyC] = useState(gameData.coalitionSchedule.penalties.c);
    const [penaltyD, setPenaltyD] = useState(gameData.coalitionSchedule.penalties.d);
    const [penaltyE, setPenaltyE] = useState(gameData.coalitionSchedule.penalties.e);
    const [penaltyF, setPenaltyF] = useState(gameData.coalitionSchedule.penalties.f);
    const [penaltyG, setPenaltyG] = useState(gameData.coalitionSchedule.penalties.g);

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

    useEffect(() => {
      setBaseRequired(gameData.coalitionSchedule.baseRequired);
      setPenaltyA(gameData.coalitionSchedule.penalties.a);
      setPenaltyB(gameData.coalitionSchedule.penalties.b);
      setPenaltyC(gameData.coalitionSchedule.penalties.c);
      setPenaltyD(gameData.coalitionSchedule.penalties.d);
      setPenaltyE(gameData.coalitionSchedule.penalties.e);
      setPenaltyF(gameData.coalitionSchedule.penalties.f);
      setPenaltyG(gameData.coalitionSchedule.penalties.g);
    }, [
      gameData.coalitionSchedule.baseRequired,
      gameData.coalitionSchedule.penalties.a,
      gameData.coalitionSchedule.penalties.b,
      gameData.coalitionSchedule.penalties.c,
      gameData.coalitionSchedule.penalties.d,
      gameData.coalitionSchedule.penalties.e,
      gameData.coalitionSchedule.penalties.f,
      gameData.coalitionSchedule.penalties.g
    ]);

    const deadlineOps = useMemo(() => ({
      gameStart: gameStart,
      setGameStart: setGameStart,
      readyTime: gameData.readyTime,
      setReadyTime: setReadyTime,
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
      isAdmin: gameData.isAdmin,
      gameStatus: gameData.gameStatus
    }), [
      adjustmentsDay,
      adjustmentsTime,
      adjustmentsTimeSpan,
      adjustmentsTimeType,
      deadlineType,
      firstOrdersTimeSpan,
      firstOrdersTimeType,
      firstTurnDeadline,
      gameData.gameStatus,
      gameData.isAdmin,
      gameData.readyTime,
      gameStart,
      nominationsDay,
      nominationsTime,
      nominationsTimeSpan,
      nominationsTimeType,
      ordersDay,
      ordersTime,
      ordersTimeSpan,
      ordersTimeType,
      retreatsDay,
      retreatsTime,
      retreatsTimeSpan,
      retreatsTimeType,
      votesDay,
      votesTime,
      votesTimeSpan,
      votesTimeType,
      voteDuringOrders,
      nominateDuringAdjustments,
      turn1Timing
    ])

    const settings: any = {
      stylizedStartYear: stylizedStartYear,
      setStylizedStartYear: setStylizedStartYear,
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
      isAdmin: gameData.isAdmin,
      baseRequired: baseRequired,
      setBaseRequired: setBaseRequired,
      penaltyA: penaltyA,
      setPenaltyA: setPenaltyA,
      penaltyB: penaltyB,
      setPenaltyB: setPenaltyB,
      penaltyC: penaltyC,
      setPenaltyC: setPenaltyC,
      penaltyD: penaltyD,
      setPenaltyD: setPenaltyD,
      penaltyE: penaltyE,
      setPenaltyE: setPenaltyE,
      penaltyF: penaltyF,
      setPenaltyF: setPenaltyF,
      penaltyG: penaltyG,
      setPenaltyG: setPenaltyG,
      totalVotes: gameData.coalitionSchedule.totalVotes,
      highestPenalty: gameData.coalitionSchedule.highestPenalty,
      gameStatus: gameData.gameStatus
    };

    useEffect(() => {
      if (gameData.gameStatus === GameStatus.REGISTRATION) {
        const schedulerService = new SchedulerService();
        schedulerService.setStartScheduling(deadlineOps);
      }
    }, [
      turn1Timing,
      deadlineType,
      ordersDay,
      ordersTime,
      firstOrdersTimeSpan,
      firstOrdersTimeType,
      deadlineOps,
      gameData.gameStatus
    ]);

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
          coalitionSchedule: {
            baseRequired: baseRequired,
            penalties: {
              a: penaltyA,
              b: penaltyB,
              c: penaltyC,
              d: penaltyD,
              e: penaltyE,
              f: penaltyF,
              g: penaltyG
            }
          }
        };

        gameRequestService.update(updateData)
          .then((response: Response) => response.json())
          .then((result: any) => {
            console.log('Chained .then result:', result);
            if (result.success) {
              router.reload();
            }
          })
          .catch((error: Error) => {
            console.log('Update Game Error: ' + error.message);
          });
      });
    }

    return (
      <div style={{width: 400, padding: 10}}>
        <div>
          <TextField id="outlined-basic"
            label="Game Name"
            required
            variant="outlined"
            value={gameName}
            fullWidth
            error={!gameNameAvailable}
            helperText={!gameNameAvailable ? 'Game Name Unavailable' : ''}
            disabled={!gameData.isAdmin || gameData.gameStatus !== GameStatus.REGISTRATION}
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>): void => {
              handleGameNameChange(event.target.value);
            }}
          />
        </div>
        <div>
          <Select id="first-turn-timing"
            value={turn1Timing}
            label="When players are ready:"
            disabled={!gameData.isAdmin || gameData.gameStatus !== GameStatus.REGISTRATION}
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
        {
          gameData.gameStatus === GameStatus.REGISTRATION &&
          <Fragment>
            <div>If the game were declared ready now:</div>
            <div>Assignments Given: {gameStart !== null && `${gameStart?.toDateString()} | ${gameStart?.toLocaleTimeString()}`}</div>
            <div>First Turn Deadline: {firstTurnDeadline !== null && `${firstTurnDeadline.toDateString()} | ${firstTurnDeadline.toLocaleTimeString()}`}</div>
          </Fragment>
        }
        {
          [GameStatus.READY, GameStatus.PLAYING, GameStatus.PAUSED, GameStatus.FINISHED].includes(gameData.gameStatus) &&
          <Fragment>
            <div>Declared Ready: {readyTime !== null && `${readyTime.toDateString()} | ${readyTime.toLocaleTimeString()}`}</div>
            <div>Assignments Given: {gameStart !== null && `${gameStart.toDateString()} | ${gameStart.toLocaleTimeString()}`}</div>
            {/* <div>First Turn Deadline: {firstTurnDeadline !== null && `${firstTurnDeadline.toDateString()} | ${firstTurnDeadline.toLocaleTimeString()}`}</div> */}
          </Fragment>
        }
        <div>
          <Select
            id='deadline-type-select'
            value={deadlineType}
            label="Deadline Type"
            fullWidth
            disabled={!gameData.isAdmin || gameData.gameStatus !== GameStatus.REGISTRATION}
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
          gameData.isAdmin &&
          <div>
            <Button
              color="inherit"
              variant="contained"
              onClick={handleUpdateGameClick}
            >
              Save Changes
            </Button>
          </div>
        }
      </div>
    )
}