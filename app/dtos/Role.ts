import { IsNotEmpty } from "class-validator";

export interface RoleModel {
  id: string;
  name: string;
}

export class RoleRequest {
  @IsNotEmpty()
  name: string;
}
