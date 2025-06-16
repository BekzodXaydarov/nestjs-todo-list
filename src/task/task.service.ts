import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { TaskDto } from './task.dto';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async create(dto: TaskDto, userId: string) {
    return this.prisma.task.create({
      data: {
        ...dto,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  async update(dto: Partial<TaskDto>, userId: string, taskId: string) {
    const task = await this.prisma.task.findFirst({
      where: {
        id: taskId,
        userId,
      },
    });

    if (!task) throw new NotFoundException('Task not found');
    return this.prisma.task.update({
      where: {
        id: taskId,
      },
      data: dto,
    });
  }

  async delete(taskId: string, userId: string) {
    const task = await this.prisma.task.findFirst({
      where: {
        id: taskId,
        userId,
      },
    });

    if (!task) throw new NotFoundException('Task not found');

    return this.prisma.task.delete({
      where: { id: taskId },
    });
  }
}
