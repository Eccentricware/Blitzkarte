import { async } from "@firebase/util";
import { User } from "firebase/auth";
import { useContext } from "react";
import Blitzkontext from "../../utils/Blitzkontext";

export class AbstractRequestService {
  host: string | undefined;
  port: string | undefined = process.env.NEXT_PUBLIC_DEV_PORT;
  user: User | undefined;
  idToken: string = '';

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

    if (this.user) {
      this.user.getIdToken()
        .then((idToken: string) => {
          this.idToken = idToken;
        });
    }
  }

  async get(route: string, idToken?: string): Promise<any> {
    // const idToken = await this.user?.getIdToken();

    return await this.baseGetRequest(
      route,
      idToken ? idToken : this.idToken
    );
  }

  async baseGetRequest(
    route: string,
    idToken: string
  ): Promise<any> {
    return fetch(`${this.host}:${this.port}/${route}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        idToken: idToken
      }
    })
    .then((response: any) => {
      return response.json();
    })
    .then((data: any) => {
      console.log(`GET ${route} Success:`, data);
      return data;
    })
    .catch((error: Error) => {
      console.log(`GET ${route} Error:`, error.message);
    });
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
    .then((response: any) => {
      return response.json();
    })
    .then((data: any) => {
      console.log(`POST ${route} Success:`, data);
      return data;
    })
    .catch((error: Error) => {
      console.log(`POST ${route} Error:`, error.message);
    });
  }


  async put(route: string, payload: any): Promise<any> {
    return this.user?.getIdToken()
      .then(async (idToken: string) => {
        return await this.basePutRequest(
          route,
          idToken,
          payload
        );
      });
  }

  async basePutRequest(
    route: string,
    idToken: string | undefined,
    payload: any
  ): Promise<any> {
    idToken = idToken ? idToken : '';

    return fetch(`${this.host}:${this.port}/${route}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        idToken: idToken
      },
      body: JSON.stringify(payload)
    })
    .then((response: any) => {
      return response.json();
    })
    .then((data: any) => {
      console.log(`PUT ${route} Success:`, data);
      return data;
    })
    .catch((error: Error) => {
      console.log(`PUT ${route} Error:`, error.message);
    });
  }
}