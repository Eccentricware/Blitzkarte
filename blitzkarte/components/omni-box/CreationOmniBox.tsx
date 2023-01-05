import { Box, Tab, Tabs } from "@mui/material";
import React, { ChangeEvent, FC } from "react";
import { OmniBoxData } from "../../models/objects/OmniBoxDataObject";
import { InputTab } from "./InputTab";
import { DebugTab } from "./DebugTab";
import { StatsTable } from "./StatsTable";
import { HelperTab } from './HelperTab';

interface OmniProps {
  omniBoxData: OmniBoxData;
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

export const CreationOmniBox: FC<OmniProps> = ({omniBoxData}: OmniProps) => {
  const [panel, setPanel] = React.useState(0);

  const handleChange = (event: ChangeEvent<{}>, newPanel: number) => {
    setPanel(newPanel);
  }

  return (
    <div className="omni-box">
      <Box>
        <Tabs value={panel} onChange={handleChange} centered>
          <Tab label="Settings"/>
          <Tab label="Debug"/>
          <Tab label="Stats"/>
          <Tab label="Helper"/>
        </Tabs>
      </Box>
      <TabPanel value={panel} index={0}>
        <InputTab input={omniBoxData.input} debug={omniBoxData.debug}/>
      </TabPanel>
      <TabPanel value={panel} index={1}>
        <DebugTab debug={omniBoxData.debug} />
      </TabPanel>
      <TabPanel value={panel} index={2}>
        <StatsTable stats={omniBoxData.stats} />
      </TabPanel>
      <TabPanel value={panel} index={3}>
        <HelperTab />
      </TabPanel>
    </div>
  )
}