import { Button, Grid } from "@mui/material";
import { User } from "firebase/auth";
import { FC, useContext, useEffect } from "react";
import { useQuery } from "react-query";
import { AssignmentStatus } from "../../models/enumeration/assignment-status-enum";
import { AssignmentRequestService } from "../../services/request-services/assignment-request-service";
import { GameRequestService } from "../../services/request-services/game-request-service";
import Blitzkontext from "../../utils/Blitzkontext";
import { AssignmentsList } from "./AssignmentsList";

interface AssignmentsAdmProps {
  assignmentData: any;
  refetch: any;
}

export const AssignmentsAdm: FC<AssignmentsAdmProps> = ({assignmentData, refetch}: AssignmentsAdmProps) => {
  const assignmentRequestService = new AssignmentRequestService();
  const gameRequestService = new GameRequestService();

  const gameCtx = useContext(Blitzkontext).currentGame;
  const data = assignmentData;
  const gameId = gameCtx.id ? gameCtx.id : 7;

  const allAssigned = assignmentData.allAssigned;
  const partialRosterStart = assignmentData.partialRosterStart;
  const finalReadinessCheck = assignmentData.finalReadinessCheck;

  let nextStepDescription = 'Oh yeah. It\'s all coming together.';

  let startButtonDisabled = false;
  let startButtonColor: 'success' | 'error' = 'success';
  let startButtonLabel = 'Start Game';

  if (allAssigned && finalReadinessCheck) {
    nextStepDescription = 'Clicking "Confirm and Start Game" will finalize these assignments and send a final confirmation request to all players. '
      + 'Once they\'ve accepted, game start and first turn deadlines will be locked and live. To skip this step, disable "Final Readiness Check"';
    startButtonLabel = 'Confirm and Start Game';

  } else if (allAssigned && !finalReadinessCheck) {
    nextStepDescription = 'Clicking start game will IMMEDIATELY finalize all assignments and the game start and first turn deadline times will be locked and live. '
      + 'If you\'re interested in getting final confirmation players are ready, enable "Final Readiness Check"';

  } else if (!allAssigned && partialRosterStart && finalReadinessCheck) {
    nextStepDescription = 'There are nations without payers assigned. '
      + 'Clicking "Confirm and Start Game" will finalize these assignments anyways and send a final confirmation request to all players. '
      + 'Once they\'ve accepted, Game Start and First Turn deadlines will be set to go live. To skip this step, disable "Final Readiness Check"'
    startButtonLabel = 'Confirm and Start Game';
    startButtonColor = 'error';

  } else if (!allAssigned && partialRosterStart && !finalReadinessCheck) {
    nextStepDescription = 'There are nations without players assigned. '
      + 'Clicking "Start Game" will immediately set the Game Start and First Turn dealines to be live. '
      + 'If you\'re interested in getting final confirmation players are ready, enable "Final Readiness Check"';
    startButtonColor = 'error';

  } else if (!allAssigned && !partialRosterStart && finalReadinessCheck) {
    nextStepDescription = 'There are nations without players assigned and Partial Roster Start is disabled. You can not begin final confirmations. '
      + 'You are encouraged to fill the roster. You are discouraged from enabling Partial Roster Start, but one does what one must.';
    startButtonLabel = 'Confirm and Start Game';
    startButtonDisabled = true;

  } else if (!allAssigned && !partialRosterStart && !finalReadinessCheck) {
    nextStepDescription = 'There are nations without players assigned and Partial Roster Start is disabled. You can not start the game. '
      + 'You are encouraged to fill the roster. You are discouraged from enabling Partial Roster Start, but one does what one must.';
    startButtonDisabled = true;
  }

  const nonLockedPlayers = assignmentData.registrants.filter((registrant: any) =>
    [
      AssignmentStatus.REGISTERED,
      AssignmentStatus.ASSIGNED
    ].includes(registrant.assignmentStatus)
      && registrant.assignmentType === 'Player'
  );
  nonLockedPlayers.unshift({
    userId: 0,
    username: '',
    assignmentType: '',
    assignmentStatus: ''
  });

  const handleStartGameClick = () => {
    gameRequestService.startGame(gameId);
  }

  return (
    <Grid container spacing={1}>
      <Grid item xs={6}>
        <AssignmentsList
          assignmentData={data}
          assignmentRequestService={assignmentRequestService}
          nonLockedPlayers={nonLockedPlayers}
          refetch={refetch}
        />
        <div>{nextStepDescription}</div>
        <Button
          color={startButtonColor}
          variant="contained"
          disabled={startButtonDisabled}
          onClick={handleStartGameClick}
        >
          {startButtonLabel}
        </Button>
        <Button
          color="error"
        >
          Cancel Game
        </Button>
      </Grid>
      <Grid item xs={6}>
        Players Here
      </Grid>
    </Grid>
  )

}