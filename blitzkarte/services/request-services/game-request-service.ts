import { AbstractRequestService } from "./abstract-request-service";

export class GameRequestService extends AbstractRequestService {
  constructor() {
    super();
  }

  async getGames(): Promise<any> {
    return this.get('find-games');
  }
}