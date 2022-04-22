import api from "./api";
const list = () => api.get(api.url.productcat).then((res) => res.data);

const getPaging = (pageNum, pageLength, search) => {
  const queryString = `page=${pageNum}&pageLength=${pageLength}&keyword=${search}`;
  return api.get(`${api.url.productcat}/paging?${queryString}`);
};
const get = (id) =>
  api.get(`${api.url.productcat}/${id}`).then((res) => res.data);

const add = (data) =>
  api.post(api.url.productcat, data).then((res) => res.data);

const update = (id, data, value, type) =>
  api
    .put(`${api.url.productcat}/${id}?value=${value}&type=${type}`, data)
    .then((res) => res.data);

const remove = (id) =>
  api.delete(`${api.url.productcat}/${id}`).then((res) => res.data);

const ProductCatService = {
  list,
  getPaging,
  get,
  add,
  update,
  remove,
};
export default ProductCatService;
