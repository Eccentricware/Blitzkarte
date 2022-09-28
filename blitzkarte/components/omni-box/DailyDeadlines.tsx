import { FC, useState } from "react";
import { TextField } from "@mui/material";
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
  const [editingOrders, setEditingOrders] = useState(false);
  const [currentOrdersTime, setCurrentOrdersTime] = useState(deadlineOps.ordersTime);
  const [editingRetreats, setEditingRetreats] = useState(false);
  const [currentRetreatsTime, setCurrentRetreatsTime] = useState(deadlineOps.retreatsTime);
  const [editingAdjustments, setEditingAdjustments] = useState(false);
  const [currentAdjustmentsTime, setCurrentAdjustmentsTime] = useState(deadlineOps.adjustmentsTime);
  const [editingNominations, setEditingNominations] = useState(false);
  const [currentNominationsTime, setCurrentNominationsTime] = useState(deadlineOps.nominationsTime);
  const [editingVotes, setEditingVotes] = useState(false);
  const [currentVotesTime, setCurrentVotesTime] = useState(deadlineOps.votesTime);
  const [displayAsAdmin, setDisplayAsAdmin] = useState(deadlineOps.displayAsAdmin === false ? deadlineOps.displayAsAdmin : true);

  // Edits on/off triggers validation of ordering
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

  // Individual deadlines change
  const handleOrdersTimeChange = (time: Date | null) => {
    setCurrentOrdersTime(time);
  }

  const handleRetreatsTimeChange = (time: Date | null) => {
    setCurrentRetreatsTime(time);
  }

  const handleAdjustmentsTimeChange = (time: Date | null) => {
    setCurrentAdjustmentsTime(time);
  }

  const handleNominationsTimeChange = (time: Date | null) => {
    setCurrentNominationsTime(time);
  }

  const handleVotesTimeChange = (time: Date | null) => {
    setCurrentVotesTime(time);
  }

  // Deadline groupings
  const handleNominationsDuringAdjustmentsChange = () => {
    deadlineOps.setNominateDuringAdjustments(!deadlineOps.nominateDuringAdjustments);
  }

  const handleVotesDuringOrdersChange = () => {
    deadlineOps.setVoteDuringOrders(!deadlineOps.voteDuringOrders);
  }

  return (
    <div>
      <Timeline>
        <TimelineItem>
          <TimelineOppositeContent>
            {
              deadlineOps.voteDuringOrders && displayAsAdmin
                ? <div>
                  <CallSplitIcon fontSize="small" onClick={handleVotesDuringOrdersChange} />
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
                <div>{String(deadlineOps.ordersTime.getHours())}:{String(deadlineOps.ordersTime.getMinutes()).padStart(2, '0')} {displayAsAdmin && <EditIcon fontSize="small" onClick={handleEditOrdersToggle} />}
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
                <div>{String(deadlineOps.retreatsTime.getHours())}:{String(deadlineOps.retreatsTime.getMinutes()).padStart(2, '0')} {displayAsAdmin && <EditIcon fontSize="small" onClick={handleEditRetreatsToggle} />}
                </div>
            }
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineOppositeContent>
            {
              deadlineOps.nominateDuringAdjustments && displayAsAdmin
                ? <div>
                  <CallSplitIcon fontSize="small" onClick={
                    handleNominationsDuringAdjustmentsChange
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
                <div>{String(deadlineOps.adjustmentsTime.getHours())}:{String(deadlineOps.adjustmentsTime.getMinutes()).padStart(2, '0')} {displayAsAdmin && <EditIcon fontSize="small" onClick={handleEditAdjustmentsToggle} />}
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
                  displayAsAdmin &&
                  <MergeTypeIcon fontSize="small"
                    onClick={handleNominationsDuringAdjustmentsChange}
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
                  <div>{String(deadlineOps.nominationsTime.getHours())}:{String(deadlineOps.nominationsTime.getMinutes()).padStart(2, '0')} {displayAsAdmin && <EditIcon fontSize="small" onClick={handleEditNominationsToggle} />}
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
                  displayAsAdmin &&
                  <MergeTypeIcon fontSize="small"
                    onClick={handleVotesDuringOrdersChange}
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
                  <div>{String(deadlineOps.votesTime.getHours())}:{String(deadlineOps.votesTime.getMinutes()).padStart(2, '0')} {displayAsAdmin && <EditIcon fontSize="small" onClick={handleEditVotesToggle} />}
                  </div>
              }
            </TimelineContent>
          </TimelineItem>
        }
      </Timeline>
    </div>
  )
}