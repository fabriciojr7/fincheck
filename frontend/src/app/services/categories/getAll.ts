import { Category } from "../../entities/Category";
import { httpClient } from "../httpClient";

type categoryResponse = Array<Category>;

export async function getAll() {
  const { data } = await httpClient.get<categoryResponse>("/categories");

  return data;
}
