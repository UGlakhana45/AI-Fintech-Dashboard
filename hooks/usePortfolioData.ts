import { useQuery } from "@tanstack/react-query";
import { fetchPortfolioData, type PortfolioData } from "@/lib/api";

export const PORTFOLIO_QUERY_KEY = ["portfolio"] as const;

export interface UsePortfolioDataResult {
  data: PortfolioData | undefined;
  isPending: boolean;
  isError: boolean;
  error: Error | null;
}

export function usePortfolioData(): UsePortfolioDataResult {
  const { data, isPending, isError, error } = useQuery({
    queryKey: PORTFOLIO_QUERY_KEY,
    queryFn: fetchPortfolioData,
  });

  return {
    data,
    isPending,
    isError,
    error: error instanceof Error ? error : error ? new Error(String(error)) : null,
  };
}
