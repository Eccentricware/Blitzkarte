import { Grid } from "@mui/material";
import { User } from "firebase/auth"
import { FC, useState } from "react"
import { FindGameParametersObject } from "../../models/FindGameParametersObject";
import { GameFinderControls } from "./GameFinderControls";
import { FindGameResultsContainer } from "./GameFinderResults";

interface GameFinderBodyProps {
  user: User | null;
}

export const GameFinderBody: FC<GameFinderBodyProps> = ({user}: GameFinderBodyProps) => {
  const [games, setGames] = useState([]);

  const paramaters: FindGameParametersObject = {}

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