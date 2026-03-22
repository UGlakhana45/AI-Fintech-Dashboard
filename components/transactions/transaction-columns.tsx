import type { Transaction, TransactionStatus } from "@/lib/api";
import type { ColumnDef } from "@tanstack/react-table";

const amountFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

function formatTransactionDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function StatusBadge({ status }: { status: TransactionStatus }) {
  const styles: Record<TransactionStatus, string> = {
    Completed:
      "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/40",
    Pending: "bg-amber-500/15 text-amber-300 ring-1 ring-amber-500/40",
    Failed: "bg-rose-500/15 text-rose-300 ring-1 ring-rose-500/40",
  };

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
}

export function createTransactionColumns(): ColumnDef<Transaction>[] {
  return [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => (
        <span className="font-mono text-xs text-slate-400">{row.original.id}</span>
      ),
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => (
        <span className="text-slate-300">
          {formatTransactionDate(row.original.date)}
        </span>
      ),
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => (
        <span className="text-slate-200">{row.original.type}</span>
      ),
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => (
        <span className="tabular-nums text-slate-100">
          {amountFormatter.format(row.original.amount)}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <StatusBadge status={row.original.status} />,
    },
  ];
}
