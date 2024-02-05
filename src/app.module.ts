import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { RequestModule } from './request/request.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users/user.entity';
import { Request } from './request/request.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [Users, Request],
      synchronize: true,
    }),
    UsersModule,
    RequestModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
