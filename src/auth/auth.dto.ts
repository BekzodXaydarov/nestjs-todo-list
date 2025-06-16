import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class AuthDto {
  @ApiProperty({ example: 'email@gmail', description: 'email' })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123456', description: 'password' })
  @IsString()
  password: string;
}

export class RegisterDto {
  @ApiProperty({ example: 'email@gmail', description: 'email' })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Bekzod', description: 'name' })
  @IsString()
  name: string;

  @ApiProperty({ example: '123456', description: 'password' })
  @IsString()
  password: string;
}
