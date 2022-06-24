import { FormGroup, FormControlLabel, Switch, Select, SelectChangeEvent, MenuItem, TextField, Slider } from '@mui/material';
import { FC } from 'react';

interface NewGameSettingsProps {
  settings: any;
}

export const NewGameSettings: FC<NewGameSettingsProps> = ({settings}: NewGameSettingsProps) => {
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

  const handleFunRangeChange = (event: Event, updatedRange: number | number[]) => {
    settings.setFunRange(updatedRange as number[]);
  }

  const handleSkillRangeChange = (event: Event, updatedRange: number | number[]) => {
    settings.setSkillRange(updatedRange as number[]);
  }

  const handleNmrToleranceChange = (nmrTolerance: string) => {
    settings.setNmrTolerance(Number(nmrTolerance));
  }

  const handleBlindCreatorChange = () => {
    settings.setBlindCreator(!settings.blindCreator);
  }

  const handleUntfRuleChange = () => {
    settings.setUntfRule(!settings.untfRule);
  }

  const handleMadOrdersRuleChange = () => {
    settings.setMadOrdersRule(!settings.madOrdersRule)
  }

  const handleVoteDeadlineExtensionChange = () => {
    settings.setVoteDeadlineExtension(!settings.voteDeadlineExtension);
  }

  return (
    <div>
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
      {
        settings.ratingLimits &&
        <Slider id="fun-range-slider"
          value={settings.funRange}
          onChange={handleFunRangeChange}
          marks={[
            {value: 0, label: 0},
            {value: 50, label: 5},
            {value: 100, label: 10},
          ]}
        />
      }
      {
        settings.ratingLimits &&
        <Slider id="skill-range-slider"
          value={settings.skillRange}
          onChange={handleSkillRangeChange}
          marks={[
            {value: 0, label: 0},
            {value: 50, label: 5},
            {value: 100, label: 10},
          ]}
        />
      }
      <TextField type="number"
        label="NMR Tolerance"
        value={settings.nmrTolerance}
        onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
          handleNmrToleranceChange(event.target.value);
        }}
      />
      <FormGroup>
        <FormControlLabel
          label="Blind Creator"
          labelPlacement="start"
          control={
            <Switch
              checked={settings.blindCreator}
              onChange={handleBlindCreatorChange}
            />
          }
        />
      </FormGroup>
      <FormGroup>
        <FormControlLabel
          label="United Nations Task Force"
          labelPlacement="start"
          control={
            <Switch
              checked={settings.untfRule}
              disabled
              onChange={handleUntfRuleChange}
            />
          }
        />
      </FormGroup>
      <FormGroup>
        <FormControlLabel
          label="Mutually Assured Destruction"
          labelPlacement="start"
          control={
            <Switch
              checked={settings.madOrdersRule}
              disabled
              onChange={handleMadOrdersRuleChange}
            />
          }
        />
      </FormGroup>
      <FormGroup>
        <FormControlLabel
          label="Votable Deadline Extensions"
          labelPlacement="start"
          control={
            <Switch
              checked={settings.voteDeadlineExtension}
              disabled
              onChange={handleVoteDeadlineExtensionChange}
            />
          }
        />
      </FormGroup>
    </div>
  )
}