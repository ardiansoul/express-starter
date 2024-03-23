import ServiceFactory from "../services";

export default class UserSessionHandler {
  constructor() {}

  public async get(id: string) {
    const userSessionService = ServiceFactory.getInstance("UserSession");

    return await userSessionService.get(id);
  }
}
