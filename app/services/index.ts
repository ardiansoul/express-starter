import AuthService from "./Auth";
import TokenService from "./Token";
import RoleService from "./Role";
import UserService from "./User";
import UserSessionService from "./UserSession";

type ServiceType = "User" | "Auth" | "Role" | "UserSession" | "Token";

type ServiceMap = {
  User: UserService;
  Auth: AuthService;
  Role: RoleService;
  UserSession: UserSessionService;
  Token: TokenService;
};
export default class ServiceFactory {
  public static getInstance<T extends ServiceType>(serviceName: T): ServiceMap[T] {
    const ServiceMap: { [key in ServiceType]: new () => ServiceMap[key] } = {
      User: UserService,
      Auth: AuthService,
      Role: RoleService,
      UserSession: UserSessionService,
      Token: TokenService,
    };

    if (!ServiceMap[serviceName]) {
      throw new Error(`Service ${serviceName} not found`);
    }

    return new ServiceMap[serviceName]() as ServiceMap[T];
  }
}
