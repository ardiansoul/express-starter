import { Repository } from "typeorm";
import { AppDataSource } from "../../database/data-source";
import { UserSession } from "../../database/entity/UserSession";
import { validate } from "class-validator";
import { ValidationError } from "../utlis/responseHandler";

export default class userSessionService {
  repository: Repository<UserSession>;
  constructor() {
    this.repository = AppDataSource.getRepository(UserSession);
  }

  async get(id: string): Promise<UserSession> {
    return await this.repository.findOne({ where: { id } });
  }

  async create(data: Record<string, any>) {
    const userSession = this.repository.create(data);

    const errors = await validate(userSession, { stopAtFirstError: true });

    if (errors.length > 0) {
      throw new ValidationError(`Validation failed: ${errors.map((error) => error.constraints)}`, false);
    }

    return await this.repository.save(userSession);
  }

  async update(id: string, data: Record<string, any>) {
    return await this.repository.save({ id, ...data });
  }

  async delete(id: string) {
    return await this.repository.delete({ id });
  }
}
