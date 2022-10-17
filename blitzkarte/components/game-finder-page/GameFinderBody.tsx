import { Grid } from "@mui/material";
import { User } from "firebase/auth"
import { FC, useEffect, useState } from "react"
import { useQuery } from "react-query";
import { FindGameParametersObject } from "../../models/FindGameParametersObject";
import { erzahler } from "../../utils/general/erzahler";
import StallGlobe from "../icons/StallGlobe";
import { GameFinderControls } from "./GameFinderControls";
import { FindGameResultsContainer } from "./GameFinderResults";

interface GameFinderBodyProps {
  user: User | null;
}

export const GameFinderBody: FC<GameFinderBodyProps> = ({user}: GameFinderBodyProps) => {
  const [games, setGames] = useState([]);

  const { isLoading, error, data, isFetching } = useQuery('getGames', () => {
    if (user) {
      return user.getIdToken().then((idToken: string) => {
        return fetch(`${erzahler.url}:${erzahler.port}/find-games`, {
          headers: {
            idToken: idToken
          }
        })
        .then((response: any) => {
          console.log('Found games response:', response);
          return response.json();
        })
        .then((games: any) => {
          console.log('games', games);
          return games;
        })
        .catch((error: Error) => {
          console.log('Find Games Body Error: ' + error.message);
        });
      });
    } else {
        return fetch(`${erzahler.url}:${erzahler.port}/find-games`, {
          headers: {
            idToken: ''
          }
        })
        .then((response: any) => {
          console.log('Found games response:', response);
          return response.json();
        })
        .then((games: any) => {
          console.log('games', games);
          return games;
        })
        .catch((error: Error) => {
          console.log('Find Games Body Error: ' + error.message);
        });
    }
  });

  useEffect(() => {
    if (data) {
      setGames(data);
    }
  }, [data]);

  const paramaters: FindGameParametersObject = {};

  if (isFetching) {
    return <StallGlobe mode="querying" message={'GameFinderBody: Fetching'}/>
  }

  if (isLoading) {
    return <StallGlobe mode="querying" message={'GameFinderBody: Loading'}/>
  }

  if (error) {
    return <StallGlobe mode="error" message={'GameFinderBody: Error'}/>
  }

  if (data) {
    return (
      <Grid container spacing={1}>
        <Grid item xs={8}>
          <FindGameResultsContainer games={games} />
        </Grid>
        <Grid item xs={4}>
          <GameFinderControls parameters={paramaters}/>
        </Grid>
      </Grid>
    )
  }

  return <StallGlobe mode="error" message={'GameFinderBody: Void'}/>
}