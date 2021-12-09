import { UsersModule } from './../users/users.module';
import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';

@Module({
  imports: [UsersModule],
  providers: [RolesService],
  controllers: [RolesController],
})
export class RolesModule {}
