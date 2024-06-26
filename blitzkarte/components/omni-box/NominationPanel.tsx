import { ChangeEvent, FC, useCallback, useEffect, useState } from "react";
import { NominatableCountry, NominationOptions } from "../../models/objects/OptionsObjects";
import { NominationOrder } from "../../models/objects/OrdersObjects";

interface NominationProps {
  options: NominationOptions;
  orders: NominationOrder;
  setSubmitDisabled: Function;
}

export const NominationPanel: FC<NominationProps> = ({options, orders, setSubmitDisabled}: NominationProps) => {
  const [candidateOptions, setCandidateOptions] = useState<NominatableCountry[][]>([[],[],[]]);
  const [nominations, setNominations] = useState<number[]>(orders.countryIds);
  const [coalitionSignature, setCoalitionSignature] = useState<string>(orders.coalitionSignature);
  const [victoryReq, setVictoryReq] = useState<number | string>(options.victoryBase);

  const updateCandidateOptionsLists = useCallback(() => {
    const newCandidateOptions: NominatableCountry[][] = [];

    nominations.forEach((countryId: number) => {
      const slotOptions = options.countries.filter((country: NominatableCountry) =>
        !nominations.includes(country.countryId) || country.countryId === countryId || country.countryId === 0
      );

      newCandidateOptions.push(slotOptions);
    });

    setCandidateOptions(newCandidateOptions);
  }, [
    nominations,
    options.countries
  ])

  const updateThresholdDetails = useCallback(() => {
    let newVictoryReq = options.victoryBase;
    let nominationInvalid = false;
    let sameChecks: number[] = [];
    let signature: string[] = [];

    nominations.forEach((countryId: number) => {
      const country = options.countries.find((country: NominatableCountry) => country.countryId === countryId);

      if (country) {
        newVictoryReq += country.penalty ? country?.penalty : 0;
        signature.push(country.rank);
      }

      if (sameChecks.includes(countryId) || countryId === 0) {
        nominationInvalid = true;
      }
      sameChecks.push(countryId);
    });

    setCoalitionSignature(signature.sort().join('').toUpperCase());
    setSubmitDisabled(nominationInvalid);
    setVictoryReq(nominationInvalid ? 'N/A' : newVictoryReq);
  }, [
    nominations,
    options.countries,
    options.victoryBase,
    setSubmitDisabled
  ]);

  useEffect(() => {
    updateCandidateOptionsLists();
    updateThresholdDetails();
  }, [
    updateCandidateOptionsLists,
    updateThresholdDetails
  ]);

  const handleNominatedChange = useCallback((id: string, index: number) => {
    const countryId = Number(id);
    const newNominations = orders.countryIds;

    const country = options.countries.find((country: NominatableCountry) => country.countryId === countryId);
    if (country) {
      newNominations[index] = country.countryId;

      orders.countryDetails[index] = {
        countryId: country.countryId,
        countryName: country.countryName,
        rank: country.rank
      };
    }

    setNominations(newNominations);
    updateCandidateOptionsLists();
    updateThresholdDetails();
  }, [
    options.countries,
    orders.countryIds,
    orders.countryDetails,
    updateCandidateOptionsLists,
    updateThresholdDetails
  ])

  return (
    <div>
      <p className="omni-paragraph">Nominate a coalition for victory from any 3 surviving countries.</p>
      <div>
      {
        candidateOptions.map((options: NominatableCountry[], index) =>
          <select className="nomination-list"
            key={index}
            value={nominations[index]}
            onChange={(event: ChangeEvent<HTMLSelectElement>) => {
              handleNominatedChange(event.target.value, index);
            }}
          >
            {
              candidateOptions[index].map((option: NominatableCountry) =>
                <option key={option.countryId} value={option.countryId}>
                  {option.countryName} {option.countryId !== 0 && `(${option.rank.toUpperCase()})`}
                </option>
              )
            }
          </select>
        )
      }
      </div>
      <p className="omni-paragraph">Coalition Signature: {coalitionSignature}</p>
      <p className="omni-paragraph">Votes Required: {victoryReq}</p>
    </div>
  )
}