import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

// https://stackoverflow.com/questions/64578329/nestjs-swagger-module-not-working-properly-with-generic-crud-controller
export const OpenApiPaginationResponse = (model: any) => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        properties: {
          total: {
            type: 'number',
          },
          page: {
            type: 'number',
          },
          limit: {
            type: 'number',
          },
          totalPages: {
            type: 'number',
          },
          data: {
            type: 'array',
            items: { $ref: getSchemaPath(model) },
          },
        },
      },
    }),
  );
};
