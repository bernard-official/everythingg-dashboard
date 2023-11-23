import React, { ChangeEvent, useEffect, useState } from "react";
import { Student } from "@/types";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { PenSquare } from "lucide-react";

interface DataTableProps<TData, TValue> {
  updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  // columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

const defaultData: Student[] = [
  {
    studentId: 1111,
    name: "Bahar Constantia",
    dateOfBirth: "1984-01-04",
    major: "Computer Science",
  },
  {
    studentId: 2222,
    name: "Harold Nona",
    dateOfBirth: "1961-05-10",
    major: "Communications",
  },
  {
    studentId: 3333,
    name: "Raginolf Arnulf",
    dateOfBirth: "1991-10-12",
    major: "Business",
  },
  {
    studentId: 4444,
    name: "Marvyn Wendi",
    dateOfBirth: "1978-09-24",
    major: "Psychology",
  },
];

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

  const onSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    setValue(event.target.value);
    tableMeta?.updateData(row.index, column.id, event.target.value);
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
        className="w-12"
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
  const setEditedRows = (
    event: React.MouseEvent<HTMLButtonElement | SVGSVGElement>
  ) => {
    event.preventDefault();
    console.log("data", row.original);
    console.log("row", row);
    meta?.setEditedRows((old: []) => ({
      ...old,
      [row.id]: !old[row.id],
    }));
  };
  return meta?.editedRows[row.id] ? (
    <>
      <button onClick={setEditedRows}>✔</button>
    </>
  ) : (
    <>
      <PenSquare
        onClick={setEditedRows}
        color="gray"
        className="hover:cursor-pointer hover:scale-105"
      />
    </>
  );
};

const columnHelper = createColumnHelper<Student>();

const columns = [
  columnHelper.accessor("studentId", {
    header: "Student ID",
    cell: TableCell,
    meta: {
      type: "number",
    },
  }),
  columnHelper.accessor("name", {
    header: "Full Name",
    cell: TableCell,
    meta: {
      type: "text",
    },
  }),
  columnHelper.accessor("dateOfBirth", {
    header: "Date Of Birth",
    cell: TableCell,
    meta: {
      type: "date",
    },
  }),
  columnHelper.accessor("major", {
    header: "major",
    cell: TableCell,
    meta: {
      type: "select",
      options: [
        { value: "Computer Science", label: "Computer Science" },
        { value: "Communications", label: "Communications" },
        { value: "Business", label: "Business" },
        { value: "Psychology", label: "Psychology" },
      ],
    },
  }),
  columnHelper.accessor("edit", {
    header: "edit",
    id: "edit",
    cell: EditCell,
  }),
  //   columnHelper.display({
  //   id: "edit",
  //   cell: EditCell,
  // }),
  // columnHelper.accessor("edit", {
  //   header: "edit",
  //   id: "edit",
  //   cell: EditCell,
  // }),
];

const NewTable = () => {
  //when converting this to work with the users data convert verify the usage data name
  const [editedRows, setEditedRows] = useState({});
  const [originalData, setOriginalData] = useState([...defaultData]);
  const [data, setData] = useState([...defaultData]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      editedRows,
      setEditedRows,
      reverData: (rowIndex: number, revert: boolean) => {
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
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NewTable;
