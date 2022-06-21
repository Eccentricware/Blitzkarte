import React, { FC, useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { WeeklyDeadlines } from './WeeklyDeadlines';
import { IntervalDeadlines } from './IntervalDeadlines';
import { DateTimePicker } from '@mui/x-date-pickers';
import { DailyDeadlines } from './DailyDeadlines';
import { NewGameSettings } from './NewGameSettings';

interface InputProps {
  input: any;
}

export const InputTab: FC<InputProps> = ({input}: InputProps) => {
  const [gameName, setGameName] = useState('');
  const [deadlineType, setDeadlineType] = useState('weekly');
  const [gameStart, setGameStart] = useState<Date | null>(new Date());
  const [showScheduler, setShowScheduler] = useState(true);
  const [ordersDay, setOrdersDay] = useState('monday');
  const [ordersTime, setOrdersTime] = useState(new Date('2000-01-01 12:00:00'));
  const [retreatsDay, setRetreatsDay] = useState('tuesday');
  const [retreatsTime, setRetreatsTime] = useState(new Date('2000-01-01 12:00:00'));
  const [adjustmentsDay, setAdjustmentsDay] = useState('wednesday');
  const [adjustmentsTime, setAdjustmentsTime] = useState(new Date('2000-01-01 12:00:00'));
  const [nominationsDay, setNominationsDay] = useState('thursday');
  const [nominationsTime, setNominationsTime] = useState(new Date('2000-01-01 12:00:00'));
  const [votesDay, setVotesDay] = useState('friday');
  const [votesTime, setVotesTime] = useState(new Date('2000-01-01 12:00:00'));
  const [firstOrdersTimeSpan, setFirstOrdersTimeSpan] = useState(3);
  const [firstOrdersTimeType, setFirstOrdersTimeType] = useState('days');
  const [ordersTimeSpan, setOrdersTimeSpan] = useState(2);
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

  const [turn1Timing, setTurn1Timing] = useState('standard');
  const [nominationTiming, setNominationTiming] = useState('set');
  const [nominationTurn, setNominationTurn] = useState(8);
  const [concurrentGameLimit, setConcurrentGameLimit] = useState(0);
  const [automaticAssignments, setAutomaticAssignments] = useState(false);
  const [ratingLimits, setRatingLimits] = useState(true);
  const [funRange, setFunRange] = useState([0, 90]);
  const [skillRange, setSkillRange] = useState([0, 90]);
  const [nmrTolerance, setNmrTolerance] = useState(3);
  const [blindCreator, setBlindCreator] = useState(false);
  const [untfRule, setUntfRule] = useState(false);
  const [madOrdersRule, setMadOrdersRule] = useState(false);
  const [voteDeadlineExtension, setVoteDeadlineExtension] = useState(false);

  const deadlineOps: any = {
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
    setNominationTime: setNominationsTime,
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
    turn1Timing: turn1Timing,
    setTurn1Timing: setTurn1Timing,
    nominationTiming: nominationTiming,
    setNominationTiming: setNominationTiming,
    nominationTurn: nominationTurn,
    setNominationTurn: setNominationTurn,
    concurrentGameLimit: concurrentGameLimit,
    setConcurrentGameLimit: setConcurrentGameLimit,
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
    untfRule: untfRule,
    setUntfRule: setUntfRule,
    madOrdersRule: madOrdersRule,
    setMadOrdersRule: setMadOrdersRule,
    voteDeadlineExtension: voteDeadlineExtension,
    setVoteDeadlineExtension: setVoteDeadlineExtension
  };

  const handleDataInput = (fileString: string) => {
    input.functions.triggerParse(fileString);
  }

  const handleGameNameChange = (name: string) => {
    setGameName(name);
  }

  const handleGameStartChange = (date: Date | null) => {
    setGameStart(date);
  }

  const handleDeadlineTypeChange = (type: string) => {
    setDeadlineType(type);
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
          variant="outlined"
          fullWidth
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>): void => {
            handleGameNameChange(event.target.value);
          }}
        />
      </div>
      <div>
        <DateTimePicker
          label="Game Start"
          value={gameStart}
          disablePast
          onChange={(newTime) => {
            handleGameStartChange(newTime);
          }}
          renderInput={(params) =>
            <TextField {...params}
              required
              variant="outlined"
            />
          }
        />
      </div>
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
          <MenuItem value={"interval"}>Automatic Interval Deadlines</MenuItem>
          <MenuItem value={"manual"} disabled>Manually Set Deadlines</MenuItem>
        </Select>
      </div>
      <div>
        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            style={{width: 350, textAlign: "center"}}
          >
            <Typography
              style={{width: 350, alignContent: 'center'}}
            >Schedule</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {
              (deadlineType === 'weekly') &&
              <WeeklyDeadlines deadlineOps={deadlineOps}/>
            }
            {
              (deadlineType === 'daily') &&
              <DailyDeadlines deadlineOps={deadlineOps}/>
            }
            {
              (deadlineType === 'interval') &&
              <IntervalDeadlines deadlineOps={deadlineOps}/>
            }
          </AccordionDetails>
        </Accordion>
      </div>
      <div>
        <NewGameSettings settings={settings}/>
      </div>
    </div>
  )
}