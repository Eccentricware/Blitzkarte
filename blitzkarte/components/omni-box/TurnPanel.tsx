import { Button } from "@mui/material";
import { DateTime } from "luxon";
import { FC, useState } from "react";
import { BuildTransfer } from "./BuildTransfer";
import { BuildsPanel } from "./BuildsPanel";
import { DisbandsPanel } from "./DisbandsPanel";
import { NominationPanel } from "./NominationPanel";
import { TechTransfer } from "./TechTransfer";
import { Units } from "./Units";
import { VotingPanel } from "./VotingPanel";
import { SpecificTurnOptions } from "../../models/objects/OptionsObjects";
import { SingleTurnOrders } from "../../models/objects/OrdersObjects";
import { TurnStatus } from "../../models/enumeration/turn-status-enum";

interface TurnTabProps {
  options: SpecificTurnOptions;
  orders: SingleTurnOrders;
  setSubmitDisabled: Function;
  nudge: any;
}

export const TurnPanel: FC<TurnTabProps> = ({options, orders, setSubmitDisabled, nudge}: TurnTabProps) => {
  let frameColor = 'red';

  if (orders.turnStatus === TurnStatus.PENDING && !orders.default) {
    frameColor = 'green';
  }

  if (orders.turnStatus === TurnStatus.PRELIMINARY && orders.default) {
    frameColor = 'yellow';
  }

  if (orders.turnStatus === TurnStatus.PRELIMINARY && !orders.default) {
    frameColor = '#8facbd';
  }

  console.log('TurnPanel.orders', orders);
  return (
    <div style={{border: `${frameColor} solid 2px`, borderRadius: '7px'}}>
      <table style={{fontWeight: 'bold'}}>
        <tr><td>
          {options.status} Turn:</td><td>{options.name}
        </td></tr>
        <tr><td> Deadline:</td><td> {DateTime.fromISO(options.deadline.toString()).toLocaleString(DateTime.DATETIME_SHORT)}</td></tr>
      </table>
      { !options.applicable && <p style={{width: 395}}>{options.message}</p> }
      {
        options.votes && orders.votes
          &&
        <VotingPanel
          options={options.votes}
          orders={orders.votes}
        />
      }
      {
        (options.units && orders.units && orders.units.length > 0)
          &&
        <Units units={options.units} unitOrders={orders.units}
          nudge={nudge}
        />
      }
      {
        options.offerTechOptions && orders.techTransfer
          &&
        <TechTransfer giving={false} transferOptions={options.offerTechOptions} order={orders.techTransfer}/>
      }
      {
        options.receiveTechOptions && orders.techTransfer
          &&
        <TechTransfer giving={true} transferOptions={options.receiveTechOptions} order={orders.techTransfer}/>
      }
      {
        options.buildTransfers && orders.buildTransfers
          &&
        <BuildTransfer transferOptions={options.buildTransfers} transferOrders={orders.buildTransfers}/>
      }
      {
        options.builds && orders.builds
          &&
        <BuildsPanel options={options.builds} orders={orders.builds}/>
      }
      {
        options.disbands && orders.disbands
          &&
        <DisbandsPanel
          options={options.disbands}
          orders={orders.disbands}
          setSubmitDisabled={setSubmitDisabled}
        />
      }
      {
        options.nominations && orders.nomination
          &&
        <NominationPanel
          options={options.nominations}
          orders={orders.nomination}
          setSubmitDisabled={setSubmitDisabled}
        />
      }
    </div>
  )
}

export default TurnPanel;