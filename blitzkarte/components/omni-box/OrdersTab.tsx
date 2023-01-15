import { Button } from "@mui/material";
import { FC } from "react"
import { TurnOptionsFinal } from "../../models/objects/OptionsObjects";
import { TurnOrdersFinal } from "../../models/objects/OrdersObjects";
import { DoubleTurnOptions, TurnOrders, UnitOrder } from "../../models/objects/TurnOrdersObjects";
import { OrderRequestService } from "../../services/request-services/order-request-service";
import { BuildsPanel } from "./BuildsPanel";
import { BuildTransfer } from "./BuildTransfer";
import { TechTransfer } from "./TechTransfer";
import { TurnOrdersPanel } from "./TurnOrdersPanel";
import { Units } from "./Units";

interface OrderOrdersProps {
  options: TurnOptionsFinal;
  orders: TurnOrdersFinal;
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
        <Units units={options.units} unitOrders={orders.units} nudge={nudge}/>
      }
      {
        options.offerTechOptions && orders.techTransfers
          &&
        <TechTransfer giving={false} transferOptions={options.offerTechOptions} order={orders.techTransfers[0]}/>
      }
      {
        options.receiveTechOptions && orders.techTransfers
          &&
        <TechTransfer giving={true} transferOptions={options.receiveTechOptions} order={orders.techTransfers[0]}/>
      }
      {
        options.buildTransfers && orders.buildTransfers
          &&
        <BuildTransfer transferOptions={options.buildTransfers} transferOrders={orders.buildTransfers}/>
      }
      {
        options.builds && orders.builds
          &&
        <BuildsPanel options={options.builds} orders={orders.builds[0]}/>
      }
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