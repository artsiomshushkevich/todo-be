import {
    Controller,
    Get,
    Post,
    Body,
    Put,
    Param,
    Delete,
    ParseIntPipe,
    Request
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoRequestDto } from './dtos/createTodo.dto';
import { UpdateTodoDto } from './dtos/updateTodo.dto';
import { AppRequest } from '../common/type/appRequest';

@Controller('todos')
export class TodosController {
    constructor(private readonly todosService: TodosService) {}

    @Post()
    create(
        @Body() createTodoDto: CreateTodoRequestDto,
        @Request() req: AppRequest
    ) {
        return this.todosService.create(createTodoDto, req.user.id);
    }

    @Get()
    findAll(@Request() req: AppRequest) {
        return this.todosService.findAll(req.user.id);
    }

    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateTodoDto: UpdateTodoDto
    ) {
        return this.todosService.update(id, updateTodoDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.todosService.remove(id);
    }
}
