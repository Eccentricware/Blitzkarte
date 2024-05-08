import { CSSProperties, FC, Fragment, useEffect, useState } from "react";
import { Nomination } from "../../models/objects/OptionsObjects";
import { HistoricNomination, HistoricNominationVote, HistoricYayVote } from "../../models/objects/HistoryObjects";
import { TurnType } from "../../models/enumeration/TurnTypeEnum";

interface TurnHistoryResultsProps {
  turnResults: any;
}

const TurnHistoryResults: FC<TurnHistoryResultsProps> = ({turnResults}) => {
  console.log('turnResults', turnResults);

  const style: CSSProperties = {
    height: window.innerHeight - 114,
    overflowY: 'scroll',
  }

  return (
    <div style={style}>
      {
        (turnResults && turnResults.orderList) &&
        turnResults.orderList.map((countryOrders: any, index: number) =>
          <div key={index}>
            <b>{countryOrders.countryName}</b> ({countryOrders.username ? countryOrders.username : 'Civil Disorder'}) {
              [TurnType.ADJUSTMENTS, TurnType.ADJ_AND_NOM].includes(turnResults.turnType)
              && <Fragment>(Adj: {countryOrders.history.start.adjustments >= 0 ? '+' : '-'}
              {countryOrders.history.start.adjustments} | BB: {countryOrders.history.start.bankedBuilds})</Fragment>
            }
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
              {
                countryOrders.orders.buildsBanked > 0 &&
                <div>New Banked Builds: {countryOrders.orders.buildsBanked}</div>
              }
              {
                countryOrders.orders.buildsStartingNukes > 0 &&
                <div>New Nukes Started: {countryOrders.orders.buildsStartingNukes}</div>
              }
              {
                countryOrders.orders.buildsIncreasingRange > 0 &&
                <div>Builds Increasing Range: {countryOrders.orders.buildsIncreasingRange}</div>
              }
              {
                countryOrders.orders.bankedBuildsIncreasingRange > 0 &&
                <div>Banked Builds Spent Increasing Range: {countryOrders.orders.bankedBuildsIncreasingRange}</div>
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
                <div><b>Yay Votes: </b>{!coalition.yayVotes && 'None'}</div>
                <div>
                  {
                    coalition.yayVotes?.map((vote: HistoricYayVote, index: number) => (
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