import { FormGroup, FormControlLabel, Switch, Select, SelectChangeEvent, MenuItem, TextField, Slider, Menu } from '@mui/material';
import { Settings } from 'http2';
import { FC } from 'react';

interface NewGameSettingsProps {
  settings: any;
}

export const NewGameSettings: FC<NewGameSettingsProps> = ({settings}: NewGameSettingsProps) => {
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

  const handleBaseVoteChange = (baseRequired: string) => {
    let newBase = Number(baseRequired);
    if (newBase > settings.totalVotes) {
      newBase = settings.totalVotes;
    }

    if (newBase < 0) {
      newBase = 0;
    }

    settings.setBaseRequired(newBase);
  }

  const handlePenaltyChange = (rank: string, penalty: string) => {
    let newPenalty = Number(penalty);
    if (newPenalty < 0) {
      newPenalty = 0;
    }

    switch(rank) {
      case 'a':
        settings.setPenaltyA(newPenalty);
        break;
      case 'b':
        settings.setPenaltyB(newPenalty);
        break;
      case 'c':
        settings.setPenaltyC(newPenalty);
        break;
      case 'd':
        settings.setPenaltyD(newPenalty);
        break;
      case 'e':
        settings.setPenaltyE(newPenalty);
        break;
      case 'f':
        settings.setPenaltyF(newPenalty);
        break;
      case 'g':
        settings.setPenaltyG(newPenalty);
        break;
    }
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

  const settingRowStyle = {
    margin: 10
  }

  return (
    <div>
      {/* <div>
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
      </div> */}
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
        <TextField type="number"
          label={`Base Required Votes. ${settings.totalVotes} Votes Total`}
          value={settings.baseRequired}
          style={settingRowStyle}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
            handleBaseVoteChange(event.target.value);
          }}
          error={settings.baseRequired > settings.totalVotes + settings.maxPenalty}
          helperText={
            settings.baseRequired > settings.totalVotes + settings.maxPenalty
            ? `Some coalitions need more than all votes to win.`
            : ''}
        />
        {
          settings.penaltyA >= 0 &&
          <TextField type="number"
          label={`Rank A Penalty`}
          value={settings.penaltyA}
          style={settingRowStyle}
          error={
            settings.penaltyA <= settings.penaltyB
            || settings.penaltyA <= settings.penaltyC
            || settings.penaltyA <= settings.penaltyD
            || settings.penaltyA <= settings.penaltyE
            || settings.penaltyA <= settings.penaltyF
            || settings.penaltyA <= settings.penaltyG
          }
          helperText={
            settings.penaltyA <= settings.penaltyB
            || settings.penaltyA <= settings.penaltyC
            || settings.penaltyA <= settings.penaltyD
            || settings.penaltyA <= settings.penaltyE
            || settings.penaltyA <= settings.penaltyF
            || settings.penaltyA <= settings.penaltyG
            ? `Warning: Penalties out of order`
            : ''
          }
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
            handlePenaltyChange('a', event.target.value);
          }}
        />}
        {
          settings.penaltyB >= 0 &&
          <TextField type="number"
            label={`Rank B Penalty`}
            value={settings.penaltyB}
            style={settingRowStyle}
            error={
              settings.penaltyB >= settings.penaltyA
              || settings.penaltyB <= settings.penaltyC
              || settings.penaltyB <= settings.penaltyD
              || settings.penaltyB <= settings.penaltyE
              || settings.penaltyB <= settings.penaltyF
              || settings.penaltyB <= settings.penaltyG
            }
            helperText={
              settings.penaltyB >= settings.penaltyA
              || settings.penaltyB <= settings.penaltyC
              || settings.penaltyB <= settings.penaltyD
              || settings.penaltyB <= settings.penaltyE
              || settings.penaltyB <= settings.penaltyF
              || settings.penaltyB <= settings.penaltyG
              ? `Warning: Penalties out of order`
              : ''
            }
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
              handlePenaltyChange('b', event.target.value);
            }}
          />
        }
        {
          settings.penaltyC >= 0 &&
          <TextField type="number"
            label={`Rank C Penalty`}
            value={settings.penaltyC}
            style={settingRowStyle}
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
              handlePenaltyChange('c', event.target.value);
            }}
            error={
              settings.penaltyC >= settings.penaltyA
              || settings.penaltyC >= settings.penaltyB
              || settings.penaltyC <= settings.penaltyD
              || settings.penaltyC <= settings.penaltyE
              || settings.penaltyC <= settings.penaltyF
              || settings.penaltyC <= settings.penaltyG
            }
            helperText={
              settings.penaltyC >= settings.penaltyA
              || settings.penaltyC >= settings.penaltyB
              || settings.penaltyC <= settings.penaltyD
              || settings.penaltyC <= settings.penaltyE
              || settings.penaltyC <= settings.penaltyF
              || settings.penaltyC <= settings.penaltyG
              ? `Warning: Penalties out of order`
              : ''
            }
          />
        }
        {
          settings.penaltyD >= 0 &&
          <TextField type="number"
            label={`Rank D Penalty`}
            value={settings.penaltyD}
            style={settingRowStyle}
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
              handlePenaltyChange('d', event.target.value);
            }}
            error={
              settings.penaltyD >= settings.penaltyA
              || settings.penaltyD >= settings.penaltyB
              || settings.penaltyD >= settings.penaltyC
              || settings.penaltyD <= settings.penaltyE
              || settings.penaltyD <= settings.penaltyF
              || settings.penaltyD <= settings.penaltyG
            }
            helperText={
              settings.penaltyD >= settings.penaltyA
              || settings.penaltyD >= settings.penaltyB
              || settings.penaltyD >= settings.penaltyC
              || settings.penaltyD <= settings.penaltyE
              || settings.penaltyD <= settings.penaltyF
              || settings.penaltyD <= settings.penaltyG
              ? `Warning: Penalties out of order`
              : ''
            }
          />
        }
        {
          settings.penaltyE >= 0 &&
          <TextField type="number"
            label={`Rank E Penalty`}
            value={settings.penaltyE}
            style={settingRowStyle}
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
              handlePenaltyChange('e', event.target.value);
            }}
            error={
              settings.penaltyE >= settings.penaltyA
              || settings.penaltyE >= settings.penaltyB
              || settings.penaltyE >= settings.penaltyC
              || settings.penaltyE >= settings.penaltyD
              || settings.penaltyE <= settings.penaltyF
              || settings.penaltyE <= settings.penaltyG
            }
            helperText={
              settings.penaltyE >= settings.penaltyA
              || settings.penaltyE >= settings.penaltyB
              || settings.penaltyE >= settings.penaltyC
              || settings.penaltyE >= settings.penaltyD
              || settings.penaltyE <= settings.penaltyF
              || settings.penaltyE <= settings.penaltyG
              ? `Warning: Penalties out of order`
              : ''
            }
          />
        }
        {
          settings.penaltyF >= 0 &&
          <TextField type="number"
            label={`Rank F Penalty`}
            value={settings.penaltyF}
            style={settingRowStyle}
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
              handlePenaltyChange('f', event.target.value);
            }}
            error={
              settings.penaltyF >= settings.penaltyA
              || settings.penaltyF >= settings.penaltyB
              || settings.penaltyF >= settings.penaltyC
              || settings.penaltyF >= settings.penaltyD
              || settings.penaltyF >= settings.penaltyE
              || settings.penaltyF <= settings.penaltyG
            }
            helperText={
              settings.penaltyF >= settings.penaltyA
              || settings.penaltyF >= settings.penaltyB
              || settings.penaltyF >= settings.penaltyC
              || settings.penaltyF >= settings.penaltyD
              || settings.penaltyF >= settings.penaltyE
              || settings.penaltyF <= settings.penaltyG
              ? `Warning: Penalties out of order`
              : ''
            }
          />
        }
        {
          settings.penaltyG >= 0 &&
          <TextField type="number"
            label={`Rank G Penalty`}
            value={settings.penaltyG}
            style={settingRowStyle}
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
              handlePenaltyChange('g', event.target.value);
            }}
            error={
              settings.penaltyG >= settings.penaltyA
              || settings.penaltyG >= settings.penaltyB
              || settings.penaltyG >= settings.penaltyC
              || settings.penaltyG >= settings.penaltyD
              || settings.penaltyG >= settings.penaltyE
              || settings.penaltyG >= settings.penaltyF
            }
            helperText={
              settings.penaltyG >= settings.penaltyA
              || settings.penaltyG >= settings.penaltyB
              || settings.penaltyG >= settings.penaltyC
              || settings.penaltyG >= settings.penaltyD
              || settings.penaltyG >= settings.penaltyE
              || settings.penaltyG >= settings.penaltyF
              ? `Warning: Penalties out of order`
              : ''
            }
          />
        }
      </div>
      <div>
        <Select id="nomination-timing"
          value={settings.nominationTiming}
          onChange={(event: SelectChangeEvent<string>) => {
            handleNominationTimingChange(event.target.value);
          }}
        >
          <MenuItem value="set">Certain Number of Years:</MenuItem>
          <MenuItem value="any" disabled>Automatically When ABB Can Win</MenuItem>
          <MenuItem value="all" disabled>Automatically When All Votes Are Claimed</MenuItem>
        </Select>
      {
        settings.nominationTiming === 'set' &&
        <TextField type="number"
          label="Nomination Start Winter Of Year"
          value={settings.nominationYear}
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
      } */}
      {/* <TextField type="number"
        label="NMR Tolerance"
        value={settings.nmrTolerance}
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
              onChange={handleVoteDeadlineExtensionChange}
            />
          }
        />
      </FormGroup> */}
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
      {/* <FormGroup>
        <FormControlLabel
          label="Final Readiness Check"
          labelPlacement="start"
          disabled
          control={
            <Switch
              checked={settings.finalReadinessCheck}
              onChange={handleFinalReadinessCheckChange}
            />
          }
        />
      </FormGroup> */}
    </div>
  )
}