import { FC, useEffect, useState } from "react";
import { Nomination } from "../../models/objects/OptionsObjects";
import { HistoricNomination, HistoricNominationVote, HistoricYayVote } from "../../models/objects/HistoryObjects";

interface TurnHistoryResultsProps {
  turnResults: any;
}

const TurnHistoryResults: FC<TurnHistoryResultsProps> = ({turnResults}) => {
  console.log('turnResults', turnResults);
  return (
    <div>
      {
        (turnResults && turnResults.orderList) &&
        turnResults.orderList.map((countryOrders: any, index: number) =>
          <div key={index}>
            <b>{countryOrders.countryName}</b>
            {
              countryOrders.orders.trades.tech &&
              <div>{countryOrders.orders.trades.tech}</div>
            }
            <div>
              {
                countryOrders.orders.trades.builds.map((build: any, index: number) =>
                  <div key={index}>
                    <div>
                      Give { build.quantity } BB{ build.quantity > 1 ? 's' : '' } to { build.recipientName }
                    </div>
                  </div>
                )
              }
            </div>
            <div>
              {
                countryOrders.orders.units.map((unitOrder: any, index: number) =>
                  <div key={index}>
                    <div>
                      { unitOrder.description }
                    </div>
                    { unitOrder.primaryResolution && <div>&#x2022; {unitOrder.primaryResolution}</div> }
                    { unitOrder.secondaryResolution && <div>&#x2022; {unitOrder.secondaryResolution}</div> }
                  </div>
                )
              }
            </div>
            <div>
              {
                countryOrders.orders.adjustments.map((adjustment: any, index: number) =>
                  <div key={index}>{ adjustment.description }</div>
                )
              }
            </div>
          </div>
        )
      }
      {
        (turnResults && turnResults.nominations) &&
        <div>
          <div>Nominations are always anonymous.</div>
        <table>
          <thead>
            <tr>
              <th>Coalition</th>
              <th>Signature</th>
              <th>Votes Req</th>
            </tr>
          </thead>
          <tbody>
          {
            turnResults.nominations.map((nomination: HistoricNomination) => (
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
              </tr>
            ))
          }
          </tbody>
        </table>
        </div>
      }
      {
        (turnResults && turnResults.votes) &&
        <div>
          {
            turnResults.votes.map((coalition: HistoricNominationVote) => (
              <div key={coalition.nominationId} style={{border: `2px solid ${coalition.winner ? 'green' : 'gray'}`, padding: 5, borderRadius: 5}}>
                <div><b>Coalition: </b>{coalition.countries[0].countryName} ({coalition.countries[0].rank.toUpperCase()}) | {coalition.countries[1].countryName} ({coalition.countries[1].rank.toUpperCase()}) | {coalition.countries[2].countryName} ({coalition.countries[2].rank.toUpperCase()})</div>
                <div><b>Votes Required:</b> {coalition.votesRequired} ({coalition.signature})</div>
                <div><b>Votes Received:</b> {coalition.votesReceived}</div>
                {
                  coalition.votesReceived - coalition.votesRequired >= 0
                  ? <div style={{color: 'green'}}><b>Win Margin: {coalition.votesReceived - coalition.votesRequired}</b></div>
                  : <div style={{color: 'red'}}><b>Votes Short: {coalition.votesRequired - coalition.votesReceived}</b></div>
                }
                <div><b>Yay Votes:</b></div>
                <div>
                  {
                    coalition.yayVotes.map((vote: HistoricYayVote, index: number) => (
                      <div key={index}>
                        {vote.countryName}: {vote.votesControlled}
                      </div>
                    ))
                  }
                </div>
              </div>
            ))
          }
        </div>
      }
    </div>
  )
}

export default TurnHistoryResults;