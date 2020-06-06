import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { RolesGuard } from 'auth/guards/roles.guard';
import { Roles } from './roles.decorator';

export function Auth(...roles: string[]) {
    return applyDecorators(
        Roles(...roles),
        UseGuards(RolesGuard),
        ApiBearerAuth(),
        ApiUnauthorizedResponse({ description: 'Login with proper Roles.' }),
    );
}