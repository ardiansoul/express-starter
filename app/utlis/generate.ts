import dayjs = require("dayjs");
import { compile } from "handlebars";
import { readFileSync } from "fs";
import * as path from "path";

export const generateExpiredAt = (interval: number = 1, dateType: "hour" | "day" | "month" | "year" = "day") => {
  return dayjs().add(interval, dateType).toDate();
};

export const generateCode = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

export const generateTemplatetoHTML = (template_path: string, data: Record<string, any>): string => {
  // import template from template path
  const template = readFileSync(path.join(__dirname, "../", template_path), "utf-8");
  const compiled = compile(template);

  const html: string = compiled(data);

  return html;
};
