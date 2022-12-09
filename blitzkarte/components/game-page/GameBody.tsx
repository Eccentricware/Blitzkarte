import { Grid } from "@mui/material";
import { User } from "firebase/auth";
import { FC, useContext } from "react";
import { initialRenderData } from "../../models/objects/RenderDataObject";
import Blitzkontext from "../../utils/Blitzkontext";
import { MapContainer } from "../map-elements/map/MapContainer";
import { PlayOmniBox } from "../omni-box/PlayOmniBox";

interface GameBodyProps {
  user: User | undefined;
  gameId: number;
}

const GameBody: FC<GameBodyProps> = ({user, gameId}: GameBodyProps) => {
  const renderData = initialRenderData;
  const omniBoxData = useContext(Blitzkontext).newGame.omniBoxData;

  return (
    <Grid container columns={2}>
      <Grid item>
        <div className="column"><MapContainer renderData={renderData}/></div>
      </Grid>
      <Grid item>
        <div className="column"><PlayOmniBox omniBoxData={omniBoxData}/></div>
      </Grid>
    </Grid>
  )
}

export default GameBody;