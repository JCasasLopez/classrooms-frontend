export class User {
  idUser: number;
  username: string;
  password: string;
  fullName: string;
  email: string;
  dateOfBirth: Date;
  roles?: string[];
  accountStatus?: string;

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