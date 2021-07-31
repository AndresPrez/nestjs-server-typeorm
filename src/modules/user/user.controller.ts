import {
  Controller,
  Request,
  Get,
  Post,
  UseGuards,
  Body,
} from '@nestjs/common';
import { BasicAuthGuard, JwtAuthGuard } from '@modules/auth/guards';
import { ApiTags, ApiSecurity } from '@nestjs/swagger';
import { UserService } from '@modules/user/user.service';

@ApiTags('User')
@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  // @ApiSecurity('bearer')
  // @UseGuards(JwtAuthGuard)
  @ApiSecurity('basic')
  @UseGuards(BasicAuthGuard)
  @Get('user')
  async getSecureHello(@Request() req: Express.Request): Promise<any> {
    const user: Express.User = req.user;
    const { id, username, userRoles, isActive, createdAt, updatedAt } =
      await this.userService.findOne(user.username);

    return { id, username, userRoles, isActive, createdAt, updatedAt };
  }
}
