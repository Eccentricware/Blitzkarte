import { FormGroup, FormControlLabel, Switch, Select, SelectChangeEvent, MenuItem, TextField } from '@mui/material';
import { FC } from 'react';

interface NewGameSettingsProps {
  settings: any;
}

export const NewGameSettings: FC<NewGameSettingsProps> = ({settings}: NewGameSettingsProps) => {
  const handleTurnOneTimingChange = (rule: string) => {
    settings.setTurn1Timing(rule);
  }

  const handleNominationTimingChange = (timing: string) => {
    settings.setNominationTiming(timing);
  }

  const handleNominationTurnChange = (turnNumber: string) => {
    settings.setNominationTurn(Number(turnNumber));
  }

  const handleConcurrentGameLimitChange = (gameLimit: string) => {
    settings.setConcurrentGameLimit(Number(gameLimit));
  }

  const handleRatingLimitsChange = () => {
    settings.setRatingLimits(!settings.ratingLimits);
  }

  return (
    <div>
      <div>
        <Select id="first-turn-timing"
          value={settings.turn1Timing}
          onChange={(event: SelectChangeEvent<string>) => {
            handleTurnOneTimingChange(event.target.value)
          }}
        >
          <MenuItem value="immediate">Start Immediately, Partial Turn</MenuItem>
          <MenuItem value="standard">Delay Start, Precisely 1 Full Turn </MenuItem>
          <MenuItem value="remainder">Start Immediately, Full Turn With Remainder</MenuItem>
          <MenuItem value="double">Delay Start, Precisely 2 Full Turns</MenuItem>
          <MenuItem value="extended">Start Immedialy, 2 full turns and remainder</MenuItem>
          <MenuItem value="scheduled">Manually Set Start and First Deadline</MenuItem>
        </Select>
      </div>
      <div>
        <Select id="nomination-timing"
          value={settings.nominationTiming}
          onChange={(event: SelectChangeEvent<string>) => {
            handleNominationTimingChange(event.target.value);
          }}
          >
          <MenuItem value="set">Nominations Start Winter of Turn:</MenuItem>
          <MenuItem value="any">Automatically When ABB Can Win</MenuItem>
          <MenuItem value="all">Automatically When All Votes Are Owned</MenuItem>
        </Select>
      {
        settings.nominationTiming === 'set' &&
        <TextField type="number"
          value={settings.nominationTurn}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
            handleNominationTurnChange(event.target.value);
          }}
        />
      }
      </div>
      <div>
        <TextField type="number"
          label="Concurrent Game Limit"
          value={settings.concurrentGameLimit}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
            handleConcurrentGameLimitChange(event.target.value);
          }}
        />
      </div>
      <div>
        <FormGroup>
          <FormControlLabel
            label="Automatic Assignments"
            labelPlacement="start"
            control={
              <Switch
                checked={settings.automaticAssignments}
                disabled
              />
            }
          />
        </FormGroup>
      </div>
      <div>
        <FormGroup>
          <FormControlLabel
            label="Rating Limits"
            labelPlacement="start"
            control={
              <Switch
                checked={settings.ratingLimits}
                onChange={handleRatingLimitsChange}
              />
            }
          />
        </FormGroup>
      </div>
    </div>
  )
}