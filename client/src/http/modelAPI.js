import { $authHost, $host } from "./index";

export const createModel = async (model) => {
  const { data } = await $authHost.post("api/model", model);
  return data;
};

export const fetchModels = async (brandId) => {
  const { data } = await $host.get("api/model", {
    params: {
      brandId,
    },
  });
  return data;
};

export const fetchOneModel = async (id) => {
  const { data } = await $host.get("api/model/" + id);
  return data;
};