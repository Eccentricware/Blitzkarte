import { User } from "firebase/auth";
import { AbstractRequestService } from "./abstract-request-service";

export class GameRequestService extends AbstractRequestService {
  constructor() {
    super();
  }

  async getGames(): Promise<any> {
    return this.get('games/search');
  }

  async checkAvailability(gameName: string): Promise<any> {
    return this.get(`games/check-game-name/${gameName}`);
  }

  async update(gameData: any): Promise<any> {
    return this.put('games/update', {
      gameData: gameData
    });
  }
}