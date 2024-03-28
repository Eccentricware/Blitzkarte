import { ChangeEvent, FC, useCallback, useEffect, useState } from "react";
import { TransferBuildOrder, TransferBuildsOption, TransferTechCountry } from "../../models/objects/OptionsObjects";
import { tr } from "date-fns/locale";

interface Props {
  transferOptions: {
    builds: number;
    options: TransferBuildsOption[];
  };
  transferOrders: TransferBuildOrder[];
}

export const BuildTransfer: FC<Props> = ({transferOptions, transferOrders}: Props) => {
  const [remainingBuilds, setRemainingBuilds] = useState(transferOptions.builds);
  const [recipientsArray, setRecipientsArray] = useState<TransferBuildOrder[]>(transferOrders);
  const [giftedCountryIds, setGiftedCountryIds] = useState<number[]>([]);
  const [rowRecipientsOptions, setRecipientOptions] = useState<TransferTechCountry[][] | undefined>(undefined);



  const handleTransferCountryChange = (id: string, index: number) => {
    const updatedGiftedIds = giftedCountryIds.slice();
    const countryId = Number(id);
    const country = transferOptions.options.find((option: any ) => option.countryId === countryId);

    if (country) {
      if (countryId !== 0) {
        transferOrders[index] = {
          recipientId: countryId,
          recipientName: country.countryName,
          quantity: transferOrders[index].quantity
        };
        updatedGiftedIds[index] = countryId;

      }
      if (countryId === 0 && index !== transferOrders.length - 1) {
        const newRemainingBuilds = remainingBuilds + transferOrders[index].quantity;
        updatedGiftedIds.splice(index, 1);
        transferOrders.splice(index, 1);
        setRemainingBuilds(newRemainingBuilds);

      } else if (countryId === 0) {
        const newRemainingBuilds = remainingBuilds + transferOrders[index].quantity;
        updatedGiftedIds[index] = countryId;
        transferOrders[index] = {
          recipientId: countryId,
          recipientName: country.countryName,
          quantity: 0
        };
        setRemainingBuilds(newRemainingBuilds);
       }

      setRecipientsArray(transferOrders);
      setGiftedCountryIds(updatedGiftedIds);
      updateRecipientOptions(updatedGiftedIds, remainingBuilds);
    }
  }

  const handleTransferAmountChange = (amount: string, index: number) => {
    const startAmount = transferOrders[index].quantity;
    let totalSpent = getTotalSpent();
    const max = (transferOptions.builds - totalSpent) + startAmount;

    let updatedAmount = Number(amount);
    if (updatedAmount > max) {
      updatedAmount = max;
    }

    transferOrders[index].quantity = updatedAmount;

    let newRemainingBuilds = transferOptions.builds - getTotalSpent();

    if (newRemainingBuilds > 0 && transferOrders[transferOrders.length - 1].recipientId !== 0) {
      const countryIds = giftedCountryIds;
      countryIds.push(0);

      transferOrders.push({
        recipientId: 0,
        recipientName: '--Keep Builds--',
        quantity: 0
      });
      setGiftedCountryIds(countryIds);
      updateRecipientOptions(countryIds, transferOptions.builds - getTotalSpent());
    }

    if ((updatedAmount === 0 || newRemainingBuilds === 0) && transferOrders[transferOrders.length - 1].recipientId === 0) {
      const countryIds = giftedCountryIds;
      countryIds.pop();
      transferOrders.pop();
      setGiftedCountryIds(countryIds);
      updateRecipientOptions(countryIds, transferOptions.builds - getTotalSpent());
    }


    setRemainingBuilds(newRemainingBuilds);
    setRecipientsArray(transferOrders);
  }

  const getTotalSpent = useCallback((): number => {
    let totalSpent = 0;
    recipientsArray.forEach((country: TransferBuildOrder) => totalSpent += country.quantity );
    return totalSpent;
  }, [recipientsArray])

  const updateRecipientOptions = useCallback((countryIds: number[], buildsRemaining: number) => {
    const initialRowRecipientOptions: any = [];

    countryIds.forEach((id: number, index: number) => {
      initialRowRecipientOptions.push(transferOptions.options.filter((option: TransferBuildsOption) => {
        return option.countryId === id || !countryIds.includes(option.countryId) || option.countryId === 0;
      }));
    });

    setRecipientOptions(initialRowRecipientOptions);
  }, [transferOptions.options])

  const cleanup = (amount: string) => {
    if (Number(amount) === 0) {
      const countryIds = giftedCountryIds;
      for (let index = transferOrders.length - 1; index >= 0; index--) {
        if (transferOrders[index].quantity === 0) {
          transferOrders.splice(index, 1);
          countryIds.splice(index, 1);
        }
      }

      if (remainingBuilds > 0) {
        countryIds.push(0);

        transferOrders.push({
          recipientId: 0,
          recipientName: '--Keep Builds--',
          quantity: 0
        });
      }

      setRecipientsArray(transferOrders);
      setGiftedCountryIds(countryIds);
      updateRecipientOptions(countryIds, transferOptions.builds - getTotalSpent());
    }
  }

  useEffect(() => {
    const countryIds = transferOrders.map((country: TransferBuildOrder) => country.recipientId );

    if (remainingBuilds > 0) {
      countryIds.push(0);

      transferOrders.push({
        recipientId: 0,
        recipientName: '--Keep Builds--',
        quantity: 0
      });
      setRecipientsArray(transferOrders);
    }

    setGiftedCountryIds(countryIds);
    updateRecipientOptions(countryIds, transferOptions.builds - getTotalSpent());
    setRemainingBuilds(transferOptions.builds - getTotalSpent());
  }, [
    getTotalSpent,
    remainingBuilds,
    transferOptions.builds,
    transferOrders,
    updateRecipientOptions
  ]);

  return (
    <div style={{padding: 5}}>
      <div className="build-transfer-row">
        <div style={{width: 110}}>Banked Builds:</div>
        <div> {transferOptions.builds}</div>
      </div>
      <div className="build-transfer-row">
        <div style={{width: 110}}>Remaining:</div>
        <div>{remainingBuilds}</div>
      </div>
      {
        recipientsArray.map((row: TransferBuildOrder, index: number) => {
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
              <input type="number" min="0" value={row.quantity}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  handleTransferAmountChange(event.target.value, index);
                }}
                onBlur={(event: ChangeEvent<HTMLInputElement>) => {
                  cleanup(event.target.value);
                }}
                disabled={row.recipientId === 0}
              />
            </div>
          )
        })
      }
    </div>
  )
}