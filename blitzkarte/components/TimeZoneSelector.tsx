import { FC } from "react";
import { Select, SelectChangeEvent, MenuItem } from "@mui/material";

import { SchedulerService } from "../services/scheduler-service";
import { getTimeZones, TimeZone } from "@vvo/tzdb";

interface TimeZoneSelectorProps {
  timeZoneOps: {
    getTimeZone: string;
    setTimeZone: Function;
  }
}

export const TimeZoneSelector: FC<TimeZoneSelectorProps> = ({timeZoneOps}: TimeZoneSelectorProps) => {
  const schedulerService = new SchedulerService();
  const handleTimeZoneChange = (timeZone: string) => {
    timeZoneOps.setTimeZone(timeZone);
  }

  const timeZoneOptions = schedulerService.chooseTimeZones();

  return (
    <div>
        Time Zone:
        <Select id="time-zone-select"
          value={timeZoneOps.getTimeZone}
          label="Time Zone"
          onChange={(event: SelectChangeEvent<string>) => {
            handleTimeZoneChange(event.target.value);
          }}
        >
          {
            timeZoneOptions.map((timeZone: TimeZone, index: number) =>
              <MenuItem key={index} value={timeZone.name}>{timeZone.currentTimeFormat.split(' - ')[0]}</MenuItem>
            )
          }
        </Select>
      </div>
  )
}