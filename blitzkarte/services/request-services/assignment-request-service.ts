import { AbstractRequestService } from "./abstract-request-service";

export class AssignmentRequestService extends AbstractRequestService {
  constructor() {
    super();
  }

  async getAssignmentData(gameId: number): Promise<any> {
    console.log('user', this.user);
    return this.get(`assignments/${gameId}`);
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

  async assignUser(gameId: number, userId: number, countryId: number) {
    await this.post(`assignments/assign-player/`, {
      gameId: gameId,
      userId: userId,
      countryId: countryId
    });
  }

  async lockAssignment(gameId: number, userId: number) {
    return await this.put('assignments/lock-assignment', {
      gameId: gameId,
      userId: userId
    });
  }

  async unlockAssignment(gameId: number, userId: number) {
    return await this.put('assignments/unlock-assignment', {
      gameId: gameId,
      userId: userId
    });
  }
}