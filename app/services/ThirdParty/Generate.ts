import * as pdfkit from "pdfkit";
import * as handlebars from "handlebars";
import { PathOrFileDescriptor, readFileSync } from "fs";
import path = require("path");

interface DocumentGenerationService {
  generate(source: any, data: any): any;
}

class GeneratePDFService implements DocumentGenerationService {
  constructor() {}

  generate() {}
}

class GenerateImageService implements DocumentGenerationService {
  constructor() {}

  generate() {
    return true;
  }
}

class GenerateCSVService implements DocumentGenerationService {
  constructor() {}

  generate() {}
}

class GenerateHTMLService implements DocumentGenerationService {
  constructor() {}

  generate(source: string, data: any) {
    const templateSource = readFileSync(path.join(__dirname, "../../templates", source), { encoding: "utf8" });
    const template = handlebars.compile(templateSource);
    const generatedHTML = template(data);
    return generatedHTML;
  }
}

export default { GenerateCSVService, GenerateImageService, GeneratePDFService, GenerateHTMLService };
