import { Button } from "@mui/material";
import { FC, useState } from "react";

interface AssignmentsStdProps {
  registrationTypes: any;
}

export const AssignmentsStd: FC<AssignmentsStdProps> = ({registrationTypes}: AssignmentsStdProps) => {
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

  return (
    <div>
      Harry! You're registered as a<br/>
      Player: {
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
          >
            Sign Up
          </Button>
      } <br/>
      Reserve: {
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
            Join Reserve
          </Button>
      } <br/>
      Spectator: {
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
      Admin: {
        registeredAsAdministrator
        ? <Button
            color="inherit"
            variant="contained"
          >
            Stop Administration
          </Button>
        : <Button
            color="inherit"
            variant="contained"
          >
            Request Admin
          </Button>
      } <br/>
    </div>
  )
}