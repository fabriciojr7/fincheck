import { useQuery } from "@tanstack/react-query";
import { transactionsService } from "../services/transactionsService";
import { TransacionsFilters } from "../services/transactionsService/getAll";

export function useTransactions(filter: TransacionsFilters) {
  const { data, isFetching, isInitialLoading, refetch } = useQuery({
    queryKey: ["transactions"],
    queryFn: () => transactionsService.getAll(filter),
  });

  return {
    transactions: data ?? [],
    isLoading: isFetching,
    isInitialLoading,
    refetchTransactions: refetch,
  };
}
