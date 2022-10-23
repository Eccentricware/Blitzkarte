import { FormGroup, FormControlLabel, Switch, Select, SelectChangeEvent, MenuItem, TextField, Slider, Menu } from '@mui/material';
import { Settings } from 'http2';
import { FC } from 'react';
import { TimeZoneSelector } from '../TimeZoneSelector';

interface NewGameSettingsProps {
  settings: any;
}

export const NewGameSettings: FC<NewGameSettingsProps> = ({settings}: NewGameSettingsProps) => {
  const timeZoneOps = {
    getTimeZone: settings.timeZone,
    setTimeZone: settings.setTimeZone
  };

  const handleObserveDstChange = () => {
    settings.setObserveDst(!settings.observeDst);
  }

  const handleNominationTimingChange = (timing: string) => {
    settings.setNominationTiming(timing);
  }

  const handleNominationYearChange = (turnNumber: string) => {
    settings.setNominationYear(Number(turnNumber));
  }

  const handleConcurrentGamesLimitChange = (gameLimit: string) => {
    settings.setConcurrentGamesLimit(Number(gameLimit));
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

  const handleStylizedStartYearChange = (nmrTolerance: string) => {
    settings.setStylizedStartYear(Number(nmrTolerance));
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

  const handlePartialRosterStartChange = () => {
    settings.setPartialRosterStart(!settings.partialRosterStart);
  }

  const handleFinalReadinessCheckChange = () => {
    settings.setFinalReadinessCheck(!settings.finalReadinessCheck);
  }

  return (
    <div>
      <TimeZoneSelector timeZoneOps={timeZoneOps}/>
      <div>
        <FormGroup>
          <FormControlLabel
            label="Observe Daylight Savings"
            labelPlacement="start"
            control={
              <Switch
                checked={settings.observeDst}
                onChange={handleObserveDstChange}
              />
            }
          />
        </FormGroup>
      </div>
      <div>
        <TextField type="number"
          label="Stylized Start Year"
          value={settings.stylizedStartYear}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
            handleStylizedStartYearChange(event.target.value);
          }}
        />
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
          <MenuItem value="all">Automatically When All Votes Are Claimed</MenuItem>
        </Select>
      {
        settings.nominationTiming === 'set' &&
        <TextField type="number"
          value={settings.nominationYear}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
            handleNominationYearChange(event.target.value);
          }}
        />
      }
      </div>
      <div>
        <TextField type="number"
          label="Concurrent Game Limit"
          value={settings.concurrentGamesLimit}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
            handleConcurrentGamesLimitChange(event.target.value);
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
      <FormGroup>
        <FormControlLabel
          label="Partial Roster Start"
          labelPlacement="start"
          control={
            <Switch
              checked={settings.partialRosterStart}
              onChange={handlePartialRosterStartChange}
            />
          }
        />
      </FormGroup>
      <FormGroup>
        <FormControlLabel
          label="Final Readiness Check"
          labelPlacement="start"
          control={
            <Switch
              checked={settings.finalReadinessCheck}
              onChange={handleFinalReadinessCheckChange}
            />
          }
        />
      </FormGroup>
    </div>
  )
}