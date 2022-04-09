import { FC } from "react";
import { OmniBoxData } from "../../models/OmniBox";
import { StatsTable } from "../stats-table/StatsTable";

interface OmniProps {
  omniBoxData: OmniBoxData;
}

export const OmniBox: FC<OmniProps> = ({omniBoxData}: OmniProps) => {
  return (
    <div className="omni-box">
      <StatsTable stats={omniBoxData.stats} />
    </div>
  )
}