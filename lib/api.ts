export type TransactionType = "Deposit" | "Withdrawal" | "Dividend" | "Trade";

export type TransactionStatus = "Completed" | "Pending" | "Failed";

export interface PortfolioBalancePoint {
  date: string;
  balance: number;
}

export interface Transaction {
  id: string;
  date: string;
  type: TransactionType;
  amount: number;
  status: TransactionStatus;
}

export interface PortfolioData {
  balanceHistory: PortfolioBalancePoint[];
  transactions: Transaction[];
}

const MOCK_LATENCY_MS = 400;

const TOTAL_DAYS = 30;
const FINAL_BALANCE = 124_500;

function buildBalanceHistory(): PortfolioBalancePoint[] {
  const points: PortfolioBalancePoint[] = [];
  const start = new Date();
  start.setDate(start.getDate() - (TOTAL_DAYS - 1));

  let balance = FINAL_BALANCE - 8_200;
  for (let i = 0; i < TOTAL_DAYS; i += 1) {
    const d = new Date(start);
    d.setDate(d.getDate() + i);
    const drift = Math.sin(i / 4) * 1_200 + (i % 5) * 180;
    const noise = ((i * 17) % 100) * 12;
    balance = Math.round(balance + drift * 0.15 + noise * 0.02);
    if (i === TOTAL_DAYS - 1) {
      balance = FINAL_BALANCE;
    }
    points.push({
      date: d.toISOString().slice(0, 10),
      balance,
    });
  }
  return points;
}

function buildTransactions(): Transaction[] {
  const baseDate = new Date();
  const rows: Transaction[] = [
    {
      id: "txn-01",
      date: new Date(baseDate.getTime() - 0 * 86_400_000).toISOString(),
      type: "Deposit",
      amount: 5_000,
      status: "Completed",
    },
    {
      id: "txn-02",
      date: new Date(baseDate.getTime() - 1 * 86_400_000).toISOString(),
      type: "Trade",
      amount: -1_240.5,
      status: "Completed",
    },
    {
      id: "txn-03",
      date: new Date(baseDate.getTime() - 1 * 86_400_000).toISOString(),
      type: "Dividend",
      amount: 89.12,
      status: "Completed",
    },
    {
      id: "txn-04",
      date: new Date(baseDate.getTime() - 2 * 86_400_000).toISOString(),
      type: "Withdrawal",
      amount: -2_000,
      status: "Pending",
    },
    {
      id: "txn-05",
      date: new Date(baseDate.getTime() - 3 * 86_400_000).toISOString(),
      type: "Deposit",
      amount: 10_000,
      status: "Completed",
    },
    {
      id: "txn-06",
      date: new Date(baseDate.getTime() - 4 * 86_400_000).toISOString(),
      type: "Trade",
      amount: -3_400,
      status: "Failed",
    },
    {
      id: "txn-07",
      date: new Date(baseDate.getTime() - 5 * 86_400_000).toISOString(),
      type: "Dividend",
      amount: 210.44,
      status: "Completed",
    },
    {
      id: "txn-08",
      date: new Date(baseDate.getTime() - 6 * 86_400_000).toISOString(),
      type: "Deposit",
      amount: 1_500,
      status: "Completed",
    },
    {
      id: "txn-09",
      date: new Date(baseDate.getTime() - 7 * 86_400_000).toISOString(),
      type: "Withdrawal",
      amount: -500,
      status: "Completed",
    },
    {
      id: "txn-10",
      date: new Date(baseDate.getTime() - 8 * 86_400_000).toISOString(),
      type: "Trade",
      amount: -780.25,
      status: "Completed",
    },
    {
      id: "txn-11",
      date: new Date(baseDate.getTime() - 9 * 86_400_000).toISOString(),
      type: "Dividend",
      amount: 45.0,
      status: "Pending",
    },
    {
      id: "txn-12",
      date: new Date(baseDate.getTime() - 10 * 86_400_000).toISOString(),
      type: "Deposit",
      amount: 2_250,
      status: "Completed",
    },
    {
      id: "txn-13",
      date: new Date(baseDate.getTime() - 11 * 86_400_000).toISOString(),
      type: "Trade",
      amount: -420,
      status: "Completed",
    },
    {
      id: "txn-14",
      date: new Date(baseDate.getTime() - 12 * 86_400_000).toISOString(),
      type: "Withdrawal",
      amount: -1_100,
      status: "Failed",
    },
    {
      id: "txn-15",
      date: new Date(baseDate.getTime() - 13 * 86_400_000).toISOString(),
      type: "Dividend",
      amount: 132.88,
      status: "Completed",
    },
    {
      id: "txn-16",
      date: new Date(baseDate.getTime() - 14 * 86_400_000).toISOString(),
      type: "Deposit",
      amount: 7_500,
      status: "Completed",
    },
    {
      id: "txn-17",
      date: new Date(baseDate.getTime() - 15 * 86_400_000).toISOString(),
      type: "Trade",
      amount: -2_050,
      status: "Completed",
    },
    {
      id: "txn-18",
      date: new Date(baseDate.getTime() - 16 * 86_400_000).toISOString(),
      type: "Deposit",
      amount: 3_000,
      status: "Pending",
    },
    {
      id: "txn-19",
      date: new Date(baseDate.getTime() - 17 * 86_400_000).toISOString(),
      type: "Withdrawal",
      amount: -750,
      status: "Completed",
    },
    {
      id: "txn-20",
      date: new Date(baseDate.getTime() - 18 * 86_400_000).toISOString(),
      type: "Dividend",
      amount: 67.33,
      status: "Completed",
    },
  ];
  return rows;
}

export function fetchPortfolioData(): Promise<PortfolioData> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        balanceHistory: buildBalanceHistory(),
        transactions: buildTransactions(),
      });
    }, MOCK_LATENCY_MS);
  });
}
