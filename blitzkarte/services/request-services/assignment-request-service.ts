import { AbstractRequestService } from "./abstract-request-service";

export class AssignmentRequestService extends AbstractRequestService {
  constructor() {
    super();
  }

  async registerAsPlayer(gameId: number) {
    return this.post(`assignments/register/`, {
      gameId: gameId,
      assignmentType: 'Player'
    });
  };
}