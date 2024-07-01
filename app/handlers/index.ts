import AuthHandler from "./Auth";
import RoleHandler from "./Role";
import UserHandler from "./User";
import UserSessionHandler from "./UserSession";

type HandlerType = "User" | "Auth" | "Role" | "UserSession";

type HandlerMap = {
  User: UserHandler;
  Auth: AuthHandler;
  Role: RoleHandler;
  UserSession: UserSessionHandler;
};

export default class HandlerFactory {
  private static handlerInstance: { [key in HandlerType]?: HandlerMap[key] } = {};

  public static getInstance<T extends HandlerType>(handlerName: T): HandlerMap[T] {
    const HandlerMap: { [key in HandlerType]: new () => HandlerMap[key] } = {
      User: UserHandler,
      Auth: AuthHandler,
      Role: RoleHandler,
      UserSession: UserSessionHandler,
    };

    if (!HandlerMap[handlerName]) {
      throw new Error(`Handler ${handlerName} not found`);
    }

    if (!this.handlerInstance[handlerName]) {
      this.handlerInstance[handlerName] = new HandlerMap[handlerName]();
    }

    return this.handlerInstance[handlerName] as HandlerMap[T];
  }
}
