import { Injectable, NotFoundException } from '@nestjs/common';
import { hash } from 'argon2';
import { RegisterDto } from 'src/auth/auth.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUserByEmail(email: string) {
    return this.prisma.user.findFirst({
      where: {
        email,
      },
    });
  }

  async create(dto: RegisterDto) {
    return this.prisma.user.create({
      data: { ...dto, password: await hash(dto.password) },
    });
  }

  async getById(userId: string) {
    return this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });
  }

  async getProfile(userId: string) {
    const user = await this.prisma.user.findFirst({
      where: { id: userId },
      include: { tasks: true },
    });
    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async update(userId: string, dto: Partial<RegisterDto>) {
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: {...dto,password:await hash(dto.password || "")},
    });

    if (!user) throw new NotFoundException('User not found');

    return user
  }
}
