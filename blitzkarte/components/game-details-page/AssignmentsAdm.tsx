import { FC } from "react";

interface AssignmentsAdmProps {
  assignmentData: any;
}

export const AssignmentsAdm: FC<AssignmentsAdmProps> = ({assignmentData}: AssignmentsAdmProps) => {
  console.log('Environment: ', process.env.NEXT_PUBLIC_TEST_VAR);
  return (
    <div>You're an admin, {process.env.NEXT_PUBLIC_TEST_VAR}!</div>
  )
}