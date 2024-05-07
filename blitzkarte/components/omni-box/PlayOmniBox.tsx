import { Box, Tab, Tabs } from "@mui/material";
import { ChangeEvent, FC, Fragment, ReactNode, useState } from "react";
import { OmniBoxData } from "../../models/objects/OmniBoxDataObject";
import { InputTab } from "./InputTab";
import { DebugTab } from "./DebugTab";
import { StatsTable } from "./StatsTable";
import { HelperTab } from './HelperTab';
import { ChatTab } from "./ChatTab";
import { HistoryTab } from "./HistoryTab";
import { OrdersTab } from "./OrdersTab";
import { useQuery, UseQueryResult } from "react-query";
import { GameStats, TurnOrders } from "../../models/objects/TurnOrdersObjects";
import { GameRequestService } from "../../services/request-services/game-request-service";
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import { useRouter } from "next/router";
import { User } from "firebase/auth";
import { HistoryRequestService } from "../../services/request-services/history-request-service";

interface OmniProps {
  turnOptionsResult: UseQueryResult<any>;
  turnOrdersResult: UseQueryResult<any>;
  turnHistoryResult: UseQueryResult<any> | undefined;
  orderSet: TurnOrders | undefined;
  nudge: any;
  gameId: number;
  user: User | undefined;
  historyOps: any;
}

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

const TabPanel = ({index, value, children}: TabPanelProps) => {
  return (
    <div role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && children}
    </div>
  )
}

export const PlayOmniBox: FC<OmniProps> = ({
  turnOptionsResult,
  turnOrdersResult,
  turnHistoryResult,
  orderSet,
  gameId,
  nudge,
  user,
  historyOps
}: OmniProps) => {
  const historyRequestService = new HistoryRequestService();
  const router = useRouter();
  const [panel, setPanel] = useState(user ? 0 : 1);

  const handleChange = (event: ChangeEvent<{}>, newPanel: number) => {
    setPanel(newPanel);
    historyOps.setCurrentTab(newPanel);
  }

  const { data: gameInfo } = useQuery('getPublicInfo', () => {
    return historyRequestService.getGameStats(gameId);
  });

  return (
    <div className="omni-box">
      <Box>
        <Tabs value={panel} onChange={handleChange} centered>
          {
            (turnOptionsResult.data && turnOrdersResult.data)
              &&
            <Tab label="Orders" disabled={user === undefined}/>
          }
          { gameInfo && <Tab label="Stats"/> }
          { gameInfo && <Tab label="History" /> }
          <Tab label="Chat" disabled/>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
            onClick={() => { router.push(`/game-details/${gameId}` )}}
          >
            <ReadMoreIcon />
          </div>
        </Tabs>
      </Box>
      {
        (turnOptionsResult.data && turnOrdersResult.data)
          &&
        <TabPanel value={panel} index={0}>
          <OrdersTab options={turnOptionsResult.data}
            orders={turnOrdersResult.data}
            nudge={nudge}
          />
        </TabPanel>
      }
      {
        gameInfo
          &&
        <Fragment>
          <TabPanel value={panel} index={1}>
            <StatsTable stats={gameInfo} />
          </TabPanel>
          <TabPanel value={panel} index={2}>
            <HistoryTab
              turns={gameInfo.turns}
              turnHistoryResult={turnHistoryResult}
              historyOps={historyOps}
              nudge={nudge}
            />
          </TabPanel>
        </Fragment>
      }
      <TabPanel value={panel} index={3}>
        <ChatTab />
      </TabPanel>
    </div>
  )
}