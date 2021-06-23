import { $authHost, $host } from "./index";

export const createWK = async (wiringKit) => {
  const { data } = await $authHost.post("api/wiring-kit", wiringKit);
  return data;
};

export const fetchWKByFullFilter = async (
  brandId,
  modelId,
  generationId,
  bodyStyleId,
  page,
  limit
) => {
  const { data } = await $host.get("api/wiring-kit", {
    params: {
      brandId,
      modelId,
      generationId,
      bodyStyleId,
      page,
      limit,
    },
  });
  return data;
};

export const fetchWKInfo = async () => {
  const { data } = await $host.get("api/wiring-kit-info/");
  return data;
};

export const fetchOneWK = async (id) => {
  const { data } = await $host.get("api/wiring-kit/" + id);
  return data;
};

export const fetchOneWKInfo = async (id) => {
  const { data } = await $host.get("api/wiring-kit-info/" + id);
  return data;
};
