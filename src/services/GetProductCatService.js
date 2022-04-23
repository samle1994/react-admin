import api from "./api";
const list = (id) =>
  api.get(`${api.url.getproductcat}/${id}`).then((res) => res.data);

const GetProductCat = {
  list,
};
export default GetProductCat;
