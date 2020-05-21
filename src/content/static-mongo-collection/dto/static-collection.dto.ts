import { ApiProperty } from '@nestjs/swagger';
import { User } from 'users/user.interface';

export class CreateStaticCollectionDto {
    @ApiProperty()
    readonly name: string;
    @ApiProperty()
    readonly lines: [string];
    @ApiProperty()
    readonly medias: [string];
}
