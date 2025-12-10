import { Permission } from "../../../enums/permission.enum";

export interface AuthenticatedUserResponse {
  id: number;
  username: string;
  email: string;
  fullName: string;
  roles: string[];
  permissions: Permission[];
}
