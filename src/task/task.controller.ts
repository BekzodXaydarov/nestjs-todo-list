import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { TaskService } from './task.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TaskDto } from './task.dto';
import { CurrentUser } from 'src/decorators/user.decorator';
import { Auth } from 'src/decorators/auth.decorator';

@ApiTags('user/task')
@ApiBearerAuth()
@Controller('user/task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('create')
  @Auth()
  async create(@Body() dto: TaskDto, @CurrentUser('id') userId: string) {
    return this.taskService.create(dto, userId);
  }
  @Put('update/:id')
  @Auth()
  async update(
    @Param('id') id: string,
    @Body() dto: TaskDto,
    @CurrentUser('id') userId: string,
  ) {
    return this.taskService.update(dto, userId, id);
  }

  @Delete('delete/:id')
  @Auth()
  async delete(@Param('id') id: string, @CurrentUser('id') userId: string) {
    return this.taskService.delete(id, userId);
  }
}
