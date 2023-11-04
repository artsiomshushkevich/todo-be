import {
    BadRequestException,
    Injectable,
    NotFoundException,
    ForbiddenException
} from '@nestjs/common';
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

    private async checkTodoBelongsToUser(id: number, userId: number) {
        const todo = await this.findById(id);

        if (!todo) {
            throw new NotFoundException();
        }

        if (todo.user.id !== userId) {
            throw new ForbiddenException();
        }
    }

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

    findAll(userId: number) {
        return this.todoRepository.find({ where: { user: { id: userId } } });
    }

    private findById(id: number) {
        return this.todoRepository.findOne({
            where: { id },
            relations: { user: true }
        });
    }

    async update(id: number, userId: number, updateTodoDto: UpdateTodoDto) {
        await this.checkTodoBelongsToUser(id, userId);

        const { isChecked, todo: updatedTodo } = updateTodoDto;

        await this.dataSource
            .createQueryBuilder()
            .update(Todo)
            .set({ isChecked, todo: updatedTodo })
            .where('id = :id', { id: id })
            .execute();

        return true;
    }

    async remove(id: number, userId: number) {
        await this.checkTodoBelongsToUser(id, userId);

        await this.todoRepository.delete(id);

        return true;
    }
}
