import { Repository } from "typeorm";
import { AppDataSource } from "../../database/data-source";
import { validate } from "class-validator";
import { ValidationError } from "../utlis/responseHandler";
import { Token } from "../../database/entity/Token";

export default class TokenService {
  repository: Repository<Token>;

  constructor() {
    this.repository = AppDataSource.getRepository(Token);
  }

  async create(data: Record<string, any>) {
    const token = this.repository.create(data);

    const errors = await validate(token, { stopAtFirstError: true });

    if (errors.length > 0) {
      throw new ValidationError(`Validation failed: ${errors.map((error) => error.constraints)}`, false);
    }

    return await this.repository.save(token);
  }

  async get(id: string, type: Token["type"]) {
    return await this.repository.findOne({ where: { id, type } });
  }

  async getByCode(code: string, type: Token["type"]) {
    return await this.repository.findOne({ where: { code, type } });
  }
}
