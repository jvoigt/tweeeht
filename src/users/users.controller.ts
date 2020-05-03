import { Controller, Get, Post, Body, UseGuards, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiBearerAuth, ApiTags, ApiBody } from '@nestjs/swagger';
import { BearerAuthGuard } from 'auth/guards/bearer-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'auth/guards/jwt-auth.guard';
import { RolesGuard } from 'auth/guards/roles.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(
        private usersService: UsersService,
    ) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({
        description: 'Will Create a new User.',
        summary: 'Register a user',
    })
    @ApiBearerAuth()
    @ApiBody({ type: [CreateUserDto] })
    @ApiCreatedResponse({ type: 'string' })
    @ApiTags('users')
    @UseGuards(BearerAuthGuard)
    @Post()
    async register(@Body() createUserDto: CreateUserDto) {
        // FIXME: this may return sensible information...
        return (await this.usersService.create(createUserDto)).username;
    }

    @ApiBearerAuth()
    @ApiTags('users')
    @UseGuards(BearerAuthGuard)
    @Get()
    async readAll() {
        return this.usersService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':username')
    async findOne(@Param() params) {
        console.log(params);
        return this.usersService.findOneByUsername(params.username);
    }

    /*
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
