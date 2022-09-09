import { DateTime } from "luxon";

export const getTodayDate = () => {
  let dt = DateTime.now();
  return dt.toLocaleString();
};
