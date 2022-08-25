import { instance } from "./api-base";

export async function getBrand() {
  const data = await instance.get(`/brands`);
  return data;
}
export async function getBrandByCategory(category) {
  console.log(category);
  const data = await instance.get(`/brands/${category}`);
  return data;
}
