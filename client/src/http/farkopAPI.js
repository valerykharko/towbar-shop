import { $authHost, $host } from "./index";

export const createFarkop = async (farkop) => {
  const { data } = await $authHost.post("api/farkop", farkop);
  return data;
};

export const fetchFarkopsByFullFilter = async (
  brandId,
  modelId,
  generationId,
  bodyStyleId,
  page,
  limit
) => {
  const { data } = await $host.get("api/farkop", {
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

export const fetchFarkopInfo = async () => {
  const { data } = await $host.get("api/farkop-info/");
  return data;
};

export const fetchOneFarkop = async (id) => {
  const { data } = await $host.get("api/farkop/" + id);
  return data;
};

export const fetchOneFarkopInfo = async (id) => {
  const { data } = await $host.get("api/farkop-info/" + id);
  return data;
};
