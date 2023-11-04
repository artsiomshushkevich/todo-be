import { IsEmail, MinLength, MaxLength } from 'class-validator';

export class CreateUserDto {
    @IsEmail()
    username: string;

    @MinLength(8)
    @MaxLength(16)
    password: string;
}
