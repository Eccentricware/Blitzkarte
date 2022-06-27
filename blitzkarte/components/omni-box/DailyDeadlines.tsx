import { FC, useState } from "react";
import { InputLabel, Select, SelectChangeEvent, MenuItem, TextField, FormGroup, FormControlLabel, Switch } from "@mui/material";
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
  deadlineOps: any;
}

export const DailyDeadlines: FC<DeadlinesProps> = ({deadlineOps}: DeadlinesProps) => {
  const [editingStart, setEditingStart] = useState(false);
  const [editingOrders, setEditingOrders] = useState(false);
  const [editingRetreats, setEditingRetreats] = useState(false);
  const [editingAdjustments, setEditingAdjustments] = useState(false);
  const [editingNominations, setEditingNominations] = useState(false);
  const [editingVotes, setEditingVotes] = useState(false);

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

  const handleNominateDuringAdjustmentsChange = () => {
    deadlineOps.setNominateDuringAdjustments(!deadlineOps.nominateDuringAdjustments);
  }

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
                <div>{String(deadlineOps.ordersTime.getHours()).padStart(2, '0')}:{String(deadlineOps.ordersTime.getMinutes()).padStart(2, '0')}  <EditIcon fontSize="small" onClick={handleEditOrdersToggle} />
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
                <div>{String(deadlineOps.retreatsTime.getHours()).padStart(2, '0')}:{String(deadlineOps.retreatsTime.getMinutes()).padStart(2, '0')}  <EditIcon fontSize="small" onClick={handleEditRetreatsToggle} />
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
                  } />
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
                <div>{String(deadlineOps.adjustmentsTime.getHours()).padStart(2, '0')}:{String(deadlineOps.adjustmentsTime.getMinutes()).padStart(2, '0')}  <EditIcon fontSize="small" onClick={handleEditAdjustmentsToggle} />
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
                  <div>{String(deadlineOps.nominationsTime.getHours()).padStart(2, '0')}:{String(deadlineOps.nominationsTime.getMinutes()).padStart(2, '0')}  <EditIcon fontSize="small" onClick={handleEditNominationsToggle} />
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
                  <div>{String(deadlineOps.votesTime.getHours()).padStart(2, '0')}:{String(deadlineOps.votesTime.getMinutes()).padStart(2, '0')}  <EditIcon fontSize="small" onClick={handleEditVotesToggle} />
                  </div>
              }
            </TimelineContent>
          </TimelineItem>
        }
      </Timeline>
    </div>
  )
}