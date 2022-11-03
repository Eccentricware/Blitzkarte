import { AbstractRequestService } from "./abstract-request-service";

export class AssignmentRequestService extends AbstractRequestService {
  constructor() {
    super();
  }

  async registerUser(gameId: number, assignmentType: string) {
    return this.post(`assignments/register/`, {
      gameId: gameId,
      assignmentType: assignmentType
    });
  };

  async unregisterUser(gameId: number, assignmentType: string) {
    return this.post(`assignments/unregister/`, {
      gameId: gameId,
      assignmentType: assignmentType
    });
  };
}