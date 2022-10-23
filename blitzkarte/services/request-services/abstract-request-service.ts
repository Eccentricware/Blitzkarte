import { async } from "@firebase/util";
import { User } from "firebase/auth";
import { useContext } from "react";
import Blitzkontext from "../../utils/Blitzkontext";

export class AbstractRequestService {
  host: string | undefined;
  port: string | undefined = process.env.NEXT_PUBLIC_DEV_PORT;
  user: User | undefined;

  constructor() {
    switch(process.env.NEXT_PUBLIC_ENVIRONMENT) {
      case 'dev':
        this.host = process.env.NEXT_PUBLIC_DEV_HOST;
        break;
      case 'test':
        this.host = process.env.NEXT_PUBLIC_TEST_HOST;
        break;
      case 'prod':
        this.host = process.env.NEXT_PUBLIC_PROD_HOST;
        break;
    }

    const bkCtx = useContext(Blitzkontext);
    this.user = bkCtx.user.user;
  }

  async post(route: string, payload: any): Promise<any> {
    return this.user?.getIdToken()
      .then(async (idToken: string) => {
        return await this.basePostRequest(
          route,
          idToken,
          payload
        );
      });
  }

  async basePostRequest(
    route: string,
    idToken: string | undefined,
    payload: any
  ): Promise<any> {
    idToken = idToken ? idToken : '';

    return fetch(`${this.host}:${this.port}/${route}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        idToken: idToken
      },
      body: JSON.stringify(payload)
    })
    .then((anything: any) => {
      return anything.json();
    })
    .then((data: any) => {
      return data;
    })
    .catch((error: Error) => {
      console.log('Base Fetch Request Error: ' + error.message);
    });
  }


  async get(route: string): Promise<any> {
    const idToken = await this.user?.getIdToken();

    return await this.baseGetRequest(
      route,
      idToken
    );
  }

  async baseGetRequest(
    route: string,
    idToken: string | undefined
  ): Promise<any> {
    idToken = idToken ? idToken : '';

    return fetch(`${this.host}:${this.port}/${route}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        idToken: idToken
      }
    })
    .then((anything: any) => {
      return anything.json();
    })
    .then((data: any) => {
      return data;
    })
    .catch((error: Error) => {
      console.log('Base Fetch Request Error: ' + error.message);
    });
  }

}