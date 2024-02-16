import { Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TablePagination, SelectChangeEvent, IconButton, Icon, TextField } from "@mui/material";
import { getAuth, User } from "firebase/auth";
import { ChangeEvent, FC, useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { AssignmentDataObject } from "../../models/objects/AssignmentsDataObject";
import { AssignmentStatus } from "../../models/enumeration/assignment-status-enum";
import { AssignmentRequestService } from "../../services/request-services/assignment-request-service";
import Lock from '@mui/icons-material/Lock';
import LockOpen from '@mui/icons-material/LockOpen';
import { AssignmentDetails } from "../../models/objects/AssignmentRowObject";
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';

interface ContactListProps {
  assignmentData: AssignmentDataObject;
  gameId: number;
  handleContactDetailsOpen: (event: React.MouseEvent<SVGSVGElement>, contact: any) => void;
}

interface Column {
  id: 'countryName' | 'username' | 'contact';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'countryName', label: 'Country', minWidth: 170 },
  { id: 'username', label: 'Player', minWidth: 175  },
  { id: 'contact', label: 'Contact', minWidth: 50 }
];

export const ContactList: FC<ContactListProps> = ({
  assignmentData,
  gameId,
  handleContactDetailsOpen
}: ContactListProps) => {
  const sortedAssignments = assignmentData.assignments.sort((a: AssignmentDetails, b: AssignmentDetails) => {
    return a.countryName < b.countryName ? -1 : 1;
  });

  return (
    <TableContainer>
      <Table stickyHeader aria-label="sticky table" size="small">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.id}
                align={column.align}
                style={{ minWidth: column.minWidth, fontWeight: 'bold' }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {
            sortedAssignments.map((assignment: AssignmentDetails) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={assignment.countryId}>
                  <TableCell>
                    {assignment.countryName} ({assignment.rank.toUpperCase()})
                  </TableCell>
                  <TableCell>
                      {assignment.username ? assignment.username : <i>Civil Disorder</i>}
                  </TableCell>
                  <TableCell>
                    {
                      (assignment.contactPreferences && assignment.contactPreferences.preferredMethod)
                      ? <div style={{
                          display: 'flex',
                          alignItems: 'center'
                        }}>
                          <TextField
                            label={
                              assignment.contactPreferences.preferredMethod === 'other'
                              ? assignment.contactPreferences.otherMethod
                              : assignment.contactPreferences.preferredMethod
                            }
                            variant="outlined"
                            size="small"
                            value={
                              assignment.contactPreferences.preferredMethod === 'other'
                              ? assignment.contactPreferences.otherHandle
                              : assignment.contactPreferences[assignment.contactPreferences.preferredMethod]
                            }
                            autoComplete="off"
                            fullWidth
                          />
                          <QuizOutlinedIcon
                            style={{cursor: 'pointer'}}
                            onClick={(event: React.MouseEvent<SVGSVGElement>) => {
                              handleContactDetailsOpen(event, assignment);
                            }}
                          />
                        </div>
                      : assignment.username
                        && <i>No Contact Set</i>
                    }
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