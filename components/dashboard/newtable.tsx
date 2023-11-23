import React, {
  ChangeEvent,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";
import { Student } from "@/types";
import {
  Row,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Button,
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import { tr } from "date-fns/locale";
import { ArrowUpDown, PenSquare, Trash2 } from "lucide-react";

import { deleteUserFromDB, updateUserInDB } from "@/services";
import { User } from "@/types";
import toast from "react-hot-toast";
import { any, string } from "zod";

const editUser = async (user: Row<User>) => {
  // Convert to Partial User
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

const TableCell = ({ getValue, row, column, table }) => {
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

  // const onSelectChange = (e: ChangeEvent) => {
  //   setValue(e.target.value);
  //   tableMeta?.updateData(row.index, column.id, e.target.value);
  // };

  if (tableMeta?.editedRows[row.id]) {
    return (
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={onBlur}
        type={column.columnDef.meta?.type || "text"}
      />
    );
  }
  return <span>{value}</span>;
};

const EditCell = ({ row, table }) => {
  const meta = table.options.meta;
  const editRows = async (e: MouseEvent) => {
    if (meta.editedRows["0"] === true) {
      await editUser(row);
      console.log("ok", row.original);
      console.log("setR", meta.editedRows["0"]);
    }
    meta?.setEditedRows((old: []) => ({
      ...old,
      [row.id]: !old[row.id],
    }));
  };
  const cancelEdit = () => {
    meta?.setEditedRows((old: []) => ({
      ...old,
      [row.id]: false,
    }));
  };
  return meta?.editedRows[row.id] ? (
    <>
      <button onClick={cancelEdit}>X</button>{" "}
      <button onClick={editRows}>✔</button>
    </>
  ) : (
    <PenSquare
      onClick={editRows}
      color="gray"
      className="hover:cursor-pointer hover:scale-105"
    />
  );
};

// const removeUser = async (
//   event: React.MouseEvent<SVGSVGElement>,
//   user: Row<User>
// ) => {
//   const userId = user.original._id as string;

//   const response = await deleteUserFromDB(userId);
//   if (response.status === 200) {
//     toast.success("User removed successfully", { icon: "🗑️" });
//   } else if (response.status === 404) {
//     toast.error("User not found", { icon: "🤔" });
//   } else {
//     toast.error("Server error", { icon: "🔥" });
//   }
//   setTimeout(() => {
//     window.location.reload();
//   }, 2000);
// };

//const columnHelper = createColumnHelper<Student>();
const columnHelper = createColumnHelper<User>();

const columns = [
  columnHelper.accessor("name", {
    header: "Name",
    cell: TableCell,
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
    cell: TableCell,
    meta: {
      type: "text",
    },
  }),
  columnHelper.accessor("position", {
    header: "Position",
    cell: TableCell,
    meta: {
      type: "text",
    },
  }),
  columnHelper.accessor("department", {
    header: "Department",
    cell: TableCell,
    meta: {
      type: "text",
    },
  }),
  columnHelper.accessor("contact", {
    header: "Contact",
    cell: TableCell,
    meta: {
      type: "text",
    },
  }),
  columnHelper.accessor("salary", {
    header: "Salary",
    cell: ({ row }) => {
      const salary = parseFloat(row.getValue("salary"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "GHC",
      }).format(salary);

      return <div className="text-left font-medium">{formatted}</div>;
    },
    meta: {
      type: string,
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
            onClick={(event) => removeUser(event, row)}
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
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default NewTable;
