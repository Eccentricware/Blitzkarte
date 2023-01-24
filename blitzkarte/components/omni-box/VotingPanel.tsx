import { FC, useEffect, useState } from "react";
import { Nomination, VotingOptions } from "../../models/objects/OptionsObjects";

interface VotingProps {
  options: VotingOptions;
  orders: {
    nominations: number[];
  };
}

export const VotingPanel: FC<VotingProps> = ({options, orders}: VotingProps) => {
  const [votes, setVotes] = useState(orders.nominations);

  const handleNominationClick = (nominationId: number) => {
    const newVotes = orders.nominations.slice();
    const index = newVotes.indexOf(nominationId);

    if (index > -1) {
      newVotes.splice(index, 1);
      orders.nominations.splice(index, 1);
    } else {
      newVotes.push(nominationId);
      orders.nominations.push(nominationId);
    }

    setVotes(newVotes);

    // setVotes(newVotes);
  }

  return (
    <div>
      <p>You can vote on any number of coalitions.
        {options.duplicateAlerts.length > 0 && ' Duplicates have been grouped.'}
      </p>
      {
        options.duplicateAlerts.map((alert: string, index: number) => (
          <p key={index}>{alert}</p>
        ))
      }
      <table>
        <tbody>
        {
          options.nominations.map((nomination: Nomination) => (
            <tr key={nomination.nominationId}>
              <td>
                {nomination.countries[0].countryName} | {nomination.countries[1].countryName} | {nomination.countries[2].countryName}
              </td>
              <td>
                {nomination.signature}
              </td>
              <td>
                {nomination.votesRequired}
              </td>
              <td>
                <input type="checkbox"
                  onChange={() => {
                    handleNominationClick(nomination.nominationId);
                  }}
                  checked={votes.includes(nomination.nominationId)}
                />
              </td>
            </tr>
          ))
        }
        </tbody>
      </table>
    </div>
  )
}