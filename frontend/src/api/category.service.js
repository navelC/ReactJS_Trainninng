import { instance } from "./api-base";

export async function getCategory() {
  const data = await instance.get(`/categories`);
  return data;
}
