import { Button, Grid, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { User } from "firebase/auth";
import { FC, useEffect, useState } from "react";
import { QueryClient, useQuery, useQueryClient } from "react-query";
import { erzahler } from "../../utils/general/erzahler";
import StallGlobe from "../icons/StallGlobe";
import { DailyDeadlines } from "../omni-box/DailyDeadlines";
import { InputTab } from "../omni-box/InputTab";
import { IntervalDeadlines } from "../omni-box/IntervalDeadlines";
import { NewGameSettings } from "../omni-box/NewGameSettings";
import { WeeklyDeadlines } from "../omni-box/WeeklyDeadlines";
import { GameDetailsSettings } from "./GameDetailsSettings";

interface GameDetailsBodyProps {
  user: User | null;
  gameId: number;
}

const GameDetailsBody: FC<GameDetailsBodyProps> = ({user, gameId}: GameDetailsBodyProps) => {
  const [gameName, setGameName] = useState('');
  const [gameNameAvailable, setGameNameAvailable] = useState(true);

  const queryClient: QueryClient = useQueryClient();

  const { isLoading, error, data, isFetching } = useQuery('getGameData', () => {
    return user?.getIdToken().then((idToken: string) => {
      return fetch(`${erzahler.url}:${erzahler.port}/game-details/${gameId}`, {
        headers: {
          idtoken: idToken
        }
      })
      .then((response: any) => {
        console.log('Game Details Body Response:', response);
        return response.json();
      })
      .then((gameData: any) => {
        console.log('gameData:', gameData);
        return gameData;
      })
      .catch((error: Error) => {
        console.log('Game Details Body Error: ' + error.message);
      })
    })
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

  return (
    <StallGlobe mode="error" message="GameDetailsBody: Return"/>
  )
}

export default GameDetailsBody;