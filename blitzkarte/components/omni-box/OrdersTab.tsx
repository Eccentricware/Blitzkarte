import { Button } from "@mui/material";
import { FC } from "react"
import { TurnOptionsFinal } from "../../models/objects/OptionsObjects";
import { DoubleTurnOptions, UnitOrder } from "../../models/objects/TurnOrdersObjects";
import { OrderRequestService } from "../../services/request-services/order-request-service";
import { BuildTransfer } from "./BuildTransfer";
import { TechTransfer } from "./TechTransfer";
import { TurnOrdersPanel } from "./TurnOrdersPanel";
import { Units } from "./Units";

interface OrderOrdersProps {
  options: TurnOptionsFinal;
  orders: any;
  nudge: any;
}

export const OrdersTab: FC<OrderOrdersProps> = ({options, orders, nudge}: OrderOrdersProps) => {
  const orderRequestService = new OrderRequestService();
  const handleSubmitOrdersClick = () => {
    orderRequestService.submitOrders(orders);
  };

  console.log('OrdersTab.orders', orders);
  return (
    <div>
      {
        options.units
          &&
        <Units units={options.units}
          unitOrders={orders.units}
          nudge={nudge}
        />
      }
      {
        options.buildTransfers
          &&
        <BuildTransfer transferOptions={options.buildTransfers}/>
      }
      {
        options.offerTechOptions
          &&
        <TechTransfer transferOptions={options.offerTechOptions}/>
      }
      {/* {
        options.pending
        && <TurnOrdersPanel turnOptions={options.pending} orders={orders.pending} nudge={nudge}/>
      }
      {
        options.preliminary
        && <TurnOrdersPanel turnOptions={options.preliminary} orders={orders.preliminary} nudge={nudge}/>
      } */}
      <Button
        color="inherit"
        variant="contained"
        onClick={handleSubmitOrdersClick}
      >
        Submit Orders
      </Button>
    </div>
  )
}