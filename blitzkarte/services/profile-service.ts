import { User } from "firebase/auth";
import { erzahler } from "../utils/general/erzahler";

export class ProfileService {
  async getUserProfile(user: User) {
    const idToken = await user.getIdToken();

    return fetch(`${erzahler.url}:${erzahler.port}/get-profile/${idToken}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response: any) => {
      return response.json();
    }).then((data: any) => {
      return data;
    })
    .catch((error: Error) => {
      console.log(error.message);
    })
  }

}