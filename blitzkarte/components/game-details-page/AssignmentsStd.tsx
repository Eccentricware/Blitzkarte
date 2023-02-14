import { Button } from "@mui/material";
import { FC, useContext, useState } from "react";
import { AssignmentService } from "../../services/assignment-service";
import Blitzkontext from "../../utils/Blitzkontext";

interface AssignmentsStdProps {
  registrationTypes: any;
}

export const AssignmentsStd: FC<AssignmentsStdProps> = ({registrationTypes}: AssignmentsStdProps) => {
  const assignmentService = new AssignmentService();
  const gameId = Number(useContext(Blitzkontext).currentGame.id);

  const checkRegistrationType = (targetType: string): boolean => {
    const filtered = registrationTypes.filter((registrationType: any) => {
      return targetType === registrationType.assignmentType
    });
    return filtered.length > 0;
  }

  const [registeredAsPlayer, setRegisteredAsPlayer] = useState(checkRegistrationType('Player'));
  const [registeredAsReserve, setRegisteredAsReserve] = useState(checkRegistrationType('Reserve'));
  const [registeredAsSpectator, setRegisteredAsSpectator] = useState(checkRegistrationType('Spectator'));

  const registrationStates = {
    player: registeredAsPlayer,
    reserve: registeredAsReserve,
    spectator: registeredAsSpectator
  };

  const registrationToggleFunctions = {
    player: setRegisteredAsPlayer,
    reserve: setRegisteredAsReserve,
    spectator: setRegisteredAsSpectator
  }

  const handleRegisterUserClick = (assignmentType: string) => {
    assignmentService.registerUser(gameId, assignmentType);
    const toggleFunction = registrationToggleFunctions[assignmentType.toLowerCase()];
    toggleFunction(!registrationStates[assignmentType.toLowerCase()]);
  }

  const handleUnregisterUserClick = (assignmentType: string) => {
    assignmentService.unregisterUser(gameId, assignmentType);
    const toggleFunction = registrationToggleFunctions[assignmentType.toLowerCase()];
    toggleFunction(!registrationStates[assignmentType.toLowerCase()]);
  }

  return (
    <div>
      This game is hasn&apos;t started. Registration is open to all players!
      <br/>
      Enter the Fray: <br/>
      {
        registeredAsPlayer
        ? <Button
            color="inherit"
            variant="contained"
            onClick={() => { handleUnregisterUserClick('Player'); }}
          >
            Leave Game
          </Button>
        : <Button
            color="inherit"
            variant="contained"
            onClick={() => {handleRegisterUserClick('Player'); }}
          >
            Register As Player
          </Button>
      } <br/>

      {
        registeredAsReserve
        ? <Button
            color="inherit"
            variant="contained"
            onClick={() => { handleUnregisterUserClick('Reserve'); }}
          >
            Leave Reserve
          </Button>
        : <Button
            color="inherit"
            variant="contained"
            onClick={() => {handleRegisterUserClick('Reserve'); }}
          >
            Join Reserve Pool
          </Button>
      } <br/>
      Spectator:
      {
        registeredAsSpectator
        ? <Button
            color="inherit"
            variant="contained"
            onClick={() => { handleUnregisterUserClick('Spectator'); }}
          >
            Stop Watching
          </Button>
        : <Button
            color="inherit"
            variant="contained"
            onClick={() => {handleRegisterUserClick('Spectator'); }}
          >
            Spectate
          </Button>
      } <br/>
    </div>
  )
}