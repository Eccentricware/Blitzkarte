import { Grid } from "@mui/material";
import { User } from "firebase/auth";
import { FC, useEffect, useState } from "react";
import { useQuery, UseQueryResult } from "react-query";
import { AssignmentRequestService } from "../../services/request-services/assignment-request-service";
import { GameRequestService } from "../../services/request-services/game-request-service";
import { erzahler } from "../../utils/general/erzahler";
import StallGlobe from "../icons/StallGlobe";
import { AssignmentsAdm } from "./AssignmentsAdm";
import { AssignmentsPanel } from "./AssignmentsPanel";
import { AssignmentsStd } from "./AssignmentsStd";
import { GameDetailsSettings } from "./GameDetailsSettings";

interface GameDetailsBodyProps {
  user: User | undefined;
  gameId: number;
}

const GameDetailsBody: FC<GameDetailsBodyProps> = ({user, gameId}: GameDetailsBodyProps) => {
  const gameRequestService = new GameRequestService();
  const assignmentRequestService = new AssignmentRequestService();

  const [gameName, setGameName] = useState('');
  const [gameNameAvailable, setGameNameAvailable] = useState(true);

  const gameDetailsQueryResult: UseQueryResult<any> = useQuery('gameDetailsQuery', () => {
    return gameRequestService.getGameDetails(gameId);
  });

  const assignmentsQueryResult: UseQueryResult<any> = useQuery('getAssignmentData', () => {
    return assignmentRequestService.getAssignmentData(gameId);
  });

  useEffect(() => {
    if (gameDetailsQueryResult.data) {
      setGameName(gameDetailsQueryResult.data.gameName);
    }
  }, [gameDetailsQueryResult.data]);

  const handleGameNameChange = (name: string) => {
    setGameName(name);
    checkGameNameAvailable(name)
      .then((gameNameAvailable: boolean) => {
        validateGameName(name, gameNameAvailable);
      });
  }

  const checkGameNameAvailable = (gameName: string): any => {
    if (gameName.length === 0) {
      gameName = '-';
    }

    return fetch(`${erzahler.url}:${erzahler.port}/check-game-name/${gameName}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((result: any) => {
      return result.json();
    })
    .then((available: any) => {
      return available;
    })
    .catch((error: Error) => {
      console.log('Error checking game name availability:', error.message);
    });
  }

  const validateGameName = (gameName: string, gameNameAvailable: boolean) => {
    if (!gameNameAvailable && gameName.length > 0) {
      setGameNameAvailable(false);
    } else {
      setGameNameAvailable(true);
    }
  }

  // if (isFetching) {
  //   return <StallGlobe mode="querying" message={'GameDetailsBody: Fetching'}/>
  // }

  // if (isLoading) {
  //   return <StallGlobe mode="querying" message={'GameDetailsBody: Loading'}/>
  // }

  // if (error) {
  //   return <StallGlobe mode="error" message={'GameDetailsBody: Error'}/>
  // }


  return (
    <Grid container spacing={1}>
      {/* <Grid item xs={12}>
        Banner?
      </Grid> */}
      <Grid item xs={12} sm={5}>
        {
          gameDetailsQueryResult.data
            &&
          <GameDetailsSettings gameDetailsSettings={gameDetailsQueryResult.data}
            assignmentRefetch={assignmentsQueryResult.refetch}
          />
        }
      </Grid>
      <Grid item xs={12} sm={7}>
        <AssignmentsPanel queryResult={assignmentsQueryResult} gameId={gameId}/>
      </Grid>
      {/* <Grid item xs={12} sm={4}>Chat</Grid> */}
    </Grid>
  )
}

export default GameDetailsBody;