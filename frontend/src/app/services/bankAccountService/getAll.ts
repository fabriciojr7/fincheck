import { BankAccount } from "../../entities/BankAccount";
import { httpClient } from "../httpClient";

type bankAccountResponse = Array<BankAccount>

export async function getAll(){
  const {data} = await httpClient.get<bankAccountResponse>('/bank-accounts')

  return data;
}
