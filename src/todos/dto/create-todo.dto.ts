import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateTodoDto {
    @IsNotEmpty()
    todo: string;

    @IsInt()
    userId: number;
}
