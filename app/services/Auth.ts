import {} from "jsonwebtoken";
import { User } from "../../database/entity/User";
import { UserSession } from "../../database/entity/UserSession";
import { AppDataSource } from "../../database/data-source";
import { Repository } from "typeorm";
import { decryptData, encryptData, encryptPassword, generateToken, verifyToken } from "../utlis/encryption";
export default class AuthService {
  repository: Repository<UserSession>;
  constructor() {
    this.repository = AppDataSource.getRepository(UserSession);
  }

  async login(data: User) {
    const userSession = new UserSession();

    userSession.userId = data.id;

    const sessionData = await this.repository.save(userSession);

    const session = encryptData(JSON.stringify(sessionData));

    const token = generateToken({ session, data: { email: data.email, roleId: data.roleId, username: data.username } });

    return { token };
  }
}
