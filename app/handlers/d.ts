export type initHandler<T = any> = (T?: T) => Array<Record<string, string>> | Record<string, string>;

// export class handler {
//   public service: any;

//   async getAll(options: any) {
//     const result = await this.service.getAll(options);
//     return result;
//   }

//   async get(id: string) {
//     const result = await this.service.get(id);
//     return result;
//   }

//   async create(schema: Joi.Schema, data: any) {
//     const { error, value } = schema.validate(data);
//     if (error) {
//       throw new Error(`Validation error: ${error.message}`);
//     }
//     const result = await this.service.create(value);
//     return result;
//   }

//   async update(id: string, data: any, schema: Joi.Schema) {
//     const { error, value } = schema.validate(data);
//     if (error) {
//       throw new Error(`Validation error: ${error.message}`);
//     }

//     const existingData = await this.service.get(id);
//     if (!existingData) {
//       throw new Error(`Data not found: ${id}`);
//     }

//     const result = await this.service.update(id, data);
//     return result;
//   }

//   async delete(id: string) {
//     const existingData = await this.service.get(id);
//     if (!existingData) {
//       throw new Error(`Data not found: ${id}`);
//     }
//     await this.service.delete(id);
//   }
// }

export class handler {}
