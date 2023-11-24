import { Transaction } from "../../entities/Transaction";
import { httpClient } from "../httpClient";

type transactionResponse = Array<Transaction>;

export type TransacionsFilters = {
  month: number;
  year: number;
  bankAccountId?: string;
  type?: Transaction["type"];
};

export async function getAll(filters: TransacionsFilters) {
  const { data } = await httpClient.get<transactionResponse>("/transactions", {
    params: filters,
  });

  return data;
}
