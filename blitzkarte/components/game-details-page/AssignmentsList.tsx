import { Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TablePagination, SelectChangeEvent } from "@mui/material";
import { getAuth, User } from "firebase/auth";
import { ChangeEvent, FC, useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { AssignmentDataObject } from "../../models/AssignmentsDataObject";
import { AssignmentStatus } from "../../models/enumeration/assignment-status-enum";
import { AssignmentRequestService } from "../../services/request-services/assignment-request-service";
import Blitzkontext from "../../utils/Blitzkontext";

interface AssignmentsListProps {
  assignmentData: AssignmentDataObject;
  assignmentRequestService: AssignmentRequestService;
  nonLockedPlayers: any[];
  refetch: any;
}

interface Column {
  id: 'countryName' | 'username' | 'assignmentStatus';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'countryName', label: 'Country', minWidth: 170 },
  { id: 'username', label: 'Player', minWidth: 175  },
  { id: 'assignmentStatus', label: 'Status', minWidth: 50 }
];

export const AssignmentsList: FC<AssignmentsListProps> = ({
  assignmentData,
  assignmentRequestService,
  nonLockedPlayers,
  refetch
}: AssignmentsListProps) => {
  let gameId = 7;
  const handleChoosePlayerChange = (userId: number, countryId: number) => {
    if (gameId) {
      assignmentRequestService.assignUser(gameId, userId, countryId).then(() => { refetch(); });

    }
  }

  return (
    <TableContainer>
      <Table stickyHeader aria-label="sticky table" size="small">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.id}
                align={column.align}
                style={{ minWidth: column.minWidth }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {
            assignmentData.assignments.map((assignment:any) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={assignment.countryId}>
                  <TableCell>
                    {assignment.countryName}
                  </TableCell>
                  <TableCell>
                    {
                      assignment.assignmentStatus === AssignmentStatus.LOCKED
                      ? assignment.username
                      : <select value={assignment.playerId ? assignment.playerId : 0}
                          onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                            handleChoosePlayerChange(
                              Number(event.target.value),
                              assignment.countryId
                            );
                          }}
                        >
                          {
                            nonLockedPlayers.map((player: any) => <option key={player.userId} value={player.userId}>{player.username}</option>)
                          }
                        </select>
                    }
                  </TableCell>
                  <TableCell>
                    {assignment.assignmentStatus}
                  </TableCell>
                </TableRow>
              )
            })
          }
        </TableBody>
      </Table>
    </TableContainer>
  )
}