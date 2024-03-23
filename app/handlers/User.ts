import UserService from "../services/User";
import { handler } from "./d";

export default class UserHandler {
  private service: UserService;
  constructor() {
    this.service = new UserService();
  }

  public async get(id: string): Promise<any> {
    return await this.service.get(id);
  }

  public async getAll(filter: any): Promise<any> {
    return await this.service.getAll(filter);
  }

  public async create(data: any): Promise<any> {
    return await this.service.create(data);
  }
}
