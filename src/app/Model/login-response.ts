import { User } from "./user";

export class LoginResponse {
  user: User;
  refreshToken: string;
  accessToken: string;

  constructor(
    user: User, 
    refreshToken: string, 
    accessToken: string) {
    this.user = user;
    this.refreshToken = refreshToken;
    this.accessToken = accessToken;
  }
}
