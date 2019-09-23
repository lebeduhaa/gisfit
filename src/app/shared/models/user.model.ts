import { Hour } from './hour.model';
import { Day } from './day.model';

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
  interfaceLanguage?: string;
  notificationSound?: boolean;
  sendDailyReportOnEmail?: boolean;
  caloriesGoal?: number;
  proteinGoal?: number;
  fatsGoal?: number;
  carbohydratesGoal?: number;
  currentDay?: Day;
}
