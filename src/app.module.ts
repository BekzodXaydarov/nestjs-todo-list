import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    UserModule,
    AuthModule,
    TaskModule
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
