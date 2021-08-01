import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from '@modules/user/user.module';
import { AuthModule } from '@modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import typeOrmConfigs from 'src/database/ormconfig';
import { AdminModule } from '../admin/admin.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfigs), UsersModule, AuthModule, AdminModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
