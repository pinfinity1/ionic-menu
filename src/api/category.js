import api from "../config/api";

const GetCategory = async (eager = false) => {
  const { data } = await api.get(`category?eager=${eager}`);
  return data;
};

const PostCategory = async (payload) => {
  const { data } = await api.post("category", payload);
  return data;
};

const UpdateCategory = async (id, payload) => {
  const { data } = await api.put(`category/${id}`, payload);
  return data;
};

const DeleteCategoryById = async (id) => {
  const { data } = await api.delete(`category/${id}`);
  return data;
};

export { GetCategory, PostCategory, UpdateCategory, DeleteCategoryById };
