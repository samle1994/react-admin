import api from "./api";
const list = () => api.get(api.url.product).then((res) => res.data);

const getPaging = (pageNum, pageLength, search) => {
  const queryString = `page=${pageNum}&pageLength=${pageLength}&keyword=${search}`;
  return api.get(`${api.url.product}/paging?${queryString}`);
};
const get = (id) => api.get(`${api.url.product}/${id}`).then((res) => res.data);

const add = (data) => {
  const formData = new FormData();
  for (const key in data) {
    formData.append(key, data[key]);
  }
  return api.post(api.url.product, formData, {
    headers: {
      "Content-Type": "multipart/formdata",
    },
  });
};

const update = (id, data, value, type) =>
  api
    .put(`${api.url.product}/${id}?value=${value}&type=${type}`, data)
    .then((res) => res.data);

const remove = (id) =>
  api.delete(`${api.url.product}/${id}`).then((res) => res.data);

const ProductService = {
  list,
  getPaging,
  get,
  add,
  update,
  remove,
};
export default ProductService;
