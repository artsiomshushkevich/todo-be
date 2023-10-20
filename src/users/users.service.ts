import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>
    ) {}

    findOne(id: number): Promise<User | null> {
        return this.usersRepository.findOneBy({ id });
    }

    findOneByUsername(username: string): Promise<User | null> {
        console.log('!!!', username);
        return this.usersRepository.findOneBy({ username });
    }

    remove(id: number) {
        return this.usersRepository.delete(id);
    }

    create(user: CreateUserDto): Promise<User> {
        return this.usersRepository.save(user);
    }
}
