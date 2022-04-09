import { FC } from "react";
import { CountryInfoTable } from "../country-info-table/CountryInfoTable";

interface OmniProps {
  infoTable: any;
}

export const OmniBox: FC<OmniProps> = ({infoTable}: OmniProps) => {
  return (
    <div className="omni-box">
      <CountryInfoTable countries={infoTable} />
    </div>
  )
}