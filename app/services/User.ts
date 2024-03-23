// import { AppDataSource } from "../../database/data-source";

import { Repository } from "typeorm";
import { AppDataSource } from "../../database/data-source";
import { User } from "../../database/entity/User";
import { validate } from "class-validator";
import { encryptPassword } from "../utlis/encryption";
import { ValidationError } from "../utlis/responseHandler";

class UserService {
  private repository: Repository<User>;
  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async get(id: string): Promise<User> {
    const result = await this.repository.findOne({
      where: {
        id,
      },
      select: {
        username: true,
        email: true,
        role: {
          id: true,
          name: true,
        },
        id: true,
      },
    });
    return result;
  }

  async getByEmail(email: string): Promise<User> {
    const result = await this.repository.findOne({
      where: {
        email,
      },
    });

    return result;
  }

  async getAll(filter: Record<string, string>) {
    const result = await this.repository.find({
      where: filter,
      select: {
        username: true,
        email: true,
        role: {
          id: true,
          name: true,
        },
        id: true,
      },
    });
    return result;
  }

  async create(data: Record<string, any>) {
    const user = new User();

    data.password = encryptPassword(data.password);

    Object.assign(user, data);

    const errors = await validate(user);

    if (errors.length > 0) {
      throw new ValidationError(`Validation failed: ${errors.map((error) => error.constraints)}`, false);
    }

    return await this.repository.save(user);
  }

  async update(id: string, data: Record<string, any>) {
    return await this.repository.save({ id, ...data });
  }
}

export default UserService;
