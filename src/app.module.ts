import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './module/authentication/auth.module';
import { User } from './module/user/entities/user.entity';
import { UserModule } from './module/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { CaslModule } from './module/casl/casl.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './module/authentication/jwt-auth.guard';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ormconfig = require('../ormconfig');
const entities = [User];
const modules = [UserModule, AuthModule, CaslModule];

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      ...ormconfig,
      entities: entities,
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
export class AppModule {}
