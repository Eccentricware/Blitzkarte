import React, { FC } from "react";
import { StatsTableBody } from './StatsTableBody'

interface StatsTableData {
  stats: any;
}

export const StatsTable: FC<StatsTableData> = ({stats}: StatsTableData) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Country</th>
          <th>Cities</th>
          <th>Votes</th>
          <th>BBs</th>
          <th>Range</th>
          <th>Ajd</th>
        </tr>
      </thead>
      <StatsTableBody countries={stats.countries}/>
    </table>
  )
}