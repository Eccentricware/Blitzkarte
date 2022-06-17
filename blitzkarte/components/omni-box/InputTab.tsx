import { InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import React, { FC, useState } from 'react';
import { WeeklyDeadlines } from './WeeklyDeadlines';
import { IntervalDeadlines } from './IntervalDeadlines';

interface InputProps {
  input: any;
}

export const InputTab: FC<InputProps> = ({input}: InputProps) => {
  const [gameName, setGameName] = useState('');
  const [deadlineType, setDeadlineType] = useState('weekly');
  const [ordersDeadline, setOrdersDeadline] = useState(null);
  const [ordersDay, setOrdersDay] = useState('sunday');
  const [ordersTime, setOrdersTime] = useState(null);
  const [retreatsDay, setRetreatsDay] = useState(null);
  const [retreatsTime, setRetreatsTime] = useState(null);
  const [adjustmentsDay, setAdjustmentsDay] = useState('sunday');
  const [adjustmentTime, setAdjustmentTime] = useState(null);
  const [nominationDay, setNominationDay] = useState(null);
  const [nominationTime, setNominationTime] = useState(null);
  const [voteDay, setVoteDay] = useState(null);
  const [voteTime, setVoteTime] = useState(null);
  const [nominateDuringAdjustments, setNominateDuringAdjustments] = useState(false);
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
    adjustmentTime: adjustmentTime,
    setAdjustmentTime: setAdjustmentTime,
    nominationDay: nominationDay,
    setNominationDay: setNominationDay,
    nominationTime: nominationTime,
    setNominationTime: setNominationTime,
    voteDay: voteDay,
    setVoteDay: setVoteDay,
    voteTime: voteTime,
    setVoteTime: setVoteTime,
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

  const handleSpringDeadlineChange = (date: string) => {
    // setSpringDeadline(date);
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
        {/* <InputLabel id="deadline-type-label">Deadline Type</InputLabel> */}
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