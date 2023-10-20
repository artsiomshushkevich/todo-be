import { IsNotEmpty } from 'class-validator';

export class CreateTodoRequestDto {
    @IsNotEmpty()
    todo: string;
}

export class CreateTodoResponseDto {
    id: number;
    todo: string;
    isChecked: boolean;
}
