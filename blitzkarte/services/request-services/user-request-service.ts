import { AbstractRequestService } from "./abstract-request-service";

export class UserRequestService extends AbstractRequestService {
  constructor() {
    super();
  }

  async getUserProfile() {
    return this.get('user/profile');
  }

  async saveProfileChange(payload: any) {
    this.put('user/update-settings', payload);
  }

  async reportGuest(guestId: string) {
    this.get(`user/report-guest/${guestId}`);
  }
}