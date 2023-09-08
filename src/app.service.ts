import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    ping(): string {
        return 'Service is up and running!';
    }
}
