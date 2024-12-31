import { User } from '@prisma/client';
import { UserResponseDto } from '../dto/user-response.dto';

export const UserMapper = {
  toUserResponse(user: User): UserResponseDto {
    const userResponseDto = new UserResponseDto();
    userResponseDto.name = user.name;
    userResponseDto.email = user.email;
    userResponseDto.id = user.id;
    return user;
  },
};
