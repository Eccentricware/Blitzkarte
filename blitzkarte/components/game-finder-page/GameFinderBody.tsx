import { Grid } from "@mui/material";
import { User } from "firebase/auth"
import { FC, useContext, useEffect, useState } from "react"
import { useQuery } from "react-query";
import { FindGameParametersObject } from "../../models/objects/FindGameParametersObject";
import { AbstractRequestService } from "../../services/request-services/abstract-request-service";
import { GameRequestService } from "../../services/request-services/game-request-service";
import Blitzkontext from "../../utils/Blitzkontext";
import { erzahler } from "../../utils/general/erzahler";
import StallGlobe from "../icons/StallGlobe";
import { GameFinderControls } from "./GameFinderControls";
import { FindGameResultsContainer } from "./GameFinderResults";

interface GameFinderBodyProps {
  user: User | null;
}

export const GameFinderBody: FC<GameFinderBodyProps> = ({}: GameFinderBodyProps) => {
  const [games, setGames] = useState([]);
  const gameRequestService = new GameRequestService();

  const { isLoading, error, data, isFetching } = useQuery('getGames', () => {
    return gameRequestService.getGames();
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