import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsBoolean, IsString } from "class-validator";

export class TaskDto {
    @ApiProperty({example:"Name",description:"name"})
    @IsString()
    name: string

    @ApiProperty({example:false,description:"is completed"})
    @IsBoolean()
    @Transform(({value})=>Boolean(value))
    isCompleted: boolean
}