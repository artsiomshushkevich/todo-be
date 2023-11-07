import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TodosModule } from './todos/todos.module';
import { AuthModule } from './auth/auth.module';
import typeorm from './common/config/typeorm';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [typeorm]
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                return {
                    ...configService.get('typeorm'),
                    autoLoadEntities: true
                };
            }
        }),
        UsersModule,
        TodosModule,
        AuthModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
