import { ApiProperty } from '@nestjs/swagger';

export class JwtTokenDto {
    @ApiProperty()
    readonly expiresIn: number;
    @ApiProperty()
    readonly roles: string[];
    @ApiProperty()
    readonly token: string;
}
