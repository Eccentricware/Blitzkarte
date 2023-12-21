import { Button } from "@mui/material";
import { FC, useState } from "react"
import { OptionsFinal } from "../../models/objects/OptionsObjects";
import { TurnOrders } from "../../models/objects/OrdersObjects";
import { OrderRequestService } from "../../services/request-services/order-request-service";
import TurnPanel from "./TurnPanel";

interface OrderOrdersProps {
  options: OptionsFinal;
  orders: TurnOrders;
  nudge: any;
}

export const OrdersTab: FC<OrderOrdersProps> = ({options, orders, nudge}: OrderOrdersProps) => {
  const [submitDisabled, setSubmitDisabled] = useState<boolean>(false);
  const orderRequestService = new OrderRequestService();
  const handleSubmitOrdersClick = () => {
    orderRequestService.submitOrders(orders);
  };

  console.log('OrdersTab.orders', orders);
  return (
    <div>
      {
        options.pending && orders.pending
          &&
        <TurnPanel
          options={options.pending}
          orders={orders.pending}
          setSubmitDisabled={setSubmitDisabled}
          nudge={nudge}
        />
      }
      {
        options.preliminary && orders.preliminary && options.preliminary.applicable
          &&
        <TurnPanel
          options={options.preliminary}
          orders={orders.preliminary}
          setSubmitDisabled={setSubmitDisabled}
          nudge={nudge}
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