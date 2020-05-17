import { Controller, Get, UseGuards, Request, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { RolesGuard } from 'auth/guards/roles.guard';
import { BearerAuthGuard } from 'auth/guards/bearer-auth.guard';
import { Roles } from 'auth/decorators/roles.decorator';
import { ApiBearerAuth, ApiOperation, ApiHeader, ApiTags } from '@nestjs/swagger';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @UseGuards(BearerAuthGuard)
  @Get()
  getStatus(): string {
    return this.appService.getStatus();
  }

  @Get('test')
  @ApiBearerAuth()
  @ApiOperation({
    description: 'A private route for check the auth',
  })
  @ApiHeader({
    description: 'the token we need for auth.',
    name: 'Bearer',
  })
  @ApiTags('Test')
  @Roles('any')
  @UseGuards(RolesGuard)
  getTest(): string {
    return this.appService.getStatus();
  }

  @Get('test/user')
  @ApiBearerAuth()
  @ApiOperation({
    description: 'A private route for check the auth',
  })
  @ApiHeader({
    description: 'the token we need for auth.',
    name: 'Bearer',
  })
  @ApiTags('Test')
  @Roles('user')
  @UseGuards(RolesGuard)
  getTestUser(): string {
    return this.appService.getStatus();
  }

  @Get('test/admin')
  @ApiBearerAuth()
  @ApiOperation({
    description: 'A private route for check the auth',
  })
  @ApiHeader({
    description: 'the token we need for auth.',
    name: 'Bearer',
  })
  @ApiTags('Test')
  @Roles('admin')
  @UseGuards(RolesGuard)
  getTestAdmin(): string {
    return this.appService.getStatus();
  }
}
