import { Button } from "@mui/material";
import { FC, useState } from "react"
import { OptionsFinal } from "../../models/objects/OptionsObjects";
import { TurnOrders } from "../../models/objects/OrdersObjects";
import { OrderRequestService } from "../../services/request-services/order-request-service";
import TurnPanel from "./TurnPanel";

interface OrdersProps {
  options: OptionsFinal;
  orders: TurnOrders;
  // nudge: any;
}

export const OrdersTab: FC<OrdersProps> = ({options, orders}: OrdersProps) => {
  const orderRequestService = new OrderRequestService();

  const [submitDisabled, setSubmitDisabled] = useState<boolean>(false);
  const [showAcknowledge, setShowAcknowledge] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);

  const handleSubmitOrdersClick = () => {
    orderRequestService.submitOrders(orders)
      .then((response) => {
        if (response.success) {
          setShowAcknowledge(true);
          setTimeout(() => {
            setShowAcknowledge(false);
          }, 3000);
        } else {
          setShowError(true);
          setTimeout(() => {
            setShowError(false);
          }, 3000);
        }
      });
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
          // nudge={nudge}
        />
      }
      {
        options.preliminary && orders.preliminary && options.preliminary.applicable
          &&
        <TurnPanel
          options={options.preliminary}
          orders={orders.preliminary}
          setSubmitDisabled={setSubmitDisabled}
          // nudge={nudge}
        />
      }
      {
        options.countryId > 0 &&
        <Button
          color="inherit"
          variant="contained"
          onClick={handleSubmitOrdersClick}
          disabled={submitDisabled}
        >
          Submit Orders
        </Button>
      }
      { showAcknowledge && <div>Orders submitted successfully!</div> }
      { showError && <div>Orders failed to submit!</div> }
    </div>
  )
}