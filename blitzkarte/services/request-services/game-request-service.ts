import { GameFinderParameters } from "../../models/objects/GameFinderObjects";
import { AbstractRequestService } from "./abstract-request-service";

export class GameRequestService extends AbstractRequestService {
  constructor() {
    super();
  }

  async getGames(idToken: string, parameters: GameFinderParameters): Promise<any> {
    return this.get(
      `games/search`
        + `?playing=${parameters.playing}`
        + `&creator=${parameters.creator}`
        + `&administrator=${parameters.administrator}`
    );
  }

  async getGameDetails(gameId: number): Promise<any> {
    return this.get(`games/details/${gameId}`);
  }

  async checkAvailability(gameName: string): Promise<any> {
    return this.get(`games/check-name/${gameName}`);
  }

  async createGame(gameData: any): Promise<any> {
    return this.post('games/create', gameData);
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
}