import { Button } from "@mui/material";
import { FC, useState } from "react";
import { AssignmentService } from "../../services/assignment-service";
import { GameStatus } from "../../models/enumeration/game-status-enum";
import { getGameStatusDescription } from "../../utils/general/authors";
import { User } from "firebase/auth";
import { useRouter } from "next/router";
import { ContactList } from "./ContactList";

interface AssignmentsStdProps {
  registrationTypes: any;
  gameStatus: GameStatus;
  user: User | undefined;
  assignmentData: any;
  handleContactDetailsOpen: (event: React.MouseEvent<SVGSVGElement>, contact: any) => void;
}

export const AssignmentsStd: FC<AssignmentsStdProps> = ({registrationTypes, gameStatus, user, assignmentData, handleContactDetailsOpen}: AssignmentsStdProps) => {
  const router = useRouter();
  const assignmentService = new AssignmentService();
  const gameId = Number(router.query.gameId);

  const checkRegistrationType = (targetType: string): boolean => {
    const filtered = registrationTypes?.filter((registrationType: any) => {
      return targetType === registrationType.assignmentType
    });
    return filtered?.length > 0;
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

  const statusDescription = getGameStatusDescription(gameStatus);

  return (
    <div>
      <h4>Game Status: {gameStatus}</h4>
      <h5>{statusDescription}</h5>
      {
        registeredAsPlayer &&
        <Button
          color={gameStatus === GameStatus.REGISTRATION ? "inherit" : "error"}
          variant="contained"
          onClick={() => { handleUnregisterUserClick('Player'); }}
        >
          {gameStatus === GameStatus.REGISTRATION ? 'Leave Player Pool' : "Abandon Game"}
        </Button>
      }
      {
        (user && !registeredAsPlayer) &&
        <Button
          color="inherit"
          variant="contained"
          onClick={() => {handleRegisterUserClick('Player'); }}
        >
          Register As Player
        </Button>
      }
      {
        [
          GameStatus.PLAYING,
          GameStatus.PAUSED,
          GameStatus.ABANDONED,
          GameStatus.FINISHED
        ].includes(gameStatus) &&
        <ContactList
          gameId={gameId}
          assignmentData={assignmentData}
          handleContactDetailsOpen={handleContactDetailsOpen}
        />
      }
      <br/>
    </div>
  )
}
// {/* {
//   registeredAsReserve
//     &&
//   <Button
//     color="inherit"
//     variant="contained"
//     onClick={() => { handleUnregisterUserClick('Reserve'); }}
//   >
//     Leave Reserve Pool
//   </Button>
// } */}
// {/* {
//   (registeredAsPlayer && gameStatus === GameStatus.REGISTRATION)
//   || registeredAsSpectator
//   || registeredAsReserve
//     &&
//   <Button
//     color={gameStatus === GameStatus.REGISTRATION ? "warning" : "inherit"}
//     variant="contained"
//     onClick={() => {handleRegisterUserClick('Reserve'); }}
//   >
//     {
//       registeredAsPlayer || registeredAsSpectator
//         ?
//       'Switch to Reserve'
//         :
//       'Join Reserve Pool'
//     }
//   </Button>
// } */}
//   {/* <br/>
// {
//   registeredAsSpectator
//     &&
//   <Button
//     color="inherit"
//     variant="contained"
//     onClick={() => { handleUnregisterUserClick('Spectator'); }}
//   >
//     Leave Spectator Pool
//   </Button>
// } */}
// {/* {
//   (registeredAsPlayer && gameStatus === GameStatus.REGISTRATION)
//   || registeredAsReserve
//     &&
//   <Button
//     color="inherit"
//     variant="contained"
//     onClick={() => {handleRegisterUserClick('Spectator'); }}
//   >
//     {
//       registeredAsPlayer || registeredAsReserve
//         ?
//       'Switch to Spectator'
//         :
//       'Join Spectator Pool'
//     }
//   </Button>
// } */}