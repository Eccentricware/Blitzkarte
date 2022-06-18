import { Select, MenuItem, InputLabel, SelectChangeEvent, TextField, FormGroup, FormControlLabel, Switch } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers";
import { FC } from "react";

interface DeadlinesProps {
  deadlineOps: any
}

export const WeeklyDeadlines: FC<DeadlinesProps> = ({deadlineOps}: DeadlinesProps) => {
  const handleOrdersDayChange = (day: string) => {
    deadlineOps.setOrdersDay(day);
  }

  const handleOrdersTimeChange = (time: Date | null) => {
    deadlineOps.setOrdersTime(time);
  }

  const handleRetreatsDayChange = (day: string) => {
    deadlineOps.setRetreatsDay(day);
  }

  const handleRetreatsTimeChange = (time: Date | null) => {
    deadlineOps.setRetreatsTime(time);
  }

  const handleAdjustmentsDayChange = (day: string) => {
    deadlineOps.setAdjustmentsDay(day);
  }

  const handleAdjustmentsTimeChange = (time: Date | null) => {
    deadlineOps.setAdjustmentsTime(time);
  }

  const handleNominationsDayChange = (day: string) => {
    deadlineOps.setNominationsDay(day);
  }

  const handleNominationsTimeChange = (time: Date | null) => {
    deadlineOps.setNominationsTime(time);
  }

  const handleVotesDayChange = (day: string) => {
    deadlineOps.setVotesDay(day);
  }

  const handleVotesTimeChange = (time: Date | null) => {
    deadlineOps.setVotesTime(time);
  }

  const handleNominateDuringAdjustments = () => {
    deadlineOps.setNominateDuringAdjustments(!deadlineOps.nominateDuringAdjustments);
  }

  const handleVoteDuringOrders = () => {
    deadlineOps.setVoteDuringOrders(!deadlineOps.voteDuringOrders);
  }

  return (
    <div>
      <div>
        <InputLabel id="orders-deadline-label">Orders Deadline</InputLabel>
        <Select id='orders-deadline-day'
          value={deadlineOps.ordersDay}
          onChange={(event: SelectChangeEvent<string>): void => {
            handleOrdersDayChange(event?.target.value);
          }}
        >
          <MenuItem value='sunday'>Sundays</MenuItem>
          <MenuItem value='monday'>Mondays</MenuItem>
          <MenuItem value='tuesday'>Tuesdays</MenuItem>
          <MenuItem value='wednesday'>Wednesdays</MenuItem>
          <MenuItem value='thursday'>Thursdays</MenuItem>
          <MenuItem value='friday'>Fridays</MenuItem>
          <MenuItem value='saturday'>Saturdays</MenuItem>
        </Select>
          <TimePicker
            label="Time"
            value={deadlineOps.ordersTime}
            onChange={(newTime) => {
              handleOrdersTimeChange(newTime);
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
        <InputLabel id="retreats-deadline-label">Retreats Deadline</InputLabel>
        <Select id='retreats-deadline-day'
          value={deadlineOps.retreatsDay}
          onChange={(event: SelectChangeEvent<string>): void => {
            handleRetreatsDayChange(event?.target.value);
          }}
        >
          <MenuItem value='sunday'>Sundays</MenuItem>
          <MenuItem value='monday'>Mondays</MenuItem>
          <MenuItem value='tuesday'>Tuesdays</MenuItem>
          <MenuItem value='wednesday'>Wednesdays</MenuItem>
          <MenuItem value='thursday'>Thursdays</MenuItem>
          <MenuItem value='friday'>Fridays</MenuItem>
          <MenuItem value='saturday'>Saturdays</MenuItem>
        </Select>
          <TimePicker
            label="Time"
            value={deadlineOps.retreatsTime}
            onChange={(newTime) => {
              handleRetreatsTimeChange(newTime);
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
        <InputLabel id="adjustments-deadline-label">Adjustments Deadline</InputLabel>
        <Select id='adjustments-deadline-day'
          value={deadlineOps.adjustmentsDay}
          onChange={(event: SelectChangeEvent<string>): void => {
            handleAdjustmentsDayChange(event?.target.value);
          }}
        >
          <MenuItem value='sunday'>Sundays</MenuItem>
          <MenuItem value='monday'>Mondays</MenuItem>
          <MenuItem value='tuesday'>Tuesdays</MenuItem>
          <MenuItem value='wednesday'>Wednesdays</MenuItem>
          <MenuItem value='thursday'>Thursdays</MenuItem>
          <MenuItem value='friday'>Fridays</MenuItem>
          <MenuItem value='saturday'>Saturdays</MenuItem>
        </Select>
          <TimePicker
            label="Time"
            value={deadlineOps.adjustmentsTime}
            onChange={(newTime) => {
              handleAdjustmentsTimeChange(newTime);
            }}
            renderInput={(params) =>
              <TextField {...params}
              required
              variant="outlined"
              />
            }
          />
      </div>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={deadlineOps.nominateDuringAdjustments}
              onChange={handleNominateDuringAdjustments}
            />
          }
          label="Nominate During Adjustments"
          labelPlacement="start"
        />
      </FormGroup>
     {
      !deadlineOps.nominateDuringAdjustments &&
      <div>
        <InputLabel id="nominations-deadline-label">Nominations Deadline</InputLabel>
        <Select id='nominations-deadline-day'
          value={deadlineOps.nominationsDay}
          onChange={(event: SelectChangeEvent<string>): void => {
            handleNominationsDayChange(event?.target.value);
          }}
        >
          <MenuItem value='sunday'>Sundays</MenuItem>
          <MenuItem value='monday'>Mondays</MenuItem>
          <MenuItem value='tuesday'>Tuesdays</MenuItem>
          <MenuItem value='wednesday'>Wednesdays</MenuItem>
          <MenuItem value='thursday'>Thursdays</MenuItem>
          <MenuItem value='friday'>Fridays</MenuItem>
          <MenuItem value='saturday'>Saturdays</MenuItem>
        </Select>
          <TimePicker
            label="Time"
            value={deadlineOps.nominationsTime}
            onChange={(newTime) => {
              handleNominationsTimeChange(newTime);
            }}
            renderInput={(params) =>
              <TextField {...params}
              required
              variant="outlined"
              />
            }
          />
        </div>
      }
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={deadlineOps.voteDuringOrders}
              onChange={handleVoteDuringOrders}
            />
          }
          label="Vote During Orders"
          labelPlacement="start"
        />
      </FormGroup>
      {
        !deadlineOps.voteDuringOrders &&
        <div>
          <InputLabel id="votes-deadline-label">Votes Deadline</InputLabel>
          <Select id='votes-deadline-day'
            value={deadlineOps.votesDay}
            onChange={(event: SelectChangeEvent<string>): void => {
              handleVotesDayChange(event?.target.value);
            }}
          >
            <MenuItem value='sunday'>Sundays</MenuItem>
            <MenuItem value='monday'>Mondays</MenuItem>
            <MenuItem value='tuesday'>Tuesdays</MenuItem>
            <MenuItem value='wednesday'>Wednesdays</MenuItem>
            <MenuItem value='thursday'>Thursdays</MenuItem>
            <MenuItem value='friday'>Fridays</MenuItem>
            <MenuItem value='saturday'>Saturdays</MenuItem>
          </Select>
          <TimePicker
            label="Time"
            value={deadlineOps.votesTime}
            onChange={(newTime) => {
              handleVotesTimeChange(newTime);
            }}
            renderInput={(params) =>
              <TextField {...params}
                required
                variant="outlined"
              />
            }
          />
        </div>
      }
    </div>
  )
}