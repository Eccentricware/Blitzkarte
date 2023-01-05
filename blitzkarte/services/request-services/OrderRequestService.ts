import { AbstractRequestService } from "./abstract-request-service";

export class MapRequestService extends AbstractRequestService {
  constructor() {
    super();
  }

  async getCurrentMap(gameId: number): Promise<any> {
    return this.get(`maps/${gameId}/current`);
  }
}