import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { JwtTokenDto } from './dto/jwt-token-messagen.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiTags('auth')
  @ApiOperation({
    description: 'Will generate a JWT token for a User.',
    summary: 'Login a user',
  })
  @ApiBody({ type: LoginUserDto })
  @ApiOkResponse({ type: JwtTokenDto })
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  /*
    @Post('refresh-access-token')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({title: 'Refresh Access Token with refresh token',})
    @ApiCreatedResponse({})
    async refreshAccessToken(@Body() refreshAccessTokenDto: RefreshAccessTokenDto) {
        return await this.userService.refreshAccessToken(refreshAccessTokenDto);
    }*/
}
