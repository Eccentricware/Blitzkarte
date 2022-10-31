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
    const filtered = registrationTypes.filter((registrationType: string) => {
      targetType === registrationType
    });
    return filtered.length > 0;
  }

  const [registeredAsPlayer, setRegisteredAsPlayer] = useState(checkRegistrationType('Player'));
  const [registeredAsReserve, setRegisteredAsReserve] = useState(checkRegistrationType('Reserve'));
  const [registeredAsSpectator, setRegisteredAsSpectator] = useState(checkRegistrationType('Spectator'));
  const [registeredAsAdministrator, setRegisteredAsAdministrator] = useState(checkRegistrationType('Administrator'));

  const handleRegisterAsPlayerClick = () => {
    assignmentService.registerAsPlayer(gameId);
  }

  return (
    <div>
      This game is hasn't started. Registration is open to all players!
      <br/>
      Enter the Fray: <br/>
      {
        registeredAsPlayer
        ? <Button
            color="inherit"
            variant="contained"
          >
            Leave Game
          </Button>
        : <Button
            color="inherit"
            variant="contained"
            onClick={handleRegisterAsPlayerClick}
          >
            Register As Player
          </Button>
      } <br/>

      {
        registeredAsReserve
        ? <Button
            color="inherit"
            variant="contained"
          >
            Leave Reserve
          </Button>
        : <Button
            color="inherit"
            variant="contained"
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
          >
            Stop Watching
          </Button>
        : <Button
            color="inherit"
            variant="contained"
          >
            Spectate
          </Button>
      } <br/>
    </div>
  )
}