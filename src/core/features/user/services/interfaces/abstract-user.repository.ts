import { User } from '@prisma/client';

export abstract class AbstractUserRepository {
  abstract createUser(
    name: string,
    email: string,
    password: string,
  ): Promise<User>;
  abstract findUserByEmail(email: string): Promise<User>;
  abstract findUserById(id: string): Promise<User>;
}
