import {$host} from "./index";

export const sendMail = async (mail) => {
  const { data } = await $host.post("api/mail-sender", mail);
  return data;
};