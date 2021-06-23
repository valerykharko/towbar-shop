import { $authHost, $host } from "./index";

export const createAccessory = async (accessory) => {
  const { data } = await $authHost.post("api/accessories", accessory);
  return data;
};

export const fetchAccessoriesByFilter = async (
  typeAccessoryId,
  page,
  limit
) => {
  const { data } = await $host.get("api/accessories", {
    params: {
      typeAccessoryId,
      page,
      limit,
    },
  });
  return data;
};

export const createAccessoryType = async (typeAccessory) => {
  const { data } = await $authHost.post("api/type-accessories", typeAccessory);
  return data;
};

export const fetchAccessoryTypes = async () => {
  const { data } = await $host.get("api/type-accessories");
  return data;
};

export const createAccessoryInfo = async (typeAccessory) => {
  const { data } = await $authHost.post("api/type-accessories", typeAccessory);
  return data;
};

export const fetchAccessoryInfos = async () => {
  const { data } = await $host.get("api/accessories-info");
  return data;
};
