import { FC, useEffect, useState } from "react";
import { Select, MenuItem, SelectChangeEvent, TextField, } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers";
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import CallSplitIcon from '@mui/icons-material/CallSplit'
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import MergeTypeIcon from '@mui/icons-material/MergeType';
import { SchedulerService } from "../../services/scheduler-service";


interface DeadlinesProps {
  deadlineOps: any
}

export const WeeklyDeadlines: FC<DeadlinesProps> = ({deadlineOps}: DeadlinesProps) => {
  const [editingOrders, setEditingOrders] = useState(false);
  const [currentOrdersDay, setCurrentOrdersDay] = useState(deadlineOps.ordersDay);
  const [currentOrdersTime, setCurrentOrdersTime] = useState(deadlineOps.ordersTime);
  const [editingRetreats, setEditingRetreats] = useState(false);
  const [currentRetreatsDay, setCurrentRetreatsDay] = useState(deadlineOps.retreatsDay);
  const [currentRetreatsTime, setCurrentRetreatsTime] = useState(deadlineOps.retreatsTime);
  const [editingAdjustments, setEditingAdjustments] = useState(false);
  const [currentAdjustmentsDay, setCurrentAdjustmentsDay] = useState(deadlineOps.adjustmentsDay);
  const [currentAdjustmentsTime, setCurrentAdjustmentsTime] = useState(deadlineOps.adjustmentsTime);
  const [editingNominations, setEditingNominations] = useState(false);
  const [currentNominationsDay, setCurrentNominationsDay] = useState(deadlineOps.nominationsDay);
  const [currentNominationsTime, setCurrentNominationsTime] = useState(deadlineOps.nominationsTime);
  const [editingVotes, setEditingVotes] = useState(false);
  const [currentVotesDay, setCurrentVotesDay] = useState(deadlineOps.votesDay);
  const [currentVotesTime, setCurrentVotesTime] = useState(deadlineOps.votesTime);
  const [isAdmin, setisAdmin] = useState(deadlineOps.isAdmin === false ? deadlineOps.isAdmin : true);

  const schedulerService = new SchedulerService();

  // Edits on/off also triggers validation of ordering
  const handleEditOrdersToggle = () => {
    if (schedulerService.validateWeeklyDeadlineChange(deadlineOps)) {
      setCurrentOrdersDay(deadlineOps.ordersDay);
      setCurrentOrdersTime(deadlineOps.ordersTime);
    } else {
      deadlineOps.setOrdersDay(currentOrdersDay);
      deadlineOps.setOrdersTime(currentOrdersTime);
    }
    setEditingOrders(!editingOrders);
  }

  const handleEditRetreatsToggle = () => {
    if (schedulerService.validateWeeklyDeadlineChange(deadlineOps)) {
      setCurrentRetreatsDay(deadlineOps.retreatsDay);
      setCurrentRetreatsTime(deadlineOps.retreatsTime);
    } else {
      deadlineOps.setRetreatsDay(currentRetreatsDay);
      deadlineOps.setRetreatsTime(currentRetreatsTime);
    }
    setEditingRetreats(!editingRetreats);
  }

  const handleEditAdjustmentsToggle = () => {
    if (schedulerService.validateWeeklyDeadlineChange(deadlineOps)) {
      setCurrentAdjustmentsDay(deadlineOps.adjustmentsDay);
      setCurrentAdjustmentsTime(deadlineOps.adjustmentsTime);
    } else {
      deadlineOps.setAdjustmentsDay(currentAdjustmentsDay);
      deadlineOps.setAdjustmentsTime(currentAdjustmentsTime);
    }
    setEditingAdjustments(!editingAdjustments);
  }

  const handleEditNominationsToggle = () => {
    if (schedulerService.validateWeeklyDeadlineChange(deadlineOps)) {
      setCurrentNominationsDay(deadlineOps.nominationsDay);
      setCurrentNominationsTime(deadlineOps.nominationsTime);
    } else {
      deadlineOps.setNominationsDay(currentNominationsDay);
      deadlineOps.setNominationsTime(currentNominationsTime);
    }
    setEditingNominations(!editingNominations);
  }

  const handleEditVotesToggle = () => {
    if (schedulerService.validateWeeklyDeadlineChange(deadlineOps)) {
      setCurrentVotesDay(deadlineOps.votesDay);
      setCurrentVotesTime(deadlineOps.votesTime);
    } else {
      deadlineOps.setVotesDay(currentVotesDay);
      deadlineOps.setVotesTime(currentVotesTime);
    }
    setEditingVotes(!editingVotes);
  }

  // Individual Settings change
  const handleOrdersDayChange = (day: string) => {
   deadlineOps.setOrdersDay(day);
  }

  const handleOrdersTimeChange = (time: string | null) => {
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

  // Deadline Grouping
  const handleNominateDuringAdjustmentsChange = () => {
    deadlineOps.setNominateDuringAdjustments(!deadlineOps.nominateDuringAdjustments);
  }

  const handleVoteDuringOrdersChange = () => {
    deadlineOps.setVoteDuringOrders(!deadlineOps.voteDuringOrders);
  }

  return (
    <div>
      <Timeline>
        <TimelineItem>
          <TimelineOppositeContent>
            {
              deadlineOps.voteDuringOrders && isAdmin
              ? <div>
                  <CallSplitIcon fontSize="small" onClick={handleVoteDuringOrdersChange} />
                  Orders / Votes
                </div>
              : <div>Orders</div>
            }
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            {
              editingOrders
                ?
              <div>
                <Select id='orders-deadline-day'
                  value={deadlineOps.ordersDay}
                  onChange={(event: SelectChangeEvent<string>): void => {
                    handleOrdersDayChange(event.target.value);
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
                  <CheckIcon fontSize="small" onClick={handleEditOrdersToggle} />
              </div>
                :
                <div>{deadlineOps.ordersDay} {String(deadlineOps.ordersTime.getHours()).padStart(2, '0')}:{String(deadlineOps.ordersTime.getMinutes()).padStart(2, '0')} {isAdmin && <EditIcon fontSize="small" onClick={handleEditOrdersToggle} />}
              </div>
            }
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
          <TimelineContent>
            {
              editingRetreats
                ?
                <div>
                  <Select id='retreats-deadline-day'
                    value={deadlineOps.retreatsDay}
                    onChange={(event: SelectChangeEvent<string>): void => {
                      handleRetreatsDayChange(event.target.value);
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
                  <CheckIcon fontSize="small" onClick={handleEditRetreatsToggle} />
                </div>
                :
                <div>{deadlineOps.retreatsDay} {String(deadlineOps.retreatsTime.getHours()).padStart(2, '0')}:{String(deadlineOps.retreatsTime.getMinutes()).padStart(2, '0')} {isAdmin && <EditIcon fontSize="small" onClick={handleEditRetreatsToggle} />}
                </div>
            }
          </TimelineContent>
        </TimelineItem>


        <TimelineItem>
          <TimelineOppositeContent>
            {
              deadlineOps.nominateDuringAdjustments && isAdmin
              ? <div>
                  <CallSplitIcon fontSize="small" onClick={
                    handleNominateDuringAdjustmentsChange
                  }/>
                  Adjust/Nominate
                </div>
              : <div>Adjustments</div>
            }
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot />
            {
              !(
                deadlineOps.nominateDuringAdjustments &&
                deadlineOps.voteDuringOrders
              )
              && <TimelineConnector />
            }
          </TimelineSeparator>
          <TimelineContent>
            {
              editingAdjustments
                ?
                <div>
                  <Select id='adjustments-deadline-day'
                    value={deadlineOps.adjustmentsDay}
                    onChange={(event: SelectChangeEvent<string>): void => {
                      handleAdjustmentsDayChange(event.target.value);
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
                  <CheckIcon fontSize="small" onClick={handleEditAdjustmentsToggle} />
                </div>
                :
                <div>{deadlineOps.adjustmentsDay} {String(deadlineOps.adjustmentsTime.getHours()).padStart(2, '0')}:{String(deadlineOps.adjustmentsTime.getMinutes()).padStart(2, '0')} {isAdmin && <EditIcon fontSize="small" onClick={handleEditAdjustmentsToggle} />}
                </div>
            }
          </TimelineContent>
        </TimelineItem>


        {
          !deadlineOps.nominateDuringAdjustments &&
          <TimelineItem>
            <TimelineOppositeContent>
              <div>
                {
                  isAdmin &&
                  <MergeTypeIcon fontSize="small"
                    onClick={handleNominateDuringAdjustmentsChange}
                  />
                }
                Nominations
              </div>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot />
              {
                !deadlineOps.voteDuringOrders &&
                <TimelineConnector />
              }
            </TimelineSeparator>
            <TimelineContent>
              {
                editingNominations
                  ?
                  <div>
                    <Select id='nominations-deadline-day'
                      value={deadlineOps.nominationsDay}
                      onChange={(event: SelectChangeEvent<string>): void => {
                        handleNominationsDayChange(event.target.value);
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
                    <CheckIcon fontSize="small" onClick={handleEditNominationsToggle} />
                  </div>
                  :
                  <div>{deadlineOps.nominationsDay} {String(deadlineOps.nominationsTime.getHours()).padStart(2, '0')}:{String(deadlineOps.nominationsTime.getMinutes()).padStart(2, '0')} {isAdmin && <EditIcon fontSize="small" onClick={handleEditNominationsToggle} />}
                  </div>
              }
            </TimelineContent>
          </TimelineItem>
        }

        {
          !deadlineOps.voteDuringOrders &&
          <TimelineItem>
            <TimelineOppositeContent>
              <div>
                {
                  isAdmin &&
                  <MergeTypeIcon fontSize="small"
                    onClick={handleVoteDuringOrdersChange}
                  />
                }
                Votes
              </div>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot />
            </TimelineSeparator>
            <TimelineContent>
              {
                editingVotes
                  ?
                <div>
                  <Select id='votes-deadline-day'
                    value={deadlineOps.votesDay}
                    onChange={(event: SelectChangeEvent<string>): void => {
                      handleVotesDayChange(event.target.value);
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
                  <CheckIcon fontSize="small" onClick={handleEditVotesToggle} />
                </div>
                :
                <div>{deadlineOps.votesDay} {String(deadlineOps.votesTime.getHours()).padStart(2, '0')}:{String(deadlineOps.votesTime.getMinutes()).padStart(2, '0')} {isAdmin && <EditIcon fontSize="small" onClick={handleEditVotesToggle} />}
                </div>
              }
            </TimelineContent>
          </TimelineItem>
        }
      </Timeline>
    </div>
  )
}