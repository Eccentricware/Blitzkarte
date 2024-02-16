export interface AssignmentDetails {
  assignmentId: number;
  countryId: number;
  countryName: string;
  rank: string;
  playerId: number;
  username: string;
  assignmentStatus: string;
  contactPreferences: ContactPreferences;
}

export interface ContactPreferences {
  preferredMethod: string;
  email: string;
  discord: string;
  slack: string;
  inGame: boolean;
  otherMethod: string;
  otherHandle: string;
}