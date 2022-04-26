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
    if (key === "files") {
      for (let i = 0; i < data[key].length; i++) {
        formData.append(key + "[]", data[key][i]);
        //console.log(data[key][i]);
      }
    } else {
      formData.append(key, data[key]);
    }
  }

  return api.post(api.url.product, formData, {
    headers: {
      "Content-Type": "multipart/formdata",
    },
  });
};

const update = (id, data, value, type) => {
  const formData = new FormData();

  for (const key in data) {
    if (key === "files") {
      for (let i = 0; i < data[key].length; i++) {
        formData.append(key + "[]", data[key][i]);
        //console.log(data[key][i]);
      }
    } else {
      formData.append(key, data[key]);
    }
  }
  return api.post(
    `${api.url.product}/${id}?value=${value}&type=${type}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/formdata",
      },
    }
  );
};

const remove = (id) =>
  api.delete(`${api.url.product}/${id}`).then((res) => res.data);

const removeGallery = (id) =>
  api.delete(`${api.url.removegallery}/${id}`).then((res) => res.data);

const ProductService = {
  list,
  getPaging,
  get,
  add,
  update,
  remove,
  removeGallery,
};
export default ProductService;
