import { Select, MenuItem, InputLabel, SelectChangeEvent, TextField } from "@mui/material";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { FC } from "react";

interface WeeklyDeadlinesProps {
  weeklyDeadlineOps: any
}

export const WeeklyDeadlines: FC<WeeklyDeadlinesProps> = ({ weeklyDeadlineOps }: WeeklyDeadlinesProps) => {
  const handleOrderDayChange = (day: string) => {
    weeklyDeadlineOps.setOrdersDay(day);
  }

  const handleOrderTimeChange = (time: Date | null) => {
    weeklyDeadlineOps.setOrdersTime(time);
  }

  return (
    <div>
      <div>
        <InputLabel id="orders-deadline-label">Orders Deadline</InputLabel>
        <Select id='orders-deadline-day'
          value={weeklyDeadlineOps.ordersDay}
          onChange={(event: SelectChangeEvent<string>): void => {
            handleOrderDayChange(event?.target.value);
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
            onChange={handleOrderTimeChange}
            renderInput={(params) =>
              <TextField {...params}
              required
              variant="outlined"
              />
            }
          />
      </div>
    </div>
  );
}