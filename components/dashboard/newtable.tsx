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
import { ArrowUpDown, PenSquare } from "lucide-react";

import { deleteUserFromDB, updateUserInDB } from "@/services";
import { User } from "@/types";
import toast from "react-hot-toast";
import { any, string } from "zod";

interface DataTableProps<TData, TValue> {
  updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  // columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

const defaultData: User[] = [
  {
    _id: "6553396d0d1c720abec94378",
    name: "berry Allen",
    email: "ba@gmail.com",
    contact: "1234567890",
    address: "ad/6",
    position: "frontend dev",
    department: "Software",
    birthDate: "2023-11-01",
    hireDate: "2023-11-01",
    manager: true,
    password: "$2b$10$jKsITmx9zCZhI0loJCY2dew6Z1SS1Br31moQVPeTblLzZ4IPRTCv2",
    salary: "100",
  },
  {
    _id: "7553396d0d1c720abec94378",
    name: "james Allen",
    email: "James@gmail.com",
    contact: "1234567890",
    address: "ad/6",
    position: "frontend dev",
    department: "Software",
    birthDate: "2023-11-01",
    hireDate: "2023-11-01",
    manager: true,
    password: "$2b$10$jKsITmx9zCZhI0loJCY2dew6Z1SS1Br31moQVPeTblLzZ4IPRTCv2",
    salary: "100",
  },
];

// const defaultData: Student[] = [
//   {
//     studentId: 1111,
//     name: "Bahar Constantia",
//     dateOfBirth: "1984-01-04",
//     major: "Computer Science",
//   },
//   {
//     studentId: 2222,
//     name: "Harold Nona",
//     dateOfBirth: "1961-05-10",
//     major: "Communications",
//   },
//   {
//     studentId: 3333,
//     name: "Raginolf Arnulf",
//     dateOfBirth: "1991-10-12",
//     major: "Business",
//   },
//   {
//     studentId: 4444,
//     name: "Marvyn Wendi",
//     dateOfBirth: "1978-09-24",
//     major: "Psychology",
//   },
// ];

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

  const onSelectChange = (e: ChangeEvent) => {
    setValue(e.target.value);
    tableMeta?.updateData(row.index, column.id, e.target.value);
  };

  if (tableMeta?.editedRows[row.id]) {
    return columnMeta?.type === "select" ? (
      <select onChange={onSelectChange} value={initialValue}>
        {columnMeta?.options?.map((option: Option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    ) : (
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
  const setEditedRows = (e: MouseEvent) => {
    const elName = e.currentTarget.name;
    meta?.setEditedRows((old: []) => ({
      ...old,
      [row.id]: !old[row.id],
    }));
    if (elName !== "edit") {
      meta?.revertData(row.index, e.currentTarget.name === "cancel");
    }
  };
  return meta?.editedRows[row.id] ? (
    <>
      <button>X</button> <button onClick={setEditedRows}>✔</button>
    </>
  ) : (
    <PenSquare
      onClick={setEditedRows}
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
  // columnHelper.accessor("studentId", {
  //   header: "Student ID",
  //   cell: TableCell,
  //   meta: {
  //     type: "number",
  //   },
  // }),
  // columnHelper.accessor("name", {
  //   header: "Full Name",
  //   cell: TableCell,
  //   meta: {
  //     type: "text",
  //   },
  // // }),
  // columnHelper.accessor("dateOfBirth", {
  //   header: "Date Of Birth",
  //   cell: TableCell,
  //   meta: {
  //     type: "date",
  //   },
  // }),
  // columnHelper.accessor("major", {
  //   header: "major",
  //   cell: TableCell,
  //   meta: {
  //     type: "select",
  //     options: [
  //       { value: "Computer Science", label: "Computer Science" },
  //       { value: "Communications", label: "Communications" },
  //       { value: "Business", label: "Business" },
  //       { value: "Psychology", label: "Psychology" },
  //     ],
  //   },
  // }),
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
  // columnHelper.display({
  //   id: "remove",
  //   cell: ({ row }) => {
  //   return (
  //     <div className="flex items-center justify-center  text-center font-medium">
  //       <Trash2
  //         onClick={(event) => removeUser(event, row)}
  //         color="red"
  //         className="hover:cursor-pointer hover:scale-105"
  //       />
  //     </div>
  //   );
  // },
  // }),
];

const NewTable = () => {
  //when converting this to work with the users data convert verify the usage data name
  const [editedRows, setEditedRows] = useState({});
  const [originalData, setOriginalData] = useState(() => [...defaultData]);
  const [data, setData] = useState(() => [...defaultData]);

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
