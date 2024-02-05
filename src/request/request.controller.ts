import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query } from '@nestjs/common';
import { RequestService } from './request.service';
import { CreateRequestDto } from './dtos/create-request.dto';
import { UpdateRequestDto } from './dtos/update-request.dto';

@Controller('request')
export class RequestController {
    constructor(private requestService: RequestService){}

    @Post('/create')
    createRequest(@Body() body: CreateRequestDto){
        this.requestService.create(body.ticket_name, body.quantity);
    }

    @Get('/:id')
    async findRequest(@Param('id') id: string){
        const request = await this.requestService.findOne(parseInt(id));
        if (!request){
            throw new NotFoundException('user not found');
        }
        return request;
    }

    @Get()
    findAllRequest(@Query('ticket_name') ticket_name: string){
        return this.requestService.find(ticket_name);
    }

    @Delete('/:id')
    removeRequest(@Param('id') id: string){
        return this.requestService.remove(parseInt(id));
    }

    @Patch('/:id')
    updateRequest(@Param('id') id: string, @Body() body: UpdateRequestDto){
        return this.requestService.update(parseInt(id), body);
    }
}
