import React, { FC, useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { WeeklyDeadlines } from './WeeklyDeadlines';
import { IntervalDeadlines } from './IntervalDeadlines';
import { DateTimePicker } from '@mui/x-date-pickers';
import { DailyDeadlines } from './DailyDeadlines';

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
  const [nominateDuringAdjustments, setNominateDuringAdjustments] = useState(true);
  const [voteDuringOrders, setVoteDuringOrders] = useState(true);

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
    setVoteDuringOrders: setVoteDuringOrders

  }

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
    <div style={{width: '100%'}}>
      <div>
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
            <MenuItem value={"interval"} disabled>Automatic Interval Deadlines</MenuItem>
            <MenuItem value={"manual"} disabled>Manually Set Deadlines</MenuItem>
          </Select>
        </div>
        <div style={{width: '100%'}}>
          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography>Schedule</Typography>
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
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </div>
  )
}