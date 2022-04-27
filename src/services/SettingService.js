import api from "./api";

const get = (id) => api.get(`${api.url.setting}/${id}`).then((res) => res.data);

const update = (id, data) =>
  api.put(`${api.url.setting}/${id}`, data).then((res) => res.data);

const SettingService = {
  get,
  update,
};
export default SettingService;
