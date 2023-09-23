import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';
import { User } from 'src/users/users.entity';

@Injectable()
export class TodosService {
    constructor(
        @InjectRepository(Todo) private todoRepostory: Repository<Todo>,
        @InjectRepository(User) private userRepository: Repository<User>
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

        return this.todoRepostory.save(todo);
    }

    async findAll(userId: number) {
        return this.todoRepostory.find({ where: { user: { id: userId } } });
    }

    update(id: number, updateTodoDto: UpdateTodoDto) {
        return `This action updates a #${id} todo`;
    }

    remove(id: number) {
        return this.todoRepostory.delete(id);
    }
}
