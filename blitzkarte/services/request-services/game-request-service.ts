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

  async startGame(gameId: number): Promise<any> {
    return this.post('games/start', {
      gameId: gameId
    });
  }
}