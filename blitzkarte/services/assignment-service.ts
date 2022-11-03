import { AssignmentRequestService } from "./request-services/assignment-request-service";

export class AssignmentService {
  assignmentRequestService: AssignmentRequestService = new AssignmentRequestService();

  registerUser(gameId: number, assignmentType: string) {
    this.assignmentRequestService.registerUser(gameId, assignmentType);
  }
}