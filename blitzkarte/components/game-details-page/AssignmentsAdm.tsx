import { Grid } from "@mui/material";
import { FC, useContext, useEffect } from "react";
import { useQuery } from "react-query";
import { AssignmentRequestService } from "../../services/request-services/assignment-request-service";
import Blitzkontext from "../../utils/Blitzkontext";
import { AssignmentsList } from "./AssignmentsList";

interface AssignmentsAdmProps {
  assignmentData: any;
}

export const AssignmentsAdm: FC<AssignmentsAdmProps> = ({assignmentData}: AssignmentsAdmProps) => {
  const assignmentRequestService = new AssignmentRequestService();
  const gameCtx = useContext(Blitzkontext).currentGame;
  const gameId = gameCtx.id ? gameCtx.id : 7;

  let { isLoading, error, data, isFetching, refetch } = useQuery('getAssignmentData', () => {
    console.log('Fetched?');
    return assignmentRequestService.getAssignmentData(gameId);
  });

  useEffect(() => {
    // data = sneakyHook();
  });

  if (isLoading) {
    return (
      <Grid container spacing={1}>
        Loading
      </Grid>
    )
  }

  if (error) {
    console.log('Assignment error', error);
  }

  if (data) {
    return (
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <AssignmentsList
            assignmentData={data}
            assignmentRequestService={assignmentRequestService}
            refetch={refetch}
          />
        </Grid>
        <Grid item xs={6}>
          Players Here
        </Grid>
      </Grid>
    )
  }

  if (isFetching) {
    console.log('Assignment isFetching', isFetching);
  }

  return (
    <div>Never Be here</div>
  )
}