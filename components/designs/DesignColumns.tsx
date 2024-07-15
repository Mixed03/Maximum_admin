"use client";

import { ColumnDef } from "@tanstack/react-table";
import Delete from "../custom ui/Delete";
import Link from "next/link";
import { DesignType } from "@/lib/types";

export const columns: ColumnDef<DesignType>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <Link
        href={`/designs/${row.original._id}`}
        className="hover:text-red-1"
      >
        {row.original.title}
      </Link>
    ),
  },
  {
    accessorKey: "price",
    header: "Price (₭)",
  },
  {
    accessorKey: "expense",
    header: "Expense (₭)",
  },
  {
    id: "actions",
    cell: ({ row }) => <Delete item="design" id={row.original._id} />,
  },
];
