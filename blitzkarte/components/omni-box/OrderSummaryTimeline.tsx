import { FC } from "react";
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import { Select, SelectChangeEvent, MenuItem, TextField } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers";

interface OrderSummaryTimelineProps {
  deadlineOps: any;
}

export const OrderSummaryTimeline: FC<OrderSummaryTimelineProps> = ({deadlineOps}: OrderSummaryTimelineProps) => {
  const handleOrdersDayChange = (day: string) => {
    deadlineOps.setOrdersDay(day);
  }

  const handleOrdersTimeChange = (time: Date | null) => {
    deadlineOps.setOrdersTime(time);
  }

  return (
    <Timeline>
      <TimelineItem>
        <TimelineOppositeContent>
          Game Start
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          Day
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent>
          Orders
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <div>{deadlineOps.ordersDay} {String(deadlineOps.ordersTime.getHours()).padStart(2, '0')}:{String(deadlineOps.ordersTime.getMinutes()).padStart(2, '0')}</div>
          <Select id='orders-deadline-day'
            value={deadlineOps.ordersDay}
            onChange={(event: SelectChangeEvent<string>): void => {
              handleOrdersDayChange(event?.target.value);
            }}
          >
            <MenuItem value='Sunday'>Sundays</MenuItem>
            <MenuItem value='Monday'>Mondays</MenuItem>
            <MenuItem value='Tuesday'>Tuesdays</MenuItem>
            <MenuItem value='Wednesday'>Wednesdays</MenuItem>
            <MenuItem value='Thursday'>Thursdays</MenuItem>
            <MenuItem value='Friday'>Fridays</MenuItem>
            <MenuItem value='Saturday'>Saturdays</MenuItem>
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
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent>
          Retreats
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Time</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent>
          Adjustments
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Time</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent>
          Nominations
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Time</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent>
          Votes
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot />
        </TimelineSeparator>
        <TimelineContent>Time</TimelineContent>
      </TimelineItem>
    </Timeline>
  )
}