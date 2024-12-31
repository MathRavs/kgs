import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../database/prisma.service';
import { User } from '@prisma/client';
import { AbstractUserRepository } from '../interfaces/abstract-user.repository';

@Injectable()
export class UserRepository implements AbstractUserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  createUser(name: string, email: string, password: string): Promise<User> {
    return this.prismaService.user.create({
      data: {
        name,
        password,
        email,
      },
    });
  }

  findUserByEmail(email: string): Promise<User> {
    return this.prismaService.user.findUniqueOrThrow({
      where: { email },
    });
  }

  findUserById(id: string): Promise<User> {
    return this.prismaService.user.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }
}
