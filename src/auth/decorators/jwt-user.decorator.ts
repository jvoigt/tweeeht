import { SetMetadata } from '@nestjs/common';

// export const Roles = (...roles: string[]) => SetMetadata('roles', roles);



import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const JwtUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    console.log('@JwtUser.user', request.user);
    console.log('@JwtUser.headers', request.headers.authorization);

    return request.user;
  },
);