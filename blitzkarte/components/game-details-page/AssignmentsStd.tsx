import { FC } from "react";

interface AssignmentsStdProps {
  assignmentData: any;
}

export const AssignmentsStd: FC<AssignmentsStdProps> = ({assignmentData}: AssignmentsStdProps) => {
  return (
    <div>At least you're a Wizard, Harry!</div>
  )
}