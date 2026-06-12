export type UserRole = 'user' | 'admin';

export interface User {
  id:        number;
  name:      string;
  email:     string;
  role:      UserRole;
  avatarUrl?: string | null;
  createdAt: string;
}

export interface AuthSession {
  user: {
    id:    number;
    name:  string;
    email: string;
    role:  UserRole;
  };
  expires: string;
}
