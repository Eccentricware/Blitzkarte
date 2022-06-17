import { Select, MenuItem, InputLabel, SelectChangeEvent, TextField, FormGroup, FormControlLabel, Switch } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers";
import { FC } from "react";

interface WeeklyDeadlinesProps {
  weeklyDeadlineOps: any
}

export const WeeklyDeadlines: FC<WeeklyDeadlinesProps> = ({weeklyDeadlineOps}: WeeklyDeadlinesProps) => {
  const handleOrdersDayChange = (day: string) => {
    weeklyDeadlineOps.setOrdersDay(day);
  }

  const handleOrdersTimeChange = (time: Date | null) => {
    weeklyDeadlineOps.setOrdersTime(time);
  }

  const handleRetreatsDayChange = (day: string) => {
    weeklyDeadlineOps.setRetreatsDay(day);
  }

  const handleRetreatsTimeChange = (time: Date | null) => {
    weeklyDeadlineOps.setRetreatsTime(time);
  }

  const handleAdjustmentsDayChange = (day: string) => {
    weeklyDeadlineOps.setAdjustmentsDay(day);
  }

  const handleAdjustmentsTimeChange = (time: Date | null) => {
    weeklyDeadlineOps.setAdjustmentsTime(time);
  }

  const handleNominationsDayChange = (day: string) => {
    weeklyDeadlineOps.setNominationsDay(day);
  }

  const handleNominationsTimeChange = (time: Date | null) => {
    weeklyDeadlineOps.setNominationsTime(time);
  }

  const handleVotesDayChange = (day: string) => {
    weeklyDeadlineOps.setVotesDay(day);
  }

  const handleVotesTimeChange = (time: Date | null) => {
    weeklyDeadlineOps.setVotesTime(time);
  }

  const handleNominateDuringAdjustments = () => {
    weeklyDeadlineOps.setNominateDuringAdjustments(!weeklyDeadlineOps.nominateDuringAdjustments);
  }

  const handleVoteDuringOrders = () => {
    weeklyDeadlineOps.setVoteDuringOrders(!weeklyDeadlineOps.voteDuringOrders);
  }

  return (
    <div>
      <div>
        <InputLabel id="orders-deadline-label">Orders Deadline</InputLabel>
        <Select id='orders-deadline-day'
          value={weeklyDeadlineOps.ordersDay}
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
            value={weeklyDeadlineOps.ordersTime}
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
          value={weeklyDeadlineOps.retreatsDay}
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
            value={weeklyDeadlineOps.retreatsTime}
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
          value={weeklyDeadlineOps.adjustmentsDay}
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
            value={weeklyDeadlineOps.adjustmentsTime}
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
              checked={weeklyDeadlineOps.nominateDuringAdjustments}
              onChange={handleNominateDuringAdjustments}
            />
          }
          label="Nominate During Adjustments"
          labelPlacement="start"
        />
      </FormGroup>
     {
      !weeklyDeadlineOps.nominateDuringAdjustments &&
      <div>
        <InputLabel id="nominations-deadline-label">Nominations Deadline</InputLabel>
        <Select id='nominations-deadline-day'
          value={weeklyDeadlineOps.nominationsDay}
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
            value={weeklyDeadlineOps.nominationsTime}
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
              checked={weeklyDeadlineOps.voteDuringOrders}
              onChange={handleVoteDuringOrders}
            />
          }
          label="Vote During Orders"
          labelPlacement="start"
        />
      </FormGroup>
      {
        !weeklyDeadlineOps.voteDuringOrders &&
        <div>
          <InputLabel id="votes-deadline-label">Votes Deadline</InputLabel>
          <Select id='votes-deadline-day'
            value={weeklyDeadlineOps.votesDay}
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
            value={weeklyDeadlineOps.votesTime}
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
  );
}