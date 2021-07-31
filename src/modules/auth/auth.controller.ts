import {
  Controller,
  Request,
  Post,
  Body,
  UseGuards,
  NotAcceptableException,
  InternalServerErrorException,
} from '@nestjs/common';
import { BasicAuthGuard } from '@modules/auth/guards';
import { ApiTags, ApiSecurity } from '@nestjs/swagger';
import { AuthService } from '@modules/auth/auth.service';
import { UserService } from '@modules/user/user.service';
import { CreateUserDto } from '@modules/user/dtos/user.dto';

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @ApiSecurity('basic')
  @UseGuards(BasicAuthGuard)
  @Post('login')
  async login(@Request() req: Express.Request) {
    return this.authService.login(req.user);
  }

  @Post('signup')
  async createUser(@Body() user: CreateUserDto) {
    try {
      const newUser = await this.userService.createMany([user]);
      delete newUser.password; //TODO: This could be handled by an interceptor or a security middleware that removes sensitive information from responses.
      return newUser;
    } catch (error) {
      // TODO: maybe move this to an interceptor.
      if (error.message.includes('unique')) {
        throw new NotAcceptableException(
          `username ${user.username} already exists`,
        );
      } else {
        throw new InternalServerErrorException('Error signing up user.');
      }
    }
  }
}
