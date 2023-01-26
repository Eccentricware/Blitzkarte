import { Grid } from "@mui/material";
import { User } from "firebase/auth";
import { FC, useContext, useState } from "react";
import { useQuery, UseQueryResult } from "react-query";
import { initialRenderData } from "../../models/objects/RenderDataObject";
import { Order, TurnOrders, UnitOrder } from "../../models/objects/TurnOrdersObjects";
import { OrderRequestService } from "../../services/request-services/order-request-service";
import { MapRequestService } from "../../services/request-services/OrderRequestService";
import Blitzkontext from "../../utils/Blitzkontext";
import { MapContainer } from "../map-elements/map/MapContainer";
import { PlayOmniBox } from "../omni-box/PlayOmniBox";

interface GameBodyProps {
  user: User | undefined;
  gameId: number;
}

const GameBody: FC<GameBodyProps> = ({user, gameId}: GameBodyProps) => {
  const mapRequestService = new MapRequestService();
  const orderRequestService: OrderRequestService = new OrderRequestService();
  // const [renderData, setRenderData] = useState(initialRenderData);

  // Refactors Impending
  let renderData = initialRenderData;
  const omniBoxData = useContext(Blitzkontext).newGame.omniBoxData;
  const [orderSet, setOrderSet] = useState<TurnOrders|undefined>(undefined);
  const [nudger, setNudge] = useState(false);

  const nudge = {
    get: nudger,
    set: setNudge
  }

  const currentMapResult: UseQueryResult<any> = useQuery('getCurrentMap', () => {
    return mapRequestService.getCurrentMap(gameId);
  });
  if (currentMapResult.data) {
    renderData = currentMapResult.data;
  }

  const turnOptionsResult: UseQueryResult<any> = useQuery('getTurnOptions', () => {
    return orderRequestService.getTurnOptions(gameId);
  });

  const turnOrdersResult: UseQueryResult<any> = useQuery('getTurnOrders', () => {
    return orderRequestService.getTurnOrders(gameId);
  });


  return (
    <Grid container columns={2}>
      <Grid item>
        <div className="column">
          <MapContainer renderData={renderData}
            turnOrdersResult={turnOrdersResult}
            orderSet={orderSet}
            nudge={nudge}
          />
        </div>
      </Grid>
      <Grid item>
        <div className="column">
          <PlayOmniBox
            turnOptionsResult={turnOptionsResult}
            turnOrdersResult={turnOrdersResult}
            orderSet={orderSet}
            nudge={nudge}
            gameId={gameId}
          />
        </div>
      </Grid>
    </Grid>
  )
}

export default GameBody;