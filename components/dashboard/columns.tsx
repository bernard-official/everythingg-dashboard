"use clients";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown ,MoreHorizontal } from "lucide-react"
import { getAbbreviation } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "..";

import { Checkbox } from "@/components/ui/checkbox";

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { deleteUserFromDB } from "@/services";

export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

//Columns are where you define the core of what your table will look like. They define the data that will be displayed, how it will be formatted, sorted and filtered.

export const columns: ColumnDef<Payment>[] = [
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
    accessorKey:"name",
    header:"Name"
  },
  {
    accessorKey: "email",
    //sorting email on a click of a button
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
  },
  {
    accessorKey: "position",
    header: "Position"
  },
  {
    accessorKey: "department",
    header: "Dept."
  },
  {
    accessorKey: "contact",
    header: "Contact"
  },
  {
    accessorKey: "salary",
    header:() => <div>Salary</div>,
    cell:({ row }) => {
        const salary = parseFloat(row.getValue('salary'))
        const formatted = new Intl.NumberFormat("en-US",{
            style: "currency",
            currency: "GHC",
        }).format(salary)

        return <div className="text-left font-medium">{formatted}</div>
    }
  },
  {
    accessorKey: "amount",
    header:() => <div>Amount</div>,
    cell:({ row }) => {
        const amount = parseFloat(row.getValue('amount'))
        const formatted = new Intl.NumberFormat("en-US",{
            style: "currency",
            currency: "GHC",
        }).format(amount)
    }
  },
  {
    //go back to ROW actions to add updates
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original

      const handleEditClick = () => {
        
      }

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={handleEditClick}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => deleteUserFromDB(payment.id)}
            >
              Remove Employee
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  }
];
