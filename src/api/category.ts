import api from "../config/api";
import { Category } from "../types";

export type CategoryPayload = {
  name: string;
};

export const GetCategory = async (eager: boolean = false): Promise<Category[]> => {
  const { data } = await api.get<Category[]>(`category?eager=${eager}`);
  return data;
};

export const PostCategory = async (payload: CategoryPayload): Promise<Category> => {
  const { data } = await api.post<Category>("category", payload);
  return data;
};

export const UpdateCategory = async (
  id: string,
  payload: CategoryPayload
): Promise<Category> => {
  const { data } = await api.put<Category>(`category/${id}`, payload);
  return data;
};

export const DeleteCategoryById = async (id: string): Promise<{ success?: boolean } | Category> => {
  const { data } = await api.delete<{ success?: boolean } | Category>(`category/${id}`);
  return data;
};