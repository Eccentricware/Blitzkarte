import React, { CSSProperties, FC } from "react";
import { StatsTableBody } from './StatsTableBody'

interface StatsTableData {
  stats: any;
}

export const StatsTable: FC<StatsTableData> = ({stats}: StatsTableData) => {
  const style: CSSProperties = {
    height: window.innerHeight - 93,
    overflowY: 'scroll',
  }

  return (
    <div style={style}>
      <table>
        <thead style={{position: 'sticky', top: 0, background: 'white', height: 25}}>
          <tr>
            <th>Country</th>
            <th>Cities</th>
            <th>Votes</th>
            <th>BBs</th>
            <th>Range</th>
            <th>Adj</th>
          </tr>
        </thead>
        <StatsTableBody countries={stats.countries}/>
      </table>
    </div>
  )
}