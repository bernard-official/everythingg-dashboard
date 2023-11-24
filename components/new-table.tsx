import React, { useEffect, useState } from "react";
import {
  ColumnFiltersState,
  Row,
  SortingState,
  VisibilityState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Button,
  Input,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import { ArrowUpDown, Check, PenSquare, Trash2, X } from "lucide-react";

import { deleteUserFromDB, updateUserInDB } from "@/services";
import { User } from "@/types";
import toast from "react-hot-toast";

const editUser = async (user: Row<User>) => {
  const response = await updateUserInDB(user.original);
  if (response.status === 200) {
    toast.success("User updated successfully", { icon: "✅" });
  } else if (response.status === 404) {
    toast.error("User not found", { icon: "🤔" });
  } else {
    toast.error("Server error", { icon: "🔥" });
  }
  setTimeout(() => {
    window.location.reload();
  }, 2000);
};

const removeUser = async (user: Row<User>) => {
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

const SimpleTableCell = ({ getValue, row, column, table }) => {
  const initialValue = getValue();
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
// TODO: refactor
const SimpleTableCellForSalary = ({ getValue, row, column, table }) => {
  const initialValue = getValue();
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
  const salary = row.getValue("salary");
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "GHC",
  }).format(salary);

  return <div className="text-left font-medium">{formatted}</div>;
};

const EditCell = ({ row, table }) => {
  const meta = table.options.meta;
  const editRows = async (
    event: React.MouseEvent<HTMLButtonElement | SVGSVGElement>
  ) => {
    event.preventDefault();
    if (meta.editedRows["0"] === true) {
      await editUser(row);
    }
    meta?.setEditedRows((old: []) => ({
      ...old,
      [row.id]: !old[row.id],
    }));
  };
  const cancelEdit = (
    event: React.MouseEvent<HTMLButtonElement | SVGSVGElement>
  ) => {
    event.preventDefault();
    meta?.setEditedRows((old: []) => ({
      ...old,
      [row.id]: false,
    }));
  };
  return meta?.editedRows[row.id] ? (
    <span className="flex space-x-5">
      <X color="gray" onClick={cancelEdit} />
      <Check color="gray" onClick={editRows} />
    </span>
  ) : (
    <PenSquare
      onClick={editRows}
      color="gray"
      className="hover:cursor-pointer hover:scale-105"
    />
  );
};

const columnHelper = createColumnHelper<User>();

const columns = [
  columnHelper.accessor("name", {
    header: "Name",
    cell: SimpleTableCell,
    meta: {
      type: "text",
    },
  }),
  columnHelper.accessor("email", {
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
    cell: SimpleTableCell,
    meta: {
      type: "text",
    },
  }),
  columnHelper.accessor("position", {
    header: "Position",
    cell: SimpleTableCell,
    meta: {
      type: "text",
    },
  }),
  columnHelper.accessor("department", {
    header: "Department",
    cell: SimpleTableCell,
    meta: {
      type: "text",
    },
  }),
  columnHelper.accessor("contact", {
    header: "Contact",
    cell: SimpleTableCell,
    meta: {
      type: "text",
    },
  }),
  columnHelper.accessor("salary", {
    header: "Salary",
    cell: SimpleTableCellForSalary,
    meta: {
      type: "number",
    },
  }),
  columnHelper.display({
    id: "edit",
    cell: EditCell,
  }),
  columnHelper.display({
    id: "remove",
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-center  text-center font-medium">
          <Trash2
            onClick={(event) => removeUser(row)}
            color="red"
            className="hover:cursor-pointer hover:scale-105"
          />
        </div>
      );
    },
  }),
];

const NewTable = () => {
  //when converting this to work with the users data convert verify the usage data name
  const [editedRows, setEditedRows] = useState({});
  let [data, setData] = useState<User[]>([]);
  const [originalData, setOriginalData] = useState<User[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  useEffect(() => {
    let value: User[] = [];
    const url = "/api/user";

    const fetchData = async () => {
      const response = await fetch(url);
      const json = await response.json();
      value = json["getAllUsers"];
      setData(value);
      setOriginalData(value);
    };
    fetchData();
  }, []);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    meta: {
      editedRows,
      setEditedRows,
      revertData: (rowIndex: number, revert: boolean) => {
        if (revert) {
          setData((old) =>
            old.map((row, index) =>
              index === rowIndex ? originalData[rowIndex] : row
            )
          );
        } else {
          setOriginalData((old) =>
            old.map((row, index) => (index === rowIndex ? data[rowIndex] : row))
          );
        }
      },
      updateData: (rowIndex: number, columnId: string, value: string) => {
        setData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex],
                [columnId]: value,
              };
            }
            return row;
          })
        );
      },
    },
  });

  return (
    <div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default NewTable;
