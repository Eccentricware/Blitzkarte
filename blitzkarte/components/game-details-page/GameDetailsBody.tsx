import { Grid } from "@mui/material";
import { User } from "firebase/auth";
import { FC, useEffect, useState } from "react";
import { useQuery, UseQueryResult } from "react-query";
import { AssignmentRequestService } from "../../services/request-services/assignment-request-service";
import { GameRequestService } from "../../services/request-services/game-request-service";
import { AssignmentsPanel } from "./AssignmentsPanel";
import { GameDetailsSettings } from "./GameDetailsSettings";
import TravelExploreIcon from '@mui/icons-material/TravelExplore';

interface GameDetailsBodyProps {
  user: User | undefined;
  gameId: number;
}

// TravelExplore

const GameDetailsBody: FC<GameDetailsBodyProps> = ({user, gameId}: GameDetailsBodyProps) => {
  const gameRequestService = new GameRequestService();
  const assignmentRequestService = new AssignmentRequestService();

  const [gameName, setGameName] = useState('');
  const [gameNameAvailable, setGameNameAvailable] = useState(true);
  const [statusTime, setStatusTime] = useState<string>('Loading Time');

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
      <Grid item xs={12} sm={4}>
        {
          gameDetailsQueryResult.data
            &&
          <GameDetailsSettings gameDetailsSettings={gameDetailsQueryResult.data}
            assignmentRefetch={assignmentsQueryResult.refetch}
          />
        }
      </Grid>
      <Grid item xs={12} sm={7}>
        {
          gameDetailsQueryResult.data
          &&
          <AssignmentsPanel queryResult={assignmentsQueryResult}
            gameId={gameId}
            gameStatus={gameDetailsQueryResult.data.gameStatus}
          />
        }
      </Grid>
      <Grid item xs={12} sm={4}>
      </Grid>
    </Grid>
  )
}

export default GameDetailsBody;