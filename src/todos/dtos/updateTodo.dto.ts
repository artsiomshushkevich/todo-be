import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateTodoDto {
    @IsBoolean()
    isChecked: boolean;

    @IsNotEmpty()
    todo: string;
}
