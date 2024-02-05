import { IsOptional, IsEmail, IsString } from "class-validator";

export class UpdateUsersDto {
    @IsEmail()
    @IsOptional()
    email: string;

    @IsString()
    @IsOptional()
    password: string;

}