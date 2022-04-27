import api from "./api";

const get = (id) => api.get(`${api.url.photo}/${id}`).then((res) => res.data);

const update = (id, data) => {
  const formData = new FormData();
  for (const key in data) {
    formData.append(key, data[key]);
  }
  return api.post(`${api.url.photo}/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/formdata",
    },
  });
};
const PhotoService = {
  get,
  update,
};
export default PhotoService;
