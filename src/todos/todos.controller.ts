import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ParseIntPipe,
    HttpCode,
    HttpStatus
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todos')
export class TodosController {
    constructor(private readonly todosService: TodosService) {}

    @Post()
    create(@Body() createTodoDto: CreateTodoDto) {
        return this.todosService.create(createTodoDto);
    }

    @Get(':userId')
    @HttpCode(HttpStatus.CREATED)
    findAll(@Param('userId', ParseIntPipe) userId: number) {
        return this.todosService.findAll(userId);
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateTodoDto: UpdateTodoDto
    ) {
        return this.todosService.update(id, updateTodoDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.todosService.remove(+id);
    }
}
