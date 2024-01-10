import { FC, useContext } from "react";
import { UseQueryResult } from "react-query";
import StallGlobe from "../icons/StallGlobe";
import { AssignmentsAdm } from "./AssignmentsAdm";
import { AssignmentsStd } from "./AssignmentsStd";
import { GameStatus } from "../../models/enumeration/game-status-enum";
import Blitzkontext from "../../utils/Blitzkontext";

interface AssignmentsPanelProps {
  queryResult: UseQueryResult<any>;
  gameId: number;
  gameStatus: GameStatus;
}

export const AssignmentsPanel: FC<AssignmentsPanelProps> = ({queryResult, gameId, gameStatus}: AssignmentsPanelProps) => {
  const user = useContext(Blitzkontext).user.user;
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
          user={user}
        />
    )
  }

  return (
    <div>Let the admin know if you can see this because you are not supposed to see this.</div>
  )
}