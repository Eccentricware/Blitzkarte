import { FC } from "react";
import { UseQueryResult } from "react-query";
import StallGlobe from "../icons/StallGlobe";
import { AssignmentsAdm } from "./AssignmentsAdm";
import { AssignmentsStd } from "./AssignmentsStd";
import { GameStatus } from "../../models/enumeration/game-status-enum";

interface AssignmentsPanelProps {
  queryResult: UseQueryResult<any>;
  gameId: number;
  gameStatus: GameStatus;
}

export const AssignmentsPanel: FC<AssignmentsPanelProps> = ({queryResult, gameId, gameStatus}: AssignmentsPanelProps) => {
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
          gameId={gameId}
          gameStatus={gameStatus}
        />
      : <AssignmentsStd registrationTypes={queryResult.data.userStatus}
          gameStatus={gameStatus}
        />
    )
  }

  return (
    <div>Why are you even here? How did you get here?</div>
  )
}