import { InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import React, { FC, useState } from 'react';
import { WeeklyDeadlines } from './WeeklyDeadlines';
import { IntervalDeadlines } from './IntervalDeadlines';
import { DateTimePicker } from '@mui/x-date-pickers';

interface InputProps {
  input: any;
}

export const InputTab: FC<InputProps> = ({input}: InputProps) => {
  const [gameName, setGameName] = useState('');
  const [deadlineType, setDeadlineType] = useState('weekly');
  const [gameStart, setGameStart] = useState(new Date());
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
  const [voteDuringOrders, setVoteDuringOrders] = useState(false);

  const weeklyDeadlineOps: any = {
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

  const handleDeadlineTypeChange = (type: string) => {
    setDeadlineType(type);
  }

  const handleFistDeadlineChange = (date: string) => {
    setGameStart(date);
  }

  return (
    <div>
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
              handleFistDeadlineChange(newTime);
            }}
            renderInput={(params) =>
              <TextField {...params}
                required
                variant="outlined"
              />
            }
          />
        </div>
        <Select
          id='deadline-type-select'
          value={deadlineType}
          label="Deadline Type"
          fullWidth
          onChange={(event: SelectChangeEvent<string>): void => {
            handleDeadlineTypeChange(event.target.value);
          }}
        >
          <MenuItem value={"weekly"}>Weekly Deadlines</MenuItem>
          <MenuItem value={"daily"}>Daily Deadlines</MenuItem>
          <MenuItem value={"interval"}>Interval Deadlines</MenuItem>
        </Select>
        {
          deadlineType === 'weekly' ?
          <WeeklyDeadlines weeklyDeadlineOps={weeklyDeadlineOps}/>
          : <IntervalDeadlines/>
        }
      </div>
    </div>
  )
}