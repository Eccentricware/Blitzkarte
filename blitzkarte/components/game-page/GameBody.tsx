import { Grid } from "@mui/material";
import { User } from "firebase/auth";
import { FC, useContext, useEffect, useState } from "react";
import { useQuery, UseQueryResult } from "react-query";
import { initialRenderData } from "../../models/objects/RenderDataObject";
import { TurnOptions, TurnOrders } from "../../models/objects/TurnOrdersObjects";
import { OrderRequestService } from "../../services/request-services/order-request-service";
import Blitzkontext from "../../utils/Blitzkontext";
import { MapContainer } from "../map-elements/map/MapContainer";
import { PlayOmniBox } from "../omni-box/PlayOmniBox";
import { MapRequestService } from "../../services/request-services/map-request-service";
import { HistoryRequestService } from "../../services/request-services/history-request-service";
import { useRouter } from "next/router";

interface GameBodyProps {
  user: User | undefined;
  gameId: number;
}

const GameBody: FC<GameBodyProps> = ({user}: GameBodyProps) => {
  const mapRequestService = new MapRequestService();
  const orderRequestService: OrderRequestService = new OrderRequestService();
  const historyRequestService = new HistoryRequestService();
  const router = useRouter();
  const gameId = Number(router.query.gameId);

  // Refactors Impending
  // let renderData = initialRenderData;
  const omniBoxData = useContext(Blitzkontext).newGame.omniBoxData;

  const [renderData, setRenderData] = useState(initialRenderData);
  const [orderSet, setOrderSet] = useState<undefined>(undefined);
  const [historyTurnNumber, setHistoryTurnNumber] = useState<number>(0);
  const [currentTab, setCurrentTab] = useState<number>(user ? 0 : 1);
  const [nudger, setNudge] = useState(false);

  const nudge = {
    get: nudger,
    set: setNudge
  }

  const currentMapResult: UseQueryResult<any> = useQuery('getCurrentMap', () => {
    return mapRequestService.getCurrentMap(gameId);
  });

  const turnOptionsResult: UseQueryResult<any> = useQuery('getTurnOptions', () => {
    return orderRequestService.getTurnOptions(gameId);
  });

  const turnOrdersResult: UseQueryResult<any> = useQuery('getTurnOrders', () => {
    return orderRequestService.getTurnOrders(gameId);
  });

  const turnHistoryResult: UseQueryResult<any> = useQuery('getTurnHistory', () => {
    return historyRequestService.getTurnHistory(gameId, historyTurnNumber);
  });

  const historyOps = {
    get: historyTurnNumber,
    set: setHistoryTurnNumber,
    setCurrentTab: setCurrentTab
  }

  useEffect(() => {
    if (currentMapResult.data) {
      setRenderData(currentMapResult.data);
    }
  });

  useEffect(() => {
    if (turnOrdersResult.data) {
      setOrderSet(turnOrdersResult.data);
    }
  }, [turnOrdersResult.data]);

  useEffect(() => {
    turnHistoryResult.refetch();
  }, [historyTurnNumber]);

  // useEffect(() => {
  //   if (currentTab === 2 && turnHistoryResult.data) {
  //     // console.log(turnHistoryResult.data.maps.renderData.result)
  //     setRenderData(turnHistoryResult.data.maps.renderData.result);
  //   } else if (currentMapResult.data) {
  //     setRenderData(currentMapResult.data);
  //   }
  // }, [currentTab, turnHistoryResult.data, currentMapResult.data]);

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
            turnHistoryResult={turnHistoryResult}
            orderSet={orderSet}
            nudge={nudge}
            gameId={gameId}
            user={user}
            historyOps={historyOps}
          />
        </div>
      </Grid>
    </Grid>
  )
}

export default GameBody;