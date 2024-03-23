import RoleService from "../services/Role";
import { ValidationError } from "../utlis/responseHandler";

export default class RoleHandler {
  private service: RoleService;

  constructor() {
    this.service = new RoleService();
  }

  public async get(id: string): Promise<any> {
    return await this.service.get(id);
  }

  public async getAll(filter: any): Promise<any> {
    return await this.service.getAll(filter);
  }

  public async create(body: any): Promise<any> {
    const roleExited = await this.service.getAll({ name: body.name });

    if (roleExited.length > 0) {
      throw new ValidationError("Role already exists", true);
    }

    return await this.service.create(body);
  }
}
