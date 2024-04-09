import { Grid } from "@mui/material";
import { User } from "firebase/auth";
import { CSSProperties, FC, useContext, useEffect, useState } from "react";
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
import Head from "next/head";
import { NavBarSignedIn } from "../nav-bar/NavBarSignedIn";

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

  const [mapWidth, setMapWidth] = useState(1600);
  const [mapHeight, setMapHeight] = useState(1000);
  const [coordinatesPerPixel, setCoordinatesPerPixel] = useState(10);
  const [labelSize, setLabelSize] = useState(500);
  const [nudger, setNudge] = useState(false);

  const nudge = {
    get: nudger,
    set: setNudge
  }

  console.log('Game body is in a render loop')

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
  }, [currentMapResult.data]);

  useEffect(() => {
    if (turnOrdersResult.data) {
      setOrderSet(turnOrdersResult.data);
    }
  }, [turnOrdersResult.data]);

  useEffect(() => {
    turnHistoryResult.refetch();
  }, [
    historyTurnNumber
  ]);

  const calibrateMapSize = () => {
    let mapHeight = window.innerHeight - 45;
    let mapWidth = mapHeight * 1.6;
    let coordinatesPerPixel = 10000 / mapHeight;
    let labelSize = 11 * coordinatesPerPixel;
    setMapWidth(mapWidth);
    setMapHeight(mapHeight);
    setLabelSize(labelSize);
  };

  useEffect(() => {
    calibrateMapSize();
    window.addEventListener('resize', calibrateMapSize);
    return () => {
      window.removeEventListener('resize', calibrateMapSize);
    }
  }, []);

  // useEffect(() => {
  //   if (currentTab === 2 && turnHistoryResult.data) {
  //     // console.log(turnHistoryResult.data.maps.renderData.result)
  //     setRenderData(turnHistoryResult.data.maps.renderData.result);
  //   } else if (currentMapResult.data) {
  //     setRenderData(currentMapResult.data);
  //   }
  // }, [currentTab, turnHistoryResult.data, currentMapResult.data]);

  const dividerStyle: CSSProperties = {
    height: mapHeight,
    width: '5px',
    backgroundColor: '#1976d2',
    // cursor: 'ew-resize',
    zIndex: 1111
  }

  return (
    <div>
      <Head>
        <title>Adventure Alpha - Gameplay</title>
        <meta name="description" content="Game Name"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      {/* <NavBarSignedIn title="Gameplay"/> */}
      <div style={{display: 'flex'}}>
        <div className="column" >
          <MapContainer renderData={renderData}
            turnOrdersResult={turnOrdersResult}
            orderSet={orderSet}
            mapWidth={mapWidth}
            mapHeight={mapHeight}
            labelSize={labelSize}
            nudge={nudge}
          />
        </div>
        <div className="game-divider" style={dividerStyle}></div>
        <div>
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
      </div>
    </div>
  )
}

export default GameBody;