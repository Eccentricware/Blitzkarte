import { User } from "firebase/auth";
import { AbstractRequestService } from "./abstract-request-service";

export class GameRequestService extends AbstractRequestService {
  constructor() {
    super();
  }

  async getGames(): Promise<any> {
    return this.get('find-games');
  }

  async checkAvailability(gameName: string): Promise<any> {
    return this.get(`check-game-name/${gameName}`);
  }

  async update(gameData: any): Promise<any> {
    console.log('gameRequest gameData:', gameData);
    return this.put('update-game', {
      gameData: gameData
    });
  }
}