import { UserRequestService } from "../../services/request-services/user-request-service";

export const reportGuest = () => {
  const userRequestService = new UserRequestService();

  let guestId = localStorage.getItem('guestId');

  if (!guestId) {
    guestId = String(Math.floor(Math.random() * 1000000000));
    localStorage.setItem('guestId', guestId);
  }

  userRequestService.reportGuest(guestId);
}