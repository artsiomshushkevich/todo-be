import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from 'bcrypt';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/createUser.dto';
import { AccessTokenResponse } from './type/accessToken';
import { UserInRequest } from '../common/type/appRequest';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async validateUser(
        username: string,
        password: string
    ): Promise<UserInRequest | null> {
        const user = await this.usersService.findOneByUsername(username);

        if (!user) {
            return null;
        }

        const match = await compare(password, user.password);

        if (match) {
            return {
                id: user.id,
                username: user.username
            };
        }

        return null;
    }

    async logIn(user: UserInRequest): Promise<AccessTokenResponse> {
        return {
            token: this.jwtService.sign(user)
        };
    }

    async signUp(createUserDto: CreateUserDto): Promise<AccessTokenResponse> {
        const passwordHash = await hash(
            createUserDto.password,
            Number(process.env.SALT_ROUNDS)
        );

        createUserDto.password = passwordHash;

        const newUser = await this.usersService.create(createUserDto);

        return this.logIn({ id: newUser.id, username: newUser.username });
    }
}
