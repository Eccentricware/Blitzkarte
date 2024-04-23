import { FC, useEffect, useState } from "react";

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
    </div>
  )
}

export default TurnHistoryResults;