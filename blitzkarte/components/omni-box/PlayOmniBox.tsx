import { Box, Tab, Tabs } from "@mui/material";
import { ChangeEvent, FC, ReactNode, useState } from "react";
import { OmniBoxData } from "../../models/objects/OmniBoxDataObject";
import { InputTab } from "./InputTab";
import { DebugTab } from "./DebugTab";
import { StatsTable } from "./StatsTable";
import { HelperTab } from './HelperTab';
import { ChatTab } from "./ChatTab";
import { PreviousTab } from "./PreviousTab";
import { OrdersTab } from "./OrdersTab";
import { useQuery, UseQueryResult } from "react-query";
import { TurnOrders } from "../../models/objects/TurnOrdersObjects";
import { GameRequestService } from "../../services/request-services/game-request-service";

interface OmniProps {
  turnOptionsResult: UseQueryResult<any>;
  turnOrdersResult: UseQueryResult<any>;
  orderSet: TurnOrders | undefined;
  nudge: any;
  gameId: number;
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

export const PlayOmniBox: FC<OmniProps> = ({turnOptionsResult, turnOrdersResult, orderSet, gameId, nudge}: OmniProps) => {
  const gameRequestService = new GameRequestService();
  const [panel, setPanel] = useState(0);

  const handleChange = (event: ChangeEvent<{}>, newPanel: number) => {
    setPanel(newPanel);
  }

  const { data: countryStats } = useQuery('getStatsTable', () => {
    return gameRequestService.getStatsTable(gameId);
  });

  return (
    <div className="omni-box">
      <Box>
        <Tabs value={panel} onChange={handleChange} centered>
          {
            (turnOptionsResult.data && turnOrdersResult.data)
              &&
            <Tab label="Orders"/>
          }
          { countryStats && <Tab label="Stats"/> }
          {/* <Tab label="Chat" disabled={true}/> */}
          <Tab label="History"/>
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
        countryStats
          &&
        <TabPanel value={panel} index={1}>
          <StatsTable stats={countryStats} />
        </TabPanel>
      }
      {/* <TabPanel value={panel} index={2}>
        <ChatTab />
      </TabPanel> */}
      <TabPanel value={panel} index={3}>
        <PreviousTab/>
      </TabPanel>
    </div>
  )
}