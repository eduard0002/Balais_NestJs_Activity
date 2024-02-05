import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateUsersDto } from './dtos/create-users.dto';
import { UsersService } from './users.service';
import { UpdateUsersDto } from './dtos/update-users.dto';

@Controller('auth')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Post('/signup')
    createUsers(@Body() body: CreateUsersDto) {
        this.usersService.create(body.email, body.password);
    }

    @Get('/:id')
    async findUser(@Param('id') id: string) {
        const user = await this.usersService.findOne(parseInt(id));
        if(!user){
            throw new NotFoundException('user not found');
        }
        return user;
    }

    @Get()
    findAllUsers(@Query('email') email: string) {
        return this.usersService.find(email);
    }

    @Delete('/:id')
    removeUser(@Param('id') id: string) {
        return this.usersService.remove(parseInt(id));
    }

    @Patch('/:id')
    updateUser(@Param('id') id: string, @Body() body: UpdateUsersDto) {
        return this.usersService.update(parseInt(id), body);
    }
}
