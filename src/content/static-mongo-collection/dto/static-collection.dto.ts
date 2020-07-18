import { ApiProperty } from '@nestjs/swagger';
import { MongoDocumentBase } from 'shared/dto/mongo-document-base.dto';

export class StaticCollectionDto extends MongoDocumentBase {
    @ApiProperty()
    readonly name: string;
    @ApiProperty()
    readonly lines: [string];
    @ApiProperty()
    readonly medias: [string];
    @ApiProperty()
    readonly owners: [string];
}
