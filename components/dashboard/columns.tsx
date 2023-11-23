"use clients";
import { ColumnDef, Row, TableMeta } from "@tanstack/react-table";
import {
  ArrowUpDown,
  MoreHorizontal,
  PenSquare,
  Check,
  Pencil,
  Trash2,
} from "lucide-react";
import { getAbbreviation } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage, TableCell } from "..";

import { Checkbox } from "@/components/ui/checkbox";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { deleteUserFromDB, updateUserInDB } from "@/services";
import { User } from "@/types";
import toast from "react-hot-toast";
import { any, string } from "zod";
import { useEffect, useState } from "react";

//Columns are where you define the core of what your table will look like. They define the data that will be displayed, how it will be formatted, sorted and filtered.

const editUser = async (
  event: React.MouseEvent<SVGSVGElement>,
  user: Row<User>
) => {
  // Convert to Partial User
  const sampleUser: Partial<User> = {};
  const response = await updateUserInDB(sampleUser);
  console.log("Edit response", response);
};

const removeUser = async (
  event: React.MouseEvent<SVGSVGElement>,
  user: Row<User>
) => {
  const userId = user.original._id as string;

  const response = await deleteUserFromDB(userId);
  if (response.status === 200) {
    toast.success("User removed successfully", { icon: "🗑️" });
  } else if (response.status === 404) {
    toast.error("User not found", { icon: "🤔" });
  } else {
    toast.error("Server error", { icon: "🔥" });
  }
  setTimeout(() => {
    window.location.reload();
  }, 2000);
};
const EditCell = ({ row, table }) => {
  const meta = table.options.meta;
  const editRows = (
    event: React.MouseEvent<HTMLButtonElement | SVGSVGElement>
  ) => {
    event.preventDefault();
    meta.setEditedRows((old: []) => ({
      ...old,
      [row.id]: !old[row.id],
    }));
  };
  return meta?.editedRows[row.id] ? (
    <Check color="gray" className="hover:cursor-pointer" onClick={editRows} />
  ) : (
    <PenSquare
      onClick={editRows}
      color="gray"
      className="hover:cursor-pointer hover:scale-105"
    />
  );
};

const CustomTableCell = ({ getValue, row, column, table }) => {
  const initialValue = getValue();
  const columnMeta = column.columnDef.meta;
  const tableMeta = table.options.meta;
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const onBlur = () => {
    table.options.meta?.updateData(row.index, column.id, value);
  };

  if (tableMeta?.editedRows[row.id]) {
    return (
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={onBlur}
        type={column.columnDef.meta?.type || "text"}
      />
    );
  }
  return <span>{value}</span>;
};
export const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: CustomTableCell,
  },
  {
    accessorKey: "email",
    cell: CustomTableCell,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "position",
    header: "Position",
    cell: CustomTableCell,
  },
  {
    accessorKey: "department",
    header: "Dept.",
    cell: CustomTableCell,
  },
  {
    accessorKey: "contact",
    header: "Contact",
    cell: CustomTableCell,
    meta: {
      type: string,
    },
  },
  {
    accessorKey: "salary",
    header: () => <div>Salary</div>,
    cell: CustomTableCell,
  },
  {
    accessorKey: "remove",
    header: () => <div className="text-center">Remove</div>,
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-center  text-center font-medium">
          <Trash2
            onClick={(event) => removeUser(event, row)}
            color="red"
            className="hover:cursor-pointer hover:scale-105"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "edit",
    header: () => <div className="text-center">Edit</div>,
    cell: ({ row, table }) => EditCell({ row, table }),
  },
];
