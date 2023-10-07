import { ChangeEvent, FC, useEffect, useState } from "react";
import { TransferTechCountry } from "../../models/objects/OptionsObjects";
import { TransferTechOrder } from "../../models/objects/OrdersObjects";
import { TurnOrders } from "../../models/objects/TurnOrdersObjects";

interface Props {
  giving: boolean;
  transferOptions: {
    turnStatus: string;
    options: TransferTechCountry[];
  };
  order: TransferTechOrder;
}

export const TechTransfer: FC<Props> = ({giving, transferOptions, order}: Props) => {
  const [countries, setCountries] = useState(transferOptions.options);
  const [foreignCountryId, setForeignCountryId] = useState(order.foreignCountryId);

  const handlePartnerChange = (id: string) => {
    const countryId = Number(id)
    const techPartner = transferOptions.options.find((partner: TransferTechCountry) => countryId === partner.countryId);
    if (techPartner) {
      order.foreignCountryId = techPartner.countryId;
      order.foreignCountryName = techPartner.countryName;
      setForeignCountryId(Number(countryId));
    }
  }

  return (
    <div className="nuke-tech-transfer-row" style={{padding: '5px'}}>
      <div>{giving ? 'Offer Nuke Tech To: ' : 'Request Nuke Tech From: '}</div>
        <select className="nuke-tech-transfer-select" value={order.foreignCountryId}
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