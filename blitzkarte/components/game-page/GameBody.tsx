import { Grid } from "@mui/material";
import { User } from "firebase/auth";
import { FC, useContext } from "react";
import { useQuery, UseQueryResult } from "react-query";
import { initialRenderData } from "../../models/objects/RenderDataObject";
import { OrderRequestService } from "../../services/request-services/order-request-service";
import Blitzkontext from "../../utils/Blitzkontext";
import { MapContainer } from "../map-elements/map/MapContainer";
import { PlayOmniBox } from "../omni-box/PlayOmniBox";

interface GameBodyProps {
  user: User | undefined;
  gameId: number;
}

const GameBody: FC<GameBodyProps> = ({user, gameId}: GameBodyProps) => {
  const orderRequestService: OrderRequestService = new OrderRequestService();
  const renderData = initialRenderData;
  const omniBoxData = useContext(Blitzkontext).newGame.omniBoxData;

  const turnOrdersResult: UseQueryResult<any> = useQuery('getTurnOrders', () => {
    return orderRequestService.getTurnOrders(gameId);
  });

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