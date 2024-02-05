import {  IsNumber, IsString } from "class-validator";

export class CreateRequestDto {
    @IsString()
    ticket_name: string;
    
    @IsNumber()
    quantity: number;
}