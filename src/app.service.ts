import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    ping(): string {
        console.log('!!!!!NODE ENV', process.env.NODE_ENV);
        return 'Ping!';
    }
}
