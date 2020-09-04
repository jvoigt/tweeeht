import { ApiProperty, PartialType, ApiPropertyOptional } from '@nestjs/swagger';
import { TweeehtBot } from 'bots/tweeht-bot.interface';

export class CreateBotDto implements TweeehtBot {
    @ApiProperty()
    readonly id: string;
    @ApiProperty()
    readonly name: string;
    @ApiProperty()
    @ApiProperty()
    readonly owners: string[];
    @ApiPropertyOptional()
    readonly sheduler: any; //FIXME: add proper type
    @ApiPropertyOptional()
    readonly output: any; //FIXME: add proper type
    @ApiPropertyOptional()
    readonly content: any; //FIXME: add proper type
}
