import { User } from "firebase/auth";
import { useContext } from "react";
import Blitzkontext from "../../utils/Blitzkontext";
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
}