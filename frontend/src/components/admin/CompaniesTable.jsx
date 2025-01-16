import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";

const CompaniesTable = () => {  
  return (
    <div>
      <Table>
        <TableCaption>A List of your registered companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableCell>
            <Avatar>
              <AvatarImage src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg" />
            </Avatar>
          </TableCell>
          <TableCell>Company Name</TableCell>
          <TableCell>01-07-2025</TableCell>
          <TableCell>
            <Popover>
              <PopoverTrigger>
                <MoreHorizontal />
              </PopoverTrigger>
              <PopoverContent>
                <div className="flex items-center gap-2 w-fit cursor-pointer">
                  <Edit2 className="w-4" />
                  <span>Edit</span>
                </div>
              </PopoverContent>
            </Popover>
          </TableCell>
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;
