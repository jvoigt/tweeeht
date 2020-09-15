import { Controller, Post, HttpCode, UseGuards, Body, HttpStatus, Request, NotImplementedException } from "@nestjs/common";
import { TweehtLogger } from "logger/tweeht-logger";
import { Roles } from "auth/decorators/roles.decorator";
import { RolesGuard } from "auth/guards/roles.guard";
import { ApiOperation, ApiTags, ApiBearerAuth, ApiBody, ApiCreatedResponse } from "@nestjs/swagger";
import { of, Observable } from "rxjs";
import { User } from "users/user.interface";
import { UsersService } from "users/users.service";
import { CreateBotDto } from "./dto/createBot.dto";
import { TweeehtBot } from "./tweeht-bot";
import { BotCollectionModule } from "./bots-collections/bots-collection.module";
import { BotsCollectionService } from "./bots-collections/bots-collection.service";

@Controller('bots')
export class BotsController {

  constructor(
    private logger: TweehtLogger,
    private usersService: UsersService,
    private botsCollection: BotsCollectionService,
  ) {
    this.logger.setContext('BotsController')
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Roles('user')
  @UseGuards(RolesGuard)
  // SwaggerDefs
  @ApiOperation({
    description: 'Will create a new bot.',
    summary: 'Create a bot',
  })
  @ApiBearerAuth()
  @ApiBody({ type: CreateBotDto })
  @ApiCreatedResponse({ type: TweeehtBot })
  @ApiTags('bots')
  async create(@Body() createBot: CreateBotDto, @Request() request){
    // FIXME: we will consider every user as owner for now
    // later we could add permissions per user/collection
    const owners: User[] = [];
    if (request.username) {
      owners.push(await this.usersService.findOneByUsername(request.username));
    }
    console.log("OWNERS!!!!!!", request.username, owners)

    const newBot : TweeehtBot = {
      ...createBot,
      owners
    }

    this.botsCollection.create(new)

    // return of('botbotsbots');
    throw new NotImplementedException();
  }

}