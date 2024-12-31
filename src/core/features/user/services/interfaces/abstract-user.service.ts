import { CreateUserDto } from '../../dto/create-user.dto';
import { User } from '@prisma/client';

export interface AbstractUserService {
  createUser(createUserDto: CreateUserDto): Promise<User>;
  findUserById(id: string): Promise<User>;
}
