import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import {
    CreateTodoRequestDto,
    CreateTodoResponseDto
} from './dtos/createTodo.dto';
import { UpdateTodoDto } from './dtos/updateTodo.dto';
import { Todo } from './entities/todo.entity';
import { User } from '../users/users.entity';

@Injectable()
export class TodosService {
    constructor(
        @InjectRepository(Todo) private todoRepository: Repository<Todo>,
        @InjectRepository(User) private userRepository: Repository<User>,
        private dataSource: DataSource
    ) {}

    async create(
        createTodoDto: CreateTodoRequestDto,
        userId: number
    ): Promise<CreateTodoResponseDto> {
        const user = await this.userRepository.findOne({
            where: { id: userId }
        });

        if (!user) {
            throw new BadRequestException();
        }

        const todo = new Todo();
        todo.todo = createTodoDto.todo;
        todo.isChecked = false;
        todo.user = user;

        const newTodo = await this.todoRepository.save(todo);

        const newTodoDto = new CreateTodoResponseDto();
        newTodoDto.id = newTodo.id;
        newTodoDto.todo = newTodo.todo;
        newTodoDto.isChecked = newTodo.isChecked;

        return newTodoDto;
    }

    async findAll(userId: number) {
        return this.todoRepository.find({ where: { user: { id: userId } } });
    }

    update(id: number, updateTodoDto: UpdateTodoDto) {
        const { isChecked, todo } = updateTodoDto;

        return this.dataSource
            .createQueryBuilder()
            .update(Todo)
            .set({ isChecked, todo })
            .where('id = :id', { id: id })
            .execute();
    }

    remove(id: number) {
        return this.todoRepository.delete(id);
    }
}
