import type { Request } from '@nestjs/common';

export type UserInRequest = { id: number; username: string };

export type AppRequest = Request & { user: UserInRequest };
