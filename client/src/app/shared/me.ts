import { User } from './user';

export interface Me {
  me: { data: User | null };
}
