import { User } from '@prisma/client';

export interface AbstractUserRepository {
  createUser(name: string, email: string, password: string): Promise<User>;
  findUserByEmail(email: string): Promise<User>;
  findUserById(id: string): Promise<User>;
}
