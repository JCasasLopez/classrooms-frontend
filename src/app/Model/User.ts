import { UserAccountStatus } from "./user-account_status.enum";
import { UserRole } from "./user-role.enum";

export class User {
  idUser?: number;
  username: string;
  password?: string;
  fullName: string;
  email: string;
  dateOfBirth: Date;
  roles?: UserRole[];
  accountStatus?: UserAccountStatus;

  constructor(params: {
    username: string;
    fullName: string;
    email: string;
    dateOfBirth: Date;
    password?: string;
    idUser?: number;
    roles?: UserRole[];
    accountStatus?: UserAccountStatus;
}) {
   Object.assign(this, params);
}

}