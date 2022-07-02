import { FC, useState } from "react";
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

  // Edits on/off also triggers validation of ordering
  const handleEditOrdersToggle = () => {
    setEditingOrders(!editingOrders);
  }

  const handleEditRetreatsToggle = () => {
    setEditingRetreats(!editingRetreats);
  }

  const handleEditAdjustmentsToggle = () => {
    setEditingAdjustments(!editingAdjustments);
  }

  const handleEditNominationsToggle = () => {
    setEditingNominations(!editingNominations);
  }

  const handleEditVotesToggle = () => {
    setEditingVotes(!editingVotes);
  }

  // Individual Settings change
  const handleOrdersDayChange = (day: string) => {
   setCurrentOrdersDay(day);
  }

  const handleOrdersTimeChange = (time: Date | null) => {
   setCurrentOrdersTime(time);
  }

  const handleRetreatsDayChange = (day: string) => {
   setCurrentRetreatsDay(day);
  }

  const handleRetreatsTimeChange = (time: Date | null) => {
    setCurrentRetreatsTime(time);
  }

  const handleAdjustmentsDayChange = (day: string) => {
    setCurrentAdjustmentsDay(day);
  }

  const handleAdjustmentsTimeChange = (time: Date | null) => {
    setCurrentAdjustmentsTime(time);
  }

  const handleNominationsDayChange = (day: string) => {
    setCurrentNominationsDay(day);
  }

  const handleNominationsTimeChange = (time: Date | null) => {
    setCurrentNominationsTime(time);
  }

  const handleVotesDayChange = (day: string) => {
    setCurrentVotesDay(day);
  }

  const handleVotesTimeChange = (time: Date | null) => {
    setCurrentVotesTime(time);
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
              deadlineOps.voteDuringOrders
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
                  value={currentOrdersDay}
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
                  value={currentOrdersTime}
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
                <div>{deadlineOps.ordersDay.slice(0, 3)} {String(deadlineOps.ordersTime.getHours()).padStart(2, '0')}:{String(deadlineOps.ordersTime.getMinutes()).padStart(2, '0')}  <EditIcon fontSize="small" onClick={handleEditOrdersToggle} />
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
                    value={currentRetreatsDay}
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
                    value={currentRetreatsTime}
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
                <div>{deadlineOps.retreatsDay.slice(0, 3)} {String(deadlineOps.retreatsTime.getHours()).padStart(2, '0')}:{String(deadlineOps.retreatsTime.getMinutes()).padStart(2, '0')}  <EditIcon fontSize="small" onClick={handleEditRetreatsToggle} />
                </div>
            }
          </TimelineContent>
        </TimelineItem>


        <TimelineItem>
          <TimelineOppositeContent>
            {
              deadlineOps.nominateDuringAdjustments
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
                    value={currentAdjustmentsDay}
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
                    value={currentAdjustmentsTime}
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
                <div>{deadlineOps.adjustmentsDay.slice(0, 3)} {String(deadlineOps.adjustmentsTime.getHours()).padStart(2, '0')}:{String(deadlineOps.adjustmentsTime.getMinutes()).padStart(2, '0')}  <EditIcon fontSize="small" onClick={handleEditAdjustmentsToggle} />
                </div>
            }
          </TimelineContent>
        </TimelineItem>


        {
          !deadlineOps.nominateDuringAdjustments &&
          <TimelineItem>
            <TimelineOppositeContent>
              <div>
                <MergeTypeIcon fontSize="small"
                  onClick={handleNominateDuringAdjustmentsChange}
                />
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
                      value={currentNominationsDay}
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
                      value={currentNominationsTime}
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
                  <div>{deadlineOps.nominationsDay.slice(0, 3)} {String(deadlineOps.nominationsTime.getHours()).padStart(2, '0')}:{String(deadlineOps.nominationsTime.getMinutes()).padStart(2, '0')}  <EditIcon fontSize="small" onClick={handleEditNominationsToggle} />
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
                <MergeTypeIcon fontSize="small"
                  onClick={handleVoteDuringOrdersChange}
                />
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
                    value={currentVotesDay}
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
                    value={currentVotesTime}
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
                <div>{deadlineOps.votesDay.slice(0, 3)} {String(deadlineOps.votesTime.getHours()).padStart(2, '0')}:{String(deadlineOps.votesTime.getMinutes()).padStart(2, '0')}  <EditIcon fontSize="small" onClick={handleEditVotesToggle} />
                </div>
              }
            </TimelineContent>
          </TimelineItem>
        }
      </Timeline>
    </div>
  )
}