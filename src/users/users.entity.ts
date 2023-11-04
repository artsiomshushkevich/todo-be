import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    Index
} from 'typeorm';
import { Todo } from '../todos/entities/todo.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Index('username_index', { unique: true })
    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    @OneToMany(() => Todo, (todo) => todo.user)
    todos: Todo[];
}
