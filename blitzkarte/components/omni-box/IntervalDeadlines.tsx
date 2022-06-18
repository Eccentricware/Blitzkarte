import { InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { FC } from 'react';

interface IntervalDeadlinesProps {
  deadlineOps: any
}

export const IntervalDeadlines: FC<IntervalDeadlinesProps> = ({deadlineOps}: IntervalDeadlinesProps) => {
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

  return (
    <div>
      <div>
        <InputLabel id="first-orders-interval-span-label">First Orders (After Game Start)</InputLabel>
        <TextField type="number"
          value={deadlineOps.firstOrdersTimeSpan}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
            handleFirstOrdersTimeSpanChange(event.target.value);
          }}
        />
        <Select id="first-orders-interval-type"
          value={deadlineOps.firstOrdersTimeType}
          onChange={(event: SelectChangeEvent<string>) => {
            handleFirstOrdersTimeTypeChange(event.target.value);
          }}
        >
          <MenuItem value="minutes">
            Minute{deadlineOps.firstOrdersTimeSpan !== 1 && 's'}
          </MenuItem>
          <MenuItem value="hours">
            Hour{deadlineOps.firstOrdersTimeSpan !== 1 && 's'}
          </MenuItem>
          <MenuItem value="days">
            Day{deadlineOps.firstOrdersTimeSpan !== 1 && 's'}
          </MenuItem>
          <MenuItem value="weeks">
            Week{deadlineOps.firstOrdersTimeSpan !== 1 && 's'}
          </MenuItem>
        </Select>
      </div>
      <div>
        <InputLabel id="standard-orders-interval-span-label">Standard Orders (After Adjustments)</InputLabel>
        <TextField type="number"
          value={deadlineOps.ordersTimeSpan}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
            handleOrdersTimeSpanChange(event.target.value);
          }}
        />
        <Select id="standard-orders-interval-type"
          value={deadlineOps.ordersTimeType}
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
      </div>
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
      </div>
      <div>
        <InputLabel id="adjustments-interval-span-label">Adjustments (After Orders)</InputLabel>
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
      </div>
      <div>
        <InputLabel id="nominations-interval-span-label">Nominations (After Adjustments)</InputLabel>
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
      </div>
      <div>
        <InputLabel id="votes-interval-span-label">Votes (After Adjustments)</InputLabel>
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
      </div>
    </div>
  )
}