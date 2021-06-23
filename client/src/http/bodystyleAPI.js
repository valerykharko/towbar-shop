import { $authHost, $host } from "./index";

export const createBodyStyle = async (bodyStyle) => {
  const { data } = await $authHost.post("api/body-style", bodyStyle);
  return data;
};

export const fetchBodyStyles = async (generationId) => {
  const { data } = await $host.get("api/body-style", {
    params: {
      generationId,
    },
  });
  return data;
};

export const fetchOneBodyStyle = async (id) => {
  const { data } = await $host.get("api/body-style/" + id);
  return data;
};