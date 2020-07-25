import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Auth } from 'auth/decorators/auth.decorator';
import { CreateUserDto } from 'users/dto/create-user.dto';
import { UserDto } from 'users/dto/user.dto';
import { UsersService } from 'users/users.service';
import { TweehtLogger } from 'logger/tweeht-logger';

@Controller('users')
export class UsersController {

  constructor(
    private logger: TweehtLogger,
    private usersService: UsersService,
  ) {
    this.logger.setContext('UsersController')
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Post()
  // Swagger Defs
  @ApiOperation({
    description: 'Will Create a new User.',
    summary: 'Register a user',
  })
  @ApiBody({ type: CreateUserDto })
  @ApiCreatedResponse({ type: 'string' })
  @ApiTags('users')
  async register(@Body() createUserDto: CreateUserDto) {
    this.logger.log(`register: Req for ${createUserDto.username}`)
    const newUser = await this.usersService.create(createUserDto);
    this.logger.log(`register: Resp for ${newUser.username}`)
    return newUser.username;
  }

  @Get()
  @Auth('admin')
  @ApiOperation({
    description: 'Only for available for Admin-User.',
    summary: 'Read all User',
  })
  @ApiOkResponse({ type: [UserDto] })
  @ApiTags('users')
  @ApiBearerAuth()
  async readAll() {
    return this.usersService.findAll();
  }

  /*
  // Warning Boiler plate ahead
      @Post('verify-username')
      @HttpCode(HttpStatus.OK)
      @ApiOperation({title: 'Verify Username',})
      @ApiOkResponse({})
      async verifyUsername(@Req() req: Request, @Body() verifyUuidDto: VerifyUuidDto) {
          return await this.userService.verifyUsername(req, verifyUuidDto);
      }

      @Post('login')
      @HttpCode(HttpStatus.OK)
      @ApiOperation({title: 'Login User',})
      @ApiOkResponse({})
      async login(@Req() req: Request, @Body() loginUserDto: LoginUserDto) {
          return await this.userService.login(req, loginUserDto);
      }

      @Post('forgot-password')
      @HttpCode(HttpStatus.OK)
      @ApiOperation({title: 'Forgot password',})
      @ApiOkResponse({})
      async forgotPassword(@Req() req: Request, @Body() createForgotPasswordDto: CreateForgotPasswordDto) {
          return await this.userService.forgotPassword(req, createForgotPasswordDto);
      }

      @Post('forgot-password-verify')
      @HttpCode(HttpStatus.OK)
      @ApiOperation({title: 'Verfiy forget password code',})
      @ApiOkResponse({})
      async forgotPasswordVerify(@Req() req: Request, @Body() verifyUuidDto: VerifyUuidDto) {
          return await this.userService.forgotPasswordVerify(req, verifyUuidDto);
      }

      @Post('reset-password')
      @HttpCode(HttpStatus.OK)
      @ApiOperation({title: 'Reset password after verify reset password',})
      @ApiBearerAuth()
      @ApiImplicitHeader({
          name: 'Bearer',
          description: 'the token we need for auth.'
      })
      @ApiOkResponse({})
      async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
          return await this.userService.resetPassword(resetPasswordDto);
      }

      @Get('data')
      @UseGuards(AuthGuard('jwt'))
      @Roles('admin')
      @ApiBearerAuth()
      @ApiOperation({title: 'A private route for check the auth',})
      @ApiImplicitHeader({
          name: 'Bearer',
          description: 'the token we need for auth.'
      })
      @HttpCode(HttpStatus.OK)
      @ApiOkResponse({})
      findAll() {
          return this.userService.findAll();
      }

      */
}
