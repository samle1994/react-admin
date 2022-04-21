import api from "./api";
const list = () => api.get(api.url.productlist).then((res) => res.data);

const getPaging = (pageNum, pageLength) => {
  const queryString = `page=${pageNum}&pageLength=${pageLength}`;
  return api.get(`${api.url.productlist}/paging?${queryString}`);
};
const get = (id) =>
  api.get(`${api.url.productlist}/${id}`).then((res) => res.data);

const add = (data) =>
  api.post(api.url.productlist, data).then((res) => res.data);

const update = (id, data) =>
  api.put(`${api.url.productlist}/${id}`, data).then((res) => res.data);

const remove = (id) =>
  api.delete(`${api.url.productlist}/${id}`).then((res) => res.data);

const ProductListService = {
  list,
  getPaging,
  get,
  add,
  update,
  remove,
};
export default ProductListService;