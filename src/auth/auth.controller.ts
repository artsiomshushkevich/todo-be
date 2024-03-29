import {
    Controller,
    Request,
    Post,
    UseGuards,
    Body,
    HttpCode,
    HttpStatus
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dtos/createUser.dto';
import { LocalAuthGuard } from './localAuth.guard';
import { AppRequest } from '../common/types/appRequest';
import { Public } from './public.decorator';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @HttpCode(HttpStatus.OK)
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async logIn(@Request() req: AppRequest) {
        return this.authService.logIn(req.user);
    }

    @Public()
    @Post('signup')
    singUp(@Body() createUserDto: CreateUserDto) {
        return this.authService.signUp(createUserDto);
    }
}
