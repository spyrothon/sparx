import * as React from "react";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  TableOptions,
  useReactTable,
} from "@tanstack/react-table";
export { createColumnHelper };

import styles from "./Table.module.css";

export interface TableProps<T> extends Omit<TableOptions<T>, "getCoreRowModel"> {
  getCoreRowModel?: TableOptions<T>["getCoreRowModel"];
}

export function Table<T>(props: TableProps<T>) {
  const table = useReactTable({
    ...props,
    getCoreRowModel: props.getCoreRowModel ?? getCoreRowModel(),
  });

  return (
    <table className={styles.table}>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
