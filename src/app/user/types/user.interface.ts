import { UserDataInterface } from './userData.interface';

export interface UserInterface {
  isLoggedIn: boolean;
  verification: string | boolean;
  user: UserDataInterface;
}
