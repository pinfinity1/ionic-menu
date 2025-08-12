import api from "../config/api";

const PostProduct = async (payload) => {
  const { data } = await api.post("product", payload);
  return data;
};

const UpdateProduct = async (id, payload) => {
  const { data } = await api.put(`product/${id}`, payload);
  return data;
};

const DeleteProductById = async (id) => {
  const { data } = await api.delete(`product/${id}`);
  return data;
};

const PostProductImage = async (id, payload) => {
  const { data } = await api.post(`product/images/${id}`, payload);
  return data;
};

const GetProductImage = async (id) => {
  const { data } = await api.get(`product/images/${id}`, {
    responseType: "blob",
  });
  return data;
};

const DeleteProductImageById = async (id) => {
  const { data } = await api.delete(`product/images/${id}`);
  return data;
};

export {
  PostProduct,
  UpdateProduct,
  PostProductImage,
  DeleteProductById,
  GetProductImage,
  DeleteProductImageById,
};
