import { Box, Tabs, Tab } from "@mui/material"
import { ChangeEvent, FC, ReactNode, useState } from "react"

interface DevelopmentProps {

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

export const DevelopmentBody: FC<DevelopmentProps> = ({}:  DevelopmentProps) => {
  const [panel, setPanel] = useState(0);

  const handlePanelChange = (event: ChangeEvent<{}>, newPanel: number) => {
    setPanel(newPanel);
  }

  const height = window.innerHeight - 150;

  return (
    <div className="game-state-body">
      <Box>
        <Tabs value={panel} onChange={handlePanelChange} centered>
          <Tab label="Patch Notes"/>
          <Tab label="Known Issues"/>
          <Tab label="Current Test Objectives"/>
          {/* <Tab label="Road Map"/> */}
        </Tabs>
      </Box>
      <TabPanel value={panel} index={0}>
        <iframe className="clickup-embed" //clickup-dynamic-height
          src="https://share-docs.clickup.com/2331253/d/h/274kn-1180/52929443dc63e53"
          // onwheel=""
          width="50%" height={height}

        >
          </iframe><script async src="https://app-cdn.clickup.com/assets/js/forms-embed/v1.js">
        </script>
      </TabPanel>
      <TabPanel value={panel} index={1}>
        <iframe className="clickup-embed" width="50%" height={height}
          src="https://sharing.clickup.com/2331253/l/h/6-194230322-1/b606a676919bc50"
          >
        </iframe>
      </TabPanel>
      <TabPanel value={panel} index={2}>
        <iframe className="clickup-embed"
          src="https://share-docs.clickup.com/2331253/d/h/274kn-1200/0632d7f9046bab0"
          // onwheel=""
          width="100%" height={height}
          >
        </iframe>
      </TabPanel>
      {/* <TabPanel value={panel} index={3}>
        <iframe className="clickup-embed"
          src="https://sharing.clickup.com/2331253/wb/h/274kn-1160/e5dbc56655def80"
          // onWheel=""
          width="50%" height={height}
          >
        </iframe>
      </TabPanel> */}
    </div>
  )
}