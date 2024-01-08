import { FC, useEffect, useState } from "react";

interface TurnHistoryResultsProps {
  turnResults: any;
}

const TurnHistoryResults: FC<TurnHistoryResultsProps> = ({turnResults}) => {
  console.log('turnResults', turnResults);
  return (
    <div>
      {
        turnResults.orderList.map((countryOrders: any, index: number) =>
          <div key={index}><b>{countryOrders.countryName}</b> orders will be here!</div>
        )
      }
    </div>
  )
}

export default TurnHistoryResults;