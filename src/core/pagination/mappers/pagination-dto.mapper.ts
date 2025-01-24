import { PaginationResponseDto } from '../dto/pagination.dto';
import { PaginatedResult } from '../utils/prisma-pagination.util';

/**
 *
 */
export const mapPaginationResultToPaginationDto = <T, K>(
  limit: number,
  page: number,
  data: PaginatedResult<T>,
  mapper: (value: T) => K,
): PaginationResponseDto<K> =>
  new PaginationResponseDto<K>(
    data.data.map((element) => mapper(element)),
    data.total,
    page,
    limit,
    Math.ceil(data.total / limit),
  );
