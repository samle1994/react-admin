import api from "./api";
const list = () =>
  api.get(`${api.url.productlist}/paging`).then((res) => res.data);

const getPaging = (pageNum, pageLength, search) => {
  const queryString = `page=${pageNum}&pageLength=${pageLength}&keyword=${search}`;
  return api.get(`${api.url.productlist}/paging?${queryString}`);
};
const get = (id) =>
  api.get(`${api.url.productlist}/${id}`).then((res) => res.data);

const add = (data) =>
  api.post(api.url.productlist, data).then((res) => res.data);

const update = (id, data, value, type) =>
  api
    .put(`${api.url.productlist}/${id}?value=${value}&type=${type}`, data)
    .then((res) => res.data);

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
