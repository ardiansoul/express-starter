import dayjs = require("dayjs");

export const generateExpiredAt = (interval: number = 1, dateType: "hour" | "day" | "month" | "year" = "day") => {
  return dayjs().add(interval, dateType).toDate();
};

export const generateCode = () => {
  return Math.floor(100000 + Math.random() * 900000);
};
