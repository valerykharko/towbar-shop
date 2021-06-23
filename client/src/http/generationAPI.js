import { $authHost, $host } from "./index";

export const createGeneration = async (generation) => {
  const { data } = await $authHost.post("api/generation", generation);
  return data;
};

export const fetchGenerations = async (modelId) => {
  const { data } = await $host.get("api/generation", {
    params: {
      modelId,
    },
  });
  return data;
};

export const fetchOneGeneration = async (id) => {
  const { data } = await $host.get("api/generation/" + id);
  return data;
};