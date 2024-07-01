import { Repository } from ".";
import { RoleModel } from "../dtos/Role";

export interface IRoleRepository extends Repository<RoleModel> {}

class RoleRepository implements IRoleRepository {
  public create(data: RoleModel): Promise<RoleModel> {
    throw new Error("Method not implemented.");
  }

  public getById(id: string): Promise<RoleModel> {
    throw new Error("Method not implemented.");
  }

  public getAll(filter: any): Promise<RoleModel[]> {
    throw new Error("Method not implemented.");
  }

  public update(id: string, data: RoleModel): Promise<RoleModel> {
    throw new Error("Method not implemented.");
  }

  public delete(id: string): Promise<RoleModel> {
    throw new Error("Method not implemented.");
  }
}
