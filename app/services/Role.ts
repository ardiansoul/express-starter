import { Repository } from "typeorm";
import { Role } from "../../database/entity/Role";
import { AppDataSource } from "../../database/data-source";
import { validate } from "class-validator";
import { ValidationError } from "../utlis/responseHandler";

export default class RoleService {
  private repository: Repository<Role>;

  constructor() {
    this.repository = AppDataSource.getRepository(Role);
  }

  async get(id: string): Promise<Role> {
    const result = await this.repository.findOne({
      where: {
        id,
      },
    });

    return result;
  }

  async getAll(filter: Record<string, string>): Promise<Role[]> {
    const result = await this.repository.find({
      where: filter,
    });

    return result;
  }

  async create(body: Role): Promise<Role> {
    const data = new Role();

    data.name = body.name;
    data.description = body.description;

    const errors = await validate(data, { stopAtFirstError: true });
    if (errors.length > 0) {
      throw new ValidationError(errors.map((error) => Object.values(error.constraints)).flat(), false);
    }

    const result = await this.repository.save(data);
    return result;
  }

  async update(id: string, body: Role): Promise<Role> {
    return await this.repository.save({ id, ...body });
  }

  async delete(id: string) {
    return await this.repository.delete({ id });
  }
}
