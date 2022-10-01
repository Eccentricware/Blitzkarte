import { FC } from "react";

interface AssignmentsAdmProps {
  assignmentData: any;
}

export const AssignmentsAdm: FC<AssignmentsAdmProps> = ({assignmentData}: AssignmentsAdmProps) => {
  return (
    <div>You're an admin, Harry!</div>
  )
}