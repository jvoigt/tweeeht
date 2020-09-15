import { ApiProperty, PartialType, ApiPropertyOptional } from '@nestjs/swagger';
import { TweeehtBot } from 'bots/tweeht-bot';

export class CreateBotDto {
    @ApiProperty()
    readonly name: string;
    // @ApiPropertyOptional()
    // readonly sheduler: any; //FIXME: add proper type
    // @ApiPropertyOptional()
    // readonly output: any; //FIXME: add proper type
    // @ApiPropertyOptional()
    // readonly content: any; //FIXME: add proper type
}
