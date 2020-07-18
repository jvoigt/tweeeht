import { ApiProperty } from '@nestjs/swagger';

export class CreateStaticCollectionDto {
    @ApiProperty()
    readonly name: string;
    @ApiProperty()
    readonly lines: [string];
    @ApiProperty()
    readonly medias: [string];
}

