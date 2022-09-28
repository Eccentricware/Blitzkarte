import { FormGroup, FormControlLabel, Switch, Select, SelectChangeEvent, MenuItem, TextField, Slider, Menu } from '@mui/material';
import { FC } from 'react';

interface GameSettingsProps {
  settings: any;
}

export const GameSettings: FC<GameSettingsProps> = ({settings}: GameSettingsProps) => {
  const handleTimeZoneChange = (timeZone: string) => {
    settings.setTimeZone(timeZone);
  }

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
      <div>
        Time Zone:
        <Select id="time-zone-select"
          value={settings.timeZone}
          label="Time Zone"
          disabled={!settings.display_as_admin}
          onChange={(event: SelectChangeEvent<string>) => {
            handleTimeZoneChange(event.target.value);
          }}
        >
          <MenuItem value={12}>Auckland (+12)</MenuItem>
          <MenuItem value={11}>Norfolk (+11)</MenuItem>
          <MenuItem value={10}>Brisbane/Guam (+10)</MenuItem>
          <MenuItem value={9}>Pyongyang/Seoul (+9)</MenuItem>
          <MenuItem value={8}>Beijing/Perth/Taipei (+8)</MenuItem>
          <MenuItem value={7}>Bangkok/Hanoi (+7)</MenuItem>
          <MenuItem value={6}>Dhaka (+6)</MenuItem>
          <MenuItem value={5}>Islamabad/Karachi (+5)</MenuItem>
          <MenuItem value={4}>Volgograd (+4)</MenuItem>
          <MenuItem value={3}>Moscow/Nairobi/Istanbul (+3)</MenuItem>
          <MenuItem value={2}>Cairo/Tel Aviv (+2)</MenuItem>
          <MenuItem value={1}>Casablanca/Serajevo (+1)</MenuItem>
          <MenuItem value={0}>London (0)</MenuItem>
          <MenuItem value={-1}>Azores (-1)</MenuItem>
          <MenuItem value={-2}>NOTHING?! (-2)</MenuItem>
          <MenuItem value={-3}>Buenos Aires/Greenland (-3)</MenuItem>
          <MenuItem value={-4}>Caracas (-4)</MenuItem>
          <MenuItem value={-5}>Havana/DC (-5)</MenuItem>
          <MenuItem value={-6}>Mexico City (-6)</MenuItem>
          <MenuItem value={-7}>Denver (-7)</MenuItem>
          <MenuItem value={-8}>Los Angeles (-8)</MenuItem>
          <MenuItem value={-9}>Alaska (-9)</MenuItem>
          <MenuItem value={-10}>Hawaii (-10)</MenuItem>
          <MenuItem value={-11}>Nothing?! (-11)</MenuItem>
        </Select>
      </div>
      <div>
        <FormGroup>
          <FormControlLabel
            label="Observe Daylight Savings"
            labelPlacement="start"
            disabled
            // disabled={!settings.display_as_admin || settings.game_status !== 'registration'}
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
          disabled={!settings.display_as_admin || settings.game_status !== 'registration'}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
            handleStylizedStartYearChange(event.target.value);
          }}
        />
      </div>
      <div>
        <Select id="nomination-timing"
          value={settings.nominationTiming}
          disabled={!settings.display_as_admin || settings.game_status !== 'registration'}
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
          disabled={!settings.display_as_admin || settings.game_status !== 'registration'}
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
          disabled={!settings.display_as_admin}
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
                // disabled={!settings.display_as_admin || settings.game_status !== 'registration'}
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
                disabled={!settings.display_as_admin || settings.game_status !== 'registration'}
              />
            }
          />
        </FormGroup>
      </div>
      {
        settings.ratingLimits &&
        <Slider id="fun-range-slider"
          value={settings.funRange}
          disabled={!settings.display_as_admin || settings.game_status !== 'registration'}
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
          disabled={!settings.display_as_admin || settings.game_status !== 'registration'}
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
        disabled={!settings.display_as_admin || settings.game_status !== 'registration'}
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
              disabled={!settings.display_as_admin || settings.game_status !== 'registration'}
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
              // disabled={!settings.display_as_admin || settings.game_status !== 'registration'}
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
              // disabled={!settings.display_as_admin || settings.game_status !== 'registration'}
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
              // disabled={!settings.display_as_admin || settings.game_status !== 'registration'}
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
              disabled={!settings.display_as_admin || settings.game_status !== 'registration'}
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
              disabled={!settings.display_as_admin || settings.game_status !== 'registration'}
              onChange={handleFinalReadinessCheckChange}
            />
          }
        />
      </FormGroup>
    </div>
  )
}