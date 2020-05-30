import { ApiProperty } from '@nestjs/swagger';

export class MongoDocumentBase {
    @ApiProperty()
    readonly _id: string;
    @ApiProperty()
    // tslint:disable-next-line: variable-name
    readonly __v: number;
}