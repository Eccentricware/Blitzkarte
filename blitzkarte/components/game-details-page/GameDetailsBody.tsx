import { Grid } from "@mui/material";
import { User } from "firebase/auth";
import { FC, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { GameRequestService } from "../../services/request-services/game-request-service";
import { erzahler } from "../../utils/general/erzahler";
import StallGlobe from "../icons/StallGlobe";
import { AssignmentsAdm } from "./AssignmentsAdm";
import { AssignmentsStd } from "./AssignmentsStd";
import { GameDetailsSettings } from "./GameDetailsSettings";

interface GameDetailsBodyProps {
  user: User | null;
  gameId: number | undefined;
}

const GameDetailsBody: FC<GameDetailsBodyProps> = ({user, gameId}: GameDetailsBodyProps) => {
  const gameRequestService = new GameRequestService();
  const [gameName, setGameName] = useState('');
  const [gameNameAvailable, setGameNameAvailable] = useState(true);

  const { isLoading, error, data, isFetching } = useQuery('getGameData', () => {
    if (!gameId) {
      gameId = 7;
    }

    return gameRequestService.getGameDetails(gameId);
  });

  useEffect(() => {
    if (data) {
      setGameName(data.gameName);
    }
  }, [data]);

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

  if (isFetching) {
    return <StallGlobe mode="querying" message={'GameDetailsBody: Fetching'}/>
  }

  if (isLoading) {
    return <StallGlobe mode="querying" message={'GameDetailsBody: Loading'}/>
  }

  if (error) {
    return <StallGlobe mode="error" message={'GameDetailsBody: Error'}/>
  }

  if (data) {
    // console.log('User in data:', user);
    return (
      <Grid container spacing={1}>
        <Grid item xs={12}>
          Banner?
        </Grid>
        <Grid item xs={12} sm={5}>
          <GameDetailsSettings gameData={data}/>
        </Grid>
        <Grid item xs={12} sm={7}>
          {
            data.displayAsAdmin
            ? <AssignmentsAdm assignmentData={data}/>
            : <AssignmentsStd registrationTypes={data.playerRegistration}/>
          }
        </Grid>
        {/* <Grid item xs={12} sm={4}>Chat</Grid> */}
      </Grid>
    )
  }

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        Banner?
      </Grid>
      <Grid item xs={12} sm={5}>
        <GameDetailsSettings gameData={data}/>
      </Grid>
      <Grid item xs={12} sm={3}>Assignments</Grid>
      <Grid item xs={12} sm={4}>Chat</Grid>
    </Grid>
  )
}

export default GameDetailsBody;