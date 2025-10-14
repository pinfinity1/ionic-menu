import api from "../config/api";
import { ProductItem } from "../types";

export type ProductPayload = {
  name: string;
  description: string;
  price: number;
  categoryId: string;
};

export const PostProduct = async (
  payload: ProductPayload
): Promise<ProductItem> => {
  const { data } = await api.post<ProductItem>("product", payload);
  return data;
};

export const UpdateProduct = async (
  id: string,
  payload: Partial<ProductItem>
): Promise<ProductItem> => {
  const { data } = await api.put<ProductItem>(`product/${id}`, payload);
  return data;
};

export const DeleteProductById = async (id: string): Promise<void> => {
  await api.delete(`product/${id}`);
};

export const PostProductImage = async (
  id: string,
  payload: FormData
): Promise<any> => {
  const { data } = await api.post(`product/images/${id}`, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

export const GetProductImage = async (id: string): Promise<Blob> => {
  const { data } = await api.get(`product/images/${id}`, {
    responseType: "blob",
  });
  return data;
};

export const DeleteProductImageById = async (id: string): Promise<void> => {
  await api.delete(`product/images/${id}`);
};
