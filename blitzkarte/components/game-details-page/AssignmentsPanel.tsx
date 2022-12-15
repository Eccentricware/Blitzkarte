import { FC } from "react";
import { UseQueryResult } from "react-query";
import StallGlobe from "../icons/StallGlobe";
import { AssignmentsAdm } from "./AssignmentsAdm";
import { AssignmentsStd } from "./AssignmentsStd";

interface AssignmentsPanelProps {
  queryResult: UseQueryResult<any>;
  gameId: number;
}

export const AssignmentsPanel: FC<AssignmentsPanelProps> = ({queryResult, gameId}: AssignmentsPanelProps) => {
  if (queryResult.isFetching) {
      return <StallGlobe mode="querying" message={'Assignments Panel: Fetching'}/>
  }

  if (queryResult.isLoading) {
      return <StallGlobe mode="querying" message={'Assignments Panel: Loading'}/>
  }

  if (queryResult.data) {
    return (
      queryResult.data.userIsAdmin
      ? <AssignmentsAdm assignmentData={queryResult.data}
        refetch={queryResult.refetch}
        gameId={gameId}/>
      : <AssignmentsStd registrationTypes={queryResult.data.userStatus} />
    )
  }

  return (
    <div>Why are you even here? How did you get here?</div>
  )
}