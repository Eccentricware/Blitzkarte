import { FC } from "react";
import { OmniBoxData } from "../../models/OmniBox";
import { StatsTable } from "../stats-table/StatsTable";

interface OmniProps {
  omniBoxData: OmniBoxData;
}

export const OmniBox: FC<OmniProps> = ({omniBoxData}: OmniProps) => {
  return (
    <div className="omni-box">
      <div className="tabs is-fullwidth is-toggle">
        <ul>
          <li className="is-active">Upload/Debug</li>
          <li>Stats</li>
        </ul>
      </div>
      <StatsTable stats={omniBoxData.stats} />
    </div>
  )
}