import { Controller, Post, HttpCode, HttpStatus, UseGuards, Get, Body, Req, Param, Put } from '@nestjs/common';
import { StaticMongoCollectionService } from './static-mongo-collection.service';
import { ApiOperation, ApiBearerAuth, ApiTags, ApiBody, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { Roles } from 'auth/decorators/roles.decorator';
import { RolesGuard } from 'auth/guards/roles.guard';
import { CreateStaticCollectionDto, StaticCollectionDto } from './dto/static-collection.dto';
import { User } from 'users/user.interface';
import { UsersService } from 'users/users.service';
import { TweehtLogger } from 'logger/tweeht-logger';

@Controller('static-mongo-collection')
export class StaticMongoCollectionController {

    constructor(
        private staticMongoCollectionService: StaticMongoCollectionService,
        private usersService: UsersService,
        private logger: TweehtLogger,
    ) {
        this.logger.setContext('STATICMONGOCOLLECTIONCTRL')
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Roles('user')
    @UseGuards(RolesGuard)
    // SwaggerDefs
    @ApiOperation({
        description: 'Will create a new StaticCollection for the Static-Mongo-Collection Content Module.',
        summary: 'Create a StaticCollection',
    })
    @ApiBearerAuth()
    @ApiBody({ type: CreateStaticCollectionDto })
    @ApiCreatedResponse({ type: StaticCollectionDto, })
    @ApiTags('content')
    async create(@Body() createStaticCollectionDto: CreateStaticCollectionDto, @Req() request) {
        // FIXME: we will consider every user as owner for now
        // later we could add permissions per user/collection
        // const owners: User[] = [];
        // if (request.username) {
        //     owners.push(await this.usersService.findOneByUsername(request.username));
        // }
        return await this.staticMongoCollectionService.create(createStaticCollectionDto);
    }

    @Get()
    @ApiTags('content')
    @Roles('user')
    @UseGuards(RolesGuard)
    // SwaggerDefs
    @ApiTags('content')
    @ApiOkResponse({ type: [StaticCollectionDto] })
    readAll() {
        return this.staticMongoCollectionService.findAll();
    }

    @Get(':id')
    @Roles('user')
    @UseGuards(RolesGuard)
    // SwaggerDefs
    @ApiTags('content')
    @ApiOkResponse({ type: StaticCollectionDto })
    findOne(@Param('id') id) {
        return this.staticMongoCollectionService.findOnebyId(id);
    }

    @Put(':id')
    @Roles('user')
    @HttpCode(HttpStatus.CREATED)
    @UseGuards(RolesGuard)
    // SwaggerDefs
    @ApiOperation({
        description: 'Will update a  StaticCollection for the Static-Mongo-Collection Content Module.',
        summary: 'update a StaticCollection',
    })
    @ApiBearerAuth()
    @ApiBody({ type: CreateStaticCollectionDto })
    @ApiTags('content')
    updateOne(@Param('id') id, @Body() createStaticCollectionDto: CreateStaticCollectionDto, ) {
        // FIXME: we will consider every user as owner for now
        return this.staticMongoCollectionService.updateOne(id, createStaticCollectionDto);
    }
}
