import api from "./api";
const list = () => api.get(api.url.photos).then((res) => res.data);

const getPaging = (pageNum, pageLength, search, type) => {
  const queryString = `page=${pageNum}&pageLength=${pageLength}&keyword=${search}&type=${type}`;
  return api.get(`${api.url.photos}/paging?${queryString}`);
};
const get = (id) => api.get(`${api.url.photos}/${id}`).then((res) => res.data);

const add = (data, type) => {
  const formData = new FormData();

  for (const key in data) {
    formData.append(key, data[key]);
  }
  formData.append("type", type);
  return api.post(api.url.photos, formData, {
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
    `${api.url.photos}/${id}?value=${value}&type=${type}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/formdata",
      },
    }
  );
};

const remove = (id) =>
  api.delete(`${api.url.photos}/${id}`).then((res) => res.data);

const PhotosService = {
  list,
  getPaging,
  get,
  add,
  update,
  remove,
};
export default PhotosService;
