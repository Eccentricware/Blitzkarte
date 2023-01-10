import { ChangeEvent, FC, useEffect, useState } from "react";
import { TransferTechCountry } from "../../models/objects/OptionsObjects";
import { TurnOrders } from "../../models/objects/TurnOrdersObjects";

interface Props {
  giving: boolean;
  transferOptions: {
    turnStatus: string;
    options: TransferTechCountry[];
  };
  orders: any;
}

export const TechTransfer: FC<Props> = ({giving, transferOptions, orders}: Props) => {
  const [countries, setCountries] = useState(transferOptions.options);
  const [transferPartner, setTransferPartner] = useState(orders.techTransfer ? orders.techTransfer : 0);

  const handlePartnerChange = (countryId: string) => {
    orders.techTransfer = Number(countryId);
    setTransferPartner(Number(countryId));
  }

  return (
    <div>
      <div>{giving ? 'Offer Nuke Tech To:' : 'Request Nuke Tech From:'}</div>
        <select className="nuke-tech-transfer-select" value={transferPartner}
          onChange={(event: ChangeEvent<HTMLSelectElement>) => {
            handlePartnerChange(event.target.value);
          }}
        >
          {
            countries.map((country: TransferTechCountry) =>
              <option key={country.countryId} value={country.countryId}>{country.countryName}</option>
            )
          }
        </select>
    </div>
  )
}