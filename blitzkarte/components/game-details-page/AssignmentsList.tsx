import { Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TablePagination } from "@mui/material";
import { FC, useState } from "react";

interface AssignmentsListProps {
  assignments: any;
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

export const AssignmentsList: FC<AssignmentsListProps> = ({assignments, refetch}: AssignmentsListProps) => {
  const handleChoosePlayerClick = (country: string) => {
    console.log(`Soon we will be able to assign a player to ${country}`);
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
            assignments.map((assignment:any) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={assignment.countryId}>
                  <TableCell>
                    {assignment.countryName}
                  </TableCell>
                  <TableCell onClick={() => refetch()}>
                  {/* <TableCell onClick={() => handleChoosePlayerClick(assignment.countryName)}> */}
                    {assignment.username}
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