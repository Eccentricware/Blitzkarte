import { Clear } from "@mui/icons-material";
import { SelectChangeEvent, TextField } from "@mui/material";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { TransferBuildsCountry, TransferTechCountry } from "../../models/objects/OptionsObjects";
import { Country } from "../../utils/parsing/classes/country";

interface Props {
  transferOptions: {
    builds: number;
    options: TransferBuildsCountry[];
    turnStatus: string;
  };
  transferOrders: TransferBuildsCountry[];
}

export const BuildTransfer: FC<Props> = ({transferOptions, transferOrders}: Props) => {
  const [remainingBuilds, setRemainingBuilds] = useState(transferOptions.builds);
  const [recipientsArray, setRecipientsArray] = useState<TransferBuildsCountry[]>(transferOrders);
  const [giftedCountryIds, setGiftedCountryIds] = useState<number[]>([]);
  const [rowRecipientsOptions, setRecipientOptions] = useState<TransferTechCountry[][] | undefined>(undefined);

  useEffect(() => {
    const countryIds = transferOrders.map((country: TransferBuildsCountry) => country.countryId );

    if (remainingBuilds > 0) {
      countryIds.push(0);

      transferOrders.push({
        countryId: 0,
        countryName: '--Keep Builds--',
        builds: 0
      });
      setRecipientsArray(transferOrders);
    }

    setGiftedCountryIds(countryIds);
    updateRecipientOptions(countryIds, transferOptions.builds - getTotalSpent());
    setRemainingBuilds(transferOptions.builds - getTotalSpent());
  }, []);

  const handleTransferCountryChange = (id: string, index: number) => {
    const updatedGiftedIds = giftedCountryIds.slice();
    const countryId = Number(id);
    const country = transferOptions.options.find((option: any ) => option.countryId === countryId);

    if (country) {
      if (countryId !== 0) {
        transferOrders[index] = {
          countryId: countryId,
          countryName: country.countryName,
          builds: transferOrders[index].builds
        };
        updatedGiftedIds[index] = countryId;

      }
        if (countryId === 0 && index !== transferOrders.length - 1) {
          const newRemainingBuilds = remainingBuilds + transferOrders[index].builds;
          updatedGiftedIds.splice(index, 1);
          transferOrders.splice(index, 1);
          setRemainingBuilds(newRemainingBuilds);
       } else if (countryId === 0) {
          const newRemainingBuilds = remainingBuilds + transferOrders[index].builds;
          updatedGiftedIds[index] = countryId;
          transferOrders[index] = {
            countryId: countryId,
            countryName: country.countryName,
            builds: 0
          };
          setRemainingBuilds(newRemainingBuilds);
       }

      setRecipientsArray(transferOrders);
      setGiftedCountryIds(updatedGiftedIds);
      updateRecipientOptions(updatedGiftedIds, remainingBuilds);
    }
  }

  const handleTransferAmountChange = (amount: string, index: number) => {
    const startAmount = transferOrders[index].builds;
    let totalSpent = getTotalSpent();
    const max = (transferOptions.builds - totalSpent) + startAmount;

    let updatedAmount = Number(amount);
    if (updatedAmount > max) {
      updatedAmount = max;
    }

    transferOrders[index].builds = updatedAmount;

    let newRemainingBuilds = transferOptions.builds - getTotalSpent();

    if (newRemainingBuilds > 0 && transferOrders[transferOrders.length - 1].countryId !== 0) {
      const countryIds = giftedCountryIds;
      countryIds.push(0);

      transferOrders.push({
        countryId: 0,
        countryName: '--Keep Builds--',
        builds: 0
      });
      setGiftedCountryIds(countryIds);
      updateRecipientOptions(countryIds, transferOptions.builds - getTotalSpent());
    }

    if ((updatedAmount === 0 || newRemainingBuilds === 0) && transferOrders[transferOrders.length - 1].countryId === 0) {
      const countryIds = giftedCountryIds;
      countryIds.pop();
      transferOrders.pop();
      setGiftedCountryIds(countryIds);
      updateRecipientOptions(countryIds, transferOptions.builds - getTotalSpent());
    }


    setRemainingBuilds(newRemainingBuilds);
    setRecipientsArray(transferOrders);
  }

  const getTotalSpent = (): number => {
    let totalSpent = 0;
    recipientsArray.forEach((country: TransferBuildsCountry) => totalSpent += country.builds );
    return totalSpent;
  }

  const updateRecipientOptions = (countryIds: number[], buildsRemaining: number) => {
    const initialRowRecipientOptions: any = [];

    countryIds.forEach((id: number, index: number) => {
      initialRowRecipientOptions.push(transferOptions.options.filter((option: TransferBuildsCountry) => {
        return option.countryId === id || !countryIds.includes(option.countryId) || option.countryId === 0;
      }));
    });

    setRecipientOptions(initialRowRecipientOptions);
  }

  const cleanup = (amount: string) => {
    if (Number(amount) === 0) {
      const countryIds = giftedCountryIds;
      for (let index = transferOrders.length - 1; index >= 0; index--) {
        if (transferOrders[index].builds === 0) {
          transferOrders.splice(index, 1);
          countryIds.splice(index, 1);
        }
      }

      if (remainingBuilds > 0) {
        countryIds.push(0);

        transferOrders.push({
          countryId: 0,
          countryName: '--Keep Builds--',
          builds: 0
        });
      }

      setRecipientsArray(transferOrders);
      setGiftedCountryIds(countryIds);
      updateRecipientOptions(countryIds, transferOptions.builds - getTotalSpent());
    }
  }

  return (
    <div>
      <div className="build-transfer-row">
        <div style={{width: 100}}>Total Builds:</div>
        <div> {transferOptions.builds}</div>
      </div>
      <div className="build-transfer-row">
        <div style={{width: 100}}>Remaining:</div>
        <div>{remainingBuilds}</div>
      </div>
      {
        recipientsArray.map((row: TransferBuildsCountry, index: number) => {
          return (
            <div className="build-transfer-row" key={index}>
              <select onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                  handleTransferCountryChange(event.target.value, index);
                }} value={giftedCountryIds[index]}
              >
                {
                  rowRecipientsOptions
                    &&
                  rowRecipientsOptions[index].map((country: TransferTechCountry) =>
                    <option key={country.countryId} value={country.countryId}>{country.countryName}</option>
                  )
                }
              </select>
              <input type="number" min="0" value={row.builds}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  handleTransferAmountChange(event.target.value, index);
                }}
                onBlur={(event: ChangeEvent<HTMLInputElement>) => {
                  cleanup(event.target.value);
                }}
                disabled={row.countryId === 0}
              />
            </div>
          )
        })
      }
    </div>
  )
}