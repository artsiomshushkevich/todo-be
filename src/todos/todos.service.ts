import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';
import { User } from '../users/users.entity';

@Injectable()
export class TodosService {
    constructor(
        @InjectRepository(Todo) private todoRepository: Repository<Todo>,
        @InjectRepository(User) private userRepository: Repository<User>,
        private dataSource: DataSource
    ) {}

    async create(createTodoDto: CreateTodoDto) {
        const user = await this.userRepository.findOne({
            where: { id: createTodoDto.userId }
        });

        if (!user) {
            throw Error('user not found');
        }

        const todo = new Todo();
        todo.todo = createTodoDto.todo;
        todo.isChecked = false;
        todo.user = user;

        return this.todoRepository.save(todo);
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
