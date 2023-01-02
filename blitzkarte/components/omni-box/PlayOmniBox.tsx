import { Box, Tab, Tabs } from "@mui/material";
import React, { FC } from "react";
import { OmniBoxData } from "../../models/objects/OmniBoxDataObject";
import { InputTab } from "./InputTab";
import { DebugTab } from "./DebugTab";
import { StatsTable } from "./StatsTable";
import { HelperTab } from './HelperTab';
import { ChatTab } from "./ChatTab";
import { PreviousTab } from "./PreviousTab";
import { OrdersTab } from "./OrdersTab";
import { UseQueryResult } from "react-query";
import { UnitOrder } from "../../models/objects/TurnOptionsObjects";

interface OmniProps {
  omniBoxData: OmniBoxData;
  turnOptionsResult: UseQueryResult<any>;
  orderSet: UnitOrder[];
}

interface TabPanelProps {
  children?: React.ReactNode;
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

export const PlayOmniBox: FC<OmniProps> = ({omniBoxData, turnOptionsResult, orderSet}: OmniProps) => {
  const [panel, setPanel] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newPanel: number) => {
    setPanel(newPanel);
  }

  return (
    <div className="omni-box">
      <Box>
        <Tabs value={panel} onChange={handleChange} centered>
          {
            (turnOptionsResult.data && turnOptionsResult.data.countryId !== 0)
            && <Tab label="Orders"/>
          }
          <Tab label="Stats"/>
          <Tab label="Chat" disabled={true}/>
          <Tab label="History"/>
        </Tabs>
      </Box>
      {
        (turnOptionsResult.data && turnOptionsResult.data.countryId !== 0)
        &&  <TabPanel value={panel} index={0}>
              <OrdersTab orderOptions={turnOptionsResult.data} orderSet={orderSet}/>
            </TabPanel>
      }
      <TabPanel value={panel} index={1}>
        <StatsTable stats={omniBoxData.stats} />
      </TabPanel>
      <TabPanel value={panel} index={2}>
        <ChatTab />
      </TabPanel>
      <TabPanel value={panel} index={3}>
        <PreviousTab/>
      </TabPanel>
    </div>
  )
}