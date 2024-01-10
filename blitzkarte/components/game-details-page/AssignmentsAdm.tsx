import { Button, Grid } from "@mui/material";
import { FC, useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { AssignmentStatus } from "../../models/enumeration/assignment-status-enum";
import { AssignmentRequestService } from "../../services/request-services/assignment-request-service";
import { GameRequestService } from "../../services/request-services/game-request-service";
import { AssignmentsList } from "./AssignmentsList";
import { GameStatus } from "../../models/enumeration/game-status-enum";
import TravelExploreIcon from '@mui/icons-material/TravelExplore';

interface AssignmentsAdmProps {
  assignmentData: any;
  refetch: any;
  gameId: number;
  gameStatus: GameStatus;
}

export const AssignmentsAdm: FC<AssignmentsAdmProps> = ({assignmentData, refetch, gameId, gameStatus}: AssignmentsAdmProps) => {
  const assignmentRequestService = new AssignmentRequestService();
  const gameRequestService = new GameRequestService();

  const data = assignmentData;

  const [cancelGameHint, setCancelGameHint] = useState('');
  const [cancelGameClicks, setCancelGameClicks] = useState<number>(Number(0));
  const [cancelButtonVariant, setCancelButtonVariant] = useState<'contained' | 'outlined' | undefined>(undefined);
  const [cancelButtonColor, setCancelButtonColor] = useState('error');

  const allAssigned = assignmentData.allAssigned;
  const partialRosterStart = assignmentData.partialRosterStart;
  const finalReadinessCheck = assignmentData.finalReadinessCheck;
  const cancelButtonText = gameStatus === GameStatus.REGISTRATION ? 'Cancel Game' : 'ABANDON Game';

  let nextStepDescription = 'Oh yeah. It\'s all coming together.';

  let startButtonDisabled = false;
  let startButtonColor: 'success' | 'error' = 'success';
  let startButtonLabel = 'Start Game';

  if (gameStatus === GameStatus.READY) {
    nextStepDescription = 'The roster has been finalized and the game is ready. '
      + 'The game will start automatically with the announcment of country assignments at the scheduled time.';

  } else if (allAssigned && finalReadinessCheck) {
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
      AssignmentStatus.ASSIGNED,
      AssignmentStatus.ACTIVE
    ].includes(registrant.assignmentStatus)
      && registrant.assignmentType === 'Player'
  );
  nonLockedPlayers.unshift({
    userId: 0,
    username: '',
    assignmentType: '',
    assignmentStatus: ''
  });

  const handleGameReadyClick = () => {
    gameRequestService.declareReady(gameId);
  }

  const handleCancelGameClick = () => {
    setCancelGameClicks(cancelGameClicks + 1);

    if (cancelGameClicks + 1 === 1) {
      setCancelGameHint('So, you should know that cancelling the game is irreversible.');
      setCancelButtonVariant('outlined');
      setCancelButtonColor('warning');
    }

    if (cancelGameClicks + 1 === 2) {
      setCancelGameHint('If you want to run a game after cancelling, you will need to start from scratch, including recruitment.');
      setCancelButtonColor('error');
    }

    if (cancelGameClicks + 1 === 3) {
      setCancelGameHint('Okay this is seriously the final warning. Clicking one more time will cancel this game forever.');
      setCancelButtonVariant('contained');
      setCancelButtonColor('error');
    }

    if (cancelGameClicks + 1 === 4) {
      gameRequestService.cancelGame(gameId);
    }
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={6}>
        <AssignmentsList
          gameId={gameId}
          assignmentData={data}
          assignmentRequestService={assignmentRequestService}
          nonLockedPlayers={nonLockedPlayers}
          refetch={refetch}
        />
        <div>{nextStepDescription}</div>
        {
          gameStatus === GameStatus.REGISTRATION
            &&
          <Button
            color={startButtonColor}
            variant="contained"
            disabled={startButtonDisabled}
            onClick={handleGameReadyClick}
          >
            {startButtonLabel}
          </Button>
        }
        {cancelGameHint !== '' && <div>{cancelGameHint}</div>}
        <Button
          color="error"
          variant={cancelButtonVariant}
          onClick={handleCancelGameClick}
        >
          {cancelButtonText}
        </Button>
      </Grid>
      <Grid item xs={6}>
        Players Here
        <div
          style={{
            display: 'flex',
            color: 'white',
            justifyContent: 'center',
            alignItems: 'center',
            height: '50px',
            width: '50%',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            borderRadius: '5px',
            backgroundColor: 'green',
          }}
          onClick={() => {
            window.location.href = `/game/${gameId}`;
          }}
        >
          Go To Map <TravelExploreIcon fontSize="large"/>
        </div>
      </Grid>
    </Grid>
  )

}