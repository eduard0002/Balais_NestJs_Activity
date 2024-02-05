import { IsOptional, IsString, IsNumber } from "class-validator";

export class UpdateRequestDto {
    @IsString()
    @IsOptional()
    ticket_name: string;
    
    @IsNumber()
    @IsOptional()
    quantity: number;

    @IsString()
    @IsOptional()
    request_status: string;

}