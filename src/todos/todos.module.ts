import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { Todo } from './entities/todo.entity';
import { User } from '../users/users.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Todo]),
        TypeOrmModule.forFeature([User])
    ],
    controllers: [TodosController],
    providers: [TodosService],
    exports: [TodosService]
})
export class TodosModule {}
