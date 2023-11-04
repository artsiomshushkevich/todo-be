import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './auth/public.decorator';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    @Public()
    ping(): string {
        return this.appService.ping();
    }
}