import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from './user.entity';

// 커스텀 데코레이터
export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): User => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
