import { Role } from "./role";
import { AccountStatus } from "./account-status.enum";
import { UserRole } from "./user-role.enum";

export class User {
  idUser?: number;
  username: string;
  password?: string;
  fullName: string;
  email: string;
  dateOfBirth: Date;
  roles?: Role[];
  accountStatus?: AccountStatus;

  constructor(params: {
    username: string;
    fullName: string;
    email: string;
    dateOfBirth: Date;
    password?: string;
    idUser?: number;
    roles?: UserRole[];
    accountStatus?: AccountStatus;
}) {
   Object.assign(this, params);
}

}