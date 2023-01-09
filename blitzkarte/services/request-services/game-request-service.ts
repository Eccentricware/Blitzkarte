import { AbstractRequestService } from "./abstract-request-service";

export class GameRequestService extends AbstractRequestService {
  constructor() {
    super();
  }

  async getGames(): Promise<any> {
    return this.get('games/search');
  }

  async getGameDetails(gameId: number): Promise<any> {
    return this.get(`games/details/${gameId}`);
  }

  async checkAvailability(gameName: string): Promise<any> {
    return this.get(`games/check-name/${gameName}`);
  }

  async update(gameData: any): Promise<any> {
    return this.put('games/update', {
      gameData: gameData
    });
  }

  async declareReady(gameId: number): Promise<any> {
    return this.post('games/declare-ready', {
      gameId: gameId
    });
  }

  async cancelGame(gameId: number): Promise<any> {
    return this.post('games/cancel', {
      gameId: gameId
    });
  }

  async getStatsTable(gameId: number): Promise<any> {
    return this.get(`games/stats/${gameId}`);
  }
}