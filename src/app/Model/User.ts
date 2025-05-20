import { UserAccountStatus } from "./user-account_status.enum";
import { UserRole } from "./User-role.enum";

export class User {
  idUser: number;
  username: string;
  password: string;
  fullName: string;
  email: string;
  dateOfBirth: Date;
  roles?: UserRole[];
  accountStatus?: UserAccountStatus;

  constructor(
    idUser: number,
    username: string,
    password: string,
    fullName: string,
    email: string,
    dateOfBirth: Date
  ) {
    this.idUser = idUser;
    this.username = username;
    this.password = password;
    this.fullName = fullName;
    this.email = email;
    this.dateOfBirth = dateOfBirth;
  }
}