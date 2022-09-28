import { FC, useState } from 'react';
import { InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers';
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

interface IntervalDeadlinesProps {
  deadlineOps: any
}

export const IntervalDeadlines: FC<IntervalDeadlinesProps> = ({deadlineOps}: IntervalDeadlinesProps) => {
  const [editingOrders, setEditingOrders] = useState(false);
  const [editingRetreats, setEditingRetreats] = useState(false);
  const [editingAdjustments, setEditingAdjustments] = useState(false);
  const [editingNominations, setEditingNominations] = useState(false);
  const [editingVotes, setEditingVotes] = useState(false);
  const [displayAsAdmin, setDisplayAsAdmin] = useState(deadlineOps.displayAsAdmin === false ? deadlineOps.displayAsAdmin : true);

  const handleEditAdjustmentsToggle = () => {
    setEditingAdjustments(!editingAdjustments);
  }

  const handleEditNominationsToggle = () => {
    setEditingNominations(!editingNominations);
  }

  const handleEditVotesToggle = () => {
    setEditingVotes(!editingVotes);
  }

  // Time Lengths
  const handleFirstOrdersTimeSpanChange = (span: string) => {
    deadlineOps.setFirstOrdersTimeSpan(Number(span));
  }

  const handleOrdersTimeSpanChange = (span: string) => {
    deadlineOps.setOrdersTimeSpan(Number(span));
  }

  const handleRetreatsTimeSpanChange = (span: string) => {
    deadlineOps.setRetreatsTimeSpan(Number(span));
  }

  const handleAdjustmentsTimeSpanChange = (span: string) => {
    deadlineOps.setAdjustmentsTimeSpan(Number(span));
  }

  const handleNominationsTimeSpanChange = (span: string) => {
    deadlineOps.setNominationsTimeSpan(Number(span));
  }

  const handleVotesTimeSpanChange = (span: string) => {
    deadlineOps.setVotesTimeSpan(Number(span));
  }

  // Time Types
  const handleFirstOrdersTimeTypeChange = (type: string) => {
    deadlineOps.setFirstOrdersTimeType(type)
  }

  const handleOrdersTimeTypeChange = (type: string) => {
    deadlineOps.setOrdersTimeType(type)
  }

  const handleRetreatsTimeTypeChange = (type: string) => {
    deadlineOps.setRetreatsTimeType(type)
  }

  const handleAdjustmentsTimeTypeChange = (type: string) => {
    deadlineOps.setAdjustmentsTimeType(type)
  }

  const handleNominationsTimeTypeChange = (type: string) => {
    deadlineOps.setNominationsTimeType(type)
  }

  const handleVotesTimeTypeChange = (type: string) => {
    deadlineOps.setVotesTimeType(type)
  }

  const handleVoteDuringOrdersChange = () => {
    deadlineOps.setVoteDuringOrders(!deadlineOps.voteDuringOrders);
  }

  const handleEditOrdersToggle = () => {
    setEditingOrders(!editingOrders);
  }

  const handleEditRetreatsToggle = () => {
    setEditingRetreats(!editingRetreats);
  }

  const handleNominateDuringAdjustmentsChange = () => {
    deadlineOps.setNominateDuringAdjustments(!deadlineOps.nominateDuringAdjustments);
  }

  return (
    <div>
      <Timeline>
        <TimelineItem>
          <TimelineOppositeContent>
            {
              deadlineOps.voteDuringOrders && displayAsAdmin
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
                  <TextField type="number"
                    value={deadlineOps.ordersTimeSpan}
                    onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
                      handleOrdersTimeSpanChange(event.target.value);
                    }}
                  />
                  <Select id="first-orders-interval-type"
                    value={deadlineOps.firstOrdersTimeType}
                    onChange={(event: SelectChangeEvent<string>) => {
                      handleOrdersTimeTypeChange(event.target.value);
                    }}
                  >
                    <MenuItem value="minutes">
                      Minute{deadlineOps.ordersTimeSpan !== 1 && 's'}
                    </MenuItem>
                    <MenuItem value="hours">
                      Hour{deadlineOps.ordersTimeSpan !== 1 && 's'}
                    </MenuItem>
                    <MenuItem value="days">
                      Day{deadlineOps.ordersTimeSpan !== 1 && 's'}
                    </MenuItem>
                    <MenuItem value="weeks">
                      Week{deadlineOps.ordersTimeSpan !== 1 && 's'}
                    </MenuItem>
                  </Select>
                  <CheckIcon fontSize="small" onClick={handleEditOrdersToggle} />
                </div>
                :
                <div>{deadlineOps.ordersTimeSpan} {deadlineOps.ordersTimeType} After
                  <br/>Adjustments {displayAsAdmin &&<EditIcon fontSize="small" onClick={handleEditOrdersToggle} />}
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
                  <InputLabel id="retreat-time-span-label">Retreats (After Orders)</InputLabel>
                  <TextField type="number"
                    value={deadlineOps.retreatsTimeSpan}
                    onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
                      handleRetreatsTimeSpanChange(event.target.value);
                    }}
                  />
                  <Select id="first-orders-interval-type"
                    value={deadlineOps.retreatsTimeType}
                    onChange={(event: SelectChangeEvent<string>) => {
                      handleRetreatsTimeTypeChange(event.target.value);
                    }}
                  >
                    <MenuItem value="minutes">
                      Minute{deadlineOps.retreatsTimeSpan !== 1 && 's'}
                    </MenuItem>
                    <MenuItem value="hours">
                      Hour{deadlineOps.retreatsTimeSpan !== 1 && 's'}
                    </MenuItem>
                    <MenuItem value="days">
                      Day{deadlineOps.retreatsTimeSpan !== 1 && 's'}
                    </MenuItem>
                    <MenuItem value="weeks">
                      Week{deadlineOps.retreatsTimeSpan !== 1 && 's'}
                    </MenuItem>
                  </Select>
                  <CheckIcon fontSize="small" onClick={handleEditRetreatsToggle} />
                </div>
                :
                <div>{deadlineOps.retreatsTimeSpan} {deadlineOps.retreatsTimeType} After<br/>
                  Orders {displayAsAdmin && <EditIcon fontSize="small" onClick={handleEditRetreatsToggle} />}
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
                  <TextField type="number"
                    value={deadlineOps.adjustmentsTimeSpan}
                    onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
                      handleAdjustmentsTimeSpanChange(event.target.value);
                    }}
                  />
                  <Select id="first-orders-interval-type"
                    value={deadlineOps.adjustmentsTimeType}
                    onChange={(event: SelectChangeEvent<string>) => {
                      handleAdjustmentsTimeTypeChange(event.target.value);
                    }}
                  >
                    <MenuItem value="minutes">
                      Minute{deadlineOps.adjustmentsTimeSpan !== 1 && 's'}
                    </MenuItem>
                    <MenuItem value="hours">
                      Hour{deadlineOps.adjustmentsTimeSpan !== 1 && 's'}
                    </MenuItem>
                    <MenuItem value="days">
                      Day{deadlineOps.adjustmentsTimeSpan !== 1 && 's'}
                    </MenuItem>
                    <MenuItem value="weeks">
                      Week{deadlineOps.adjustmentsTimeSpan !== 1 && 's'}
                    </MenuItem>
                  </Select>
                  <CheckIcon fontSize="small" onClick={handleEditAdjustmentsToggle} />
                </div>
                :
                <div>{deadlineOps.adjustmentsTimeSpan} {deadlineOps.adjustmentsTimeType} After<br/>
                 Orders {displayAsAdmin && <EditIcon fontSize="small" onClick={handleEditAdjustmentsToggle} />}
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
                      <TextField type="number"
                        value={deadlineOps.nominationsTimeSpan}
                        onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
                          handleNominationsTimeSpanChange(event.target.value);
                        }}
                      />
                      <Select id="nominations-interval-type"
                        value={deadlineOps.nominationsTimeType}
                        onChange={(event: SelectChangeEvent<string>) => {
                          handleNominationsTimeTypeChange(event.target.value);
                        }}
                      >
                        <MenuItem value="minutes">
                          Minute{deadlineOps.nominationsTimeSpan !== 1 && 's'}
                        </MenuItem>
                        <MenuItem value="hours">
                          Hour{deadlineOps.nominationsTimeSpan !== 1 && 's'}
                        </MenuItem>
                        <MenuItem value="days">
                          Day{deadlineOps.nominationsTimeSpan !== 1 && 's'}
                        </MenuItem>
                        <MenuItem value="weeks">
                          Week{deadlineOps.nominationsTimeSpan !== 1 && 's'}
                        </MenuItem>
                      </Select>
                      <CheckIcon fontSize="small" onClick={handleEditNominationsToggle} />
                    </div>
                  :
                    <div>{deadlineOps.nominationsTimeSpan} {deadlineOps.nominationsTimeType} After<br/>
                      Adjustments {displayAsAdmin && <EditIcon fontSize="small" onClick={handleEditNominationsToggle} />}
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
                      <TextField type="number"
                        value={deadlineOps.votesTimeSpan}
                        onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
                          handleVotesTimeSpanChange(event.target.value);
                        }}
                      />
                      <Select id="votes-interval-type"
                        value={deadlineOps.votesTimeType}
                        onChange={(event: SelectChangeEvent<string>) => {
                          handleVotesTimeTypeChange(event.target.value);
                        }}
                      >
                        <MenuItem value="minutes">
                          Minute{deadlineOps.votesTimeSpan !== 1 && 's'}
                        </MenuItem>
                        <MenuItem value="hours">
                          Hour{deadlineOps.votesTimeSpan !== 1 && 's'}
                        </MenuItem>
                        <MenuItem value="days">
                          Day{deadlineOps.votesTimeSpan !== 1 && 's'}
                        </MenuItem>
                        <MenuItem value="weeks">
                          Week{deadlineOps.votesTimeSpan !== 1 && 's'}
                        </MenuItem>
                      </Select>
                      <CheckIcon fontSize="small" onClick={handleEditVotesToggle} />
                    </div>
                  :
                  <div>{deadlineOps.votesTimeSpan} {deadlineOps.votesTimeType} After<br/>
                    Nominations {displayAsAdmin && <EditIcon fontSize="small" onClick={handleEditVotesToggle} />}
                  </div>
              }
            </TimelineContent>
          </TimelineItem>
        }
      </Timeline>
    </div>
  )
}