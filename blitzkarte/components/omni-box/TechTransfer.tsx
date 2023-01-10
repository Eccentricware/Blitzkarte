import { ChangeEvent, FC, useEffect, useState } from "react";
import { TransferCountry } from "../../models/objects/OptionsObjects";

interface Props {
  giving: boolean;
  transferOptions: {
    turnStatus: string;
    options: TransferCountry[];
  };
  techTransferPartner: number;
}

export const TechTransfer: FC<Props> = ({giving, transferOptions, techTransferPartner}: Props) => {
  const [countries, setCountries] = useState(transferOptions.options);
  const [transferPartner, setTransferPartner] = useState(techTransferPartner);

  const handlePartnerChange = (countryId: string) => {
    techTransferPartner = Number(countryId);
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
            countries.map((country: TransferCountry) =>
              <option key={country.countryId} value={country.countryId}>{country.countryName}</option>
            )
          }
        </select>
    </div>
  )
}