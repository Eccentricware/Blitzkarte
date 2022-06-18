import { InputLabel, Select, SelectChangeEvent, MenuItem, TextField, FormGroup, FormControlLabel, Switch } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers";
import { FC } from "react";

interface DeadlinesProps {
  deadlineOps: any;
}

export const DailyDeadlines: FC<DeadlinesProps> = ({deadlineOps}: DeadlinesProps) => {
  const handleOrdersTimeChange = (time: Date | null) => {
    deadlineOps.setOrdersTime(time);
  }

  const handleRetreatsTimeChange = (time: Date | null) => {
    deadlineOps.setRetreatsTime(time);
  }

  const handleAdjustmentsTimeChange = (time: Date | null) => {
    deadlineOps.setAdjustmentsTime(time);
  }

  const handleNominationsTimeChange = (time: Date | null) => {
    deadlineOps.setNominationsTime(time);
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