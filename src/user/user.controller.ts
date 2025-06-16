import { Body, Controller, Get, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { Auth } from 'src/decorators/auth.decorator';
import { CurrentUser } from 'src/decorators/user.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RegisterDto } from 'src/auth/auth.dto';

@ApiTags("user")
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @Auth()
  async profile(@CurrentUser('id') userId: string) {
    const { password, ...user } = await this.userService.getProfile(userId);
    return user;
  }

  @Put('profile')
  @Auth()
  async update(
    @Body() dto: RegisterDto,
    @CurrentUser('id') userId: string,
  ) {
    const { password, ...user } = await this.userService.update(userId, dto);
    return user;
  }
}
