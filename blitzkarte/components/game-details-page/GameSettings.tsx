import { FormGroup, FormControlLabel, Switch, Select, SelectChangeEvent, MenuItem, TextField, Slider, Menu } from '@mui/material';
import { FC } from 'react';
import { GameStatus } from '../../models/enumeration/game-status-enum';

interface GameSettingsProps {
  settings: any;
}

export const GameSettings: FC<GameSettingsProps> = ({settings}: GameSettingsProps) => {

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
      {/* <div>
        <FormGroup>
          <FormControlLabel
            label="Observe Daylight Savings"
            labelPlacement="start"
            disabled={!settings.isAdmin || settings.gameStatus !== GameStatus.REGISTRATION}
            control={
              <Switch
                checked={settings.observeDst}
                onChange={handleObserveDstChange}
              />
            }
          />
        </FormGroup>
      </div> */}
      <div>
        <TextField type="number"
          label="Stylized Start Year"
          value={settings.stylizedStartYear}
          disabled={!settings.isAdmin || settings.gameStatus !== GameStatus.REGISTRATION}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
            handleStylizedStartYearChange(event.target.value);
          }}
        />
      </div>
      <div>
        <Select id="nomination-timing"
          value={settings.nominationTiming}
          disabled={!settings.isAdmin || settings.gameStatus !== GameStatus.REGISTRATION}
          onChange={(event: SelectChangeEvent<string>) => {
            handleNominationTimingChange(event.target.value);
          }}
        >
          <MenuItem value="set">Nominations Start Winter of Year:</MenuItem>
          <MenuItem value="any">Automatically When ABB Can Win</MenuItem>
          <MenuItem value="all">Automatically When All Votes Are Claimed</MenuItem>
        </Select>
      {
        settings.nominationTiming === 'set' &&
        <TextField type="number"
          value={settings.nominationYear}
          disabled={!settings.isAdmin || settings.gameStatus !== GameStatus.REGISTRATION}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
            handleNominationYearChange(event.target.value);
          }}
        />
      }
      </div>
      {/* <div>
        <TextField type="number"
          label="Concurrent Game Limit"
          value={settings.concurrentGamesLimit}
          disabled={!settings.isAdmin}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
            handleConcurrentGamesLimitChange(event.target.value);
          }}
        />
      </div> */}
      {/* <div>
        <FormGroup>
          <FormControlLabel
            label="Automatic Assignments"
            labelPlacement="start"
            control={
              <Switch
                checked={settings.automaticAssignments}
                disabled
                // disabled={!settings.isAdmin || settings.gameStatus !== GameStatus.REGISTRATION}
              />
            }
          />
        </FormGroup>
      </div> */}
      {/* <div>
        <FormGroup>
          <FormControlLabel
            label="Rating Limits"
            labelPlacement="start"
            control={
              <Switch
                checked={settings.ratingLimits}
                onChange={handleRatingLimitsChange}
                disabled={!settings.isAdmin || settings.gameStatus !== GameStatus.REGISTRATION}
              />
            }
          />
        </FormGroup>
      </div>
      {
        settings.ratingLimits &&
        <Slider id="fun-range-slider"
          value={settings.funRange}
          disabled={!settings.isAdmin || settings.gameStatus !== GameStatus.REGISTRATION}
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
          disabled={!settings.isAdmin || settings.gameStatus !== GameStatus.REGISTRATION}
          onChange={handleSkillRangeChange}
          marks={[
            {value: 0, label: 0},
            {value: 50, label: 5},
            {value: 100, label: 10},
          ]}
        />
      } */}
      {/* <TextField type="number"
        label="NMR Tolerance"
        value={settings.nmrTolerance}
        disabled={!settings.isAdmin || settings.gameStatus !== GameStatus.REGISTRATION}
        onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
          handleNmrToleranceChange(event.target.value);
        }}
      /> */}
      {/* <FormGroup>
        <FormControlLabel
          label="Blind Creator"
          labelPlacement="start"
          control={
            <Switch
              checked={settings.blindCreator}
              // disabled={!settings.isAdmin || settings.gameStatus !== GameStatus.REGISTRATION}
              disabled={true}
              onChange={handleBlindCreatorChange}
            />
          }
        />
      </FormGroup> */}
      {/* <FormGroup>
        <FormControlLabel
          label="United Nations Task Force"
          labelPlacement="start"
          control={
            <Switch
              checked={settings.untfRule}
              disabled
              // disabled={!settings.isAdmin || settings.gameStatus !== GameStatus.REGISTRATION}
              onChange={handleUntfRuleChange}
            />
          }
        />
      </FormGroup> */}
      {/* <FormGroup>
        <FormControlLabel
          label="Mutually Assured Destruction"
          labelPlacement="start"
          control={
            <Switch
              checked={settings.madOrdersRule}
              disabled
              // disabled={!settings.isAdmin || settings.gameStatus !== GameStatus.REGISTRATION}
              onChange={handleMadOrdersRuleChange}
            />
          }
        />
      </FormGroup> */}
      {/* <FormGroup>
        <FormControlLabel
          label="Votable Deadline Extensions"
          labelPlacement="start"
          control={
            <Switch
              checked={settings.voteDeadlineExtension}
              disabled
              // disabled={!settings.isAdmin || settings.gameStatus !== GameStatus.REGISTRATION}
              onChange={handleVoteDeadlineExtensionChange}
            />
          }
        />
      </FormGroup> */}
      <FormGroup>
        <FormControlLabel
          label="Partial Roster Start"
          labelPlacement="start"
          disabled
          control={
            <Switch
              checked={settings.partialRosterStart}
              disabled={!settings.isAdmin || settings.gameStatus !== GameStatus.REGISTRATION}
              onChange={handlePartialRosterStartChange}
            />
          }
        />
      </FormGroup>
      {/* <FormGroup>
        <FormControlLabel
          label="Final Readiness Check"
          labelPlacement="start"
          disabled
          control={
            <Switch
              checked={settings.finalReadinessCheck}
              disabled={!settings.isAdmin || settings.gameStatus !== GameStatus.REGISTRATION}
              onChange={handleFinalReadinessCheckChange}
            />
          }
        />
      </FormGroup> */}
    </div>
  )
}