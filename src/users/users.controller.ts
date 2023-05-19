import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { CreateUserDto } from './dto/createUser.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() user: CreateUserDto): Promise<User> {
        return this.usersService.create(user);
    }
}
