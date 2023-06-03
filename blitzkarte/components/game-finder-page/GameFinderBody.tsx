import { Grid } from "@mui/material";
import { User } from "firebase/auth"
import { FC, useEffect, useState } from "react"
import { useQuery } from "react-query";
import { GameRequestService } from "../../services/request-services/game-request-service";
import StallGlobe from "../icons/StallGlobe";
import { GameFinderControls } from "./GameFinderControls";
import { FindGameResultsContainer } from "./GameFinderResults";
import { GameFinderParameters, GameFinderSettings } from "../../models/objects/GameFinderObjects";

interface GameFinderBodyProps {
  user: User | null;
}

export const GameFinderBody: FC<GameFinderBodyProps> = ({}: GameFinderBodyProps) => {
  const [games, setGames] = useState([]);
  const [playing, setPlaying] = useState(true);
  const [creator, setCreator] = useState(false);
  const [administrator, setAdministrator] = useState(false);
  const gameRequestService = new GameRequestService();

  const paramaters: GameFinderParameters = {
    playing: playing,
    creator: creator,
    administrator: administrator
  };

  const { isLoading, error, data, isFetching, refetch } = useQuery('getGames', () => {
    return gameRequestService.getGames(paramaters);
  });

  useEffect(() => {
    if (data) {
      setGames(data);
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, [playing, creator, administrator]);

  const settings: GameFinderSettings = {
    playing: playing,
    setPlaying: setPlaying,
    creator: creator,
    setCreator: setCreator,
    administrator: administrator,
    setAdministrator: setAdministrator
  };

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
          <GameFinderControls settings={settings}/>
        </Grid>
      </Grid>
    )
  }

  return <StallGlobe mode="error" message={'GameFinderBody: Void'}/>
}