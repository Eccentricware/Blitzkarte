import { Button } from "@mui/material";
import { DateTime } from "luxon";
import { FC, useState } from "react"
import { TurnOptionsFinal } from "../../models/objects/OptionsObjects";
import { TurnOrdersFinal } from "../../models/objects/OrdersObjects";
import { DoubleTurnOptions, TurnOrders, UnitOrder } from "../../models/objects/TurnOrdersObjects";
import { OrderRequestService } from "../../services/request-services/order-request-service";
import { BuildsPanel } from "./BuildsPanel";
import { BuildTransfer } from "./BuildTransfer";
import { DisbandsPanel } from "./DisbandsPanel";
import { TechTransfer } from "./TechTransfer";
import { TurnOrdersPanel } from "./TurnOrdersPanel";
import { Units } from "./Units";

interface OrderOrdersProps {
  options: TurnOptionsFinal;
  orders: TurnOrdersFinal;
  nudge: any;
}

export const OrdersTab: FC<OrderOrdersProps> = ({options, orders, nudge}: OrderOrdersProps) => {
  const [submitDisabled, setSubmitDisabled] = useState<boolean>(false);
  const orderRequestService = new OrderRequestService();
  const handleSubmitOrdersClick = () => {
    orderRequestService.submitOrders(orders);
  };
  const pendingColor = orders.pendingDefault === true ? 'red' : 'green';
  const preliminaryColor = orders.pendingDefault === true ? 'yellow' : '#8facbd';

  console.log('OrdersTab.orders', orders);
  return (
    <div>
      {
        options.pending
          &&
        <div style={{border: `${pendingColor} solid 2px`, borderRadius: '7px', fontWeight: 'bold'}}>
          <table>
            <tbody>
              <tr><td>Pending Turn:</td><td>{options.pending.name}</td></tr>
              <tr><td> Deadline:</td><td> {options.pending.deadline}</td></tr>
            </tbody>
          </table>
        </div>
      }
      {
        options.preliminary
          &&
        <div  style={{border: `${preliminaryColor} solid 2px`, borderRadius: '7px', fontWeight: 'bold'}}>
          <b>
            <table>
              <tr><td>Pending Turn:</td><td>{options.preliminary.name}</td></tr>
              <tr><td> Deadline:</td><td> {options.preliminary.deadline}</td></tr>
            </table>
          </b>
        </div>
      }

      {
        options.units
          &&
        <Units units={options.units} unitOrders={orders.units} nudge={nudge}/>
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
      <Button
        color="inherit"
        variant="contained"
        onClick={handleSubmitOrdersClick}
        disabled={submitDisabled}
      >
        Submit Orders
      </Button>
    </div>
  )
}