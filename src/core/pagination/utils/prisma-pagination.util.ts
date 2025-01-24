import { Prisma, PrismaClient } from '@prisma/client';
import { PaginationDto } from '../dto/pagination.dto';

export interface PaginatedResult<T> {
  total: number;
  data: T[];
}

export async function paginate<T, K, I>(
  model: Prisma.ModelName,
  paginationDto: PaginationDto,
  prisma: PrismaClient,
  extra: {
    where?: K;
    orderBy?: I;
  },
): Promise<PaginatedResult<T>> {
  const { page = 1, limit = 10 } = paginationDto;

  const [total, data] = await prisma.$transaction([
    prisma[model].count({ where: extra.where }),
    prisma[model].findMany({
      where: extra.where,
      orderBy: extra.orderBy,
      skip: (page - 1) * limit,
      take: limit,
    }),
  ]);

  return { total, data };
}
