import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, Module } from '@nestjs/common';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

const moduleMocker = new ModuleMocker(global);

jest.mock('@nestjs/typeorm', () => {
    @Module({})
    class MockModule {}

    return {
        ...jest.requireActual('@nestjs/typeorm'),
        InjectRepository: () => jest.fn(),
        TypeOrmModule: {
            forRootAsync: jest.fn().mockImplementation(() => MockModule),
            forFeature: jest.fn().mockImplementation(() => MockModule)
        }
    };
});

describe('AppController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule]
        })
            .useMocker((token) => {
                if (typeof token === 'function') {
                    const mockMetadata = moduleMocker.getMetadata(
                        token
                    ) as MockFunctionMetadata<any, any>;
                    const Mock =
                        moduleMocker.generateFromMetadata(mockMetadata);
                    return new Mock();
                }
            })
            .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/ (GET)', () => {
        return request(app.getHttpServer())
            .get('/')
            .expect(200)
            .expect('Service is up and running!');
    });
});
