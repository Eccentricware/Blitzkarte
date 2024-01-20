import { CSSProperties, FC } from "react";
import { UseQueryResult } from "react-query";
import TravelExploreIcon from '@mui/icons-material/TravelExplore';

interface MiscDetailsPanelProps {
  gameId: number;
  queryResult: UseQueryResult<any>;
}

export const MiscDetailsPanel: FC<MiscDetailsPanelProps> = ({gameId, queryResult}: MiscDetailsPanelProps) => {
  const miscSection: CSSProperties = {
    borderBottom: '1px solid black',
  }
  return (
    <div>
      <div style={miscSection}>
        <h3>Placeholders For Future Collapsible Sections</h3>
      </div>
      <div style={miscSection}>
        <h3>Coalition Schedules</h3>
        <div>With 81 votes in play, defaults to 41 base with ABCDE Penatlies:</div>
        <div>+9, +6, +3, +1, +0</div>
        <div>EEE: 41, ABB: 62, ETC: xyz</div>
      </div>
      <div style={miscSection}>
        <h3>Rules</h3>
        <h4>Standard Diplomacy</h4>
        <div>Armies, Fleets, Turns, Etc</div>
        <h4>New World Order Variant</h4>
        <div>Wings, Nukes, Trades, Coalition Endgame, Etc</div>
        <h4>Game-Specific Rulesets</h4>
        <div>United Nations Task Force, Mutually Assured Destruction, Etc</div>
      </div>
      <div
        style={{
          display: 'flex',
          color: 'white',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50px',
          width: '100%',
          fontSize: '1.5rem',
          fontWeight: 'bold',
          cursor: 'pointer',
          borderRadius: '5px',
          backgroundColor: 'green',
          position: 'relative',
          bottom: '0'
        }}
        onClick={() => {
          window.location.href = `/game/${gameId}`;
        }}
      >
        Go To Map <TravelExploreIcon fontSize="large"/>
      </div>
    </div>
  )
}