import React from "react";
import { Badge } from "./ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const AppliedJobTable = () => {
  return (
    <div>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[1, 2, 3, 4].map((item, index) => {
            return (
              <TableRow key={index}>
                <TableCell>24-12-2024</TableCell>
                <TableCell>Fronted Developer</TableCell>
                <TableCell>Microsoft</TableCell>
                <TableCell>
                  <Badge>Selected</Badge>{" "}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;
