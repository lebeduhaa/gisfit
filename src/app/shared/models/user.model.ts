import { Hour } from './hour';

export interface User {
  nickname?: string;
  sex?: string;
  age?: number;
  height?: number;
  weight?: number;
  avatar?: string;
  fakeAvatarUrl?: string;
  fakeAvatarName?: string;
  email?: string;
  password?: string;
  id?: string;
  notificationTime?: Hour;
}
