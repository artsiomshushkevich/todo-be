import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/users.entity';

@Entity()
export class Todo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    todo: string;

    @Column()
    isChecked: boolean;

    @Column()
    color: string;

    @ManyToOne(() => User, (user) => user.todos, {
        onDelete: 'CASCADE'
    })
    user: User;
}
