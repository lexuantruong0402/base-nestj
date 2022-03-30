import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './module/authentication/auth.module';
import { UserModule } from './module/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { CaslModule } from './module/casl/casl.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './module/authentication/jwt-auth.guard';
import { RequestMiddleware } from './logger.middleware';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ormconfig = require('../ormconfig');
const modules = [UserModule, AuthModule, CaslModule];

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      ...ormconfig,
      autoLoadEntities: true,
    }),
    ...modules,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
