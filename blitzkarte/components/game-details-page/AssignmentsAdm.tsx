import { Grid } from "@mui/material";
import { User } from "firebase/auth";
import { FC, useContext, useEffect } from "react";
import { useQuery } from "react-query";
import { AssignmentRequestService } from "../../services/request-services/assignment-request-service";
import Blitzkontext from "../../utils/Blitzkontext";
import { AssignmentsList } from "./AssignmentsList";

interface AssignmentsAdmProps {
  assignmentData: any;
  refetch: any;
}

export const AssignmentsAdm: FC<AssignmentsAdmProps> = ({assignmentData, refetch}: AssignmentsAdmProps) => {
  const assignmentRequestService = new AssignmentRequestService();
  const gameCtx = useContext(Blitzkontext).currentGame;
  const data = assignmentData;
  const gameId = gameCtx.id ? gameCtx.id : 7;

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