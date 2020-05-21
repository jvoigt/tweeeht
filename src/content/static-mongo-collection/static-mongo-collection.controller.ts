import { Controller, Post, HttpCode, HttpStatus, UseGuards, Get, Body, Req } from '@nestjs/common';
import { StaticMongoCollectionService } from './static-mongo-collection.service';
import { ApiOperation, ApiBearerAuth, ApiTags, ApiBody, ApiCreatedResponse } from '@nestjs/swagger';
import { Roles } from 'auth/decorators/roles.decorator';
import { RolesGuard } from 'auth/guards/roles.guard';
import { CreateStaticCollectionDto } from './dto/static-collection.dto';
import { User } from 'users/user.interface';
import { JwtUser } from 'auth/decorators/jwt-user.decorator';

@Controller('static-mongo-collection')
export class StaticMongoCollectionController {

    constructor(
        private staticMongoCollectionService: StaticMongoCollectionService,
    ) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({
        description: 'Will create a new StaticCollection for the Static-Mongo-Collection Content Module.',
        summary: 'Create a StaticCollection',
    })
    @ApiBearerAuth()
    @ApiBody({ type: [CreateStaticCollectionDto] })
    @ApiCreatedResponse({ type: 'string' })
    @ApiTags('content')
    @Roles('admin')
    @UseGuards(RolesGuard)
    @Post()
    async create(@Body() createStaticCollectionDto: CreateStaticCollectionDto, @JwtUser() jwtUser) {
        // FIXME: Move to middleware
        const owner: User[] = [];

        console.log("REQ: jwtUser", jwtUser)
        // console.log("REQ: PAY", request.payload)
        // console.log("REQ: beare", request.headers.authorization)
        // // return (await this.staticMongoCollectionService.create(createStaticCollectionDto)).name;
    }

    @Get()
    @ApiTags('content')
    // @Roles('user')
    // @UseGuards(RolesGuard)
    async readAll() {
        return this.staticMongoCollectionService.findAll();
    }

}
