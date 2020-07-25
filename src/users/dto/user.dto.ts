import { ApiProperty } from '@nestjs/swagger';
import { MongoDocumentBase } from 'shared/dto/mongo-document-base.dto';

export class UserDto extends MongoDocumentBase {
    @ApiProperty()
    readonly username: string;
    @ApiProperty()
    readonly password: string;
    @ApiProperty()
    readonly roles: string[];
}
