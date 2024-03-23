import { appendFile } from "fs";
import path = require("path");

export function logger() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const className = target.constructor.name;
    // console.log(target);
    // console.log(propertyKey);

    descriptor.value = async function (...args: any[]) {
      const start = process.hrtime();
      try {
        const result = await originalMethod.apply(this, args);
        const end = process.hrtime(start);
        const executionTime = (end[0] * 1000 + end[1] / 1000000).toFixed(2); // Calculate execution time in milliseconds
        appendFile(
          path.join(__dirname, "../../", "debug.log"),
          `${className}.${propertyKey} executed in ${executionTime} ms \n`,
          (err) => {
            if (err) throw err;
          }
        );
        return result;
      } catch (error) {
        appendFile(
          path.join(__dirname, "../../", "error.log"),
          `${className}.${propertyKey} failed with error: ${error} \n`,
          (err) => {
            if (err) throw err;
          }
        );
        // args[1].status(500).json({
        //   message: error,
        //   status: "error",
        // });
        throw error;
      }
    };
    return descriptor;
  };
}

export const logFile = (value: any, fileName: string) => {
  appendFile(path.join(__dirname, "../../", fileName), value, (err) => {
    if (err) throw err;
  });
};
