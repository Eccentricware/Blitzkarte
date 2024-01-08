import { GameStats } from "../../models/objects/TurnOrdersObjects";
import { AbstractRequestService } from "./abstract-request-service";

export class HistoryRequestService extends AbstractRequestService {
  constructor() {
    super();
  }

  async getGameStats(gameId: number): Promise<GameStats> {
    return this.get(`history/stats/${gameId}`);
  }

  async getTurnHistory(gameId: number, turnNumber: number): Promise<any> {
    return this.get(`history/results/${gameId}/${turnNumber}`);
  }
}