import axios from 'axios';


const client = axios.create({
  baseURL: 'https://greenfastfood.cocoadownload.com/api/v1/',
});

const GetCategory = async (eager = false) => {
  const {data} = await client.get(`category?eager=${eager}`);
  return data;
};

// const GetCategoryById = async (id, eager = 'false') => {
//   const {data} = await client.get(`category/${id}?eager=${eager}`);
//   return data;
// };

const PostCategory = async (payload) => {
  const {data} = await client.post('category', payload);
  return data;
};

const UpdateCategory = async (id, payload) => {
  const {data} = await client.put(`category/${id}`, payload);
  return data;
};

const DeleteCategoryById = async (id) => {
  const {data} = await client.delete(`category/${id}`);
  return data;
};

export {
  GetCategory,
  PostCategory,
  UpdateCategory,
  DeleteCategoryById,
};
