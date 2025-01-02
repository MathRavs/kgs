import { CreateUserDto } from '../../dto/create-user.dto';
import { User } from '@prisma/client';

export abstract class AbstractUserService {
  abstract createUser(createUserDto: CreateUserDto): Promise<User>;
  abstract findUserById(id: string): Promise<User>;
}
