import { instance } from "./api-base";

export async function getProducts(params) {
  let link = `/products`;
  const page = params.page || 1;
  link += `?page=${page}`;
  if (params) {
    Object.entries(params).forEach(([key, val]) => {
      if (key !== "page") link += `&${key}=${val}`;
    });
  }
  console.log(link);
  const data = await instance.get(link);
  return data;
}
export async function getProduct(id) {
  const res = await instance.get(`/products/${id}`);
  return res;
}
export async function postProduct(data) {
  const res = await instance.post(`/products`, data);
  return res;
}
export async function updateProduct(id, data) {
  const res = await instance.patch(`/products/${id}`, data);
  return res;
}
