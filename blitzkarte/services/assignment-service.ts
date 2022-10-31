import { AssignmentRequestService } from "./request-services/assignment-request-service";

export class AssignmentService {
  assignmentRequestService: AssignmentRequestService = new AssignmentRequestService();

  registerAsPlayer(gameId: number) {
    this.assignmentRequestService.registerAsPlayer(gameId);
  }
}